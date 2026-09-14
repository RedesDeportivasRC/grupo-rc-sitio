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
