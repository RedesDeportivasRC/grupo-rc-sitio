// Cloudflare Pages: conserva las direcciones de siempre (.html) para no perder posicionamiento.
// Pages por sí solo quita el ".html" con un 308; aquí se sirve la página en su dirección .html,
// las direcciones sin .html redirigen a la versión .html y el dominio sin www redirige a www.
const DOMINIO = 'www.redesdeportivasrc.com';

export async function onRequest({ request, next, env }) {
  const url = new URL(request.url);

  if (url.hostname === 'redesdeportivasrc.com') {
    url.hostname = DOMINIO;
    return Response.redirect(url.toString(), 301);
  }

  const ruta = url.pathname;

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
