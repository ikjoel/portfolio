// The only script on the site: the wireframe / mockup switch on each project card.
// Without JavaScript the page still works: it simply shows the finished mockups.
(() => {
  document.getElementById('y').textContent = new Date().getFullYear();

  document.querySelectorAll('[data-project]').forEach((card) => {
    const btn = card.querySelector('.toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const wire = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(wire));
      btn.textContent = wire ? 'Show finished design' : 'Show wireframe';
      card.querySelectorAll('.shot').forEach((shot) => {
        shot.dataset.state = wire ? 'wire' : 'mock';
        shot.querySelector('.s-mock').hidden = wire;
        shot.querySelector('.s-wire').hidden = !wire;
      });
    });
  });
})();
