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
        type: "nota",
        notes: partesNota,
        created_by_name: "Formulario web",
      }),
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
