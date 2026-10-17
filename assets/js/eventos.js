// Sección Eventos: pestañas, mosaico de fotos y visor. Cada página define window.FOTOS = [{f, g, alt}]
// (f = nombre sin extensión en assets/img/eventos/, g = grupo para el mosaico y el visor).
(function () {
  const base = document.body.dataset.nivel === 'sub' ? '../' : '';
  const ruta = f => base + 'assets/img/eventos/' + f;
  const FOTOS = window.FOTOS || [];

  // Pestañas: los botones [data-tab] muestran el panel con el mismo id; el hash permite compartir la pestaña.
  const botones = [...document.querySelectorAll('.ev-tabs [data-tab]')];
  function abrir(id, mover) {
    if (!document.getElementById(id)) return;
    botones.forEach(b => b.setAttribute('aria-selected', b.dataset.tab === id));
    document.querySelectorAll('.ev-panel').forEach(p => { p.hidden = p.id !== id; });
    history.replaceState(null, '', '#' + id);
    if (mover) document.querySelector('.ev-tabs').scrollIntoView({ behavior: 'smooth' });
  }
  botones.forEach(b => b.addEventListener('click', () => abrir(b.dataset.tab, true)));
  document.querySelectorAll('a[data-ir]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); abrir(a.dataset.ir, true); }));
  if (botones.length) abrir(location.hash.slice(1) && document.getElementById(location.hash.slice(1)) ? location.hash.slice(1) : botones[0].dataset.tab, false);

  // Sub-filtros dentro de un panel (por ejemplo 2025 / 2024): muestran solo el mosaico del grupo elegido.
  document.querySelectorAll('.ev-sub').forEach(sub => {
    const bs = [...sub.querySelectorAll('button')];
    bs.forEach(b => b.addEventListener('click', () => {
      bs.forEach(x => x.setAttribute('aria-pressed', x === b));
      sub.parentElement.querySelectorAll('[data-grupo-bloque]').forEach(el => { el.hidden = el.dataset.grupoBloque !== b.dataset.grupo; });
    }));
  });

  document.querySelectorAll('.ev-mosaico[data-grupo]').forEach(cont => {
    cont.innerHTML = FOTOS.map((p, i) => p.g !== cont.dataset.grupo ? '' :
      `<figure data-i="${i}"><img src="${ruta(p.f)}-t.jpg" alt="${p.alt}" loading="lazy"><figcaption>${p.alt}</figcaption></figure>`).join('');
  });

  // Visor: abre la foto grande y navega dentro del mismo grupo.
  const visor = document.getElementById('visor');
  if (!visor) return;
  const vImg = visor.querySelector('img'), vTxt = visor.querySelector('.vtxt');
  let actual = 0;
  const grupo = () => FOTOS.map((p, i) => i).filter(i => FOTOS[i].g === FOTOS[actual].g);
  function mostrar(i) { actual = i; const p = FOTOS[i]; vImg.src = ruta(p.f) + '.jpg'; vImg.alt = p.alt; vTxt.textContent = p.alt; }
  function mover(d) { const g = grupo(); mostrar(g[(g.indexOf(actual) + d + g.length) % g.length]); }
  function cerrar() { visor.classList.remove('abierto'); document.body.style.overflow = ''; }
  document.addEventListener('click', e => {
    const fig = e.target.closest('[data-i]');
    if (fig) { mostrar(+fig.dataset.i); visor.classList.add('abierto'); document.body.style.overflow = 'hidden'; }
  });
  visor.querySelector('.vcerrar').onclick = cerrar;
  visor.querySelector('.vant').onclick = () => mover(-1);
  visor.querySelector('.vsig').onclick = () => mover(1);
  visor.addEventListener('click', e => { if (e.target === visor) cerrar(); });
  document.addEventListener('keydown', e => {
    if (!visor.classList.contains('abierto')) return;
    if (e.key === 'Escape') cerrar(); else if (e.key === 'ArrowLeft') mover(-1); else if (e.key === 'ArrowRight') mover(1);
  });
  let x0 = null;
  visor.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  visor.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) mover(dx < 0 ? 1 : -1); x0 = null; });
})();
