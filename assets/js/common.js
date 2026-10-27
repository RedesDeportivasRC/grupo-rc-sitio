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
  tarjeta: _sv('<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19M6 15h4"/>'),
  reloj: _sv('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  carrito: _sv('<path d="M3 4h2l2.4 11h11.2L21 7H6.2"/><circle cx="9" cy="19" r="1.6"/><circle cx="17" cy="19" r="1.6"/><path d="M10 10h8M11 13h6"/>'),
  red: _sv('<path d="M3 3h18v18H3z"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>'),
  precio: _sv('<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M12.5 10.5c-.4-.6-1-.9-1.8-.9-1 0-1.7.6-1.7 1.4 0 1.9 3.6 1 3.6 3 0 .8-.8 1.5-1.9 1.5-.8 0-1.5-.4-1.9-1M10.8 8.6v1M10.8 15.5v1"/>'),
  whatsapp: '<svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M16 2.7C8.6 2.7 2.7 8.6 2.7 16c0 2.4.6 4.6 1.8 6.7l-1.9 6.9 7.1-1.9c2 1.1 4.2 1.6 6.4 1.6 7.4 0 13.3-6 13.3-13.3S23.4 2.7 16 2.7zm0 24.3c-2 0-4-.5-5.7-1.6l-.4-.2-4.2 1.1 1.1-4.1-.3-.4A11 11 0 1 1 16 27z"/><path d="M22.1 18.8c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.3-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6l-1-2.5c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2.9 3.1 1 4.2.8.7-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.4z"/></svg>',
};

// Bloque de marca (Reinier 2026-10-11): logo + GRUPO RC + eslogan, siempre juntos.
// Eslogan = 35% del tamaño del nombre; en dos líneas solo se parte por frase.
function marcaRC(base, clase=''){
  return `<img src="${base}assets/img/logo-160.png" alt="Grupo RC" width="74" height="74"><span class="marca-txt"><span class="marca-nombre">GRUPO <b>RC</b></span><span class="marca-esl"><span>Déjate atrapar</span> <span class="esl-1">por nuestras redes</span><span class="esl-2">Por nuestras redes</span></span></span>`;
}

function renderHeader(activo){
  const base = rutaBase();
  document.getElementById('site-header').innerHTML = `
    <header class="site">
      <div class="envolvente">
        <a href="${base}index.html" class="marca-rc marca-cabeza" aria-label="Grupo RC, inicio">${marcaRC(base)}</a>
        <nav class="principal">
          <div class="nav-menu">
            <a href="${base}productos.html" class="${activo==='productos'?'activo':''}">Productos <span class="flechita">▾</span></a>
            <div class="nav-sub">${CATEGORIAS.map(c=>`<a href="${urlCategoria(c.slug)}">${c.nombre}</a>`).join('')}<a href="${base}productos.html"><b>Ver todo el catálogo</b></a></div>
          </div>
          <a href="${base}clientes.html" class="${activo==='clientes'?'activo':''}">Clientes</a>
          <a href="${base}galeria.html" class="${activo==='galeria'?'activo':''}">Galería</a>
          <a href="${base}eventos.html" class="${activo==='eventos'?'activo':''}">Eventos</a>
          <a href="${base}blog.html" class="${activo==='blog'?'activo':''}">Blog</a>
          <div class="nav-menu">
            <a href="${base}recursos.html" class="${activo==='recursos'?'activo':''}">Recursos <span class="flechita">▾</span></a>
            <div class="nav-sub"><a href="${base}recursos.html">Descargas</a><a href="${base}videos.html">Videos</a><a href="${base}clientes.html">Proyectos</a><a href="${base}contacto.html">Contacto</a></div>
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
    <div id="menu-movil-overlay" style="display:none;">
      <div class="mm-panel">
        <div class="mm-cabeza">
          <a href="${base}index.html" class="marca-rc dos marca-mm" aria-label="Grupo RC, inicio">${marcaRC(base)}</a>
          <button id="btn-cerrar-menu-movil" aria-label="Cerrar menú">✕</button>
        </div>
        <a href="${base}index.html" class="mm-item">Inicio</a>
        <div class="mm-grupo">
          <div class="mm-fila"><a href="${base}productos.html" class="mm-item">Productos</a><button type="button" class="mm-flecha" aria-label="Ver productos" aria-expanded="false"></button></div>
          <div class="mm-lista">${CATEGORIAS.map(c=>`<a href="${urlCategoria(c.slug)}" class="mm-sub">${c.nombre}</a>`).join('')}</div>
        </div>
        <a href="${base}clientes.html" class="mm-item">Clientes</a>
        <a href="${base}galeria.html" class="mm-item">Galería</a>
        <a href="${base}eventos.html" class="mm-item">Eventos</a>
        <a href="${base}blog.html" class="mm-item">Blog</a>
        <div class="mm-grupo">
          <div class="mm-fila"><a href="${base}recursos.html" class="mm-item">Recursos</a><button type="button" class="mm-flecha" aria-label="Ver recursos" aria-expanded="false"></button></div>
          <div class="mm-lista"><a href="${base}recursos.html" class="mm-sub">Descargas</a><a href="${base}videos.html" class="mm-sub">Videos</a><a href="${base}clientes.html" class="mm-sub">Proyectos</a></div>
        </div>
        <a href="${base}nosotros.html" class="mm-item">Nosotros</a>
        <a href="${base}contacto.html" class="btn btn-azul mm-cta">Cotiza / Contacto</a>
        <a href="tel:${EMPRESA.telefonoHref}" class="mm-tel">📞 ${EMPRESA.telefono}</a>
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
    const cerrarGrupos = ()=> overlayMovil.querySelectorAll('.mm-grupo').forEach(g=>{ g.classList.remove('abierto'); g.querySelector('.mm-flecha').setAttribute('aria-expanded','false'); });
    overlayMovil.querySelectorAll('.mm-flecha').forEach(f=> f.onclick = ()=>{
      const g = f.closest('.mm-grupo'); const abrir = !g.classList.contains('abierto');
      g.classList.toggle('abierto', abrir); f.setAttribute('aria-expanded', abrir);
    });
    btnMovil.onclick = ()=>{ cerrarGrupos(); overlayMovil.style.display = 'block'; };
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

// Redes sociales: logotipos oficiales a color de cada marca (trazos de Simple Icons, CC0).
const LOGO_RED = {
  facebook: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#fff"/><path fill="#0866FF" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><defs><radialGradient id="ig-grad" cx="0.3" cy="1.07" r="1.3"><stop offset="0" stop-color="#FFDD55"/><stop offset=".1" stop-color="#FFDD55"/><stop offset=".5" stop-color="#FF543E"/><stop offset="1" stop-color="#C837AB"/></radialGradient><linearGradient id="ig-grad2" x1="0" y1="0" x2=".5" y2=".5"><stop offset="0" stop-color="#3771C8"/><stop offset="1" stop-color="#3771C8" stop-opacity="0"/></linearGradient></defs><rect width="24" height="24" rx="6" fill="url(#ig-grad)"/><rect width="24" height="24" rx="6" fill="url(#ig-grad2)"/><path fill="#fff" transform="translate(4.2 4.2) scale(.65)" d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" fill="#fff"/><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#000"/><g transform="translate(4.2 4.2) scale(.65)"><path fill="#25F4EE" transform="translate(-.9 -.9)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/><path fill="#FE2C55" transform="translate(.9 .9)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/><path fill="#fff" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></g></svg>`,
};
const REDES_SOCIALES = [
  { clave:'facebook',  nombre:'Facebook' },
  { clave:'instagram', nombre:'Instagram' },
  { clave:'youtube',   nombre:'YouTube' },
  { clave:'tiktok',    nombre:'TikTok' },
];
function htmlRedesSociales(conNombre=false){
  return `<div class="redes-sociales${conNombre?' con-nombre':''}">${REDES_SOCIALES.filter(r=>EMPRESA.redes[r.clave]).map(r=>
    `<a class="red-social red-${r.clave}" href="${EMPRESA.redes[r.clave]}" target="_blank" rel="noopener" title="${r.nombre}" aria-label="Síguenos en ${r.nombre}"><span class="red-logo">${LOGO_RED[r.clave]}</span>${conNombre?`<span class="red-nombre">${r.nombre}</span>`:''}</a>`).join('')}</div>`;
}

function renderFooter(){
  const base = rutaBase();
  document.getElementById('site-footer').innerHTML = `
    <footer class="site">
      <div class="envolvente">
        <div class="footer-grid">
          <div class="f-marca">
            <div class="marca-rc osc marca-pie">${marcaRC(base)}</div>
            <p style="max-width:30ch;opacity:.8;">${EMPRESA.nombreLargo} — fabricación e instalación de redes perimetrales, deportivas y porterías.</p>
          </div>
          <div class="f-prod">
            <h4>Productos</h4>
            <div class="fpp-lista">${CATEGORIAS.map(c=>`<a class="fpp" href="${base}productos/${c.slug}.html">${ICONOS_PRODUCTO[c.slug]||''}${c.nombre}</a>`).join('')}</div>
          </div>
          <div class="f-emp">
            <h4>Empresa</h4>
            <a href="${base}nosotros.html">Nosotros</a>
            <a href="${base}clientes.html">Clientes</a>
            <a href="${base}blog.html">Blog</a>
            <a href="${base}eventos.html">Eventos</a>
          </div>
          <div class="f-rec">
            <h4>Recursos</h4>
            <a href="${base}galeria.html">Galería</a>
            <a href="${base}videos.html">Videos</a>
            <a href="${base}recursos.html">Descargas</a>
          </div>
          <div class="f-cont">
            <h4>Contacto</h4>
            <a href="tel:${EMPRESA.telefonoHref}">📞 ${EMPRESA.telefono}</a>
            <a href="https://wa.me/${EMPRESA.whatsapp}">💬 WhatsApp</a>
            <a href="mailto:${EMPRESA.correo}">✉️ ${EMPRESA.correo}</a>
            <div class="f-redes-titulo">Síguenos</div>
            ${htmlRedesSociales()}
          </div>
        </div>
        <div class="footer-pagos" aria-label="Formas de pago">
          <h4>Aceptamos</h4>
          <div class="fpp-lista">${FORMAS_PAGO.map(f=>`<span class="fpp">${f.ico}${f.t}</span>`).join('')}</div>
          <div class="fp-logos">${LOGOS_TARJETAS()}${logoPago('oxxo','OXXO')}${logoPago('mercadopago','Mercado Pago')}</div>
        </div>
        <div class="footer-abajo">
          <span>© 2026 ${EMPRESA.nombre}. Todos los derechos reservados.</span>
          <span>${EMPRESA.estadosDondeVendemos[0]}, México</span>
        </div>
      </div>
    </footer>
  `;
}

// Formas de pago (Reinier 2026-10-27): que el cliente sepa que hay muchas formas de pagar.
// Se dibuja en cada [data-formas-pago] y como franja en el pie de todas las páginas.
// PROFECO: nunca decir "sin intereses"; la comisión de Mercado Pago se ve desglosada antes de pagar.
const _pg = (d)=>`<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
// Íconos de productos para el pie (mismo estilo que "Aceptamos")
const ICONOS_PRODUCTO = {
  'redes-perimetrales': _pg('<path d="M4 3v18M20 3v18M4 7l16 10M4 17l16-10M4 12h16"/>'),
  'porterias': _pg('<path d="M3 20V6h18v14M3 6l3 4h12l3-4M6 10v10M18 10v10"/>'),
  'redes-para-porterias': _pg('<path d="M8 3.5l4-2 4 2v4l-4 2-4-2zM4 11.5l4-2 4 2v4l-4 2-4-2zM12 11.5l4-2 4 2v4l-4 2-4-2z"/>'),
  'redes-deportivas': _pg('<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5c-2.5 3-2.5 14 0 17M3.8 10c4-1 12.4-1 16.4 0M5 16.5c4.5-2 9.5-2 14 0"/>'),
  'baloneras': _pg('<path d="M7 7h10l2 13H5zM9 7a3 3 0 016 0M7.5 12h9M8 16h8"/>'),
  'jaulas-bateo': _pg('<path d="M5 19L17 7c1.5-1.5 3-1 3-1s.5 1.5-1 3L7 21zM4 20l2 2"/><circle cx="7" cy="6" r="2.5"/>'),
  'redes-de-proteccion': _pg('<path d="M12 3l8 3v6c0 4.5-3.5 7.5-8 9-4.5-1.5-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-4.5"/>'),
};
const FORMAS_PAGO = [
  { ico: _pg('<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19M6 15h4"/>'), t: 'Tarjeta de crédito', s: 'Visa, Mastercard y más' },
  { ico: _pg('<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4M7.5 14h2M11 14h2M14.5 14h2M7.5 17.5h2"/>'), t: 'Pagos a meses', s: 'Con tarjeta de crédito participante' },
  { ico: _pg('<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/>'), t: 'Efectivo en OXXO', s: 'Con una referencia de pago' },
  { ico: _pg('<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>'), t: 'Transferencia SPEI', s: 'Sin comisión, desde tu banco' },
  { ico: _pg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'), t: 'Pago diferido', s: 'Apartas con 50% y liquidas antes del envío' },
];
// Versión corta (Reinier 2026-10-27: "mensaje corto", estilo franja de tienda): una línea con las formas de pago.
// Solo informativa, sin botón: quita miedos, no presiona (Reinier 2026-10-27).
function renderFormasPago(){
  document.querySelectorAll('[data-formas-pago]').forEach(el=>{
    el.innerHTML = `
      <section class="formas-pago" aria-label="Formas de pago">
        <div class="envolvente fp-banda">
          <span class="fp-ico">${FORMAS_PAGO[0].ico}</span>
          <p class="fp-texto"><b>Aceptamos tarjetas de crédito</b> <span>Paga a mensualidades fijas hasta en 18 meses, en pago diferido o en efectivo en OXXO.</span></p>
          <span class="fp-logos">${LOGOS_TARJETAS()}${logoPago('oxxo','OXXO')}${logoPago('mercadopago','Mercado Pago')}</span>
        </div>
      </section>`;
  });
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderFormasPago); else renderFormasPago();

// Barra de pagos que gira (Reinier 2026-10-27): va después del banner de cada página, no hasta arriba.
// Sin "sin intereses": las mensualidades llevan recargo (Profeco).
// Logotipos de pago (assets/img/pagos): Visa, Mastercard y AmEx son las que acepta Mercado Pago en México.
// OXXO es el logotipo original que mandó Reinier (PNG).
function logoPago(n, alt){ const ext = n==='oxxo' ? 'png' : 'svg'; return `<img class="logo-pago${n==='oxxo'?' logo-oxxo':''}" src="${rutaBase()}assets/img/pagos/${n}.${ext}?v=2" alt="${alt}" height="30" loading="lazy">`; }
const LOGOS_TARJETAS = ()=> logoPago('visa','Visa') + logoPago('mastercard','Mastercard') + logoPago('amex','American Express');
// Íconos de la barra (propuesta de Reinier 2026-10-27): línea blanca con detalle en azul de marca.
const _bp = (d)=>`<svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONOS_BARRA = {
  calendario: _bp('<rect x="4" y="6" width="24" height="22" rx="3"/><path d="M10 3v6M22 3v6M4 12h24"/><g fill="#2bbdf3" stroke="none"><rect x="8" y="15" width="4" height="3.5" rx=".8"/><rect x="14" y="15" width="4" height="3.5" rx=".8"/><rect x="20" y="15" width="4" height="3.5" rx=".8"/><rect x="8" y="21" width="4" height="3.5" rx=".8"/><rect x="14" y="21" width="4" height="3.5" rx=".8"/></g>'),
  apartado: `<svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><circle cx="16" cy="16" r="13" fill="#0a1a24" stroke="#fff" stroke-width="2"/><path d="M16 3a13 13 0 0 1 0 26z" fill="#2bbdf3"/><text x="16" y="19.6" font-family="Arial,Helvetica,sans-serif" font-size="10" font-weight="800" fill="#fff" stroke="#0a1a24" stroke-width="2.2" paint-order="stroke" text-anchor="middle">50%</text></svg>`,
  tarjeta: _bp('<rect x="3" y="7" width="26" height="18" rx="3"/><path d="M8 19h8" stroke="#2bbdf3" stroke-width="2.6"/>'),
  tienda: _bp('<path d="M5 13v14h22V13"/><path d="M13 27v-7h6v7"/><path d="M4 8l2-4h20l2 4z"/><path d="M4 8v2a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0V8" stroke="#2bbdf3"/>'),
  candado: _bp('<rect x="6" y="14" width="20" height="14" rx="3"/><path d="M10 14v-4a6 6 0 0 1 12 0v4"/><circle cx="16" cy="20" r="2" fill="#2bbdf3" stroke="none"/><path d="M16 21.5v3" stroke="#2bbdf3"/>'),
};
const AVISOS_PAGO = [ // orden de Reinier 2026-10-27: casi solo se ven los dos primeros
  { ico:'candado', t:'Pago seguro con Mercado Pago', logos:()=>logoPago('mercadopago','Mercado Pago') },
  { ico:'tarjeta', t:'Aceptamos tarjetas de crédito', logos:()=>LOGOS_TARJETAS() },
  { ico:'tienda', t:'Paga en efectivo en OXXO', logos:()=>logoPago('oxxo','OXXO') },
  { ico:'calendario', t:'Mensualidades fijas', hl:'hasta 18 meses' },
  { ico:'apartado', t:'Aparta con 50%', hl:'liquida antes del envío' },
];
function renderBarraPagos(){
  if(document.querySelector('.barra-pagos')) return;
  const banners = document.querySelectorAll('.hero-slider, .hero-interior, .pi-hero, .ev-hero, .lp-hero, .articulo-portada');
  const ancla = banners.length ? banners[banners.length-1] : document.getElementById('site-header');
  if(!ancla) return;
  const fila = AVISOS_PAGO.map(a=>`<span class="bp-item"><span class="bp-ico">${ICONOS_BARRA[a.ico]}</span><span class="bp-txt">${a.t}${a.hl ? ` · <em>${a.hl}</em>` : ''}</span>${a.logos ? `<span class="bp-logos">${a.logos()}</span>` : ''}</span>`).join('');
  ancla.insertAdjacentHTML('afterend', `
    <div class="barra-pagos" role="region" aria-label="Formas de pago">
      <p class="bp-solo-lector">Mensualidades fijas, hasta 18 meses. Aparta con 50% y liquida antes del envío. Aceptamos tarjetas de crédito Visa, Mastercard y American Express. Paga en efectivo en OXXO. Pago seguro con Mercado Pago.</p>
      <div class="bp-pista" aria-hidden="true"><div class="bp-fila">${fila}</div><div class="bp-fila">${fila}</div></div>
    </div>`);
  moverBarraPagos(ancla.nextElementSibling);
}
// Movimiento de la barra (Reinier 2026-10-27): gira sola; con el dedo o el mouse se detiene y se arrastra,
// y al soltar sigue su recorrido. Con "reducir movimiento" queda fija (CSS).
function moverBarraPagos(barra){
  if(!barra || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const pista = barra.querySelector('.bp-pista'), fila = pista.querySelector('.bp-fila');
  const VELOCIDAD = 140; // px por segundo
  let x = 0, ancho = fila.offsetWidth, arrastrando = false, encima = false, ultimoX = 0, antes = performance.now();
  addEventListener('resize', ()=>{ ancho = fila.offsetWidth; });
  barra.querySelectorAll('img').forEach(i=>i.draggable = false);
  function paso(t){
    const dt = Math.min((t - antes) / 1000, 0.1); antes = t;
    if(!arrastrando && !encima && !document.hidden) x -= VELOCIDAD * dt;
    ancho = fila.offsetWidth || ancho;
    if(ancho){ x %= ancho; if(x > 0) x -= ancho; }
    pista.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(paso);
  }
  requestAnimationFrame(paso);
  barra.addEventListener('pointerdown', e=>{ arrastrando = true; ultimoX = e.clientX; barra.classList.add('bp-agarrada'); try{ barra.setPointerCapture(e.pointerId); }catch(_){} });
  barra.addEventListener('pointermove', e=>{ if(!arrastrando) return; x += e.clientX - ultimoX; ultimoX = e.clientX; });
  const soltar = ()=>{ arrastrando = false; barra.classList.remove('bp-agarrada'); };
  barra.addEventListener('pointerup', soltar); barra.addEventListener('pointercancel', soltar);
  barra.addEventListener('mouseenter', ()=>{ encima = true; }); barra.addEventListener('mouseleave', ()=>{ encima = false; });
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderBarraPagos); else renderBarraPagos();

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
    <a class="tarjeta-proyecto" href="${rutaBase()}clientes.html">
      ${fotoOMarcador(pr.fotos[0], alt, 'oscuro')}
      <div class="tarjeta-proyecto-body">
        <span>${pr.tipo}</span>
        <h3>${pr.nombre}</h3>
      </div>
    </a>`;
}

// Señales en las tarjetas (Reinier 2026-10-17): "🔥 Más leído" lo marca Reinier/Claude con masLeido:true en BLOG_POSTS
// (mientras no haya historial de visitas se elige el que más vende); "Nuevo" sale solo los primeros 5 días.
function etiquetaBlog(b){
  if(b.masLeido) return '<span class="chip-estado leido">🔥 Más leído</span>';
  const f = b.publicar || b.fecha;
  if(f && (Date.now() - new Date(f.length > 10 ? f + '-06:00' : f + 'T12:00:00-06:00')) < 5 * 864e5) return '<span class="chip-estado nuevo">✨ Nuevo</span>';
  return '';
}
function renderBlogCard(b){
  const base = rutaBase();
  return `
    <a class="tarjeta-blog" href="${base}${b.url || 'blog.html'}">
      <div class="tarjeta-blog-foto">${b.imagen && esUrl(b.imagen) ? `<img src="${base}${b.imagen}" alt="${b.titulo}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'foto-ph'}))">` : fotoOMarcador(null, b.titulo)}
        <span class="chip-cat">${b.categoria}</span>${etiquetaBlog(b)}</div>
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
    const resp = await fetch('https://jofotwgbbdysrywgxkwi.supabase.co/functions/v1/sitio-api/nuevo-lead', {
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
    mostrarFormularioEnviado(botón.closest('form'), datos.nombre);
    return true;
  }catch(e){
    status.style.color = '#d9534f';
    status.textContent = '❌ ' + e.message;
    botón.disabled = false;
    return false;
  }
}

// Al enviar, el formulario se cambia por una tarjeta grande de confirmación (Reinier 2026-10-24:
// el "Listo" chiquito abajo no se notaba y parecía que no se había mandado).
function mostrarFormularioEnviado(form, nombre){
  if(!form) return;
  const previo = form.parentNode.querySelector('.form-enviado');
  if(previo) previo.remove();
  const primerNombre = String(nombre || '').trim().split(/\s+/)[0].replace(/[<>&"']/g, '');
  const card = document.createElement('div');
  card.className = 'form-enviado';
  card.setAttribute('role', 'status');
  card.innerHTML = `<div class="form-enviado-ico" aria-hidden="true">✓</div>
    <h3>¡Mensaje enviado${primerNombre ? ', ' + primerNombre : ''}!</h3>
    <p>Recibimos tus datos. Un asesor te escribe por WhatsApp muy pronto.</p>
    <div class="form-enviado-botones">
      <a class="btn btn-wa" href="https://wa.me/529995538184?text=Hola%2C%20acabo%20de%20mandar%20el%20formulario%20de%20la%20p%C3%A1gina." target="_blank" rel="noopener">💬 Escribir ahora por WhatsApp</a>
      <button type="button" class="btn btn-linea form-enviado-otro">Enviar otro mensaje</button>
    </div>`;
  form.style.display = 'none';
  form.parentNode.insertBefore(card, form.nextSibling);
  card.querySelector('.form-enviado-otro').onclick = ()=>{ card.remove(); form.style.display = ''; };
  card.scrollIntoView({ behavior:'smooth', block:'center' });
}

// ---------------- Banner principal a todo lo ancho ----------------
// Diapositivas con foto, texto y botón; cambian solas cada 6 s con fundido y un acercamiento
// suave. Flechas, puntos y deslizar con el dedo en celular. Se pausa si la pestaña no se ve.
function iniciarHeroSlider(contId, slides){
  const cont = document.getElementById(contId);
  if(!cont || !slides.length) return;
  const base = rutaBase();
  cont.innerHTML = slides.map((s,i)=>`
    <div class="hs-slide${i===0?' activo':''}${s.lado==='der'?' hs-der':''}" aria-hidden="${i!==0}">
      ${s.foto ? `<img class="hs-foto" src="${base}assets/img/trabajos/${s.foto}" alt="${s.alt || s.ojo}" ${s.pos ? `style="object-position:${s.pos}"` : ''} ${i===0?'fetchpriority="high"':'loading="lazy"'}>` : '<div class="hs-sin-foto"></div>'}
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
        src="https://maps.google.com/maps?q=${encodeURIComponent(EMPRESA.mapaCoords || EMPRESA.mapaBusqueda)}&z=16&output=embed"></iframe>
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
    resumen.innerHTML = `${iconoFb.replace('width="13" height="13"','width="22" height="22"')}<span><b>Recomendado por el ${RESUMEN_OPINIONES.facebookPct}%</b> en Facebook<small>${RESUMEN_OPINIONES.facebookTotal} opiniones</small></span>`;
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

/* ---------------- BLOG: me gusta, compartir y suscripción (Reinier 2026-10-17) ----------------
   Se agrega solo en las páginas de artículo (blog/<slug>.html), antes del recuadro "¿Tienes un proyecto?".
   Me gusta: contador en Supabase (blog_me_gusta); cada navegador cuenta una vez (localStorage).
   Suscripción: blog_suscriptores vía blog_suscribir (correo o WhatsApp); el aviso de artículo nuevo
   se manda cuando esté la llave de correo (Resend). */
function sitioRpc(nombre, cuerpo){
  return fetch(`${SITIO_SUPABASE_URL}/rest/v1/rpc/${nombre}`, {
    method:'POST',
    headers:{ 'Content-Type':'application/json', apikey:SITIO_SUPABASE_ANON_KEY, Authorization:'Bearer ' + SITIO_SUPABASE_ANON_KEY },
    body: JSON.stringify(cuerpo)
  }).then(async r=>{ const d = await r.json().catch(()=>null); if(!r.ok) throw new Error((d && d.message) || 'No se pudo'); return d; });
}
function cajaSuscripcionBlog(articulo){
  return `<div class="blog-susc">
    <div><h3>📬 Recibe los artículos nuevos</h3><p>Una vez por semana publicamos guías sobre redes, medidas e instalación. Te avisamos cuando salga uno.</p></div>
    <form class="blog-susc-form" data-articulo="${articulo||''}">
      <input type="text" name="nombre" placeholder="Tu nombre" autocomplete="name">
      <input type="email" name="correo" placeholder="Correo" autocomplete="email">
      <input type="tel" name="whatsapp" placeholder="o tu WhatsApp" inputmode="tel" autocomplete="tel">
      <button class="btn btn-azul" type="submit">Suscribirme</button>
      <small class="blog-susc-msg" role="status"></small>
    </form>
  </div>`;
}
function conectarSuscripcionBlog(raiz){
  (raiz||document).querySelectorAll('.blog-susc-form').forEach(f=>{
    f.addEventListener('submit', async e=>{
      e.preventDefault();
      const msg = f.querySelector('.blog-susc-msg'), btn = f.querySelector('button');
      const v = n => f.querySelector(`[name="${n}"]`).value.trim();
      if(!v('correo') && !v('whatsapp')){ msg.textContent = 'Escribe tu correo o tu WhatsApp.'; return; }
      btn.disabled = true; msg.textContent = 'Guardando…';
      try{
        const r = await sitioRpc('blog_suscribir', { p_nombre:v('nombre'), p_correo:v('correo'), p_whatsapp:v('whatsapp'), p_articulo:f.dataset.articulo||'' });
        msg.textContent = r && r.ya ? '¡Ya estabas suscrito! Te seguiremos avisando.' : '¡Listo! Te avisaremos cuando salga un artículo nuevo.';
        f.querySelectorAll('input').forEach(i=> i.value = '');
      }catch(err){ msg.textContent = err.message; }
      btn.disabled = false;
    });
  });
}
function renderExtrasArticulo(){
  const cta = document.querySelector('.articulo-cuerpo .articulo-cta');
  if(!cta || document.querySelector('.blog-extras')) return;
  const slug = (location.pathname.split('/').pop() || '').replace(/\.html$/,'');
  const url = location.origin + location.pathname;
  const titulo = (document.querySelector('meta[property="og:title"]')||{}).content || document.title;
  const u = encodeURIComponent(url), t = encodeURIComponent(titulo);
  const clave = 'rc_blog_gusta_' + slug;
  let leGusta = false; try{ leGusta = localStorage.getItem(clave) === '1'; }catch(_){}
  const caja = document.createElement('div');
  caja.className = 'blog-extras';
  caja.innerHTML = `<div class="blog-acciones">
      <button type="button" class="blog-gusta${leGusta?' activo':''}" aria-pressed="${leGusta}"><span class="corazon">${leGusta?'❤️':'🤍'}</span> Me gusta <b class="blog-gusta-n"></b></button>
      <span class="blog-compartir-tit">Compartir:</span>
      <a class="blog-red fb" href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener" aria-label="Compartir en Facebook"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg><span>Facebook</span></a>
      <a class="blog-red wa" href="https://wa.me/?text=${t}%20${u}" target="_blank" rel="noopener" aria-label="Compartir por WhatsApp"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg><span>WhatsApp</span></a>
      <a class="blog-red x" href="https://twitter.com/intent/tweet?text=${t}&url=${u}" target="_blank" rel="noopener" aria-label="Compartir en X"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/></svg><span>X</span></a>
      <button type="button" class="blog-red copiar"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"/></svg><span>Copiar liga</span></button>
    </div>` + cajaSuscripcionBlog(slug);
  cta.parentNode.insertBefore(caja, cta);
  const n = caja.querySelector('.blog-gusta-n'), b = caja.querySelector('.blog-gusta');
  fetch(`${SITIO_SUPABASE_URL}/rest/v1/blog_me_gusta?slug=eq.${slug}&select=conteo`, { headers:{ apikey:SITIO_SUPABASE_ANON_KEY, Authorization:'Bearer ' + SITIO_SUPABASE_ANON_KEY } })
    .then(r=> r.ok ? r.json() : []).then(d=>{ if(d && d[0] && d[0].conteo) n.textContent = d[0].conteo; }).catch(()=>{});
  b.onclick = async ()=>{
    leGusta = !leGusta;
    b.classList.toggle('activo', leGusta); b.setAttribute('aria-pressed', leGusta);
    b.querySelector('.corazon').textContent = leGusta ? '❤️' : '🤍';
    try{ localStorage.setItem(clave, leGusta ? '1' : '0'); }catch(_){}
    try{ const c = await sitioRpc('blog_dar_me_gusta', { p_slug:slug, p_suma: leGusta ? 1 : -1 }); n.textContent = c || ''; }catch(_){}
  };
  caja.querySelector('.copiar').onclick = async ()=>{
    if(navigator.share){ try{ await navigator.share({ title:titulo, url }); return; }catch(_){ } }
    try{ await navigator.clipboard.writeText(url); caja.querySelector('.copiar span').textContent = '✓ Copiada'; }catch(_){ prompt('Copia la liga:', url); }
  };
  conectarSuscripcionBlog(caja);
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderExtrasArticulo); else renderExtrasArticulo();

// Protección básica de fotos: sin clic derecho, sin arrastrar y sin "guardar imagen" al mantener presionado.
// No impide capturas de pantalla; solo quita la descarga fácil.
document.addEventListener('contextmenu', e => { if (e.target.closest('img, picture, video')) e.preventDefault(); });
document.addEventListener('dragstart', e => { if (e.target.closest('img')) e.preventDefault(); });
