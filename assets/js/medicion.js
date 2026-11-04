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

  // ---- Contador propio de visitas (se ve en AndyControl › Marketing › Visitas de la página) ----
  // Sin cookies ni datos personales: el visitante es un número al azar guardado en su navegador.
  // Una "visita" (sesión) termina tras 30 min sin actividad. Para que no cuenten las visitas del
  // equipo: abrir una vez la página con ?rc_no_contar=1 en ese dispositivo (?rc_no_contar=0 lo quita).
  const contador = (function(){
    try{
      const q = new URLSearchParams(location.search);
      if(q.get('rc_no_contar') === '1') localStorage.setItem('rc_no_contar','1');
      if(q.get('rc_no_contar') === '0') localStorage.removeItem('rc_no_contar');
      if(localStorage.getItem('rc_no_contar') === '1') return null;
      if(/^(localhost|127\.)/.test(location.hostname)) return null;

      const azar = ()=> Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
      let visitante = localStorage.getItem('rc_vid');
      if(!visitante){ visitante = azar(); localStorage.setItem('rc_vid', visitante); }

      // De dónde llegó: utm > identificador de anuncio > sitio de donde viene > directo.
      const ref = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./,'') : '';
      const interno = ref === 'redesdeportivasrc.com' || /\.pages\.dev$/.test(ref) && ref.indexOf('grupo-rc-sitio') === 0;
      function fuenteDe(){
        const us = (q.get('utm_source') || '').toLowerCase();
        if(us){
          if(/^(fb|facebook)/.test(us)) return 'Facebook';
          if(/^(ig|instagram)/.test(us)) return 'Instagram';
          if(/^(wa|whatsapp)/.test(us)) return 'WhatsApp';
          if(/^google/.test(us)) return (q.get('utm_medium')||'').toLowerCase() === 'cpc' ? 'Google Ads' : 'Google';
          if(/^tiktok/.test(us)) return 'TikTok';
          return us.charAt(0).toUpperCase() + us.slice(1);
        }
        if(q.get('gclid') || q.get('gbraid') || q.get('wbraid')) return 'Google Ads';
        if(interno) return 'Directo';
        if(/(^|\.)instagram\.com$/.test(ref)) return 'Instagram';
        if(/(^|\.)(facebook\.com|fb\.com|messenger\.com)$/.test(ref)) return 'Facebook';
        if(q.get('fbclid')) return 'Facebook / Instagram';
        if(/(^|\.)google\./.test(ref)) return 'Google';
        if(/(^|\.)bing\.com$/.test(ref)) return 'Bing';
        if(/(^|\.)(whatsapp\.com|wa\.me)$/.test(ref)) return 'WhatsApp';
        if(/(^|\.)youtube\.com$/.test(ref)) return 'YouTube';
        if(/(^|\.)tiktok\.com$/.test(ref)) return 'TikTok';
        if(/(^|\.)mercadolibre\./.test(ref)) return 'Mercado Libre';
        if(/redesdeportivasrc\.com$/.test(ref)) return 'Sistemas RC';
        if(ref) return ref;
        return 'Directo';
      }

      let ses = null;
      try{ ses = JSON.parse(localStorage.getItem('rc_ses') || 'null'); }catch(e){}
      const ahora = Date.now();
      const trae = q.get('utm_source') || q.get('gclid') || q.get('fbclid');
      if(!ses || ahora - ses.ultima > 30*60*1000 || (trae && !interno)){
        ses = { id: azar(), ultima: ahora, fuente: fuenteDe(), referente: interno ? '' : ref,
                utm_source: q.get('utm_source') || '', utm_medium: q.get('utm_medium') || '',
                utm_campaign: q.get('utm_campaign') || '', utm_content: q.get('utm_content') || '' };
      }
      ses.ultima = ahora;
      localStorage.setItem('rc_ses', JSON.stringify(ses));

      function enviar(evento){
        ses.ultima = Date.now();
        try{ localStorage.setItem('rc_ses', JSON.stringify(ses)); }catch(e){}
        const datos = JSON.stringify({
          visitante, sesion: ses.id, evento,
          ruta: location.pathname, titulo: (document.title || '').replace(/\s*\|\s*Redes Deportivas RC\s*$/,''),
          fuente: ses.fuente, referente: ses.referente || null,
          utm_source: ses.utm_source || null, utm_medium: ses.utm_medium || null,
          utm_campaign: ses.utm_campaign || null, utm_content: ses.utm_content || null,
        });
        try{
          if(navigator.sendBeacon && navigator.sendBeacon('/api/visita', new Blob([datos], { type:'application/json' }))) return;
        }catch(e){}
        fetch('/api/visita', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: datos, keepalive:true }).catch(()=>{});
      }
      enviar('vista');
      return { enviar };
    }catch(e){ return null; }
  })();

  // ---- Registrar una conversión en todas las plataformas activas ----
  const eventoMeta = { whatsapp:'Contact', llamada:'Contact', formulario:'Lead' };
  window.registrarConversion = function(tipo){
    if(contador) contador.enviar(tipo);
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
