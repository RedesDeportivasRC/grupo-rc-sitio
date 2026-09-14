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
    <div class="barra-top">
      <div class="envolvente">
        <div class="grupo">
          <a href="tel:${EMPRESA.telefonoHref}">📞 ${EMPRESA.telefono}</a>
          <a href="https://wa.me/${EMPRESA.whatsapp}">💬 WhatsApp</a>
          <a href="mailto:${EMPRESA.correo}">✉️ ${EMPRESA.correo}</a>
        </div>
        <span>${EMPRESA.horarios} · ${EMPRESA.estadosDondeVendemos[0]}, México</span>
      </div>
    </div>
    <header class="site">
      <div class="envolvente">
        <a href="${base}index.html" class="logo"><img src="${base}assets/img/logo-160.png" class="logo-marca"> ${EMPRESA.nombre}</a>
        <nav class="principal">
          <a href="${base}productos.html" class="${activo==='productos'?'activo':''}">Productos</a>
          <a href="${base}proyectos.html" class="${activo==='proyectos'?'activo':''}">Proyectos</a>
          <a href="${base}clientes.html" class="${activo==='clientes'?'activo':''}">Clientes</a>
          <a href="${base}galeria.html" class="${activo==='galeria'?'activo':''}">Galería</a>
          <a href="${base}blog.html" class="${activo==='blog'?'activo':''}">Blog</a>
          <a href="${base}recursos.html" class="${activo==='recursos'?'activo':''}">Recursos</a>
          <a href="${base}nosotros.html" class="${activo==='nosotros'?'activo':''}">Nosotros</a>
        </nav>
        <div class="header-derecha">
          <span class="header-tel">📞 ${EMPRESA.telefono}</span>
          <a href="${base}contacto.html" class="btn btn-azul btn-chico">Cotiza / Contacto</a>
          <button class="menu-movil-btn" id="btn-menu-movil">☰</button>
        </div>
      </div>
    </header>
  `;
  const btnMovil = document.getElementById('btn-menu-movil');
  if(btnMovil) btnMovil.onclick = ()=>{
    window.location.href = base + 'contacto.html'; // en el MVP, en móvil el botón lleva directo a contacto/menú simplificado
  };
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
            <a href="${base}proyectos.html">Proyectos</a>
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

function renderProductCard(p){
  const base = rutaBase();
  return `
    <a class="tarjeta-producto" href="${base}productos/producto.html?sku=${p.sku}">
      <div class="foto-ph"><span><b>${p.nombre}</b>${p.fotos[0]||'Foto pendiente'}</span></div>
      <div class="tarjeta-producto-body">
        <span class="tarjeta-producto-cat">${categoriaNombre(p.categoria)}</span>
        <h3>${p.nombre}</h3>
        <p>${p.descripcionCorta}</p>
        <span class="btn btn-linea btn-chico">Ver detalle</span>
      </div>
    </a>`;
}

function renderProjectCard(pr){
  return `
    <a class="tarjeta-proyecto" href="${rutaBase()}proyectos.html#${pr.slug}">
      <div class="foto-ph oscuro"><span>${pr.fotos[0]||'Foto pendiente'}</span></div>
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
