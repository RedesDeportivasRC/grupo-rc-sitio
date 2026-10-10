// /api/resena.js
// Guarda las reseñas que dejan los clientes en resena.html (tabla "resenas" de Supabase)
// y entrega a la página de Clientes solo las que ya se aprobaron (aprobado = true).
// Usa la misma variable SUPABASE_SERVICE_ROLE_KEY que /api/nuevo-lead.js; la llave nunca
// llega al navegador.

const SUPABASE_URL = "https://jofotwgbbdysrywgxkwi.supabase.co";

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

  const { nombre, ciudad, estrellas, comentario, producto, telefono, sitioWeb } = req.body || {};

  // Campo trampa para robots (igual que en el formulario de contacto)
  if (sitioWeb) return res.status(200).json({ ok: true });

  const n = parseInt(estrellas, 10);
  if (!nombre || !String(nombre).trim() || !(n >= 1 && n <= 5)) {
    return res.status(400).json({ error: "Escribe tu nombre y elige de 1 a 5 estrellas." });
  }
  const corta = (v, max) => (v ? String(v).trim().slice(0, max) : null);

  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/resenas`, {
      method: "POST",
      headers: { ...headersSupabase, Prefer: "return=minimal" },
      body: JSON.stringify({
        nombre: corta(nombre, 80),
        ciudad: corta(ciudad, 80),
        estrellas: n,
        comentario: corta(comentario, 1500),
        producto: corta(producto, 80),
        telefono: telefono ? String(telefono).replace(/\D/g, "").slice(0, 15) : null,
      }),
    });
    if (!r.ok) return res.status(500).json({ error: "No se pudo guardar tu reseña, intenta de nuevo." });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "No se pudo guardar tu reseña, intenta de nuevo." });
  }
}
