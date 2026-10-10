// /api/nuevo-lead.js
// Recibe lo que alguien llena en el formulario de contacto de la página pública y lo
// guarda directo en la misma base de datos que usa tu CRM (tabla "contacts"), con una
// nota en el timeline que trae el mensaje y el correo. Así cualquiera que llene el
// formulario aparece de inmediato como un contacto nuevo, listo para dar seguimiento.
//
// Variable de entorno necesaria en este proyecto de Vercel (grupo-rc-sitio):
//   SUPABASE_SERVICE_ROLE_KEY -> la llave "service_role" de Supabase (Project Settings → API).
//   Esta llave SÍ puede saltarse las reglas de seguridad de la tabla, por eso nunca se manda
//   al navegador — solo vive aquí, en el servidor.

const SUPABASE_URL = "https://jofotwgbbdysrywgxkwi.supabase.co";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { nombre, telefono, correo, estado, producto, mensaje, empresa, sitioWeb, recaptchaToken } = req.body || {};

  // "sitioWeb" es un campo trampa (honeypot): invisible para una persona, pero los
  // robots que llenan formularios automáticamente casi siempre lo rellenan igual.
  // Si viene con algo, fingimos que todo salió bien y no guardamos nada.
  if (sitioWeb) {
    return res.status(200).json({ ok: true });
  }

  if (!telefono || !nombre) {
    return res.status(400).json({ error: "Nombre y teléfono son obligatorios." });
  }

  // Verifica con Google que quien llenó el formulario se comportó como una persona,
  // no como un robot — esto corre invisible, el cliente nunca ve ningún captcha.
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (recaptchaSecret) {
    if (!recaptchaToken) {
      return res.status(400).json({ error: "No se pudo verificar el formulario, intenta de nuevo." });
    }
    try {
      const verifica = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      });
      const resultado = await verifica.json();
      if (!resultado.success || (typeof resultado.score === "number" && resultado.score < 0.5)) {
        return res.status(400).json({ error: "No se pudo verificar el formulario, intenta de nuevo." });
      }
    } catch (e) {
      // Si Google no responde, no bloqueamos al cliente por un problema que no es suyo.
    }
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return res.status(500).json({ error: "Falta configurar SUPABASE_SERVICE_ROLE_KEY en este proyecto." });
  }

  // Diagnóstico: confirma que la llave guardada de verdad sea "service_role" y no "anon"
  // u otra cosa — las dos empiezan exactamente igual, así que no basta con verla a simple vista.
  try {
    const partes = serviceKey.split(".");
    const payload = JSON.parse(Buffer.from(partes[1], "base64").toString("utf8"));
    if (payload.role !== "service_role") {
      return res.status(500).json({
        error: `La llave guardada en SUPABASE_SERVICE_ROLE_KEY es de tipo "${payload.role}", no "service_role". Vuelve a copiarla de Supabase (Settings → API → Legacy anon, service_role API keys → service_role) y guárdala de nuevo.`,
      });
    }
  } catch (e) {
    return res.status(500).json({ error: "La llave guardada en SUPABASE_SERVICE_ROLE_KEY no tiene un formato válido — revísala." });
  }

  const headersSupabase = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  };

  const telefonoLimpio = String(telefono).replace(/\D/g, "");

  try {
    // 1) ¿Ya existe un contacto activo con este teléfono? Si sí, no creamos uno duplicado —
    //    solo le agregamos la nota nueva, como si volviera a escribir el mismo cliente.
    const busca = await fetch(
      `${SUPABASE_URL}/rest/v1/contacts?phone=eq.${encodeURIComponent(telefonoLimpio)}&deleted_at=is.null&select=id`,
      { headers: headersSupabase }
    );
    const encontrados = await busca.json();
    let contactId;

    if (Array.isArray(encontrados) && encontrados.length > 0) {
      contactId = encontrados[0].id;
    } else {
      const crear = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
        method: "POST",
        headers: { ...headersSupabase, Prefer: "return=representation" },
        body: JSON.stringify({
          phone: telefonoLimpio,
          name: nombre,
          product: producto || null,
          estado: estado || null,
          stage: "nuevo",
          origen: "Página web",
        }),
      });
      const creado = await crear.json();
      if (!crear.ok) {
        return res.status(crear.status).json({ error: creado.message || "No se pudo crear el contacto." });
      }
      contactId = creado[0].id;
    }

    // 2) Nota con todo lo demás que no tiene su propia columna (correo, empresa, mensaje).
    const partesNota = [
      "📩 Nuevo contacto desde la página web",
      correo ? `Correo: ${correo}` : null,
      empresa ? `Empresa: ${empresa}` : null,
      mensaje ? `Mensaje: ${mensaje}` : null,
    ].filter(Boolean).join("\n");

    await fetch(`${SUPABASE_URL}/rest/v1/activities`, {
      method: "POST",
      headers: headersSupabase,
      body: JSON.stringify({
        contact_id: contactId,
        type: "observacion", // "nota" no existe en activities_type_check: la base la rechazaba y el mensaje se perdía
        notes: partesNota,
        created_by_name: "Formulario web",
      }),
    });

    // 3) Que también aparezca en Mensajes (app.redesdeportivasrc.com/mensajes.html) como correo,
    //    ya ligado al contacto del CRM, para contestarle desde ahí como contacto@redesdeportivasrc.com.
    //    Si algo falla aquí, el lead ya quedó guardado en el CRM y no se le muestra error al cliente.
    if (correo) {
      try {
        await enviarAMensajes(headersSupabase, {
          correo: String(correo).trim().toLowerCase(),
          nombre, contactId, telefono: telefonoLimpio, producto, estado, empresa, mensaje,
        });
      } catch (e) {
        console.error("mensajes", e);
      }
    }

    // 4) Avisa por correo — si esto falla, no afecta que el lead ya se haya guardado bien.
    const resendKey = process.env.RESEND_API_KEY;
    const correoAviso = process.env.CORREO_AVISO_LEADS || "redesdeportivasrc@gmail.com";
    if (resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "Grupo RC — Página web <onboarding@resend.dev>",
            to: [correoAviso],
            subject: `📩 Nuevo lead: ${nombre}`,
            html: `
              <h2>Nuevo contacto desde la página web</h2>
              <p><b>Nombre:</b> ${nombre}</p>
              <p><b>Teléfono:</b> ${telefonoLimpio}</p>
              ${correo ? `<p><b>Correo:</b> ${correo}</p>` : ""}
              ${empresa ? `<p><b>Empresa:</b> ${empresa}</p>` : ""}
              ${estado ? `<p><b>Estado:</b> ${estado}</p>` : ""}
              ${producto ? `<p><b>Necesita:</b> ${producto}</p>` : ""}
              ${mensaje ? `<p><b>Mensaje:</b> ${mensaje}</p>` : ""}
              <p style="margin-top:16px;color:#888;font-size:13px;">Ya está guardado en tu CRM, listo para darle seguimiento.</p>
            `,
          }),
        });
      } catch (e) {
        // No interrumpe la respuesta al cliente si el correo falla.
      }
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

// Crea (o reutiliza) la conversación de correo de ese cliente en Mensajes y le agrega el mensaje del formulario.
async function enviarAMensajes(headers, d) {
  const ahora = new Date().toISOString();
  const texto = [
    "📩 Formulario de la página web",
    [
      `Teléfono: ${d.telefono}`,
      d.estado ? `Estado: ${d.estado}` : null,
      d.producto ? `Necesita: ${d.producto}` : null,
      d.empresa ? `Empresa: ${d.empresa}` : null,
    ].filter(Boolean).join("\n"),
    d.mensaje || null,
  ].filter(Boolean).join("\n\n");

  const busca = await fetch(
    `${SUPABASE_URL}/rest/v1/conversaciones?canal=eq.correo&externo_id=eq.${encodeURIComponent(d.correo)}&select=id,no_leidos,datos,contact_id`,
    { headers }
  );
  const lista = await busca.json();
  let conv = Array.isArray(lista) ? lista[0] : null;
  if (!conv) {
    const crear = await fetch(`${SUPABASE_URL}/rest/v1/conversaciones`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=representation" },
      body: JSON.stringify({
        canal: "correo",
        externo_id: d.correo,
        nombre: d.nombre,
        contact_id: d.contactId,
        telefono: d.telefono,
        producto: d.producto || null,
        datos: { asunto: "Tu solicitud en Redes Deportivas RC", origen: "web" },
      }),
    });
    const creada = await crear.json();
    if (!crear.ok) throw new Error(creada.message || "No se pudo crear la conversación");
    conv = creada[0];
  }

  const msg = await fetch(`${SUPABASE_URL}/rest/v1/mensajes_canal`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      conversacion_id: conv.id,
      direccion: "entrante",
      tipo: "correo",
      texto,
      estado: "recibido",
      datos: { origen: "web" },
      created_at: ahora,
    }),
  });
  if (!msg.ok) throw new Error("No se pudo guardar el mensaje: " + (await msg.text()));

  await fetch(`${SUPABASE_URL}/rest/v1/conversaciones?id=eq.${conv.id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      contact_id: conv.contact_id || d.contactId,
      ultimo_texto: "📩 Formulario de la página web",
      ultimo_en: ahora,
      ultimo_entrante_en: ahora,
      no_leidos: (conv.no_leidos || 0) + 1,
      archivada: false,
    }),
  });
}
