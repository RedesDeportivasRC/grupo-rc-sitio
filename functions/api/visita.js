// Contador propio de visitas (Reinier 2026-11-04). medicion.js manda aquí cada página vista y cada
// contacto (WhatsApp, llamada, formulario). Aquí se agrega la ciudad (la da Cloudflare por la
// conexión, no se guarda la IP) y el tipo de dispositivo, se descartan robots y se guarda en
// Supabase (tabla visitas_sitio, solo por la función registrar_visita_sitio). Se ve en AndyControl.
const SUPABASE_URL = 'https://jofotwgbbdysrywgxkwi.supabase.co';
// Llave pública (la misma que ya usa la página en common.js); solo puede agregar visitas.
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvZm90d2diYmR5c3J5d2d4a3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1ODIwNzgsImV4cCI6MjEwNDE1ODA3OH0.4vQYhfbLAu-ITdaHPga-xr5jjaV5TzZZESGVb1-tNWg';

const ROBOTS = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|lighthouse|headless|python|curl|wget|monitor/i;

function dispositivo(ua) {
  if (/ipad|tablet/i.test(ua)) return 'tableta';
  if (/mobi|android|iphone/i.test(ua)) return 'celular';
  return 'computadora';
}

export async function onRequestPost({ request, waitUntil }) {
  const ua = request.headers.get('user-agent') || '';
  if (ROBOTS.test(ua)) return new Response(null, { status: 204 });
  let d;
  try { d = await request.json(); } catch (e) { return new Response(null, { status: 204 }); }
  if (!d || typeof d !== 'object') return new Response(null, { status: 204 });

  const cf = request.cf || {};
  const fila = {
    visitante: d.visitante, sesion: d.sesion, evento: d.evento,
    ruta: d.ruta, titulo: d.titulo, fuente: d.fuente, referente: d.referente,
    utm_source: d.utm_source, utm_medium: d.utm_medium, utm_campaign: d.utm_campaign, utm_content: d.utm_content,
    ciudad: cf.city || null, region: cf.region || null, pais: cf.country || null,
    dispositivo: dispositivo(ua),
  };
  waitUntil(fetch(`${SUPABASE_URL}/rest/v1/rpc/registrar_visita_sitio`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
    body: JSON.stringify({ d: fila }),
  }).catch(() => {}));
  return new Response(null, { status: 204 });
}

export async function onRequest() {
  return new Response(null, { status: 405 });
}
