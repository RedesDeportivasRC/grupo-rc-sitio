/* ==========================================================================
   GRUPO RC — Cotizador previo (va DENTRO de cada página de producto)
   Uso: <div data-cotizador-previo="perimetral"></div> + este archivo + cotizador-previo.css
   Productos: perimetral, proteccion, porterias, redes_porteria, deportivas, jaulas, baloneras.

   El cliente NO ve precios: arma lo que necesita, deja sus datos y toca "Solicitar
   cotización". /api/solicitar-cotizacion crea el lead en el CRM y guarda los productos
   en el mismo formato del cotizador interno (tipo + medidas), para que el vendedor la
   abra con todo cargado, ponga precio y envíe. Necesita data.js (ESTADOS_MEXICO) y
   common.js (rutaBase).
   ========================================================================== */
(function(){
  const WA = '529995538184';
  const num = (v)=>{ const n = parseFloat(String(v == null ? '' : v).replace(',', '.')); return isFinite(n) && n > 0 ? n : 0; };
  const ent = (v)=> Math.round(num(v));
  const fmt = (n)=> (Math.round(n*100)/100).toLocaleString('es-MX', { maximumFractionDigits:2 });
  const esc = (t)=> String(t == null ? '' : t).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pz = (n, uno, varios)=> `${n} ${n === 1 ? uno : varios}`;

  // ---------- piezas de interfaz reutilizables ----------
  const chips = (grupo, opciones, elegido)=> `<div class="cp-chips" role="group">${opciones.map(o=>
    `<button type="button" class="cp-chip" data-grupo="${grupo}" data-valor="${esc(o.v)}" aria-pressed="${String(o.v) === String(elegido)}">${o.t}${o.s ? `<small>${o.s}</small>` : ''}</button>`).join('')}</div>`;
  const medida = (clave, etiqueta, valor, sinUnidad)=> `<div><label>${etiqueta}</label><div class="${sinUnidad ? '' : 'cp-unidad'}"><input type="number" inputmode="decimal" step="0.01" min="0" data-campo="${clave}" value="${esc(valor)}"></div></div>`;
  const cantidad = (clave, etiqueta, valor)=> `<div><label>${etiqueta}</label><input type="number" inputmode="numeric" step="1" min="0" data-campo="${clave}" value="${esc(valor)}"></div>`;

  // Tabla de secciones Cant. × Largo × Altura (igual que el cotizador: Tab en la última agrega otra).
  function tablaSecciones(filas, etqAlto){
    return `
      <table class="cp-tabla">
        <thead><tr><th style="width:70px;">Cant.</th><th>Largo (m)</th><th>${etqAlto} (m)</th><th>m²</th><th></th></tr></thead>
        <tbody>${filas.map((f,i)=>`
          <tr data-fila="${i}">
            <td><input type="number" inputmode="numeric" min="1" step="1" data-col="cant" value="${esc(f.cant)}" aria-label="Cantidad de la sección ${i+1}"></td>
            <td><input type="number" inputmode="decimal" min="0" step="0.01" data-col="largo" value="${esc(f.largo)}" aria-label="Largo de la sección ${i+1}"></td>
            <td><input type="number" inputmode="decimal" min="0" step="0.01" data-col="alto" value="${esc(f.alto)}" aria-label="${etqAlto} de la sección ${i+1}"></td>
            <td class="cp-m2">${fmt(ent(f.cant)*num(f.largo)*num(f.alto))}</td>
            <td>${filas.length > 1 ? `<button type="button" class="cp-quitar" data-quitar="${i}" aria-label="Quitar sección ${i+1}">×</button>` : ''}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      <button type="button" class="cp-agregar" data-agregar>+ Agregar sección</button>
      <p class="cp-tip">Tip: en computadora, al terminar la última sección presiona <b>Tab</b> y se agrega otra.</p>`;
  }
  function conectarSecciones(cont, filas, refrescar, repintar){
    const agregar = ()=>{
      filas.push({ cant:'1', largo:'', alto:'' }); repintar();
      const todas = cont.querySelectorAll('tr[data-fila]');
      todas[todas.length-1].querySelector('[data-col="largo"]').focus();
    };
    cont.querySelectorAll('tr[data-fila] input').forEach(inp=>{
      const tr = inp.closest('tr'), i = +tr.dataset.fila;
      inp.addEventListener('input', ()=>{
        filas[i][inp.dataset.col] = inp.value;
        tr.querySelector('.cp-m2').textContent = fmt(ent(filas[i].cant)*num(filas[i].largo)*num(filas[i].alto));
        refrescar();
      });
      if(inp.dataset.col === 'alto') inp.addEventListener('keydown', e=>{
        if(e.key === 'Tab' && !e.shiftKey && i === filas.length-1 && num(filas[i].largo) && num(filas[i].alto)){ e.preventDefault(); agregar(); }
      });
    });
    cont.querySelectorAll('[data-quitar]').forEach(b=> b.onclick = ()=>{ filas.splice(+b.dataset.quitar, 1); repintar(); });
    const btn = cont.querySelector('[data-agregar]'); if(btn) btn.onclick = agregar;
  }
  const seccionesDeFilas = (filas)=> filas.map(f=>({ cant:ent(f.cant), largo:num(f.largo), alto:num(f.alto) })).filter(s=> s.cant && s.largo && s.alto);
  const m2De = (secs)=> secs.reduce((t,s)=> t + s.cant*s.largo*s.alto, 0);
  const lineasSecciones = (secs, etq)=> secs.map(s=> `${pz(s.cant,'sección','secciones')} de ${fmt(s.largo)} × ${fmt(s.alto)} m${s.nombre ? ' (' + s.nombre + ')' : ''}`);

  const ABERTURAS = [
    { v:'4', t:'4"', s:'fútbol' }, { v:'3', t:'3"', s:'balones grandes' }, { v:'2', t:'2"', s:'más cerrada' },
    { v:'1', t:'1"', s:'golf, béisbol, aves' }, { v:'no_se', t:'No sé, recomiéndenme' },
  ];
  const txtAbertura = (a)=> a === 'anticaidas' ? 'red anticaídas' : (a && a !== 'no_se' ? `abertura ${a}"` : 'abertura por recomendar');

  // Modelos del cotizador interno (CATALOGO_PORTERIAS): solo nombre y medida, nunca precio.
  const MODELOS_PORTERIA = [
    { v:'Oficial', t:'Oficial', s:'7.5 × 2.5 m', trav:7.5, poste:2.5, psup:1, pinf:1.5 },
    { v:'Fut 7 (6m)', t:'Fútbol 7', s:'6 × 2 m', trav:6, poste:2, psup:0.7, pinf:1.2 },
    { v:'Fut 7 (5m)', t:'Fútbol 7', s:'5 × 2 m', trav:5, poste:2, psup:0.7, pinf:1.2 },
    { v:'Microbio', t:'Microbio', s:'3.2 × 1.8 m', trav:3.2, poste:1.8, psup:0.5, pinf:1 },
    { v:'Juvenil', t:'Juvenil', s:'2 × 1.5 m', trav:2, poste:1.5, psup:0.5, pinf:1 },
    { v:'Infantil', t:'Infantil', s:'1.5 × 1 m', trav:1.5, poste:1, psup:1, pinf:1 },
    { v:'Mini', t:'Mini', s:'0.75 × 0.5 m', trav:0.75, poste:0.5, psup:0.5, pinf:0.5 },
  ];

  /* ---------------------------------------------------------------------------
     Cada producto: nombre, estado inicial, pintar(st, refrescar) → HTML,
     conectar(cont, st, refrescar, repintar), calcular(st) → { items, lineas, total, listo }
     --------------------------------------------------------------------------- */
  const PRODUCTOS = {};

  // ---- Redes perimetrales: 4 formas con dibujo ----
  const FORMAS = {
    seccion: { t:'1 sección', s:'Una sola sección de red.', img:'red-perimetral-una-seccion', ayuda:'Largo de la red y altura, en metros.' },
    perimetro: { t:'Perímetro (4 lados)', s:'Red en todo el perímetro.', img:'red-perimetral-perimetro-4-lados', ayuda:'Con el largo, el ancho y la altura del área calculamos los 4 lados.' },
    jaula: { t:'Jaula (con techo)', s:'Red en los 4 lados y techo.', img:'red-perimetral-jaula-con-techo', ayuda:'Con el largo, el ancho y la altura calculamos los 4 lados y el techo.' },
    personalizado: { t:'Personalizado', s:'Varias secciones a tu medida.', img:'red-perimetral-personalizada-varias-secciones', ayuda:'Agrega cada sección con su cantidad, largo y altura. Si hay varias iguales, pon la cantidad.' },
  };
  PRODUCTOS.perimetral = {
    nombre:'red perimetral',
    inicial: ()=>({ forma:null, largo:'', ancho:'', alto:'', filas:[{ cant:'1', largo:'', alto:'' }], abertura:null }),
    pintar(st){
      const img = rutaBase() + 'assets/img/cotizar/';
      let h = `<h3 class="cp-titulo"><span class="cp-num">1</span>¿Qué necesitas cubrir?</h3>
        <div class="cp-opciones" role="group">${Object.entries(FORMAS).map(([k,f])=>`
          <button type="button" class="cp-opcion" data-grupo="forma" data-valor="${k}" aria-pressed="${st.forma === k}">
            <img src="${img}${f.img}.webp" alt="Dibujo de red perimetral: ${esc(f.s.toLowerCase())}" width="705" height="330" loading="lazy">
            <div class="cp-opcion-txt"><b>${f.t}</b><span>${f.s}</span></div>
          </button>`).join('')}</div>`;
      if(!st.forma) return h;
      h += `<h4 class="cp-sub">Medidas</h4><p class="cp-ayuda">${FORMAS[st.forma].ayuda}</p>`;
      h += st.forma === 'personalizado' ? tablaSecciones(st.filas, 'Altura')
        : `<div class="cp-campos">${medida('largo','Largo',st.largo)}${st.forma === 'seccion' ? '' : medida('ancho','Ancho',st.ancho)}${medida('alto','Altura',st.alto)}</div>`;
      h += `<h4 class="cp-sub">Abertura de la malla</h4><p class="cp-ayuda">Se elige según la pelota más pequeña que debe detener la red.</p>${chips('abertura', ABERTURAS, st.abertura)}`;
      return h;
    },
    conectar(cont, st, refrescar, repintar){ if(st.forma === 'personalizado') conectarSecciones(cont, st.filas, refrescar, repintar); },
    calcular(st){
      const L = num(st.largo), A = num(st.ancho), H = num(st.alto);
      let secs = [];
      if(st.forma === 'seccion' && L && H) secs = [{ cant:1, largo:L, alto:H }];
      if((st.forma === 'perimetro' || st.forma === 'jaula') && L && A && H){
        secs = L === A ? [{ cant:4, largo:L, alto:H, nombre:'lados' }]
          : [{ cant:2, largo:L, alto:H, nombre:'lados largos' }, { cant:2, largo:A, alto:H, nombre:'lados cortos' }];
        if(st.forma === 'jaula') secs.push({ cant:1, largo:L, alto:A, nombre:'techo' });
      }
      if(st.forma === 'personalizado') secs = seccionesDeFilas(st.filas);
      if(!secs.length) return { listo:false };
      const abertura = st.abertura || 'no_se';
      return {
        listo:true, forma:st.forma, m2:m2De(secs),
        items:[{ tipo:'perimetral', abertura, secciones:secs.map(s=>({ cant:s.cant, largo:s.largo, alto:s.alto })) }],
        lineas:[`Red perimetral · ${FORMAS[st.forma].t} · ${txtAbertura(abertura)}`, ...lineasSecciones(secs)],
        total:`${fmt(m2De(secs))} m² de red`,
      };
    },
  };

  // ---- Redes de protección (techos, domos, huecos, desniveles) ----
  PRODUCTOS.proteccion = {
    nombre:'red de protección',
    inicial: ()=>({ filas:[{ cant:'1', largo:'', alto:'' }], detener:null, abertura:null }),
    pintar(st){
      return `<h3 class="cp-titulo"><span class="cp-num">1</span>Medidas de cada área</h3>
        <p class="cp-ayuda">Largo y ancho (o alto) de cada área que quieres cubrir. Si hay varias iguales, pon la cantidad.</p>
        ${tablaSecciones(st.filas, 'Ancho o alto')}
        <h4 class="cp-sub">¿Qué debe detener la red?</h4>
        ${chips('detener', [{v:'balones',t:'Balones'},{v:'aves',t:'Aves'},{v:'objetos',t:'Objetos'},{v:'personas',t:'Personas'},{v:'otro',t:'Otro'}], st.detener)}
        <h4 class="cp-sub">Abertura</h4><p class="cp-ayuda">Si no sabes, déjalo en "No sé" y te recomendamos la adecuada.</p>
        ${chips('abertura', [...ABERTURAS.slice(0,4), { v:'anticaidas', t:'Anticaídas', s:'1" para personas' }, ABERTURAS[4]], st.abertura)}`;
    },
    conectar(cont, st, refrescar, repintar){ conectarSecciones(cont, st.filas, refrescar, repintar); },
    calcular(st){
      const secs = seccionesDeFilas(st.filas);
      if(!secs.length) return { listo:false };
      const abertura = st.abertura || 'no_se';
      const DET = { balones:'balones', aves:'aves', objetos:'objetos', personas:'personas', otro:'otro' };
      return {
        listo:true, m2:m2De(secs),
        items:[{ tipo:'perimetral', abertura, secciones:secs }],
        lineas:[`Red de protección · ${txtAbertura(abertura)}${st.detener ? ' · debe detener: ' + DET[st.detener] : ''}`, ...lineasSecciones(secs)],
        total:`${fmt(m2De(secs))} m² de red`,
      };
    },
  };

  // ---- Porterías completas ----
  PRODUCTOS.porterias = {
    nombre:'porterías',
    inicial: ()=>({ modelo:null, trav:'', poste:'', cantidad:'2', acabado:null }),
    pintar(st){
      let h = `<h3 class="cp-titulo"><span class="cp-num">1</span>¿Qué portería necesitas?</h3>
        ${chips('modelo', [...MODELOS_PORTERIA, { v:'Personalizada', t:'Medida especial' }], st.modelo)}`;
      if(!st.modelo) return h;
      if(st.modelo === 'Personalizada') h += `<div class="cp-campos cp-c2">${medida('trav','Ancho (de poste a poste)',st.trav)}${medida('poste','Alto',st.poste)}</div>`;
      h += `<div class="cp-campos cp-c2">${cantidad('cantidad','Piezas (2 = un par)',st.cantidad)}</div>
        <h4 class="cp-sub">Acabado</h4>
        ${chips('acabado', [{v:'galvanizada',t:'Galvanizada'},{v:'blanca',t:'Pintada de blanco'},{v:'acojinada',t:'Acojinada',s:'con tus colores'},{v:'no_se',t:'No sé'}], st.acabado)}`;
      return h;
    },
    calcular(st){
      const n = ent(st.cantidad);
      if(!st.modelo || !n) return { listo:false };
      const m = MODELOS_PORTERIA.find(x=> x.v === st.modelo);
      const esp = st.modelo === 'Personalizada';
      if(esp && !(num(st.trav) && num(st.poste))) return { listo:false };
      const item = { tipo:'porteria_completa', modelo:st.modelo, cantidad:n };
      if(esp){ item.trav = num(st.trav); item.poste = num(st.poste); }
      const ACAB = { galvanizada:'galvanizada', blanca:'pintada de blanco', acojinada:'acojinada', no_se:'acabado por definir' };
      return {
        listo:true, items:[item],
        lineas:[`${pz(n,'portería','porterías')} ${esp ? `de medida especial ${fmt(item.trav)} × ${fmt(item.poste)} m` : `${m.t} (${m.s})`}${st.acabado ? ' · ' + ACAB[st.acabado] : ''}`],
        total:pz(n,'portería','porterías'),
      };
    },
  };

  // ---- Redes para porterías (tipo colmena): las 4 medidas del cotizador ----
  PRODUCTOS.redes_porteria = {
    nombre:'red para portería',
    inicial: ()=>({ modelo:null, cantidad:'2', trav:'', poste:'', psup:'', pinf:'', color:'' }),
    pintar(st){
      return `<h3 class="cp-titulo"><span class="cp-num">1</span>Medidas de tu portería</h3>
        <p class="cp-ayuda">Si tu portería es de una medida estándar, tócala y llenamos las medidas por ti. Si no, mídela.</p>
        ${chips('modelo', [...MODELOS_PORTERIA, { v:'otra', t:'Otra medida' }], st.modelo)}
        <div class="cp-campos cp-c4">${medida('trav','Travesaño (ancho)',st.trav)}${medida('poste','Poste (alto)',st.poste)}${medida('psup','Profundidad arriba',st.psup)}${medida('pinf','Profundidad abajo',st.pinf)}</div>
        <div class="cp-campos cp-c2">${cantidad('cantidad','Redes (2 = un par)',st.cantidad)}<div><label>Color (opcional)</label><input type="text" maxlength="40" data-campo="color" value="${esc(st.color)}"></div></div>`;
    },
    alElegir(st, grupo, valor){
      if(grupo !== 'modelo') return;
      const m = MODELOS_PORTERIA.find(x=> x.v === valor);
      if(m) Object.assign(st, { trav:String(m.trav), poste:String(m.poste), psup:String(m.psup), pinf:String(m.pinf) });
    },
    calcular(st){
      const n = ent(st.cantidad);
      if(!n || !num(st.trav) || !num(st.poste)) return { listo:false };
      const item = { tipo:'porteria', cantidad:n, trav:num(st.trav), poste:num(st.poste), psup:num(st.psup), pinf:num(st.pinf) };
      return {
        listo:true, items:[item],
        lineas:[`${pz(n,'red','redes')} de portería: travesaño ${fmt(item.trav)} m, poste ${fmt(item.poste)} m, profundidad ${fmt(item.psup)} m arriba y ${fmt(item.pinf)} m abajo${st.color.trim() ? ' · color ' + st.color.trim() : ''}`],
        total:pz(n,'red','redes'),
      };
    },
  };

  // ---- Redes deportivas: voleibol, básquetbol, canasta completa ----
  const DEPORTIVAS = [
    { k:'voleibol', t:'Red de voleibol', s:'Cuántas redes' },
    { k:'basquetbol', t:'Red de básquetbol', s:'Cuántas piezas (una por aro)' },
    { k:'canasta', t:'Canasta completa', s:'Aro y red' },
  ];
  PRODUCTOS.deportivas = {
    nombre:'redes deportivas',
    inicial: ()=>({ voleibol:'', basquetbol:'', canasta:'', colores:'' }),
    pintar(st){
      return `<h3 class="cp-titulo"><span class="cp-num">1</span>¿Qué necesitas y cuántas?</h3>
        <div class="cp-lineas">${DEPORTIVAS.map(d=>`
          <label class="cp-linea ${ent(st[d.k]) ? 'activa' : ''}"><div><b>${d.t}</b><span>${d.s}</span></div>
            <input type="number" inputmode="numeric" min="0" step="1" placeholder="0" data-campo="${d.k}" value="${esc(st[d.k])}"></label>`).join('')}
        </div>
        <div class="cp-form" style="margin-top:14px;"><div><label>Colores y letras (opcional)</label><input type="text" maxlength="120" data-campo="colores" value="${esc(st.colores)}" placeholder="Ej. red blanca con contorno azul y el nombre de la escuela"></div></div>`;
    },
    calcular(st){
      const v = ent(st.voleibol), b = ent(st.basquetbol), c = ent(st.canasta);
      if(!v && !b && !c) return { listo:false };
      const items = [], lineas = [];
      if(v){ items.push({ tipo:'voleibol', cantidad:v }); lineas.push(pz(v,'red de voleibol','redes de voleibol')); }
      if(b){ items.push({ tipo:'basquetbol', cantidad:b }); lineas.push(pz(b,'red de básquetbol','redes de básquetbol')); }
      if(c) lineas.push(pz(c,'canasta completa (aro y red)','canastas completas (aro y red)'));
      if(st.colores.trim()) lineas.push('Colores y letras: ' + st.colores.trim());
      return { listo:true, items, lineas, total:pz(v+b+c,'pieza','piezas') };
    },
  };

  // ---- Jaulas de bateo ----
  PRODUCTOS.jaulas = {
    nombre:'jaula de bateo',
    inicial: ()=>({ tipo:null, largo:'', ancho:'', alto:'', cantidad:'1', proteccion:null }),
    pintar(st){
      return `<h3 class="cp-titulo"><span class="cp-num">1</span>¿Qué necesitas?</h3>
        ${chips('tipo', [{v:'completa',t:'Jaula completa',s:'estructura y red'},{v:'red',t:'Solo la red',s:'ya tengo estructura'}], st.tipo)}
        <h4 class="cp-sub">Medidas</h4><p class="cp-ayuda">Profundidad (largo), ancho y alto. Las profundidades más comunes son 10, 15, 20 y 25 m.</p>
        <div class="cp-campos">${medida('largo','Profundidad',st.largo)}${medida('ancho','Ancho',st.ancho)}${medida('alto','Alto',st.alto)}</div>
        <div class="cp-campos cp-c2">${cantidad('cantidad','Cuántas jaulas',st.cantidad)}</div>
        <h4 class="cp-sub">¿La quieres con protección?</h4>
        ${chips('proteccion', [{v:'si',t:'Sí'},{v:'no',t:'No'},{v:'no_se',t:'No sé'}], st.proteccion)}`;
    },
    calcular(st){
      const n = ent(st.cantidad), L = num(st.largo), A = num(st.ancho), H = num(st.alto);
      if(!st.tipo || !n || !L || !A || !H) return { listo:false };
      const PROT = { si:'con protección', no:'sin protección', no_se:'protección por definir' };
      return {
        listo:true,
        items:[{ tipo:'jaula', cantidad:n, largo:L, ancho:A, altura:H }],
        lineas:[`${pz(n,'jaula','jaulas')} de bateo de ${fmt(L)} × ${fmt(A)} × ${fmt(H)} m · ${st.tipo === 'completa' ? 'completa (estructura y red)' : 'solo la red'}${st.proteccion ? ' · ' + PROT[st.proteccion] : ''}`],
        total:pz(n,'jaula','jaulas'),
      };
    },
  };

  // ---- Baloneras (no están en el cotizador: llegan como datos para el vendedor) ----
  PRODUCTOS.baloneras = {
    nombre:'baloneras',
    inicial: ()=>({ deporte:null, balones:'', cantidad:'1', color:'' }),
    pintar(st){
      return `<h3 class="cp-titulo"><span class="cp-num">1</span>¿Qué balonera necesitas?</h3>
        ${chips('deporte', [{v:'futbol',t:'Fútbol'},{v:'voleibol',t:'Voleibol'},{v:'basquetbol',t:'Básquetbol'},{v:'varios',t:'Varios deportes'}], st.deporte)}
        <div class="cp-campos">${cantidad('balones','Balones que debe guardar',st.balones)}${cantidad('cantidad','Cuántas baloneras',st.cantidad)}<div><label>Color (opcional)</label><input type="text" maxlength="40" data-campo="color" value="${esc(st.color)}"></div></div>`;
    },
    calcular(st){
      const n = ent(st.cantidad), b = ent(st.balones);
      if(!st.deporte || !n) return { listo:false };
      const DEP = { futbol:'fútbol', voleibol:'voleibol', basquetbol:'básquetbol', varios:'varios deportes' };
      return {
        listo:true, items:[],
        lineas:[`${pz(n,'balonera','baloneras')} para ${DEP[st.deporte]}${b ? ` de ${b} balones` : ''}${st.color.trim() ? ' · color ' + st.color.trim() : ''}`],
        total:pz(n,'balonera','baloneras'),
      };
    },
  };

  // ---------------------------------------------------------------------------
  function montar(raiz, clave){
    const P = PRODUCTOS[clave];
    if(!P) return;
    let st = P.inicial();
    raiz.classList.add('cp');
    raiz.innerHTML = `
      <div data-flujo>
        <div class="cp-paso" data-producto></div>
        <div class="cp-paso" data-datos hidden>
          <h3 class="cp-titulo"><span class="cp-num">2</span>¿A dónde te mandamos la cotización?</h3>
          <div class="cp-resumen" data-resumen aria-live="polite"></div>
          <form class="cp-form" autocomplete="on" novalidate>
            <input type="text" name="sitioWeb" data-trampa tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;">
            <div class="fila-2">
              <div><label>Nombre</label><input type="text" name="nombre" autocomplete="name" required></div>
              <div><label>WhatsApp (10 dígitos)</label><input type="tel" name="telefono" autocomplete="tel-national" inputmode="numeric" maxlength="14" placeholder="999 123 4567" required></div>
            </div>
            <div class="fila-2">
              <div><label>Correo</label><input type="email" name="correo" autocomplete="email" required></div>
              <div><label>Ciudad</label><input type="text" name="ciudad" autocomplete="address-level2" maxlength="80" required></div>
            </div>
            <div class="fila-2">
              <div><label>Estado</label><select name="estado" autocomplete="address-level1" required><option value="">Selecciona tu estado</option>${(typeof ESTADOS_MEXICO !== 'undefined' ? ESTADOS_MEXICO : []).map(e=>`<option>${esc(e)}</option>`).join('')}</select></div>
              <div></div>
            </div>
            <div><label>Comentarios (opcional)</label><textarea name="comentario" rows="3" placeholder="Ej. para qué la usarás, dónde va o si tienes fecha límite"></textarea></div>
            <div class="cp-error" data-error role="alert"></div>
            <button type="submit" class="btn cp-enviar">Solicitar cotización</button>
            <p class="cp-tip" style="font-size:.88rem;">¿No sabes qué poner? <a data-wa href="https://wa.me/${WA}" target="_blank" rel="noopener" style="color:#1a9e4b;font-weight:700;">Escríbenos directo por WhatsApp</a> y te ayudamos.</p>
          </form>
        </div>
      </div>
      <div class="cp-paso cp-listo" data-listo>
        <h3>✅ ¡Recibimos tu solicitud!</h3>
        <p data-listo-txt></p>
        <div class="cp-listo-botones">
          <a class="btn btn-wa" data-wa-listo href="https://wa.me/${WA}" target="_blank" rel="noopener">💬 Escríbenos por WhatsApp</a>
          <button type="button" class="btn btn-linea" data-otra>Cotizar otra vez</button>
        </div>
      </div>
      <div class="cp-ayuda-wa" data-ayuda>
        <div>
          <h3>¿Quieres que te ayudemos con tu proyecto?</h3>
          <p>Si no tienes claras las medidas o qué te conviene, escríbenos y te asesoramos sin compromiso.</p>
        </div>
        <a class="btn btn-wa" data-wa href="https://wa.me/${WA}" target="_blank" rel="noopener">💬 Escríbenos por WhatsApp</a>
      </div>`;
    const q = (s)=> raiz.querySelector(s);
    const caja = q('[data-producto]'), form = q('form');

    function refrescar(){
      const r = P.calcular(st);
      q('[data-datos]').hidden = !r.listo;
      if(r.listo) q('[data-resumen]').innerHTML = `<h4>Tu solicitud</h4><ul>${r.lineas.map(l=>`<li>${esc(l)}</li>`).join('')}</ul><div class="cp-total">Total: <span>${esc(r.total)}</span></div>`;
      let txt = `Hola, quiero ayuda con mi proyecto de ${P.nombre}.`;
      if(r.listo) txt += ' Tengo pensado: ' + r.lineas.join('; ') + '.';
      raiz.querySelectorAll('[data-wa]').forEach(a=> a.href = `https://wa.me/${WA}?text=${encodeURIComponent(txt)}`);
      return r;
    }
    function repintar(){
      caja.innerHTML = P.pintar(st);
      caja.querySelectorAll('[data-grupo]').forEach(b=> b.addEventListener('click', ()=>{
        const g = b.dataset.grupo, v = b.dataset.valor;
        st[g] = v;
        if(P.alElegir) P.alElegir(st, g, v);
        repintar();
        if(g === 'forma'){
          const primero = caja.querySelector('[data-campo], [data-col="largo"]');
          if(primero) primero.focus({ preventScroll:true });
        }
      }));
      caja.querySelectorAll('[data-campo]').forEach(inp=> inp.addEventListener('input', ()=>{
        st[inp.dataset.campo] = inp.value;
        const linea = inp.closest('.cp-linea'); if(linea) linea.classList.toggle('activa', ent(inp.value) > 0);
        refrescar();
      }));
      if(P.conectar) P.conectar(caja, st, refrescar, repintar);
      refrescar();
    }
    repintar();

    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const r = refrescar(), err = q('[data-error]'), btn = form.querySelector('.cp-enviar');
      const v = (n)=> (form.elements[n].value || '').trim();
      let tel = v('telefono').replace(/\D/g, '');
      if(tel.length === 12 && tel.startsWith('52')) tel = tel.slice(2);
      if(tel.length === 13 && tel.startsWith('521')) tel = tel.slice(3);
      err.textContent = '';
      const falta = (msg, campo)=>{ err.textContent = msg; if(campo) form.elements[campo].focus(); };
      if(!r.listo) return falta('Completa lo que necesitas arriba.');
      if((r.items||[]).some(it=> (it.secciones||[]).some(s=> s.largo > 500 || s.alto > 60))) return falta('Revisa las medidas: parecen demasiado grandes (están en metros).');
      if(!v('nombre')) return falta('Escribe tu nombre.', 'nombre');
      if(tel.length !== 10) return falta('Escribe tu WhatsApp a 10 dígitos.', 'telefono');
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('correo'))) return falta('Escribe un correo válido.', 'correo');
      if(!v('ciudad')) return falta('Escribe tu ciudad.', 'ciudad');
      if(!v('estado')) return falta('Selecciona tu estado.', 'estado');
      btn.disabled = true; btn.textContent = 'Enviando…';
      try{
        const resp = await fetch('/api/solicitar-cotizacion', {
          method:'POST', headers:{ 'Content-Type':'application/json' },
          body: JSON.stringify({
            producto:clave, forma:r.forma || null, items:r.items, detalle:r.lineas, m2:r.m2 || null,
            nombre:v('nombre'), telefono:tel, correo:v('correo'), ciudad:v('ciudad'), estado:v('estado'), comentario:v('comentario'),
            pagina:location.pathname, origenVisita: window.origenVisita ? window.origenVisita() : null,
            sitioWeb: q('[data-trampa]').value,
          }),
        });
        const res = await resp.json().catch(()=> ({}));
        if(!resp.ok) throw new Error(res.error || 'No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.');
        if(window.registrarConversion) registrarConversion('formulario');
        const nombre = v('nombre');
        q('[data-listo-txt]').textContent = `Gracias, ${nombre.split(' ')[0]}. Un asesor revisa tu solicitud (${r.total}) y te manda la cotización por WhatsApp al ${tel.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}.`;
        q('[data-wa-listo]').href = `https://wa.me/${WA}?text=${encodeURIComponent(`Hola, soy ${nombre}. Acabo de pedir una cotización de ${P.nombre} en la página (${r.total}) y tengo una duda.`)}`;
        q('[data-flujo]').style.display = 'none'; q('[data-ayuda]').style.display = 'none';
        q('[data-listo]').style.display = 'block';
        q('[data-listo]').scrollIntoView({ behavior:'smooth', block:'center' });
      }catch(ex){
        err.textContent = ex.message;
      }finally{
        btn.disabled = false; btn.textContent = 'Solicitar cotización';
      }
    });

    q('[data-otra]').onclick = ()=>{
      st = P.inicial();
      q('[data-listo]').style.display = 'none'; q('[data-flujo]').style.display = ''; q('[data-ayuda]').style.display = '';
      repintar();
      raiz.scrollIntoView({ behavior:'smooth', block:'start' });
    };
  }

  window.CotizadorPrevio = { montar, productos: Object.keys(PRODUCTOS) };
  document.querySelectorAll('[data-cotizador-previo]').forEach(el=> montar(el, el.dataset.cotizadorPrevio));
})();
