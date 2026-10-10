// /api/solicitar-cotizacion.js
// Recibe el "cotizador previo" que va dentro de cada página de producto
// (assets/js/cotizador-previo.js). El cliente arma lo que necesita, sin ver precios, y deja
// nombre, WhatsApp, correo, ciudad y estado. Aquí:
//   1) se busca o se crea el contacto en el CRM (tabla contacts, origen "Página web");
//   2) se guarda la solicitud (tabla solicitudes_cotizacion) con los productos en el formato
//      del cotizador interno, para que se abra con todo cargado (cotizador.html?solicitud=ID);
//   3) se deja una observación en el timeline del contacto;
//   4) se avisa a los vendedores en la campana (tabla notificaciones) y, si hay llave, por correo.
//
// Usa las mismas variables de entorno que /api/nuevo-lead.js:
//   SUPABASE_SERVICE_ROLE_KEY (obligatoria), RESEND_API_KEY y CORREO_AVISO_LEADS (opcionales).

const SUPABASE_URL = "https://jofotwgbbdysrywgxkwi.supabase.co";
const URL_COTIZADOR = "https://app.redesdeportivasrc.com/cotizador.html";
// Mismos vendedores que reciben los avisos de Producción (produccion.html, EMAILS_VENDEDORES).
const EMAILS_VENDEDORES = ["reiniercoral@gmail.com", "redesdeportivasrc@gmail.com", "raulmedina2109@gmail.com"];

// Producto de la página → nombre en el aviso y "Producto" del contacto en el CRM.
const PRODUCTOS = {
  perimetral: { nombre: "red perimetral", crm: "Redes perimetrales" },
  proteccion: { nombre: "red de protección", crm: "Red de protección" },
  porterias: { nombre: "porterías", crm: "Porterías" },
  redes_porteria: { nombre: "red para portería", crm: "Red de Portería Tipo Colmena" },
  deportivas: { nombre: "redes deportivas", crm: "Redes deportivas" },
  jaulas: { nombre: "jaula de bateo", crm: "Red Para Jaula De Bateo" },
  baloneras: { nombre: "baloneras", crm: "Baloneras" },
};
// Nombres exactos del catálogo del cotizador (CATALOGO_PM), para que el CRM agrupe igual.
const PERIMETRAL_CRM = { "1": "Red Perimetral 1 Pulg (Rombo)", "2": "Red Perimetral 2 Pulg (Rombo)", "3": "Red Perimetral 3 Pulg (Rombo)", "4": "Red Perimetral 4 Pulg (Rombo)", anticaidas: "Red Anticaídas 1 Pulg (Rombo)" };
const ABERTURAS = ["1", "2", "3", "4", "anticaidas", "no_se"];
const FORMAS = ["seccion", "perimetro", "jaula", "personalizado"];
const MODELOS_PORTERIA = ["Mini", "Infantil", "Juvenil", "Microbio", "Fut 7 (5m)", "Fut 7 (6m)", "Oficial", "Oficial Cabaña (1.5)", "Oficial Cabaña (2.5)", "Personalizada", "Waterpolo"];

// El CRM y la campana pintan notas y nombres como HTML: se quitan < y > de todo lo que escribe el cliente.
const texto = (v, max) => String(v == null ? "" : v).replace(/[<>]/g, "").trim().slice(0, max);
const numero = (v, max) => { const n = Number(v); return Number.isFinite(n) && n > 0 && n <= max ? Math.round(n * 100) / 100 : 0; };
const entero = (v, max) => Math.round(numero(v, max));
const fmt = (n) => Number(n).toLocaleString("es-MX", { maximumFractionDigits: 2 });
const escHtml = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Solo se aceptan los tipos y campos que el cotizador sabe cargar.
function limpiarItem(it) {
  if (!it || typeof it !== "object") return null;
  if (it.tipo === "perimetral") {
    const secciones = (Array.isArray(it.secciones) ? it.secciones : []).slice(0, 60)
      .map((s) => ({ cant: entero(s && s.cant, 999), largo: numero(s && s.largo, 500), alto: numero(s && s.alto, 60) }))
      .filter((s) => s.cant && s.largo && s.alto);
    if (!secciones.length) return null;
    return { tipo: "perimetral", abertura: ABERTURAS.includes(it.abertura) ? it.abertura : "no_se", secciones };
  }
  if (it.tipo === "porteria") {
    const r = { tipo: "porteria", cantidad: entero(it.cantidad, 999), trav: numero(it.trav, 20), poste: numero(it.poste, 10), psup: numero(it.psup, 10), pinf: numero(it.pinf, 10) };
    return r.cantidad && r.trav && r.poste ? r : null;
  }
  if (it.tipo === "porteria_completa") {
    if (!MODELOS_PORTERIA.includes(it.modelo)) return null;
    const r = { tipo: "porteria_completa", modelo: it.modelo, cantidad: entero(it.cantidad, 999) };
    if (it.modelo === "Personalizada") { r.trav = numero(it.trav, 20); r.poste = numero(it.poste, 10); }
    return r.cantidad ? r : null;
  }
  if (it.tipo === "voleibol" || it.tipo === "basquetbol") {
    const n = entero(it.cantidad, 999);
    return n ? { tipo: it.tipo, cantidad: n } : null;
  }
  if (it.tipo === "jaula") {
    const r = { tipo: "jaula", cantidad: entero(it.cantidad, 99), largo: numero(it.largo, 100), ancho: numero(it.ancho, 50), altura: numero(it.altura, 20) };
    return r.cantidad && r.largo && r.ancho && r.altura ? r : null;
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });
  const b = req.body || {};

  // Campo trampa para robots (igual que el formulario de contacto): fingimos éxito y no guardamos nada.
  if (b.sitioWeb) return res.status(200).json({ ok: true });

  const nombre = texto(b.nombre, 120);
  let telefono = String(b.telefono || "").replace(/\D/g, "");
  if (telefono.length === 12 && telefono.startsWith("52")) telefono = telefono.slice(2);
  if (!nombre || telefono.length !== 10) {
    return res.status(400).json({ error: "Escribe tu nombre y tu WhatsApp a 10 dígitos." });
  }
  const producto = PRODUCTOS[b.producto] ? b.producto : null;
  const items = (Array.isArray(b.items) ? b.items : []).slice(0, 10).map(limpiarItem).filter(Boolean);
  const detalle = (Array.isArray(b.detalle) ? b.detalle : []).slice(0, 40).map((l) => texto(l, 240)).filter(Boolean);
  if (!producto || (!items.length && !detalle.length)) {
    return res.status(400).json({ error: "Falta lo que necesitas cotizar." });
  }
  const correo = texto(b.correo, 160);
  const ciudad = texto(b.ciudad, 80);
  const estado = texto(b.estado, 60);
  const comentario = texto(b.comentario, 1000);
  const forma = FORMAS.includes(b.forma) ? b.forma : null;
  const perimetral = items.find((i) => i.tipo === "perimetral");
  const m2 = perimetral ? Math.round(perimetral.secciones.reduce((t, s) => t + s.cant * s.largo * s.alto, 0) * 100) / 100 : null;
  const P = PRODUCTOS[producto];
  const productoCRM = perimetral && PERIMETRAL_CRM[perimetral.abertura] ? PERIMETRAL_CRM[perimetral.abertura] : P.crm;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return res.status(500).json({ error: "No se pudo enviar. Escríbenos por WhatsApp, por favor." });
  const h = { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" };

  try {
    // 1) Contacto: si ya existe ese teléfono, se reutiliza (no se duplica ni se le cambia la etapa).
    const busca = await fetch(`${SUPABASE_URL}/rest/v1/contacts?phone=eq.${telefono}&deleted_at=is.null&select=id,name`, { headers: h });
    const encontrados = await busca.json();
    let contactId, contactoNuevo = false;
    if (Array.isArray(encontrados) && encontrados.length) {
      contactId = encontrados[0].id;
    } else {
      const crear = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
        method: "POST",
        headers: { ...h, Prefer: "return=representation" },
        body: JSON.stringify({
          phone: telefono, name: nombre, stage: "nuevo", origen: "Página web",
          product: productoCRM, estado: estado || null,
        }),
      });
      const creado = await crear.json();
      if (!crear.ok) throw new Error(creado.message || "No se pudo crear el contacto");
      contactId = creado[0].id;
      contactoNuevo = true;
    }

    // 2) Solicitud con todo lo que el cotizador necesita para precargarse.
    const guardar = await fetch(`${SUPABASE_URL}/rest/v1/solicitudes_cotizacion`, {
      method: "POST",
      headers: { ...h, Prefer: "return=representation" },
      body: JSON.stringify({
        contact_id: contactId,
        nombre, telefono,
        correo: correo || null,
        ciudad: ciudad || null,
        estado_mx: estado || null,
        producto, forma,
        abertura: perimetral ? perimetral.abertura : null,
        secciones: perimetral ? perimetral.secciones : null,
        items, detalle, m2,
        comentario: comentario || null,
        pagina: texto(b.pagina, 200) || null,
        origen_visita: b.origenVisita && typeof b.origenVisita === "object" ? b.origenVisita : null,
      }),
    });
    const guardada = await guardar.json();
    if (!guardar.ok) throw new Error(guardada.message || "No se pudo guardar la solicitud");
    const solicitudId = guardada[0].id;
    const ligaCotizador = `${URL_COTIZADOR}?solicitud=${solicitudId}`;
    const lugar = [ciudad, estado].filter(Boolean).join(", ");

    // 3) Timeline del contacto (si falla, la solicitud ya quedó guardada).
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/activities`, {
        method: "POST",
        headers: h,
        body: JSON.stringify({
          contact_id: contactId,
          type: "observacion",
          created_by_name: "Página web",
          notes: [
            `📐 <b>Solicitud de cotización desde la página: ${escHtml(P.nombre)}</b>`,
            ...detalle.map(escHtml),
            lugar ? `Lugar: ${escHtml(lugar)}` : null,
            correo ? `Correo: ${escHtml(correo)}` : null,
            comentario ? `Comentario: ${escHtml(comentario)}` : null,
            `<a href="${ligaCotizador}" target="_blank" rel="noopener">Abrir en el cotizador</a>`,
          ].filter(Boolean).join("<br>"),
        }),
      });
    } catch (e) { console.error("activities", e); }

    // 4) Campana de los vendedores: al tocarla abre el cotizador con la solicitud cargada.
    const corto = m2 ? ` (${fmt(m2)} m²)` : "";
    try {
      const perfiles = await (await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=id,email&email=in.(${EMAILS_VENDEDORES.map(encodeURIComponent).join(",")})`, { headers: h })).json();
      const filas = (Array.isArray(perfiles) ? perfiles : []).map((p) => ({
        user_id: p.id,
        tipo: "solicitud_cotizacion",
        mensaje: `📐 ${contactoNuevo ? "Nuevo lead" : "Solicitud"} de la página: ${nombre}${lugar ? " (" + lugar + ")" : ""} pide cotización de ${P.nombre}${corto}. Toca para abrirla en el cotizador.`,
        contexto: { ir: "cotizador", solicitud_id: solicitudId, contact_id: contactId },
      }));
      if (filas.length) await fetch(`${SUPABASE_URL}/rest/v1/notificaciones`, { method: "POST", headers: h, body: JSON.stringify(filas) });
    } catch (e) { console.error("notificaciones", e); }

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "Grupo RC — Página web <onboarding@resend.dev>",
            to: [process.env.CORREO_AVISO_LEADS || "redesdeportivasrc@gmail.com"],
            subject: `📐 Solicitud de cotización: ${nombre} — ${P.nombre}${corto}`,
            html: `
              <h2>Solicitud de cotización — ${escHtml(P.nombre)}</h2>
              <p><b>${escHtml(nombre)}</b> · ${telefono}${lugar ? " · " + escHtml(lugar) : ""}${correo ? " · " + escHtml(correo) : ""}</p>
              <ul>${detalle.map((l) => `<li>${escHtml(l)}</li>`).join("")}</ul>
              ${comentario ? `<p><b>Comentario:</b> ${escHtml(comentario)}</p>` : ""}
              <p><a href="${ligaCotizador}">Abrir en el cotizador</a></p>
            `,
          }),
        });
      } catch (e) { /* el correo es opcional */ }
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("solicitar-cotizacion", e);
    return res.status(500).json({ error: "No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp." });
  }
}
