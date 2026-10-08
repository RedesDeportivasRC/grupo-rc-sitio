/* ==========================================================================
   GRUPO RC — Lógica compartida de las páginas de aterrizaje (/lp/)
   Cada página llama iniciarLanding({...}) con su producto y su mensaje de WhatsApp.
   Necesita data.js (EMPRESA, ESTADOS_MEXICO), common.js (enviarLeadFormulario,
   obtenerFotosBanner) y medicion.js (conversiones).
   ========================================================================== */
function iniciarLanding(cfg){
  const ligaWA = `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(cfg.mensajeWhatsApp)}`;
  document.querySelectorAll('[data-wa]').forEach(a=>{ a.href = ligaWA; a.target = '_blank'; a.rel = 'noopener'; });
  document.querySelectorAll('[data-tel]').forEach(a=>{ a.href = `tel:${EMPRESA.telefonoHref}`; });
  document.querySelectorAll('[data-tel-texto]').forEach(el=>{ el.textContent = EMPRESA.telefono; });
  document.querySelectorAll('[data-direccion]').forEach(el=>{ el.textContent = EMPRESA.direccion; });
  document.querySelectorAll('[data-horario]').forEach(el=>{ el.textContent = EMPRESA.horarios; });

  const selEstado = document.getElementById('lp-estado');
  if(selEstado) selEstado.insertAdjacentHTML('beforeend', ESTADOS_MEXICO.map(e=>`<option>${e}</option>`).join(''));

  const tel = document.getElementById('lp-telefono');
  tel.addEventListener('input', (e)=>{ e.target.value = e.target.value.replace(/\D/g,'').slice(0,10); });

  document.getElementById('lp-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const status = document.getElementById('lp-status');
    const digitos = tel.value.trim();
    if(digitos.length !== 10){
      status.style.color = '#d9534f';
      status.textContent = 'El teléfono debe tener exactamente 10 dígitos.';
      return;
    }
    const valor = id => (document.getElementById(id)?.value || '').trim();
    const partes = [];
    if(valor('lp-uso')) partes.push('Uso: ' + valor('lp-uso'));
    if(valor('lp-medidas')) partes.push((cfg.nombreCampoMedidas || 'Medidas') + ': ' + valor('lp-medidas'));
    partes.push('Llegó por: ' + cfg.etiqueta);
    const ok = await enviarLeadFormulario({
      nombre: valor('lp-nombre'),
      telefono: '+52' + digitos,
      estado: valor('lp-estado'),
      producto: cfg.producto,
      mensaje: partes.join(' · '),
      sitioWeb: valor('lp-honeypot'),
    }, { botón: document.getElementById('lp-btn'), status });
    if(ok) document.getElementById('lp-form').reset();
  });

  // Fotos reales de trabajos (las mismas del banner del Inicio, administradas desde AndyControl).
  const galeria = document.getElementById('lp-galeria');
  if(galeria){
    obtenerFotosBanner().then(fotos=>{
      if(!fotos.length) return;
      galeria.innerHTML = fotos.slice(0,8).map(url=>
        `<img src="${url}" alt="${cfg.altFotos}" loading="lazy" width="400" height="200">`).join('');
      document.getElementById('lp-galeria-seccion').style.display = '';
    });
  }
}
