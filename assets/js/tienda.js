/* ==========================================================================
   GRUPO RC — Tienda en línea (tienda.html)  ·  BORRADOR SIN PUBLICAR
   Lee las piezas libres de Inventarios con la función tienda_existencias()
   (sin costos ni datos internos). Mientras esa función no exista, usa la copia
   de assets/js/tienda-muestra.js para la vista previa.

   Precios = reglas del Cotizador (las mismas de la maqueta del 31-oct):
   - Perimetral: m² × precio por abertura + envío (curva del Cotizador), con IVA. Envío incluido.
   - Portería: m² (fórmula del Cotizador) × $165 + IVA. Envío aparte (tabla por cantidad).
   - Voleibol: metro lineal × $230 + IVA. Envío aparte (curva deportiva).
   PENDIENTE de Reinier: confirmar regla de precio de tienda y envío incluido/aparte.

   Comprar: por ahora arma el mensaje de WhatsApp con producto, medida, total y forma
   de pago; Andy genera la liga de pago desde el CRM (la liga ya existe y funciona).
   ========================================================================== */
(function(){
  const IVA = 1.16;
  const WA = (typeof EMPRESA !== 'undefined' && EMPRESA.whatsapp) || '529995538184';
  const IMG = 'assets/img/trabajos/';

  /* ---------- Reglas de precio (copiadas del Cotizador) ---------- */
  const PM = { '1':115, '3':43, '4':36 };
  const PUNTOS = [[0,560],[1140,560],[2160,665],[5184,686],[10892,686],[17280,786],[25920,888],[30000,1300],[64800,2780],[86400,3780],[95040,3900]];
  function envioPerim(sub){
    for(let i=1;i<PUNTOS.length;i++){ const [x0,y0]=PUNTOS[i-1],[x1,y1]=PUNTOS[i];
      if(sub<=x1) return Math.round((y0+(y1-y0)*(sub-x0)/(x1-x0))/10)*10; }
    const [x0,y0]=PUNTOS[PUNTOS.length-2],[x1,y1]=PUNTOS[PUNTOS.length-1];
    return Math.round((y1+(y1-y0)*(sub-x1)/(x1-x0))/10)*10;
  }
  const envioPort = c => c<=2 ? 686 : c<=4 ? 686+(786-686)*(c-2)/2 : 786+55*(c-4);
  const envioDep = sub => Math.round(3.13*Math.pow(sub,0.699)/10)*10;
  const m2Port = (t,p,s,i) => (s+i)*p + s*t + (Math.sqrt(p*p+(i-s)*(i-s))+s)*t;
  const $ = n => '$' + Math.round(n).toLocaleString('es-MX');
  const fm = n => (+n).toLocaleString('es-MX',{maximumFractionDigits:2});
  const esc = t => String(t==null?'':t).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  /* ---------- Tiempos (Reinier 31-oct): rango en días hábiles ---------- */
  const diasPort = m2 => [Math.max(2,Math.round(m2/4.5)), Math.max(4,Math.ceil(m2/3.2))];
  const T_STOCK = [1,2], T_PERIM = [5,6];

  /* ---------- Fotos (provisionales: las mejores que ya están en la página) ---------- */
  const F = {
    perim: IMG+'red-perimetral-negra-cancha-futbol-pasto-sintetico.jpg', perimDet: IMG+'detalle-red-perimetral-negra-rombo-cancha.jpg',
    perimRombo: IMG+'red-perimetral-negra-abertura-rombo-detalle.jpg', perim3: IMG+'red-perimetral-alta-complejo-canchas-futbol.jpg',
    golf: IMG+'instalacion-red-perimetral-postes-verdes-campo-golf.jpg',
    fut11: IMG+'porteria-futbol-profesional-red-hexagonal-blanca-pasto-sintetico.jpg', fut7: IMG+'porteria-futbol-7-red-blanca-privada-navita.jpg',
    hexDet: IMG+'red-hexagonal-porteria-futbol-rapido-tejido-detalle.jpg', mini: IMG+'mini-porteria-forrada-naranja-red-amarilla-escuela.jpg',
    infantil: IMG+'porteria-infantil-naranja-cancha-colegio-charbel.jpg', microbio: IMG+'porteria-futbol-blanca-red-hexagonal-entrega.jpg',
    volei: IMG+'cancha-usos-multiples-colegio-charbel-red-voleibol-naranja.jpg', voleiCol: IMG+'red-voleibol-hexagonal-roja-amarilla-negra.jpg',
    balonera: IMG+'balonera-cuerda-trenzada-verde-balon.jpg'
  };
  const COLORES = {'Blanca':'#ffffff','Amarillo':'#f5d000','Amarillo fosforescente':'#d9ff1f','Naranja':'#ff7a1a','Negro':'#111','Negra':'#111',
    'Verde bandera':'#0a8a3c','Verde limón':'#8fd400','Azul rey':'#1d3fbf','Azul turquesa':'#16b8c4',
    'Rojo, azul y blanco':'linear-gradient(90deg,#d22 33%,#fff 33% 66%,#1d3fbf 66%)','Colores':'conic-gradient(#d22,#f5d000,#0a8a3c,#1d3fbf,#d22)'};
  const sw = c => `<i style="background:${COLORES[c]||'#ccc'}"></i>`;

  /* ---------- Catálogo de modelos (medidas del Cotizador) ---------- */
  const USO_PERIM = {'4':'Canchas de fútbol y bardas: detiene balones de fútbol y básquetbol.','3':'Canchas donde se juega con balón más chico o se quiere un tejido más cerrado.','1':'Golf, béisbol y protección: detiene pelotas pequeñas.','2':'Tejido cerrado para protección y deportes con pelota chica.'};
  const MODELOS = [
    {id:'mini', base:'Mini', n:'Red para mini portería', t:.75,p:.5,s:0,i:.5, foto:[F.mini,F.hexDet], uso:'Entrenamiento, casa y escuela.'},
    {id:'inf', base:'Infantil', n:'Red para portería infantil', t:1.5,p:1,s:.3,i:.6, foto:[F.infantil,F.hexDet], uso:'Fútbol infantil y patio escolar.'},
    {id:'infl', base:'Infantil L', n:'Red para portería infantil tipo L', t:1.5,p:1,s:0,i:1, foto:[F.infantil,F.hexDet], uso:'Porterías infantiles con marco en L (sin techo).'},
    {id:'juv', base:'Juvenil', n:'Red para portería juvenil', t:2,p:1.5,s:.5,i:1, foto:[F.microbio,F.hexDet], uso:'Canchas chicas y escuelas.'},
    {id:'micro', base:'Microbio', n:'Red para portería Microbio', t:3.2,p:1.8,s:.5,i:1, foto:[F.microbio,F.hexDet], uso:'Fútbol de salón y canchas de colonia.'},
    {id:'f75', base:'Fut 7', trav:5, n:'Red para portería Fut 7 (5 m)', t:5,p:2,s:.7,i:1.2, foto:[F.fut7,F.hexDet], uso:'Fútbol 7 y fútbol rápido.', par:true},
    {id:'f76', base:'Fut 7', trav:6, n:'Red para portería Fut 7 (6 m)', t:6,p:2,s:.7,i:1.2, foto:[F.fut7,F.hexDet], uso:'Fútbol 7 en cancha grande.', par:true},
    {id:'f11', base:'Fut 11 / profesional', n:'Red para portería Fut 11 profesional', t:7.5,p:2.5,s:1,i:1.5, foto:[F.fut11,F.hexDet], uso:'Cancha reglamentaria de fútbol 11.', par:true},
    {id:'f11c', base:'Fut 11 cabaña', n:'Red para portería Fut 11 tipo cabaña', t:7.5,p:2.5,s:1.5,i:1.5, foto:[F.fut11,F.hexDet], uso:'Fútbol 11, red con caída recta atrás.', par:true},
  ];
  const COLORES_PEDIDO = { mini:['Blanca','Amarillo','Naranja','Verde limón'], inf:['Blanca','Amarillo','Azul rey','Naranja'], infl:['Blanca','Amarillo','Naranja'] };

  /* ---------- Accesorios: balonera (fabricación RC) y reventa de Andy ----------
     Sin precio hasta que Reinier/Andy lo definan: se pueden agregar al carrito como
     "precio por confirmar" y Andy lo confirma por WhatsApp. */
  const ACCESORIOS = [
    {id:'balonera', n:'Bolsa balonera de red', med:'Tejida a mano con cuerda trenzada · en colores', foto:[IMG+'balonera-cuerda-trenzada-verde-balon.jpg', IMG+'balonera-cuerda-trenzada-azul.jpg'],
      uso:'Para llevar los balones de la bodega a la cancha. Dinos cuántos balones guardas y te confirmamos la medida.', etiqueta:'La fabricamos'},
    {id:'balones', n:'Balones de fútbol', med:'Para entrenamiento y partido', foto:null, uso:'Balones para entrenamiento y partido. Te confirmamos modelos y tallas disponibles.', etiqueta:'Nuevo'},
    {id:'guantes', n:'Guantes de portero', med:'Varias tallas', foto:null, uso:'Guantes para portero. Te confirmamos tallas disponibles.', etiqueta:'Nuevo'},
  ];
  /* Recomendados: qué se ofrece junto a cada producto o sección */
  const RELACION = {
    port:['balonera','balones','guantes'], volei:['balonera','mini','micro'], perim:['micro','f75','balones'], acc:['micro','mini','balonera'],
  };

  /* ---------- Convertir las existencias en productos ---------- */
  function colorDe(row){
    const partes = String(row.d.modelo||'').split(' · ');
    let c = partes[1] || (row.d.color==='blanca' ? 'Blanca' : 'Colores');
    if(/francia|rojo, azul/i.test(c)) c = 'Rojo, azul y blanco';
    return c.charAt(0).toUpperCase() + c.slice(1);
  }
  function construir(filas){
    const P = [];
    // Perimetrales por abertura
    const perim = {};
    filas.filter(r=>r.categoria==='perimetrales').forEach(r=>{
      const ab = String(r.d.tipo); const a=+r.d.ancho, l=+r.d.largo; if(!PM[ab]||!a||!l) return;
      (perim[ab]=perim[ab]||[]).push({a,l,m2:a*l,k:r.cantidad||1});
    });
    ['4','3','1'].forEach(ab=>{
      const piezas = (perim[ab]||[]).sort((x,y)=>x.a-y.a||x.l-y.l);
      const precio = pz => { const sub=pz.m2*PM[ab]; return (sub+envioPerim(sub))*IVA; };
      if(!piezas.length) return;
      P.push({cat:'perim', id:'p'+ab, n:`Red perimetral de ${ab}" negra`, med:`${piezas.length} medidas listas · rombo de ${ab} pulgada${ab==='1'?'':'s'}`,
        foto:{'4':[F.perim,F.perimRombo,F.perimDet],'3':[F.perim3,F.perimDet,F.perimRombo],'1':[F.golf,F.perimRombo,F.perimDet]}[ab],
        colores:['Negra'], stock:piezas.length, uso:USO_PERIM[ab], desde:Math.min(...piezas.map(precio)), unico:true,
        busca:`perimetral ${ab} negra `+piezas.map(p=>`${fm(p.a)}x${fm(p.l)} ${fm(p.l)}x${fm(p.a)}`).join(' '),
        opciones:piezas.map(pz=>({et:`${fm(pz.a)} × ${fm(pz.l)} m`, sub:`${fm(pz.m2)} m²`, stock:1, precio:precio(pz)})),
        pedido:{dias:T_PERIM}});
    });
    // Porterías por modelo
    const port = filas.filter(r=>r.categoria==='porterias');
    MODELOS.forEach(m=>{
      const mias = port.filter(r=>{ const base=String(r.d.modelo||'').split(' · ')[0]; return base===m.base && (!m.trav || +r.d.trav===m.trav); });
      const col = {}; mias.forEach(r=>{ const c=colorDe(r); col[c]=(col[c]||0)+(r.cantidad||1); });
      (COLORES_PEDIDO[m.id]||['Blanca']).forEach(c=>{ if(!(c in col)) col[c]=0; });
      const m2=m2Port(m.t,m.p,m.s,m.i), pr=m2*165*IVA, total=Object.values(col).reduce((a,b)=>a+b,0);
      P.push({cat:'port', id:m.id, n:m.n, med:`${fm(m.t)} m frente × ${fm(m.p)} m alto · fondo ${fm(m.s)} / ${fm(m.i)} m · ${fm(m2)} m² de red`,
        foto:m.foto, colores:Object.keys(col), stock:total, uso:m.uso, desde:pr, par:m.par, busca:`${m.n} ${Object.keys(col).join(' ')} ${fm(m.t)}`,
        opciones:Object.entries(col).sort((a,b)=>b[1]-a[1]).map(([c,k])=>({et:c,color:c,stock:k,precio:pr})), dias:diasPort(m2), envio:'port', m2});
    });
    const otras = port.filter(r=>!r.d.modelo);
    if(otras.length){
      const ops = otras.map(r=>{ const t=+r.d.trav,p=+r.d.poste,s=+r.d.psup,i=+r.d.pinf, m2=m2Port(t,p,s,i);
        return {et:`${fm(t)} × ${fm(p)} m (fondo ${fm(s)}/${fm(i)})`, sub:`${fm(m2)} m²`, stock:r.cantidad||1, precio:m2*165*IVA, m2}; })
        .sort((a,b)=>a.m2-b.m2);
      P.push({cat:'port', id:'otras', n:'Redes para portería · otras medidas listas', med:`${ops.length} medidas blancas en existencia`, foto:[F.fut7,F.hexDet],
        colores:['Blanca'], stock:ops.reduce((a,o)=>a+o.stock,0), uso:'Piezas ya tejidas en medidas comunes de canchas privadas y escuelas.',
        desde:Math.min(...ops.map(o=>o.precio)), busca:'porteria blanca '+ops.map(o=>o.et.replace(/ × /,'x')).join(' '), opciones:ops, dias:[3,6], envio:'port', unico:true});
    }
    // Voleibol por largo
    const vol = {};
    filas.filter(r=>r.categoria==='voleibol').forEach(r=>{ const t=+r.d.trav; const c=r.d.color==='blanca'?'Blanca':'Colores'; vol[t]=vol[t]||{}; vol[t][c]=(vol[t][c]||0)+(r.cantidad||1); });
    Object.keys(vol).map(Number).sort((a,b)=>b-a).forEach(t=>{
      const col=vol[t], sub=t*230, pr=sub*IVA, total=Object.values(col).reduce((a,b)=>a+b,0), d=diasPort(t);
      P.push({cat:'volei', id:'v'+String(t).replace('.','_'), n:`Red de voleibol ${fm(t)} m${t<7?' (recreativa)':''}`,
        med:`${fm(t)} m de largo × 1 m de alto · tejido hexagonal · lona del color que elijas`, foto:col.Blanca?[F.volei,F.voleiCol]:[F.voleiCol,F.volei],
        colores:Object.keys(col), stock:total, uso:'Escuelas, parques y canchas de usos múltiples.', desde:pr, busca:`voleibol ${fm(t)} ${Object.keys(col).join(' ')}`,
        opciones:Object.entries(col).map(([c,k])=>({et:c,color:c,stock:k,precio:pr})), dias:[d[0]+1,d[1]+1], stockDias:[T_STOCK[0]+1,T_STOCK[1]+1], envio:'dep', sub});
    });
    // Accesorios (precio por confirmar)
    ACCESORIOS.forEach(r=>P.push({cat:'acc', id:r.id, n:r.n, med:r.med, foto:r.foto, colores:[], stock:0, uso:r.uso, sinPrecio:true, etiqueta:r.etiqueta,
      opciones:[{et:'Pieza', stock:0, precio:null}], busca:r.n+' accesorios', dias:[2,5]}));
    return P;
  }

  const CATS = [
    {id:'perim', n:'Redes perimetrales', sub:'Negras · 1", 3" y 4"', foto:F.perim},
    {id:'port', n:'Redes para portería', sub:'Blancas y de colores', foto:F.fut7},
    {id:'volei', n:'Redes de voleibol', sub:'Hexagonales con lona', foto:F.volei},
    {id:'acc', n:'Balones y accesorios', sub:'Baloneras, balones y guantes', foto:F.balonera},
  ];


  /* ---------- Pagos (Reinier 23-nov): contado = SPEI; meses = Mercado Pago ----------
     Tarjeta de contado pendiente hasta tener Zona de cobro BBVA.
     Recargos = cobros_config (misma fórmula que la liga): (precio + $4.64) × (1 + recargo%). */
  const RECARGOS = {3:10.48, 6:14.9, 9:20.52, 12:23.46, 18:36.13};
  const PLAZOS = [3,6,9,12,18];
  const totalMeses = (base, n) => Math.ceil((base + 4*1.16) * (1 + RECARGOS[n]/100) * 100) / 100;
  const mensual = (base, n) => Math.ceil(totalMeses(base,n)/n*100)/100;
  const $c = n => '$' + n.toLocaleString('es-MX',{minimumFractionDigits:2, maximumFractionDigits:2});

  /* ---------- Estado ---------- */
  let PRODUCTOS = [];
  const st = {cat:'todo', q:'', disp:'todas', color:'todos'};
  const $id = id => document.getElementById(id);
  const elCats=$id('td-cats'), elGrid=$id('td-grid'), elRes=$id('td-res'), elExtra=$id('td-extra');
  const porId = id => PRODUCTOS.find(p=>p.id===id);

  /* ---------- Piezas de interfaz ---------- */
  const marcador = n => `<div class="td-marcador" role="img" aria-label="${esc(n)}: foto pendiente"><svg viewBox="0 0 24 24" width="54" height="54" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="9"/><path d="M12 7l3.5 2.5-1.3 4.1H9.8L8.5 9.5z"/><path d="M12 3v4M20.5 9.5l-5 0M17.5 19l-3.3-5.4M6.5 19l3.3-5.4M3.5 9.5l5 0"/></svg><span>Foto pendiente</span></div>`;
  const ICO_CARRO = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3.5h3l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1l1.7-6.8H6.6"/></svg>';
  const estadoHTML = p => p.sinPrecio ? `<span class="td-estado prox">Precio por confirmar</span>`
    : p.stock>0 ? `<span class="td-estado ok">Lista para enviar · ${p.stock} en existencia</span>`
    : `<span class="td-estado ped">Sobre pedido · ${p.dias[0]}–${p.dias[1]} días hábiles</span>`;
  function tarjeta(p, chica){
    const etiqueta = p.etiqueta ? `<b class="td-eti">${esc(p.etiqueta)}</b>` : p.stock>0 && !p.sinPrecio ? `<b class="td-eti ok">Lista para enviar</b>` : '';
    return `<button class="td-card${chica?' chica':''}" data-id="${p.id}">
      <div class="foto">${p.foto?`<img src="${p.foto[0]}" alt="${esc(p.n)}" loading="lazy">`:marcador(p.n)}${etiqueta}<div class="sw">${p.colores.slice(0,6).map(sw).join('')}</div></div>
      <div class="cuerpo"><h3>${esc(p.n)}</h3>${chica?'':`<div class="med">${esc(p.med)}</div>${estadoHTML(p)}`}
      ${p.sinPrecio ? `<div class="precio prox">Por confirmar<small>Te damos precio por WhatsApp</small></div>`
        : `<div class="precio">${p.unico?'<span>desde</span> ':''}${$(p.desde)}<small>${p.cat==='perim'?'IVA y envío incluidos':'IVA incluido · envío aparte'}${p.par?' · por red':''}</small>${chica?'':`<em>o hasta 18 meses de ${$c(mensual(p.desde,18))}</em>`}</div>`}
      </div></button>`;
  }
  function filaRecomendados(ids, titulo, excluir){
    const lista = ids.map(porId).filter(p=>p && p.id!==excluir);
    if(!lista.length) return '';
    return `<section class="td-reco"><h2>${titulo}</h2><div class="td-carrusel">${lista.map(p=>tarjeta(p,true)).join('')}</div></section>`;
  }

  /* ---------- Catálogo ---------- */
  function pintarCats(){
    elCats.innerHTML = CATS.map(c=>{ const n=PRODUCTOS.filter(p=>p.cat===c.id).length;
      return `<button class="td-cat${st.cat===c.id?' sel':''}" data-cat="${c.id}" aria-pressed="${st.cat===c.id}"><img src="${c.foto}" alt="" loading="lazy"><span>${c.n}<small>${c.sub} · ${n} producto${n===1?'':'s'}</small></span></button>`; }).join('');
  }
  function chips(el, lista, clave){
    el.innerHTML = lista.map(([v,t])=>`<button class="td-chip" data-v="${v}" aria-pressed="${st[clave]===v}">${t}</button>`).join('');
    el.onclick = e=>{ const b=e.target.closest('.td-chip'); if(!b) return; st[clave]=b.dataset.v; pintar(); };
  }
  function filtrar(){
    const q = st.q.trim().toLowerCase().replace(/\s*[x×]\s*/g,'x').replace(/,/g,'.');
    return PRODUCTOS.filter(p=>{
      if(st.cat!=='todo' && p.cat!==st.cat) return false;
      if(st.disp==='ya' && (!p.stock || p.sinPrecio)) return false;
      if(st.color==='blanca' && !p.colores.includes('Blanca')) return false;
      if(st.color==='negra' && !p.colores.includes('Negra')) return false;
      if(st.color==='colores' && !p.colores.some(c=>c!=='Blanca'&&c!=='Negra')) return false;
      if(q){ const hay=(p.n+' '+p.busca+' '+p.med).toLowerCase().replace(/,/g,'.'); if(!q.split(/\s+/).every(w=>hay.includes(w))) return false; }
      return true;
    });
  }
  function pintar(){
    pintarCats();
    chips($id('td-fdisp'), [['todas','Todas'],['ya','Lista para enviar'],['pedido','Se fabrica a tu medida']], 'disp');
    chips($id('td-fcolor'), [['todos','Cualquier color'],['blanca','Blanca'],['negra','Negra'],['colores','De colores']], 'color');
    const lista = filtrar();
    const sinFiltros = st.cat==='todo' && !st.q.trim() && st.disp==='todas' && st.color==='todos';
    elRes.textContent = sinFiltros ? '' : `${lista.length} producto${lista.length===1?'':'s'}` + (st.disp==='pedido' ? ' · todos se pueden fabricar a tu medida' : '');
    if(sinFiltros){
      // Vista de inicio: una sección por categoría
      elGrid.className = 'td-secciones';
      elGrid.innerHTML = CATS.map(c=>{ const ps=lista.filter(p=>p.cat===c.id); if(!ps.length) return '';
        return `<section class="td-seccion"><div class="td-sec-cab"><h2>${c.n}</h2><button class="td-vertodo" data-cat="${c.id}">Ver ${c.n.toLowerCase()} →</button></div>
          <div class="td-grid">${ps.slice(0,4).map(p=>tarjeta(p)).join('')}</div></section>`; }).join('');
    } else {
      elGrid.className = 'td-grid';
      elGrid.innerHTML = lista.length ? lista.map(p=>tarjeta(p)).join('')
        : `<div class="td-vacio">No hay una pieza lista con esa búsqueda. Te la fabricamos: escríbenos tu medida por WhatsApp.</div>`;
    }
    let extra = '';
    if(st.cat!=='todo' && RELACION[st.cat]) extra += filaRecomendados(RELACION[st.cat], 'También te puede interesar');
    if(st.cat==='perim'||st.cat==='todo') extra += `<div class="td-amedida"><p><b>¿No ves tu medida de red perimetral?</b> La cortamos de paca y sale en ${T_PERIM[0]}–${T_PERIM[1]} días hábiles.</p><a href="productos/redes-perimetrales.html#cotizar">Cotizar mi medida</a></div>`;
    elExtra.innerHTML = extra;
  }

  /* ---------- Carrito (se guarda en este navegador) ---------- */
  const CLAVE = 'rc_tienda_carrito';
  let carrito = [];
  try { carrito = JSON.parse(localStorage.getItem(CLAVE)||'[]') || []; } catch(e){ carrito = []; }
  const guardar = ()=>{ try{ localStorage.setItem(CLAVE, JSON.stringify(carrito)); }catch(e){} pintarBoton(); };
  let pago = {forma:'spei', plazo:12};
  function agregar(p, op, cant, silencioso){
    const o = p.opciones[op] || p.opciones[0];
    const k = p.id+'|'+o.et;
    const ya = carrito.find(x=>x.k===k);
    if(ya){ if(!p.unico) ya.cant += cant; }
    else carrito.push({k, id:p.id, n:p.n, et:p.sinPrecio?'':o.et, foto:p.foto?p.foto[0]:null, precio:o.precio, cant:p.unico?1:cant, cat:p.cat, sub:p.sub||0, unico:!!p.unico, stock:o.stock});
    guardar(); if(!silencioso) aviso(`${p.n}${p.sinPrecio?'':' · '+o.et} agregado al carrito`);
  }
  function cuentas(){
    let prod=0, nPort=0, subDep=0, porConfirmar=0, piezas=0;
    carrito.forEach(x=>{ piezas+=x.cant; if(x.precio==null){ porConfirmar++; return; } prod += x.precio*x.cant;
      if(x.cat==='port') nPort += x.cant; if(x.cat==='volei') subDep += x.sub*x.cant; });
    const env = (nPort?envioPort(nPort)*IVA:0) + (subDep?envioDep(subDep)*IVA:0);
    const soloPerim = carrito.some(x=>x.cat==='perim') && !nPort && !subDep;
    return {prod, env, total:prod+env, porConfirmar, piezas, envTxt: env ? $(env) : soloPerim ? 'Incluido' : carrito.length ? 'Incluido' : '—'};
  }
  function pintarBoton(){
    const b=$id('td-boton-carro'); if(!b) return;
    const c=cuentas();
    b.innerHTML = `${ICO_CARRO}<span class="n">${c.piezas}</span><span class="t">${c.piezas ? $(c.total)+(c.porConfirmar?'+':'') : 'Carrito'}</span>`;
    b.classList.toggle('lleno', c.piezas>0);
  }
  function mensajeCarrito(c){
    const lineas = carrito.map(x=>`• ${x.cant} × ${x.n}${x.et?' ('+x.et+')':''}: ${x.precio==null?'precio por confirmar':$(x.precio*x.cant)}`).join('\n');
    let forma;
    if(pago.forma==='spei') forma = `transferencia SPEI (precio de contado ${$(c.total)})`;
    else if(pago.forma==='apartado') forma = `apartar con 50% por transferencia (${$(c.total/2)})`;
    else forma = `${pago.plazo} meses con tarjeta: ${pago.plazo} pagos de ${$c(mensual(c.total,pago.plazo))} (total ${$c(totalMeses(c.total,pago.plazo))})`;
    return `Hola, armé este pedido en la tienda en línea:\n${lineas}\nEnvío: ${c.envTxt}\nTotal de contado: ${$(c.total)}${c.porConfirmar?' + productos por confirmar':''}\nQuiero pagar con ${forma}.`;
  }
  function pintarCarrito(){
    const el=$id('td-carro-cuerpo'), c=cuentas();
    if(!carrito.length){
      el.innerHTML = `<div class="td-carro-vacio">${ICO_CARRO}<p>Tu carrito está vacío.</p><button class="td-btn pri" data-cerrar-carro>Ver productos</button></div>`; return;
    }
    const ids = [...new Set(carrito.flatMap(x=>RELACION[x.cat]||[]))].filter(id=>!carrito.some(x=>x.id===id));
    const recos = ids.slice(0,4).map(porId).filter(Boolean);
    el.innerHTML = `
      <ul class="td-items">${carrito.map((x,i)=>`<li>
        <div class="mini">${x.foto?`<img src="${x.foto}" alt="">`:marcador(x.n)}</div>
        <div class="dat"><b>${esc(x.n)}</b>${x.et?`<span>${esc(x.et)}</span>`:''}
          <div class="fila">${x.unico?'<span class="td-nota">Pieza única</span>':`<div class="td-cant"><button data-mas="${i}" data-d="-1" aria-label="Menos">−</button><output>${x.cant}</output><button data-mas="${i}" data-d="1" aria-label="Más">+</button></div>`}
          <button class="td-quitar" data-quitar="${i}">Quitar</button></div></div>
        <div class="pr">${x.precio==null?'<small>Por confirmar</small>':$(x.precio*x.cant)}</div></li>`).join('')}</ul>
      ${recos.length?`<div class="td-carro-reco"><div class="td-lbl">Complétalo con</div>${recos.map(p=>`<button class="td-reco-mini" data-id="${p.id}">${p.foto?`<img src="${p.foto[0]}" alt="">`:'<i></i>'}<span>${esc(p.n)}</span><b>${p.sinPrecio?'Agregar':$(p.desde)}</b></button>`).join('')}</div>`:''}
      <div class="td-desglose"><div><span>Productos</span><span>${$(c.prod)}</span></div><div><span>Envío</span><span>${c.envTxt}</span></div>
        ${c.porConfirmar?`<div><span>${c.porConfirmar} producto${c.porConfirmar>1?'s':''} por confirmar</span><span>por WhatsApp</span></div>`:''}
        <div class="tot"><span>Total de contado</span><span>${$(c.total)}</span></div></div>
      <div class="td-lbl">¿Cómo quieres pagar?</div>
      <div class="td-pago">
        <label><input type="radio" name="tdpago" value="spei" ${pago.forma==='spei'?'checked':''}><div><b>Transferencia SPEI · ${$(c.total)}</b><span>Precio de contado. Te damos la CLABE y tu pedido se aparta al recibir el comprobante.</span></div></label>
        <label><input type="radio" name="tdpago" value="meses" ${pago.forma==='meses'?'checked':''}><div><b>Meses con tarjeta de crédito</b><span>Pago seguro con Mercado Pago.</span>
          ${pago.forma==='meses'?`<div class="td-plazos">${PLAZOS.map(n=>`<button type="button" data-plazo="${n}" aria-pressed="${pago.plazo===n}"><b>${n} meses</b> de ${$c(mensual(c.total,n))}<small>Total ${$c(totalMeses(c.total,n))}</small></button>`).join('')}</div>`:''}</div></label>
        <label><input type="radio" name="tdpago" value="apartado" ${pago.forma==='apartado'?'checked':''}><div><b>Apartar con 50% · ${$(c.total/2)}</b><span>Por transferencia; liquidas el resto antes del envío.</span></div></label>
      </div>
      <a class="td-btn pri grande" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent(mensajeCarrito(c))}">Enviar mi pedido por WhatsApp</a>
      <p class="td-nota">Te confirmamos existencias${c.porConfirmar?' y precios pendientes':''} y te mandamos ${pago.forma==='meses'?'tu liga de pago de Mercado Pago':'la cuenta para tu transferencia'}. ¿Primera vez con nosotros? <a href="respaldo.html" target="_blank" rel="noopener">Conoce nuestro respaldo</a>.</p>`;
  }
  const carro=$id('td-carro');
  function abrirCarrito(){ pintarCarrito(); carro.classList.add('ab'); document.body.style.overflow='hidden'; }
  function cerrarCarrito(){ carro.classList.remove('ab'); document.body.style.overflow=''; }
  carro.onclick = e=>{
    if(e.target===carro || e.target.closest('[data-cerrar-carro]')) return cerrarCarrito();
    const t=e.target.closest('button,input'); if(!t) return;
    if(t.dataset.mas){ const x=carrito[+t.dataset.mas]; x.cant=Math.max(1,Math.min(20,x.cant + +t.dataset.d)); }
    else if(t.dataset.quitar){ carrito.splice(+t.dataset.quitar,1); }
    else if(t.dataset.plazo){ e.preventDefault(); pago.plazo=+t.dataset.plazo; }
    else if(t.name==='tdpago'){ if(pago.forma===t.value) return; pago.forma=t.value; }
    else if(t.dataset.id){ cerrarCarrito(); return abrir(t.dataset.id); }
    else return;
    guardar(); pintarCarrito();
  };
  $id('td-boton-carro').onclick = abrirCarrito;
  let tAviso;
  function aviso(txt){ const a=$id('td-aviso-carro'); a.innerHTML=`<span>${esc(txt)}</span><button data-ver>Ver carrito</button>`; a.classList.add('ve');
    clearTimeout(tAviso); tAviso=setTimeout(()=>a.classList.remove('ve'),3500); }
  $id('td-aviso-carro').onclick = e=>{ if(e.target.closest('[data-ver]')){ $id('td-aviso-carro').classList.remove('ve'); cerrar(); abrirCarrito(); } };

  /* ---------- Ficha ---------- */
  const velo=$id('td-velo'), ficha=$id('td-ficha');
  let f = {}, empujado = false;
  function abrir(id, sinHistorial){
    const p = porId(id); if(!p) return;
    const conStock = p.opciones.findIndex(o=>o.stock>0);
    f = {p, op:Math.max(0,conStock), cant:1, foto:0, listo:false};
    pintarFicha(); velo.classList.add('ab'); document.body.style.overflow='hidden'; velo.scrollTop=0;
    if(!sinHistorial && !velo.classList.contains('ab')){ history.pushState({tienda:id}, '', '#'+id); empujado = true; }
    setTimeout(()=>{ const c=ficha.querySelector('.td-cerrar'); if(c) c.focus(); },0);
  }
  function cerrar(desdeHistorial){
    if(!velo.classList.contains('ab')) return;
    velo.classList.remove('ab'); document.body.style.overflow='';
    if(!desdeHistorial && empujado) history.back();
    else if(!desdeHistorial && location.hash) history.replaceState(null, '', location.pathname + location.search);
    empujado = false;
  }
  window.addEventListener('popstate', ()=>{ if(velo.classList.contains('ab')) cerrar(true); });
  velo.onclick = e=>{ if(e.target===velo) cerrar(); };
  document.addEventListener('keydown', e=>{ if(e.key!=='Escape') return; if(carro.classList.contains('ab')) cerrarCarrito(); else cerrar(); });

  function calc(){
    const p=f.p, o=p.opciones[f.op], cant=p.unico?1:f.cant, enStock=o.stock>=cant;
    const dias = enStock ? (p.stockDias||T_STOCK) : (p.pedido?p.pedido.dias:p.dias);
    let prod=(o.precio||0)*cant, env=0, envTxt='';
    if(p.cat==='perim') envTxt='Incluido';
    else if(p.envio==='port'){ env=envioPort(cant)*IVA; envTxt=$(env); }
    else if(p.envio==='dep'){ env=envioDep(p.sub*cant)*IVA; envTxt=$(env); }
    return {o,cant,enStock,dias,prod,env,envTxt,total:prod+env};
  }
  function pintarFicha(){
    const p=f.p, c=calc();
    const relacion = filaRecomendados((RELACION[p.cat]||[]), p.cat==='port' ? 'Complétalo con' : 'También te puede interesar', p.id);
    let cuerpo;
    if(p.sinPrecio){
      cuerpo = `<span class="td-estado prox">Precio por confirmar</span>
        <p class="td-nota" style="font-size:14px">Agrégalo a tu pedido y te confirmamos precio y disponibilidad por WhatsApp junto con lo demás.</p>
        ${p.unico?'':`<div class="td-cant"><span class="td-lbl">Cantidad</span><button data-c="-1" aria-label="Menos">−</button><output>${c.cant}</output><button data-c="1" aria-label="Más">+</button></div>`}
        <div class="td-btns"><button class="td-btn pri" data-agregar>${f.listo?'Agregar otro':'Agregar al carrito'}</button><a class="td-btn sec" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent('Hola, me interesa '+p.n.toLowerCase()+' de su tienda en línea. ¿Qué opciones y precios tienen?')}">Preguntar</a></div>`;
    } else {
      cuerpo = `
        <div><div class="td-lbl">${p.cat==='perim'||p.id==='otras'?'Medida (ancho × largo)':'Color'}</div>
          <div class="td-opciones" role="group" aria-label="Opciones">${p.opciones.map((o,i)=>`<button class="td-op" data-op="${i}" aria-pressed="${i===f.op}">${o.color?sw(o.color):''}${esc(o.et)}${o.sub?` <span class="med">${o.sub}</span>`:''}
            <em class="${o.stock?'':'p'}">${o.stock?(o.stock>1?o.stock+' listas':'lista'):'sobre pedido'}</em></button>`).join('')}</div></div>
        ${p.unico?'':`<div class="td-cant"><span class="td-lbl">Cantidad</span><button data-c="-1" aria-label="Menos">−</button><output>${c.cant}</output><button data-c="1" aria-label="Más">+</button>${p.par&&c.cant===1?'<span class="td-nota">Lo usual es un par (2 redes)</span>':''}</div>`}
        ${c.enStock ? `<span class="td-estado ok">Lista para enviar · sale en ${c.dias[0]}–${c.dias[1]} días hábiles${p.cat==='volei'?' (incluye la lona)':''}</span>`
                    : `<span class="td-estado ped">Sobre pedido · se fabrica en ${c.dias[0]}–${c.dias[1]} días hábiles${p.cat==='volei'?' + lona':''}</span>`}
        <div class="td-desglose"><div><span>${p.unico?'Red':`${c.cant} red${c.cant>1?'es':''}`}</span><span>${$(c.prod)}</span></div><div><span>Envío</span><span>${c.envTxt}</span></div>
          <div class="tot"><span>Total de contado</span><span>${$(c.total)}</span></div><span class="td-nota">Con IVA, pagando por transferencia. O hasta 18 meses de ${$c(mensual(c.total,18))} con tarjeta de crédito.</span></div>
        <div class="td-btns"><button class="td-btn pri" data-agregar>${f.listo&&p.unico?'Ya está en tu carrito':'Agregar al carrito'}</button><a class="td-btn sec" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent('Hola, tengo una pregunta sobre '+p.n+' ('+c.o.et+') de su tienda en línea.')}">Preguntar</a></div>
        <p class="td-nota">Se vende la red. El marco o los postes de las fotos no están incluidos.</p>`;
    }
    const listo = f.listo ? `<div class="td-listo"><b>Agregado a tu carrito</b><div><button class="td-btn sec" data-seguir>Seguir comprando</button><button class="td-btn pri" data-ir-carro>Ver carrito y pagar</button></div></div>` : '';
    ficha.innerHTML = `<button class="td-cerrar" aria-label="Cerrar">×</button>
      <div class="galeria">${p.foto?`<div class="gp"><img src="${p.foto[f.foto]}" alt="${esc(p.n)}"></div>
        ${p.foto.length>1?`<div class="mini">${p.foto.map((s,i)=>`<button data-foto="${i}" aria-pressed="${i===f.foto}" aria-label="Foto ${i+1}"><img src="${s}" alt=""></button>`).join('')}</div>`:''}`:`<div class="gp">${marcador(p.n)}</div>`}</div>
      <div class="info"><div><h2 id="td-ftitulo">${esc(p.n)}</h2><div class="med">${esc(p.med)}</div></div><p class="td-nota" style="font-size:14px;color:inherit">${esc(p.uso)}</p>${listo}${cuerpo}</div>
      ${relacion?`<div class="td-ficha-reco">${relacion}</div>`:''}`;
  }
  ficha.onclick = e=>{
    const t = e.target.closest('button,input'); if(!t) return;
    if(t.classList.contains('td-cerrar')) return cerrar();
    if(t.dataset.op) f.op=+t.dataset.op;
    else if(t.dataset.c) f.cant=Math.max(1,Math.min(20,f.cant + +t.dataset.c));
    else if(t.dataset.foto) f.foto=+t.dataset.foto;
    else if(t.hasAttribute('data-agregar')){ if(f.listo && f.p.unico) { cerrar(); return abrirCarrito(); } agregar(f.p, f.op, f.cant, true); f.listo=true; }
    else if(t.hasAttribute('data-seguir')) return cerrar();
    else if(t.hasAttribute('data-ir-carro')){ cerrar(); return abrirCarrito(); }
    else if(t.classList.contains('td-card') && t.dataset.id){ return abrir(t.dataset.id, true); }
    else return;
    pintarFicha();
  };

  /* ---------- Eventos del catálogo ---------- */
  elCats.onclick = e=>{ const b=e.target.closest('.td-cat'); if(!b) return; st.cat = st.cat===b.dataset.cat ? 'todo' : b.dataset.cat; pintar(); $id('td-catalogo').scrollIntoView({behavior:'smooth'}); };
  $id('td-q').oninput = e=>{ st.q=e.target.value; pintar(); };
  document.querySelector('.td').addEventListener('click', e=>{
    const v=e.target.closest('.td-vertodo'); if(v){ st.cat=v.dataset.cat; pintar(); $id('td-catalogo').scrollIntoView({behavior:'smooth'}); return; }
    const b=e.target.closest('.td-card'); if(b && !ficha.contains(b)) abrir(b.dataset.id);
  });

  /* ---------- Carga: Inventarios en vivo, o la copia de muestra ---------- */
  function arrancar(filas, enVivo){
    PRODUCTOS = construir(filas);
    carrito = carrito.filter(x=>porId(x.id)); // quita lo que ya no existe
    const av = $id('td-origen'); if(av) av.textContent = enVivo ? '' : 'Existencias de Inventarios al 21-nov-2026';
    pintar(); pintarBoton();
    const h = location.hash.slice(1); if(h && porId(h)) abrir(h, true);
  }
  const usarMuestra = ()=> arrancar(typeof TIENDA_MUESTRA!=='undefined' ? TIENDA_MUESTRA : [], false);
  if(typeof sitioRpc === 'function'){
    sitioRpc('tienda_existencias', {}).then(d=>{ if(Array.isArray(d) && d.length) arrancar(d, true); else usarMuestra(); }).catch(usarMuestra);
  } else usarMuestra();
})();
