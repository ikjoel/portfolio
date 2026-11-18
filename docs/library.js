// Design library: filter by product, and switch every screen between mockup and wireframe.
(() => {
  const prods = [...document.querySelectorAll('.prod')];
  const filters = [...document.querySelectorAll('.f')];
  filters.forEach((b) => b.addEventListener('click', () => {
    filters.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    prods.forEach((p) => { p.hidden = b.dataset.p !== 'all' && p.dataset.p !== b.dataset.p; });
  }));
  const t = document.getElementById('wire');
  t.addEventListener('click', () => {
    const wire = t.getAttribute('aria-pressed') !== 'true';
    t.setAttribute('aria-pressed', String(wire));
    t.textContent = wire ? 'Show finished designs' : 'Show wireframes';
    document.querySelectorAll('.s-mock').forEach((i) => { i.hidden = wire; });
    document.querySelectorAll('.s-wire').forEach((i) => { i.hidden = !wire; });
  });
})();
