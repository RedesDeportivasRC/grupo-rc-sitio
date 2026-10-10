// /api/solicitar-cotizacion.js
// Recibe el "cotizador previo" de la página (por ahora: redes perimetrales). El cliente arma sus
// secciones (cantidad × largo × altura, igual que el cotizador interno) y deja nombre y WhatsApp.
// Aquí:
//   1) se busca o se crea el contacto en el CRM (tabla contacts, origen "Página web");
//   2) se guarda la solicitud con sus secciones (tabla solicitudes_cotizacion) para que el
//      cotizador la abra con todo cargado (cotizador.html?solicitud=ID);
//   3) se deja una observación en el timeline del contacto;
//   4) se avisa a los vendedores en la campana (tabla notificaciones) y, si hay llave, por correo.
// El cliente nunca ve precios: el vendedor pone precio y envío en el cotizador.
//
// Usa las mismas variables de entorno que /api/nuevo-lead.js:
//   SUPABASE_SERVICE_ROLE_KEY (obligatoria), RESEND_API_KEY y CORREO_AVISO_LEADS (opcionales).

const SUPABASE_URL = "https://jofotwgbbdysrywgxkwi.supabase.co";
const URL_COTIZADOR = "https://app.redesdeportivasrc.com/cotizador.html";
// Mismos vendedores que reciben los avisos de Producción (produccion.html, EMAILS_VENDEDORES).
const EMAILS_VENDEDORES = ["reiniercoral@gmail.com", "redesdeportivasrc@gmail.com", "raulmedina2109@gmail.com"];

const FORMAS = {
  seccion: "1 sección",
  perimetro: "Perímetro (4 lados)",
  jaula: "Jaula con techo",
  personalizado: "Personalizado (varias secciones)",
};
const ABERTURAS = { "1": '1"', "2": '2"', "3": '3"', "4": '4"', no_se: "por recomendar" };
const PRODUCTO_CRM = { "1": "Red Perimetral 1 Pulg (Rombo)", "2": "Red Perimetral 2 Pulg (Rombo)", "3": "Red Perimetral 3 Pulg (Rombo)", "4": "Red Perimetral 4 Pulg (Rombo)" };

// El CRM y la campana pintan notas y nombres como HTML: se quitan < y > de todo lo que escribe el cliente.
const texto = (v, max) => String(v == null ? "" : v).replace(/[<>]/g, "").trim().slice(0, max);
const numero = (v) => { const n = Number(v); return Number.isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : 0; };
const fmt = (n) => Number(n).toLocaleString("es-MX", { maximumFractionDigits: 2 });
const escHtml = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

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
  const forma = FORMAS[b.forma] ? b.forma : null;
  const abertura = ABERTURAS[b.abertura] ? b.abertura : "no_se";
  const secciones = (Array.isArray(b.secciones) ? b.secciones : []).slice(0, 60).map((s, i) => ({
    cant: Math.max(1, Math.min(999, Math.round(numero(s && s.cant)))),
    largo: numero(s && s.largo),
    alto: numero(s && s.alto),
    nombre: texto(s && s.nombre, 40) || `Sección ${i + 1}`,
  })).filter((s) => s.largo > 0 && s.alto > 0 && s.largo <= 500 && s.alto <= 60);
  if (!forma || !secciones.length) {
    return res.status(400).json({ error: "Faltan las medidas de la red." });
  }
  const m2 = Math.round(secciones.reduce((t, s) => t + s.cant * s.largo * s.alto, 0) * 100) / 100;
  const correo = texto(b.correo, 160);
  const estado = texto(b.estado, 60);
  const comentario = texto(b.comentario, 1000);
  const medidas = b.medidas && typeof b.medidas === "object"
    ? { largo: numero(b.medidas.largo), ancho: numero(b.medidas.ancho) || null, alto: numero(b.medidas.alto) }
    : null;

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
          product: PRODUCTO_CRM[abertura] || "Redes perimetrales",
          estado: estado || null,
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
        estado_mx: estado || null,
        producto: "perimetral",
        forma, abertura, medidas, secciones, m2,
        comentario: comentario || null,
        pagina: texto(b.pagina, 200) || null,
        origen_visita: b.origenVisita && typeof b.origenVisita === "object" ? b.origenVisita : null,
      }),
    });
    const guardada = await guardar.json();
    if (!guardar.ok) throw new Error(guardada.message || "No se pudo guardar la solicitud");
    const solicitudId = guardada[0].id;
    const ligaCotizador = `${URL_COTIZADOR}?solicitud=${solicitudId}`;

    const lineas = secciones.map((s) => `${s.cant} × ${fmt(s.largo)} × ${fmt(s.alto)} m${forma !== "personalizado" ? ` (${s.nombre.toLowerCase()})` : ""}`);
    const resumen = `${FORMAS[forma]} · ${fmt(m2)} m² · abertura ${ABERTURAS[abertura]}`;

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
            "📐 <b>Solicitud de cotización desde la página: red perimetral</b>",
            escHtml(resumen),
            ...lineas.map(escHtml),
            estado ? `Estado: ${escHtml(estado)}` : null,
            correo ? `Correo: ${escHtml(correo)}` : null,
            comentario ? `Comentario: ${escHtml(comentario)}` : null,
            `<a href="${ligaCotizador}" target="_blank" rel="noopener">Abrir en el cotizador</a>`,
          ].filter(Boolean).join("<br>"),
        }),
      });
    } catch (e) { console.error("activities", e); }

    // 4) Campana de los vendedores: al tocarla abre el cotizador con la solicitud cargada.
    try {
      const perfiles = await (await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=id,email&email=in.(${EMAILS_VENDEDORES.map(encodeURIComponent).join(",")})`, { headers: h })).json();
      const filas = (Array.isArray(perfiles) ? perfiles : []).map((p) => ({
        user_id: p.id,
        tipo: "solicitud_cotizacion",
        mensaje: `📐 ${contactoNuevo ? "Nuevo lead" : "Solicitud"} de la página: ${nombre} pide cotización de red perimetral (${fmt(m2)} m²). Toca para abrirla en el cotizador.`,
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
            subject: `📐 Solicitud de cotización: ${nombre} (${fmt(m2)} m²)`,
            html: `
              <h2>Solicitud de cotización — red perimetral</h2>
              <p><b>${escHtml(nombre)}</b> · ${telefono}${estado ? " · " + escHtml(estado) : ""}${correo ? " · " + escHtml(correo) : ""}</p>
              <p>${escHtml(resumen)}</p>
              <ul>${lineas.map((l) => `<li>${escHtml(l)}</li>`).join("")}</ul>
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
