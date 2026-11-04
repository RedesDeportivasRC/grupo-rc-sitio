// Cloudflare Pages: conserva las direcciones de siempre (.html) para no perder posicionamiento.
// Pages por sí solo quita el ".html" con un 308; aquí se sirve la página en su dirección .html,
// las direcciones sin .html redirigen a la versión .html y el dominio sin www redirige a www.
const DOMINIO = 'www.redesdeportivasrc.com';

// Ligas cortas para perfiles de redes: se ven limpias y conservan el origen de la visita (utm).
const CORTAS = {
  '/ig': '/?utm_source=instagram&utm_medium=social&utm_campaign=bio',
  '/fb': '/?utm_source=facebook&utm_medium=social&utm_campaign=bio',
  '/wa': '/?utm_source=whatsapp&utm_medium=mensaje&utm_campaign=whatsapp',
};
// Para una liga de una publicación o anuncio, cualquier dirección con ?utm_source=…&utm_campaign=…
// se cuenta sola en AndyControl (Marketing › Visitas de la página › Ligas). Ahí hay un armador de ligas.

export async function onRequest({ request, next, env }) {
  const url = new URL(request.url);

  if (url.hostname === 'redesdeportivasrc.com') {
    url.hostname = DOMINIO;
    return Response.redirect(url.toString(), 301);
  }

  const ruta = url.pathname;

  const corta = CORTAS[ruta.toLowerCase().replace(/\/+$/, '')];
  if (corta) return Response.redirect(new URL(corta, `https://${DOMINIO}`).toString(), 302);

  if (ruta.endsWith('.html')) {
    const limpia = new URL(url);
    limpia.pathname = ruta.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '');
    return env.ASSETS.fetch(new Request(limpia, request));
  }

  const resp = await next();
  const esPagina = (resp.headers.get('content-type') || '').includes('text/html');
  if (resp.status === 200 && esPagina && !ruta.endsWith('/') && !/\.[a-z0-9]+$/i.test(ruta)) {
    url.pathname = ruta + '.html';
    return Response.redirect(url.toString(), 301);
  }
  return resp;
}
