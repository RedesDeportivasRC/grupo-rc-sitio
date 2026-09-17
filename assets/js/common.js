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

function renderHeader(activo){
  const base = rutaBase();
  document.getElementById('site-header').innerHTML = `
    <header class="site">
      <div class="envolvente">
        <a href="${base}index.html" class="logo"><img src="${base}assets/img/logo-160.png" class="logo-marca"> ${EMPRESA.nombre}</a>
        <nav class="principal">
          <a href="${base}productos.html" class="${activo==='productos'?'activo':''}">Productos</a>
          <a href="${base}clientes.html" class="${activo==='clientes'?'activo':''}">Clientes</a>
          <a href="${base}galeria.html" class="${activo==='galeria'?'activo':''}">Galería</a>
          <a href="${base}blog.html" class="${activo==='blog'?'activo':''}">Blog</a>
          <a href="${base}recursos.html" class="${activo==='recursos'?'activo':''}">Recursos</a>
          <a href="${base}nosotros.html" class="${activo==='nosotros'?'activo':''}">Nosotros</a>
        </nav>
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
        <a href="${base}clientes.html" style="padding:12px 4px;font-weight:700;border-bottom:1px solid var(--linea);">Clientes</a>
        <a href="${base}galeria.html" style="padding:12px 4px;font-weight:700;border-bottom:1px solid var(--linea);">Galería</a>
        <a href="${base}blog.html" style="padding:12px 4px;font-weight:700;border-bottom:1px solid var(--linea);">Blog</a>
        <a href="${base}recursos.html" style="padding:12px 4px;font-weight:700;border-bottom:1px solid var(--linea);">Recursos</a>
        <a href="${base}nosotros.html" style="padding:12px 4px;font-weight:700;border-bottom:1px solid var(--linea);">Nosotros</a>
        <a href="${base}contacto.html" class="btn btn-azul" style="margin-top:16px;text-align:center;">Cotiza / Contacto</a>
        <a href="tel:${EMPRESA.telefonoHref}" style="padding:12px 4px;margin-top:6px;">📞 ${EMPRESA.telefono}</a>
      </div>
    </div>
  `;
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
            <a href="${base}clientes.html">Clientes</a>
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

// ---------------- Renderizadores de tarjetas (consumen data.js) ----------------
function categoriaNombre(slug){
  const c = CATEGORIAS.find(c=>c.slug===slug);
  return c ? c.nombre : slug;
}

// Muestra la foto real (con su texto alternativo para Google Imágenes) cuando ya existe
// una URL subida desde AndyControl; si todavía es un texto de marcador, muestra el cuadro
// gris de siempre. claseExtra son las mismas clases que usaba el marcador (foto-ph, oscuro...).
function fotoOMarcador(url, altDescriptivo, claseExtra=''){
  if(url && /^https?:\/\//.test(url)){
    return `<img src="${url}" alt="${altDescriptivo}" loading="lazy" class="${claseExtra}" style="width:100%;height:100%;object-fit:cover;">`;
  }
  return `<div class="foto-ph ${claseExtra}"><span>${url||'Foto pendiente'}</span></div>`;
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
  return `
    <a class="tarjeta-blog" href="${rutaBase()}blog.html#${b.slug}">
      <div class="foto-ph"><span>${b.imagen}</span></div>
      <div class="tarjeta-blog-body">
        <span>${b.categoria} · EJEMPLO</span>
        <h3>${b.titulo}</h3>
        <p>${b.extracto}</p>
      </div>
    </a>`;
}

function renderClientCard(c){
  if(c.logo && /^https?:\/\//.test(c.logo)){
    return `<div class="tarjeta-cliente"><img src="${c.logo}" alt="${c.nombre} — cliente de Grupo RC" loading="lazy" style="max-width:100%;max-height:60px;object-fit:contain;"></div>`;
  }
  return `<div class="tarjeta-cliente"><span>${c.nombre}</span></div>`;
}

function renderResourceCard(r){
  const iconos = {'Catálogo':'📘','Manual':'🛠️','Ficha técnica':'📐','Guía':'📄'};
  return `
    <div class="tarjeta-recurso">
      <div class="icono">${iconos[r.categoria]||'📄'}</div>
      <div><b>${r.nombre}</b><span>${r.descripcion}</span></div>
    </div>`;
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
    fotos: p.fotos && p.fotos.length ? p.fotos : ['Foto pendiente'],
    material: p.material, calibre: p.calibre, color: p.color||[], medidas: p.medidas,
    usos: p.usos||[], caracteristicas: p.caracteristicas||[], precio: p.precio,
    disponibilidad: p.disponibilidad, productosRelacionados: p.productos_relacionados||[],
    descargas: [], etiquetas: p.etiquetas||[], estado: p.activo ? 'activo' : 'inactivo',
  };
}
function mapearProyecto(p){
  return {
    slug: p.slug || p.id, nombre: p.nombre, cliente: p.cliente, ubicacion: p.ubicacion, tipo: p.tipo,
    fotos: p.fotos && p.fotos.length ? p.fotos : ['Foto pendiente'],
    descripcion: p.descripcion, productosUsados: p.productos_usados||[], fecha: p.fecha,
    categorias: p.categorias||[], video: p.video, testimonio: p.testimonio,
  };
}
function mapearCliente(c){
  return { nombre: c.nombre, logo: c.logo, sector: c.sector, ubicacion: c.ubicacion, proyectoRelacionado: c.proyecto_relacionado, testimonio: c.testimonio, fotos: [] };
}

async function obtenerProductos(){
  try{
    const { data, error } = await clienteSitio().from('sitio_productos').select('*').eq('activo', true).order('orden', {ascending:true});
    if(error || !data || data.length===0) return PRODUCTOS;
    return data.map(mapearProducto);
  }catch(e){ return PRODUCTOS; }
}
async function obtenerProyectos(){
  try{
    const { data, error } = await clienteSitio().from('sitio_proyectos').select('*').eq('activo', true).order('orden', {ascending:true});
    if(error || !data || data.length===0) return PROYECTOS;
    return data.map(mapearProyecto);
  }catch(e){ return PROYECTOS; }
}
async function obtenerClientes(){
  try{
    const { data, error } = await clienteSitio().from('sitio_clientes').select('*').eq('activo', true).order('orden', {ascending:true});
    if(error || !data || data.length===0) return CLIENTES;
    return data.map(mapearCliente);
  }catch(e){ return CLIENTES; }
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
    return true;
  }catch(e){
    status.style.color = '#d9534f';
    status.textContent = '❌ ' + e.message;
    botón.disabled = false;
    return false;
  }
}
