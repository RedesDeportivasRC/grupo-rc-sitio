// /api/resena.js
// Guarda las reseñas que dejan los clientes en resena.html (tabla "resenas" de Supabase)
// y entrega a la página de Clientes solo las que ya se aprobaron (aprobado = true).
// Usa la misma variable SUPABASE_SERVICE_ROLE_KEY que /api/nuevo-lead.js; la llave nunca
// llega al navegador.

const SUPABASE_URL = "https://jofotwgbbdysrywgxkwi.supabase.co";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function handler(req, res) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return res.status(500).json({ error: "Falta configurar SUPABASE_SERVICE_ROLE_KEY en este proyecto." });
  }
  const headersSupabase = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  };

  // Reseñas aprobadas para mostrarlas en la página
  if (req.method === "GET") {
    const c = String((req.query && req.query.c) || "");
    if (c) {
      if (!UUID.test(c)) return res.status(404).json({ error: "Liga no válida" });
      try {
        const r = await fetch(`${SUPABASE_URL}/rest/v1/contacts?id=eq.${c}&deleted_at=is.null&select=name`, { headers: headersSupabase });
        const d = await r.json();
        if (!r.ok || !Array.isArray(d) || !d.length) return res.status(404).json({ error: "Liga no válida" });
        return res.status(200).json({ nombre: String(d[0].name || "").trim().split(/\s+/)[0] || "" });
      } catch (e) {
        return res.status(500).json({ error: "No se pudo leer la liga." });
      }
    }
    try {
      const r = await fetch(
        `${SUPABASE_URL}/rest/v1/resenas?aprobado=eq.true&select=nombre,ciudad,estrellas,comentario,producto,created_at&order=created_at.desc&limit=100`,
        { headers: headersSupabase }
      );
      const datos = await r.json();
      res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
      return res.status(r.ok ? 200 : 500).json(r.ok ? datos : { error: "No se pudieron leer las reseñas." });
    } catch (e) {
      return res.status(500).json({ error: "No se pudieron leer las reseñas." });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { nombre, estrellas, comentario, c, sitioWeb } = req.body || {};

  // Campo trampa para robots (igual que en el formulario de contacto)
  if (sitioWeb) return res.status(200).json({ ok: true });

  const n = parseInt(estrellas, 10);
  if (!(n >= 1 && n <= 5)) return res.status(400).json({ error: "Elige de 1 a 5 estrellas." });
  const corta = (v, max) => (v ? String(v).trim().slice(0, max) : null);

  try {
    // Liga personal (?c=): el nombre sale del CRM y la reseña queda en el historial del cliente
    let contactId = null, nombreFinal = corta(nombre, 80);
    if (c && UUID.test(String(c))) {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/contacts?id=eq.${c}&deleted_at=is.null&select=id,name`, { headers: headersSupabase });
      const d = await r.json();
      if (r.ok && Array.isArray(d) && d.length) { contactId = d[0].id; nombreFinal = corta(d[0].name, 80) || nombreFinal; }
    }
    if (!nombreFinal) return res.status(400).json({ error: "Escribe tu nombre." });

    const r = await fetch(`${SUPABASE_URL}/rest/v1/resenas`, {
      method: "POST",
      headers: { ...headersSupabase, Prefer: "return=minimal" },
      body: JSON.stringify({
        nombre: nombreFinal,
        estrellas: n,
        comentario: corta(comentario, 1500),
        contact_id: contactId,
        origen: contactId ? "liga-cliente" : "liga-resena",
      }),
    });
    if (!r.ok) return res.status(500).json({ error: "No se pudo guardar tu reseña, intenta de nuevo." });

    if (contactId) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/activities`, {
          method: "POST",
          headers: headersSupabase,
          body: JSON.stringify({
            contact_id: contactId,
            type: "observacion",
            notes: `⭐ Dejó su reseña: ${"★".repeat(n)}${"☆".repeat(5 - n)}${comentario ? "\n" + corta(comentario, 1500) : ""}`,
            created_by_name: "Reseña web",
          }),
        });
      } catch (e) { /* la reseña ya quedó guardada */ }
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "No se pudo guardar tu reseña, intenta de nuevo." });
  }
}
