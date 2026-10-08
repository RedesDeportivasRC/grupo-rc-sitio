/* ==========================================================================
   GRUPO RC — Medición de conversiones (Google Ads y Meta)
   Cuenta como conversión cada vez que alguien:
     - toca un botón o liga de WhatsApp  → 'whatsapp'
     - toca un teléfono para llamar       → 'llamada'
     - envía un formulario con éxito      → 'formulario' (lo llama common.js)
   Mientras los identificadores de abajo estén vacíos, este archivo no carga nada
   de Google ni de Meta: solo guarda de dónde llegó la visita (gclid / utm).
   Para activarlo basta llenar los identificadores que da cada plataforma.
   ========================================================================== */
const MEDICION = {
  googleTagId: '',          // Google Ads → Etiqueta de Google, ej. 'AW-123456789'
  conversiones: {           // Google Ads → Conversiones → "etiqueta", ej. 'AW-123456789/AbCdEfGh'
    whatsapp: '',
    llamada: '',
    formulario: '',
  },
  metaPixelId: '',          // Meta → Administrador de eventos → ID del píxel
};

(function(){
  // ---- Google (gtag.js) ----
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ dataLayer.push(arguments); };
  if(MEDICION.googleTagId){
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEDICION.googleTagId;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', MEDICION.googleTagId);
  }

  // ---- Meta (píxel de Facebook) ----
  if(MEDICION.metaPixelId){
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', MEDICION.metaPixelId);
    fbq('track', 'PageView');
  }

  // ---- Origen de la visita: se guarda 90 días para saber de qué anuncio vino ----
  const LLAVE_ORIGEN = 'rc_origen_visita';
  try{
    const q = new URLSearchParams(location.search);
    const campos = ['gclid','gbraid','wbraid','fbclid','utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
    const nuevo = {};
    campos.forEach(c=>{ if(q.get(c)) nuevo[c] = q.get(c); });
    if(Object.keys(nuevo).length){
      nuevo.pagina = location.pathname;
      nuevo.fecha = Date.now();
      localStorage.setItem(LLAVE_ORIGEN, JSON.stringify(nuevo));
    }
  }catch(e){ /* navegador sin almacenamiento: la medición sigue funcionando sin origen */ }

  window.origenVisita = function(){
    try{
      const o = JSON.parse(localStorage.getItem(LLAVE_ORIGEN) || 'null');
      if(o && Date.now() - o.fecha < 90*24*3600*1000) return o;
    }catch(e){}
    return null;
  };

  // ---- Registrar una conversión en todas las plataformas activas ----
  const eventoMeta = { whatsapp:'Contact', llamada:'Contact', formulario:'Lead' };
  window.registrarConversion = function(tipo){
    const destino = MEDICION.conversiones[tipo];
    if(MEDICION.googleTagId && destino){
      gtag('event', 'conversion', { send_to: destino, transport_type: 'beacon' });
    }
    gtag('event', 'contacto_' + tipo, { transport_type: 'beacon' });
    if(window.fbq) fbq('track', eventoMeta[tipo] || 'Contact', { canal: tipo });
  };

  // Un solo escucha para toda la página: funciona también con botones que se
  // dibujan después (header, footer, popup de WhatsApp).
  document.addEventListener('click', (e)=>{
    const el = e.target.closest('a, button');
    if(!el) return;
    const href = el.getAttribute('href') || '';
    if(el.id === 'whatsapp-popup-enviar' || /wa\.me|api\.whatsapp\.com/.test(href)){
      registrarConversion('whatsapp');
    }else if(href.startsWith('tel:')){
      registrarConversion('llamada');
    }
  }, true);
})();
