/* ==========================================================================
   GRUPO RC — Componentes compartidos (header, footer, tarjetas)
   Cada página incluye: <div id="site-header"></div> ... <div id="site-footer"></div>
   y este archivo los llena. Así el header/footer viven en un solo lugar.
   ========================================================================== */

function rutaBase(){
  // Detecta si la página está en /productos/... para que los links relativos
  // (assets, otras páginas) funcionen igual en cualquier nivel de carpeta.
  return document.body.dataset.nivel === 'sub' ? '../' : '';
}

// Íconos de línea en azul de marca (fortalezas, asesoría, botones).
const _sv = (d)=>`<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONOS = {
  trofeo: _sv('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3"/>'),
  camion: _sv('<path d="M2 6h12v10H2zM14 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M1 9h5M1 12h4"/>'),
  herramientas: _sv('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>'),
  escuadra: _sv('<path d="M3 21V3l18 18z"/><path d="M7 17v-4l4 4zM3 8h2M3 12h2M8 21v-2M12 21v-2"/>'),
  casco: _sv('<path d="M4 15a8 8 0 0 1 16 0"/><path d="M2 15h20v2H2zM10 7V4h4v3"/><path d="M8 17v1a4 4 0 0 0 8 0v-1"/>'),
  carrito: _sv('<path d="M3 4h2l2.4 11h11.2L21 7H6.2"/><circle cx="9" cy="19" r="1.6"/><circle cx="17" cy="19" r="1.6"/><path d="M10 10h8M11 13h6"/>'),
  red: _sv('<path d="M3 3h18v18H3z"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>'),
  precio: _sv('<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M12.5 10.5c-.4-.6-1-.9-1.8-.9-1 0-1.7.6-1.7 1.4 0 1.9 3.6 1 3.6 3 0 .8-.8 1.5-1.9 1.5-.8 0-1.5-.4-1.9-1M10.8 8.6v1M10.8 15.5v1"/>'),
  whatsapp: '<svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M16 2.7C8.6 2.7 2.7 8.6 2.7 16c0 2.4.6 4.6 1.8 6.7l-1.9 6.9 7.1-1.9c2 1.1 4.2 1.6 6.4 1.6 7.4 0 13.3-6 13.3-13.3S23.4 2.7 16 2.7zm0 24.3c-2 0-4-.5-5.7-1.6l-.4-.2-4.2 1.1 1.1-4.1-.3-.4A11 11 0 1 1 16 27z"/><path d="M22.1 18.8c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.3-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6l-1-2.5c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2.9 3.1 1 4.2.8.7-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.4z"/></svg>',
};

function renderHeader(activo){
  const base = rutaBase();
  document.getElementById('site-header').innerHTML = `
    <header class="site">
      <div class="envolvente">
        <a href="${base}index.html" class="logo"><img src="${base}assets/img/logo-160.png" class="logo-marca" alt="Grupo RC" width="58" height="58"> ${EMPRESA.nombre}</a>
        <nav class="principal">
          <div class="nav-menu">
            <a href="${base}productos.html" class="${activo==='productos'?'activo':''}">Productos <span class="flechita">▾</span></a>
            <div class="nav-sub">${CATEGORIAS.map(c=>`<a href="${urlCategoria(c.slug)}">${c.nombre}</a>`).join('')}<a href="${base}productos.html"><b>Ver todo el catálogo</b></a></div>
          </div>
          <a href="${base}clientes.html" class="${activo==='clientes'?'activo':''}">Opiniones</a>
          <a href="${base}galeria.html" class="${activo==='galeria'?'activo':''}">Galería</a>
          <a href="${base}blog.html" class="${activo==='blog'?'activo':''}">Blog</a>
          <div class="nav-menu">
            <a href="${base}recursos.html" class="${activo==='recursos'?'activo':''}">Recursos <span class="flechita">▾</span></a>
            <div class="nav-sub"><a href="${base}recursos.html">Descargas</a><a href="${base}videos.html">Videos</a><a href="${base}proyectos.html">Proyectos</a><a href="${base}contacto.html">Contacto</a></div>
          </div>
          <a href="${base}nosotros.html" class="${activo==='nosotros'?'activo':''}">Nosotros</a>
        </nav>
        <a class="btn btn-asesor" href="https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent('Hola, vi su página y quiero hablar con un asesor.')}" target="_blank" rel="noopener">${ICONOS.whatsapp} <span>Habla con un asesor</span></a>
        <button class="menu-movil-btn" id="btn-menu-movil">☰</button>
      </div>
    </header>
    <button id="btn-whatsapp-flotante" title="Escríbenos por WhatsApp" aria-label="Abrir chat de WhatsApp">
      <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff"><path d="M16.001 2.667c-7.363 0-13.334 5.97-13.334 13.333 0 2.351.615 4.646 1.782 6.666l-1.893 6.917 7.084-1.857a13.27 13.27 0 0 0 6.361 1.62h.006c7.362 0 13.333-5.971 13.333-13.334S23.363 2.667 16.001 2.667zm7.831 18.822c-.334.938-1.657 1.719-2.706 1.945-.72.153-1.66.276-4.828-1.037-4.05-1.678-6.657-5.796-6.86-6.063-.194-.267-1.646-2.192-1.646-4.182s1.036-2.968 1.404-3.375c.334-.367.729-.459.972-.459.243 0 .486.002.699.013.224.011.526-.085.822.626.334.802 1.132 2.772 1.232 2.974.1.202.166.437.033.703-.133.267-.199.433-.4.667-.2.234-.421.522-.6.7-.2.201-.408.42-.175.822.234.401 1.038 1.712 2.229 2.774 1.531 1.365 2.821 1.788 3.222 1.988.4.201.634.167.867-.1.234-.267.999-1.166 1.266-1.566.267-.401.533-.334.9-.2.367.133 2.335 1.101 2.735 1.302.4.2.667.3.767.467.1.167.1.964-.234 1.899z"/></svg>
    </button>
    <div id="whatsapp-popup" style="display:none;">
      <div class="whatsapp-popup-header">
        <img src="${base}assets/img/logo-160.png">
        <div><b>${EMPRESA.nombre}</b><span>Normalmente responde en minutos</span></div>
        <button id="whatsapp-popup-cerrar" aria-label="Cerrar">✕</button>
      </div>
      <div class="whatsapp-popup-burbuja">👋 ¡Hola! ¿En qué podemos ayudarte con tu proyecto de redes?</div>
      <textarea id="whatsapp-popup-texto" placeholder="Escribe tu mensaje..." rows="3">Hola, me interesa cotizar...</textarea>
      <button id="whatsapp-popup-enviar" class="btn btn-azul" style="width:100%;background:#25D366;">Enviar por WhatsApp</button>
    </div>
    <div id="menu-movil-overlay" style="display:none;position:fixed;inset:0;background:rgba(10,26,36,.6);z-index:200;">
      <div style="background:#fff;max-width:320px;margin-left:auto;height:100%;padding:20px;display:flex;flex-direction:column;gap:4px;overflow-y:auto;">
        <button id="btn-cerrar-menu-movil" style="align-self:flex-end;background:none;border:none;font-size:1.6rem;cursor:pointer;margin-bottom:10px;">✕</button>
        <a href="${base}index.html" style="padding:12px 4px;font-weight:700;border-bottom:1px solid var(--linea);">Inicio</a>
        <a href="${base}productos.html" style="padding:12px 4px;font-weight:700;border-bottom:1px solid var(--linea);">Productos</a>
        ${CATEGORIAS.map(c=>`<a href="${urlCategoria(c.slug)}" style="padding:9px 4px 9px 18px;font-size:.92rem;border-bottom:1px solid var(--linea);">${c.nombre}</a>`).join('')}
        <a href="${base}clientes.html" style="padding:12px 4px;font-weight:700;border-bottom:1px solid var(--linea);">Opiniones</a>
        <a href="${base}galeria.html" style="padding:12px 4px;font-weight:700;border-bottom:1px solid var(--linea);">Galería</a>
        <a href="${base}blog.html" style="padding:12px 4px;font-weight:700;border-bottom:1px solid var(--linea);">Blog</a>
        <a href="${base}recursos.html" style="padding:12px 4px;font-weight:700;border-bottom:1px solid var(--linea);">Recursos</a>
        <a href="${base}nosotros.html" style="padding:12px 4px;font-weight:700;border-bottom:1px solid var(--linea);">Nosotros</a>
        <a href="${base}contacto.html" class="btn btn-azul" style="margin-top:16px;text-align:center;">Cotiza / Contacto</a>
        <a href="tel:${EMPRESA.telefonoHref}" style="padding:12px 4px;margin-top:6px;">📞 ${EMPRESA.telefono}</a>
      </div>
    </div>
  `;
  // En pantallas táctiles (tablet) el primer toque abre el desplegable y el segundo entra a la página
  const menus = document.querySelectorAll('.nav-menu');
  menus.forEach(m=>{
    m.querySelector(':scope > a').addEventListener('click', e=>{
      if(window.matchMedia('(hover: hover)').matches || m.classList.contains('abierto')) return;
      e.preventDefault();
      menus.forEach(o=>o.classList.remove('abierto'));
      m.classList.add('abierto');
    });
  });
  document.addEventListener('click', e=>{ if(!e.target.closest('.nav-menu')) menus.forEach(o=>o.classList.remove('abierto')); });
  const btnMovil = document.getElementById('btn-menu-movil');
  const overlayMovil = document.getElementById('menu-movil-overlay');
  if(btnMovil && overlayMovil){
    btnMovil.onclick = ()=>{ overlayMovil.style.display = 'block'; };
    overlayMovil.onclick = (e)=>{ if(e.target === overlayMovil) overlayMovil.style.display = 'none'; };
    document.getElementById('btn-cerrar-menu-movil').onclick = ()=>{ overlayMovil.style.display = 'none'; };
  }

  const btnWA = document.getElementById('btn-whatsapp-flotante');
  const popupWA = document.getElementById('whatsapp-popup');
  if(btnWA && popupWA){
    btnWA.onclick = ()=>{ popupWA.style.display = popupWA.style.display === 'none' ? 'flex' : 'none'; };
    document.getElementById('whatsapp-popup-cerrar').onclick = ()=>{ popupWA.style.display = 'none'; };
    document.getElementById('whatsapp-popup-enviar').onclick = ()=>{
      const texto = document.getElementById('whatsapp-popup-texto').value.trim();
      window.open(`https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(texto)}`, '_blank');
    };
  }
}

function renderFooter(){
  const base = rutaBase();
  document.getElementById('site-footer').innerHTML = `
    <footer class="site">
      <div class="envolvente">
        <div class="footer-grid">
          <div>
            <div class="logo" style="color:#fff;margin-bottom:12px;"><img src="${base}assets/img/logo-160.png" class="logo-marca"> ${EMPRESA.nombre}</div>
            <p style="max-width:30ch;opacity:.8;">${EMPRESA.nombreLargo} — fabricación e instalación de redes perimetrales, deportivas y porterías.</p>
            <p style="margin-top:8px;font-style:italic;opacity:.65;font-size:.82rem;">"${EMPRESA.frase}"</p>
          </div>
          <div>
            <h4>Productos</h4>
            ${CATEGORIAS.slice(0,5).map(c=>`<a href="${base}productos/${c.slug}.html">${c.nombre}</a>`).join('')}
          </div>
          <div>
            <h4>Empresa</h4>
            <a href="${base}nosotros.html">Nosotros</a>
            <a href="${base}clientes.html">Opiniones</a>
            <a href="${base}blog.html">Blog</a>
          </div>
          <div>
            <h4>Recursos</h4>
            <a href="${base}galeria.html">Galería</a>
            <a href="${base}videos.html">Videos</a>
            <a href="${base}recursos.html">Descargas</a>
          </div>
          <div>
            <h4>Contacto</h4>
            <a href="tel:${EMPRESA.telefonoHref}">📞 ${EMPRESA.telefono}</a>
            <a href="https://wa.me/${EMPRESA.whatsapp}">💬 WhatsApp</a>
            <a href="mailto:${EMPRESA.correo}">✉️ ${EMPRESA.correo}</a>
            <div style="display:flex;gap:14px;margin-top:12px;">
              <a href="${EMPRESA.redes.facebook}" target="_blank" rel="noopener" title="Facebook" style="margin:0;display:inline-flex;"><svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06C2 17.08 5.66 21.23 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22C18.34 21.23 22 17.08 22 12.06z"/></svg></a>
              <a href="${EMPRESA.redes.instagram}" target="_blank" rel="noopener" title="Instagram" style="margin:0;display:inline-flex;"><svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.98c-3.14 0-3.5.01-4.74.07-1.02.05-1.58.22-1.95.36-.49.19-.84.42-1.2.79-.37.36-.6.71-.79 1.2-.14.37-.31.93-.36 1.95-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.05 1.02.22 1.58.36 1.95.19.49.42.84.79 1.2.36.37.71.6 1.2.79.37.14.93.31 1.95.36 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c1.02-.05 1.58-.22 1.95-.36.49-.19.84-.42 1.2-.79.37-.36.6-.71.79-1.2.14-.37.31-.93.36-1.95.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.05-1.02-.22-1.58-.36-1.95-.19-.49-.42-.84-.79-1.2-.36-.37-.71-.6-1.2-.79-.37-.14-.93-.31-1.95-.36-1.24-.06-1.6-.07-4.74-.07zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.98a3.02 3.02 0 100 6.04 3.02 3.02 0 000-6.04zm5.2-2.4a1.17 1.17 0 110 2.34 1.17 1.17 0 010-2.34z"/></svg></a>
              <a href="${EMPRESA.redes.youtube}" target="_blank" rel="noopener" title="YouTube" style="margin:0;display:inline-flex;"><svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M23 12s0-3.55-.45-5.26a2.9 2.9 0 00-2.04-2.05C18.8 4.24 12 4.24 12 4.24s-6.8 0-8.51.45A2.9 2.9 0 001.45 6.74C1 8.45 1 12 1 12s0 3.55.45 5.26a2.9 2.9 0 002.04 2.05c1.71.45 8.51.45 8.51.45s6.8 0 8.51-.45a2.9 2.9 0 002.04-2.05C23 15.55 23 12 23 12zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg></a>
            </div>
          </div>
        </div>
        <div class="footer-abajo">
          <span>© 2026 ${EMPRESA.nombre}. Todos los derechos reservados.</span>
          <span>${EMPRESA.estadosDondeVendemos[0]}, México</span>
        </div>
      </div>
    </footer>
  `;
}

// ---------------- Limpieza de contenido pendiente ----------------
// Mientras falten datos reales, los textos tipo "[PLACEHOLDER ...]" o "[EJEMPLO ...]" nunca se
// muestran al público: se ocultan y la tarjeta muestra el recuadro de marca en su lugar.
function esMarcador(t){
  return typeof t === 'string' && /\[(PLACEHOLDER|EJEMPLO|CONTENIDO DE EJEMPLO|otros)|^Foto pendiente$/i.test(t.trim());
}
function limpio(t){ return (t && !esMarcador(t)) ? t : null; }
function listaLimpia(a){ return (a||[]).filter(x=>x && !esMarcador(x)); }
function esUrl(t){ return typeof t === 'string' && /^https?:\/\/|^(\.\.\/)?assets\//.test(t); }

// Página a la que lleva cada categoría (no todas tienen página propia todavía).
const PAGINA_CATEGORIA = {
  'redes-perimetrales':'productos/redes-perimetrales.html',
  'redes-deportivas':'productos/redes-deportivas.html',
  'porterias':'productos/porterias.html',
  'redes-para-porterias':'productos/redes-para-porterias.html',
  'redes-de-proteccion':'productos/redes-de-proteccion.html',
  'baloneras':'productos/baloneras.html',
  'jaulas-bateo':'productos/jaulas-de-bateo.html',
  'soluciones-especiales':'contacto.html',
};
function urlCategoria(slug){ return rutaBase() + (PAGINA_CATEGORIA[slug] || 'productos.html'); }

// ---------------- Renderizadores de tarjetas (consumen data.js) ----------------
function categoriaNombre(slug){
  const c = CATEGORIAS.find(c=>c.slug===slug);
  return c ? c.nombre : slug;
}

// Muestra la foto real (con su texto alternativo para Google Imágenes) cuando ya existe
// una URL subida desde AndyControl; si todavía es un texto de marcador, muestra el cuadro
// gris de siempre. claseExtra son las mismas clases que usaba el marcador (foto-ph, oscuro...).
function fotoOMarcador(url, altDescriptivo, claseExtra=''){
  if(esUrl(url)){
    return `<img src="${url}" alt="${altDescriptivo}" loading="lazy" class="${claseExtra}" style="width:100%;height:100%;object-fit:cover;">`;
  }
  // Sin foto real: recuadro de marca con el nombre (nunca el texto del marcador).
  const etiqueta = String(altDescriptivo||'').split(/ — | \| /)[0];
  return `<div class="foto-ph ${claseExtra}"><span>${etiqueta}</span></div>`;
}

function renderProductCard(p){
  const base = rutaBase();
  const alt = `${p.nombre} — ${categoriaNombre(p.categoria)} | Grupo RC`;
  return `
    <a class="tarjeta-producto" href="${base}productos/producto.html?sku=${p.sku}">
      ${fotoOMarcador(p.fotos[0], alt)}
      <div class="tarjeta-producto-body">
        <span class="tarjeta-producto-cat">${categoriaNombre(p.categoria)}</span>
        <h3>${p.nombre}</h3>
        <p>${p.descripcionCorta}</p>
        <span class="btn btn-linea btn-chico">Ver detalle</span>
      </div>
    </a>`;
}

function renderProjectCard(pr){
  const alt = `Proyecto ${pr.nombre}${pr.ubicacion?' en '+pr.ubicacion:''} — ${pr.tipo||''} | Grupo RC`;
  return `
    <a class="tarjeta-proyecto" href="${rutaBase()}proyectos.html#${pr.slug}">
      ${fotoOMarcador(pr.fotos[0], alt, 'oscuro')}
      <div class="tarjeta-proyecto-body">
        <span>${pr.tipo}</span>
        <h3>${pr.nombre}</h3>
      </div>
    </a>`;
}

function renderBlogCard(b){
  const base = rutaBase();
  return `
    <a class="tarjeta-blog" href="${base}${b.url || 'blog.html'}">
      <div class="tarjeta-blog-foto">${b.imagen && esUrl(b.imagen) ? `<img src="${base}${b.imagen}" alt="${b.titulo}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'foto-ph'}))">` : fotoOMarcador(null, b.titulo)}
        <span class="chip-cat">${b.categoria}</span></div>
      <div class="tarjeta-blog-body">
        <h3>${b.titulo}</h3>
        <p>${b.extracto}</p>
        ${b.minutos ? `<small>📖 ${b.minutos} min de lectura</small>` : ''}
      </div>
    </a>`;
}

// "Sigue leyendo" al final de cada artículo: 3 artículos distintos al actual.
function renderRelacionados(contId, slugActual){
  const cont = document.getElementById(contId);
  if(!cont) return;
  const i = BLOG_POSTS.findIndex(b=>b.slug===slugActual);
  const otros = BLOG_POSTS.filter(b=>b.slug!==slugActual);
  const desde = Math.max(0, i) % Math.max(1, otros.length);
  cont.innerHTML = [...otros.slice(desde), ...otros.slice(0, desde)].slice(0,3).map(renderBlogCard).join('');
}

// Inicio: tarjetas de producto con foto de fondo y título encima (maqueta).
function renderProductosInicio(contId){
  const cont = document.getElementById(contId);
  if(!cont) return;
  cont.innerHTML = PRODUCTOS_INICIO.map(p=>`
    <a class="producto-foto" href="${urlCategoria(p.slug)}">
      ${p.foto ? `<img src="assets/img/${p.foto}" alt="${p.alt || p.titulo}" loading="lazy">` : '<div class="foto-ph"></div>'}
      <div class="producto-foto-texto"><h3>${p.titulo}</h3><p>${p.texto}</p></div>
      <span class="circulo-flecha" aria-hidden="true">→</span>
    </a>`).join('');
}

// Inicio: preguntas de asesoría que llevan a su artículo del blog.
function renderAsesoria(contId){
  const cont = document.getElementById(contId);
  if(!cont) return;
  cont.innerHTML = ASESORIA.map(a=>`
    <a class="asesoria-item" href="${a.url}">
      <div class="asesoria-ico">${ICONOS[a.ico]}</div>
      <b>${a.titulo}</b><span>${a.texto}</span>
    </a>`).join('');
}

// Inicio: carrusel de proyectos reales.
function renderProyectosInicio(contId){
  const cont = document.getElementById(contId);
  if(!cont) return;
  cont.innerHTML = PROYECTOS_INICIO.map(p=>`
    <div class="proyecto-tarjeta">
      <div class="proyecto-tarjeta-foto"><img src="assets/img/${p.foto}" alt="${p.alt || p.titulo}" loading="lazy"><span class="chip-cat">${p.etiqueta}</span></div>
      <div class="proyecto-tarjeta-body"><h3>${p.titulo}</h3><p>${p.texto}</p></div>
    </div>`).join('');
  agregarFlechas(cont);
}

// Flechas ‹ › debajo de una fila deslizable (solo si no caben todas las tarjetas).
function agregarFlechas(cont, autoSegundos){
  cont.parentNode.querySelector(':scope > .testimonios-nav[data-de="'+cont.id+'"]')?.remove();
  clearInterval(cont._auto);
  if(cont.scrollWidth <= cont.clientWidth + 4) return;
  const nav = document.createElement('div');
  nav.className = 'testimonios-nav'; nav.dataset.de = cont.id;
  nav.innerHTML = '<button type="button" aria-label="Anteriores">‹</button><button type="button" aria-label="Siguientes">›</button>';
  const paso = ()=> (cont.firstElementChild?.offsetWidth || 300) + 16;
  // Cuántas tarjetas se ven a la vez (3 en PC, 2 en tablet, 1 en celular)
  const visibles = ()=> Math.max(1, Math.round(cont.clientWidth / paso()));
  const detener = ()=>{ clearInterval(cont._auto); cont._auto = null; };
  nav.children[0].onclick = ()=>{ detener(); cont.scrollBy({ left:-paso(), behavior:'smooth' }); };
  nav.children[1].onclick = ()=>{ detener(); cont.scrollBy({ left: paso(), behavior:'smooth' }); };
  cont.after(nav);
  // Avance automático de grupo en grupo; se detiene para siempre en cuanto la persona toca, desliza o abre una tarjeta.
  if(autoSegundos && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    let pausa = false;
    cont.addEventListener('mouseenter', ()=> pausa = true);
    cont.addEventListener('mouseleave', ()=> pausa = false);
    ['pointerdown','wheel','touchstart','keydown'].forEach(ev=> cont.addEventListener(ev, detener, { passive:true }));
    cont._auto = setInterval(()=>{
      if(pausa || document.hidden) return;
      const final = cont.scrollLeft + cont.clientWidth >= cont.scrollWidth - 8;
      cont.scrollTo({ left: final ? 0 : cont.scrollLeft + paso()*visibles(), behavior:'smooth' });
    }, autoSegundos*1000);
  }
}

function renderClientCard(c){
  if(c.logo && /^https?:\/\//.test(c.logo)){
    return `<div class="tarjeta-cliente"><img src="${c.logo}" alt="${c.nombre} — cliente de Grupo RC" loading="lazy" style="max-width:100%;max-height:60px;object-fit:contain;"></div>`;
  }
  return `<div class="tarjeta-cliente"><span>${c.nombre}</span></div>`;
}

function renderResourceCard(r){
  const iconos = {'Catálogo':'📘','Manual':'🛠️','Ficha técnica':'📐','Guía':'📄'};
  // Si el PDF ya está subido se descarga; si no, se pide por WhatsApp y se lo mandamos.
  const liga = esUrl(r.archivo) ? r.archivo : `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent('Hola, ¿me pueden mandar el '+r.nombre.toLowerCase()+'?')}`;
  return `
    <a class="tarjeta-recurso" href="${liga}" target="_blank" rel="noopener">
      <div class="icono">${iconos[r.categoria]||'📄'}</div>
      <div><b>${r.nombre}</b><span>${r.descripcion}</span><span style="color:var(--azul);font-weight:700;margin-top:4px;">${esUrl(r.archivo)?'Descargar PDF':'Pídelo por WhatsApp →'}</span></div>
    </a>`;
}

/* ==========================================================================
   Contenido alimentado desde AndyControl (Supabase) — productos, proyectos y
   clientes reales. Si la base de datos aún no tiene nada, o falla la conexión,
   se usa el catálogo de ejemplo de data.js como respaldo, para que la página
   nunca se vea vacía.
   ========================================================================== */
const SITIO_SUPABASE_URL = "https://jofotwgbbdysrywgxkwi.supabase.co";
const SITIO_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvZm90d2diYmR5c3J5d2d4a3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1ODIwNzgsImV4cCI6MjEwNDE1ODA3OH0.4vQYhfbLAu-ITdaHPga-xr5jjaV5TzZZESGVb1-tNWg";
let _sbSitio = null;
function clienteSitio(){
  if(!_sbSitio && window.supabase) _sbSitio = supabase.createClient(SITIO_SUPABASE_URL, SITIO_SUPABASE_ANON_KEY);
  return _sbSitio;
}

function mapearProducto(p){
  return {
    sku: p.sku, nombre: p.nombre, categoria: p.categoria, subcategoria: p.subcategoria,
    descripcionCorta: p.descripcion_corta, descripcionCompleta: p.descripcion_completa,
    fotos: p.fotos||[],
    material: p.material, calibre: p.calibre, color: p.color||[], medidas: p.medidas,
    usos: p.usos||[], caracteristicas: p.caracteristicas||[], precio: p.precio,
    disponibilidad: p.disponibilidad, productosRelacionados: p.productos_relacionados||[],
    descargas: [], etiquetas: p.etiquetas||[], estado: p.activo ? 'activo' : 'inactivo',
  };
}
function mapearProyecto(p){
  return {
    slug: p.slug || p.id, nombre: p.nombre, cliente: p.cliente, ubicacion: p.ubicacion, tipo: p.tipo,
    fotos: p.fotos||[],
    descripcion: p.descripcion, productosUsados: p.productos_usados||[], fecha: p.fecha,
    categorias: p.categorias||[], video: p.video, testimonio: p.testimonio,
  };
}
function mapearCliente(c){
  return { nombre: c.nombre, logo: c.logo, sector: c.sector, ubicacion: c.ubicacion, proyectoRelacionado: c.proyecto_relacionado, testimonio: c.testimonio, fotos: [] };
}

// Quita de cualquier registro los textos de marcador: strings → null, listas → sin marcadores,
// y si no queda ninguna foto real deja [null] para que se pinte el recuadro de marca.
function sinMarcadores(o){
  const r = {};
  for(const [k,v] of Object.entries(o)){
    if(Array.isArray(v)) r[k] = k==='fotos' ? v.filter(esUrl) : listaLimpia(v);
    else r[k] = esMarcador(v) ? null : v;
  }
  if(!r.fotos || !r.fotos.length) r.fotos = [null];
  r.descripcionCorta = r.descripcionCorta || '';
  r.descripcionCompleta = r.descripcionCompleta || '';
  return r;
}

async function obtenerProductos(){
  let lista = PRODUCTOS;
  try{
    const { data, error } = await clienteSitio().from('sitio_productos').select('*').eq('activo', true).order('orden', {ascending:true});
    if(!error && data && data.length) lista = data.map(mapearProducto);
  }catch(e){}
  return lista.map(sinMarcadores);
}
async function obtenerProyectos(){
  let lista = PROYECTOS;
  try{
    const { data, error } = await clienteSitio().from('sitio_proyectos').select('*').eq('activo', true).order('orden', {ascending:true});
    if(!error && data && data.length) lista = data.map(mapearProyecto);
  }catch(e){}
  return lista.filter(p=>!esMarcador(p.nombre)).map(sinMarcadores).map(p=>({...p, tipo: p.tipo || 'Proyecto'}));
}
async function obtenerClientes(){
  let lista = CLIENTES;
  try{
    const { data, error } = await clienteSitio().from('sitio_clientes').select('*').eq('activo', true).order('orden', {ascending:true});
    if(!error && data && data.length) lista = data.map(mapearCliente);
  }catch(e){}
  return lista.filter(c=>!esMarcador(c.nombre)).map(sinMarcadores);
}

// Fotos del banner rotativo del Inicio — si todavía no hay ninguna subida, se devuelve una
// lista vacía y el Inicio muestra su cuadro de marcador de siempre, sin romperse.
async function obtenerFotosBanner(){
  try{
    const { data, error } = await clienteSitio().from('sitio_banner').select('foto').eq('activo', true).order('orden', {ascending:true});
    if(error || !data) return [];
    return data.map(f=>f.foto);
  }catch(e){ return []; }
}

// Arma un carrusel simple de fundido cruzado — nada de librerías, solo opacidad con transición.
// Rota sola cada 4.5 segundos sin parar. Si solo hay 1 foto (o ninguna), no hace falta animar nada.
function iniciarCarruselBanner(contenedorId, fotos){
  const cont = document.getElementById(contenedorId);
  if(!cont || fotos.length === 0) return;
  cont.innerHTML = fotos.map((url,i)=>
    `<img src="${url}" alt="Redes Deportivas RC — trabajo realizado" loading="${i===0?'eager':'lazy'}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;opacity:${i===0?1:0};transition:opacity 1.2s ease;">`
  ).join('');
  if(fotos.length < 2) return;
  let indice = 0;
  setInterval(()=>{
    const imgs = cont.querySelectorAll('img');
    imgs[indice].style.opacity = 0;
    indice = (indice + 1) % imgs.length;
    imgs[indice].style.opacity = 1;
  }, 4500);
}

// Envía los datos de cualquier formulario de contacto del sitio al lead-capture,
// que los guarda directo en la misma tabla que usa el CRM. Reutilizable en Inicio y Contacto.
async function enviarLeadFormulario(datos, elementosStatus){
  const { botón, status } = elementosStatus;
  if(!datos.telefono || !datos.nombre){
    status.textContent = 'Nombre y teléfono son obligatorios.';
    status.style.color = '#d9534f';
    return false;
  }
  botón.disabled = true;
  status.style.color = 'var(--gris)';
  status.textContent = 'Enviando…';
  try{
    const resp = await fetch('/api/nuevo-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    const resultado = await resp.json();
    if(!resp.ok) throw new Error(resultado.error || 'No se pudo enviar.');
    status.style.color = '#1e9e57';
    status.textContent = '✅ ¡Listo! Te contactamos pronto.';
    botón.disabled = false;
    if(window.registrarConversion) registrarConversion('formulario');
    return true;
  }catch(e){
    status.style.color = '#d9534f';
    status.textContent = '❌ ' + e.message;
    botón.disabled = false;
    return false;
  }
}

// ---------------- Banner principal a todo lo ancho ----------------
// Diapositivas con foto, texto y botón; cambian solas cada 6 s con fundido y un acercamiento
// suave. Flechas, puntos y deslizar con el dedo en celular. Se pausa si la pestaña no se ve.
function iniciarHeroSlider(contId, slides){
  const cont = document.getElementById(contId);
  if(!cont || !slides.length) return;
  const base = rutaBase();
  cont.innerHTML = slides.map((s,i)=>`
    <div class="hs-slide${i===0?' activo':''}" aria-hidden="${i!==0}">
      ${s.foto ? `<img class="hs-foto" src="${base}assets/img/trabajos/${s.foto}" alt="${s.alt || s.ojo}" ${i===0?'fetchpriority="high"':'loading="lazy"'}>` : '<div class="hs-sin-foto"></div>'}
      <div class="hs-velo"></div>
      <div class="hs-texto">
        <span class="ojo">${s.ojo}</span>
        ${i===0?'<h1>':'<h2>'}${s.titulo}${i===0?'</h1>':'</h2>'}
        <p>${s.texto}</p>
        <div class="hs-botones">
          <a href="https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent('Hola, vi su página y quiero cotizar.')}" target="_blank" rel="noopener" class="btn btn-wa">💬 Cotizar por WhatsApp</a>
          <a href="${/^(tel:|https?:)/.test(s.boton.url) ? s.boton.url : base+s.boton.url}" class="btn btn-linea" style="color:#fff;">${s.boton.texto}</a>
        </div>
      </div>
    </div>`).join('') + `
    <button class="hs-flecha ant" aria-label="Anterior">‹</button>
    <button class="hs-flecha sig" aria-label="Siguiente">›</button>
    <div class="hs-puntos">${slides.map((_,i)=>`<button aria-label="Ir a la diapositiva ${i+1}" class="${i===0?'activo':''}"></button>`).join('')}</div>`;

  const items = cont.querySelectorAll('.hs-slide');
  const puntos = cont.querySelectorAll('.hs-puntos button');
  let actual = 0, timer = null;
  function ir(n){
    items[actual].classList.remove('activo'); items[actual].setAttribute('aria-hidden','true'); puntos[actual].classList.remove('activo');
    actual = (n + items.length) % items.length;
    items[actual].classList.add('activo'); items[actual].setAttribute('aria-hidden','false'); puntos[actual].classList.add('activo');
    reiniciar();
  }
  function reiniciar(){ clearInterval(timer); timer = setInterval(()=>{ if(!document.hidden) ir(actual+1); }, 6000); }
  cont.querySelector('.hs-flecha.ant').onclick = ()=>ir(actual-1);
  cont.querySelector('.hs-flecha.sig').onclick = ()=>ir(actual+1);
  puntos.forEach((p,i)=>p.onclick = ()=>ir(i));
  let x0 = null;
  cont.addEventListener('touchstart', e=>{ x0 = e.touches[0].clientX; }, {passive:true});
  cont.addEventListener('touchend', e=>{
    if(x0===null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if(Math.abs(dx) > 45) ir(actual + (dx < 0 ? 1 : -1));
  });
  reiniciar();
}

function renderFortalezas(contId){
  const cont = document.getElementById(contId);
  if(cont) cont.innerHTML = FORTALEZAS.map(f=>`<div class="fortaleza"><div class="ico">${ICONOS[f.ico] || f.ico}</div><b>${f.titulo}</b><span>${f.texto}</span></div>`).join('');
}

// Comentarios reales de clientes (TESTIMONIOS en data.js). En el sitio publicado, si no hay
// ninguno la sección se oculta; en la vista previa muestra tarjetas de muestra del formato.
// Mapa de Google con la ubicación del taller (sin llave de API) + botón "Cómo llegar".
function renderMapa(contId){
  const cont = document.getElementById(contId);
  if(!cont || !EMPRESA.mapaBusqueda) return;
  cont.innerHTML = `
    <div class="mapa-rc">
      <iframe title="Ubicación de Redes Deportivas RC en Google Maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
        src="https://maps.google.com/maps?q=${encodeURIComponent(EMPRESA.mapaBusqueda)}&z=16&output=embed"></iframe>
      <div class="mapa-rc-pie">
        <div><b>Redes Deportivas RC</b><span>${EMPRESA.direccion}</span></div>
        <a class="btn btn-azul btn-chico" href="${EMPRESA.mapaUrl}" target="_blank" rel="noopener">📍 Cómo llegar</a>
      </div>
    </div>`;
}

function renderTestimonios(contId, seccionId, soloInicio){
  const cont = document.getElementById(contId);
  if(!cont) return;
  const iconoFb = '<svg width="13" height="13" viewBox="0 0 24 24" fill="#1877F2"><path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06C2 17.08 5.66 21.23 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22C18.34 21.23 22 17.08 22 12.06z"/></svg>';
  const iconoG = '<svg width="13" height="13" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z"/><path fill="#34A853" d="M12 23c3 0 5.4-1 7.2-2.7l-3.5-2.7c-1 .7-2.2 1-3.7 1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.2a11 11 0 0 0 0 9.8l3.6-2.8z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.6l3.1-3.1A11 11 0 0 0 2.2 7.1l3.6 2.8C6.7 7.3 9.1 5.4 12 5.4z"/></svg>';
  const lista = TESTIMONIOS.filter(t => !soloInicio || t.inicio);
  if(!lista.length){ const sec = document.getElementById(seccionId); if(sec) sec.style.display = 'none'; return; }
  cont.innerHTML = lista.map(t=>`
    <div class="testimonio">
      <div class="testimonio-cuerpo">
        ${t.fuente==='google' ? '<div class="testimonio-estrellas" aria-label="5 estrellas en Google">★★★★★</div>' : ''}
        <p>${t.texto}</p>
        <button type="button" class="testimonio-mas" hidden>Ver más</button>
      </div>
      <div class="testimonio-pie">
        <div class="testimonio-avatar">${t.nombre.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
        <div><b>${t.nombre}</b><small>${t.fuente==='google' ? iconoG+' Opinión en Google' : iconoFb+' Recomienda a Redes Deportivas RC'}${t.lugar?' · '+t.lugar:''}</small></div>
      </div>
    </div>`).join('');
  // "Ver más" solo en los comentarios que no caben en 3 líneas
  cont.querySelectorAll('.testimonio').forEach(card=>{
    const p = card.querySelector('p'), btn = card.querySelector('.testimonio-mas');
    if(p.scrollHeight > p.clientHeight + 2) btn.hidden = false;
    btn.addEventListener('click', ()=>{ btn.textContent = card.classList.toggle('abierto') ? 'Ver menos' : 'Ver más'; });
  });
  agregarFlechas(cont, 9);
  const resumen = document.getElementById(contId+'-resumen');
  if(resumen && typeof RESUMEN_OPINIONES !== 'undefined'){
    resumen.innerHTML = `${iconoFb} <b>Recomendado por el ${RESUMEN_OPINIONES.facebookPct}%</b> en Facebook · ${RESUMEN_OPINIONES.facebookTotal} opiniones`;
  }
}

// Animación de entrada: los elementos de un contenedor aparecen uno por uno (o en orden aleatorio) al llegar a ellos.
function revelar(cont, aleatorio){
  if(typeof cont === 'string') cont = document.getElementById(cont);
  if(!cont || !cont.children.length) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const items = [...cont.children];
  items.forEach(el=>{ el.classList.remove('rv-in'); el.classList.add('rv'); if(aleatorio) el.classList.add('rv-zoom'); });
  const orden = items.map((_,i)=>i);
  if(aleatorio) for(let i=orden.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [orden[i],orden[j]]=[orden[j],orden[i]]; }
  const obs = new IntersectionObserver(entradas=>{
    if(!entradas.some(e=>e.isIntersecting)) return;
    obs.disconnect();
    orden.forEach((idx,k)=>{ const el = items[idx]; el.style.transitionDelay = Math.round(k*Math.min(aleatorio?110:140, 2200/items.length))+'ms'; requestAnimationFrame(()=> el.classList.add('rv-in')); });
  }, { threshold:0, rootMargin:'0px 0px -80px 0px' });
  obs.observe(cont);
}

// Página de producto: artículos del blog que hablan de ese producto (los marcados 'todos' salen en todas).
function renderBlogProducto(contId, slugProducto){
  const cont = document.getElementById(contId);
  if(!cont) return;
  const lista = BLOG_POSTS.filter(b=> b.productos==='todos' || (b.productos||[]).includes(slugProducto));
  // primero los específicos del producto, luego los generales
  lista.sort((a,b)=> (a.productos==='todos') - (b.productos==='todos'));
  cont.innerHTML = lista.slice(0,6).map(renderBlogCard).join('');
}

// Página de producto: el resto de los productos, con la misma tarjeta del inicio.
function renderMasProductos(contId, slugActual){
  const cont = document.getElementById(contId);
  if(!cont) return;
  const base = rutaBase();
  cont.innerHTML = CATEGORIAS.filter(c=>c.slug!==slugActual && PAGINA_CATEGORIA[c.slug] && !PAGINA_CATEGORIA[c.slug].startsWith('contacto')).map(c=>`
    <a class="producto-foto" href="${urlCategoria(c.slug)}">
      ${c.foto ? `<img src="${base}assets/img/trabajos/${c.foto}" alt="${c.nombre}" loading="lazy">` : '<div class="foto-ph"></div>'}
      <div class="producto-foto-texto"><h3>${c.nombre}</h3><p>${c.descripcionCorta}</p></div>
      <span class="circulo-flecha" aria-hidden="true">→</span>
    </a>`).join('');
}
