// Portfolio behaviour: theme switch, menu, header on scroll, reveal on scroll, hover previews, counters,
// wireframe toggle and the contact form (opens the visitor's own email program). Everything works without it except these niceties.
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const store = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };

  // theme
  const saved = store.get('theme');
  root.dataset.theme = saved || 'dark';
  const tbtn = $('#theme');
  const paint = () => { if (tbtn) { const light = root.dataset.theme === 'light'; tbtn.textContent = light ? '☾' : '☀'; tbtn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme'); } };
  paint();
  tbtn && tbtn.addEventListener('click', () => { root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light'; store.set('theme', root.dataset.theme); paint(); });

  // header becomes solid after scrolling
  const hd = $('.hd');
  const onScroll = () => hd && hd.classList.toggle('solid', window.scrollY > 24);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // full-screen menu on small screens
  const sheet = $('#sheet'), open = $('#menu'), close = $('#closeMenu');
  const setMenu = (v) => { if (!sheet) return; sheet.classList.toggle('open', v); sheet.setAttribute('aria-hidden', String(!v)); document.body.style.overflow = v ? 'hidden' : ''; if (v) close && close.focus(); else open && open.focus(); };
  open && open.addEventListener('click', () => setMenu(true));
  close && close.addEventListener('click', () => setMenu(false));
  $$('#sheet a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // reveal on scroll
  const rv = $$('.rv');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    rv.forEach((el) => io.observe(el));
  } else rv.forEach((el) => el.classList.add('in'));

  // counters
  $$('[data-count]').forEach((el) => {
    const end = parseInt(el.dataset.count, 10), suffix = el.dataset.suffix || '';
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = end + suffix; return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now(), dur = 1100;
      const tick = (t) => { const p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix; if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }), { threshold: 0.6 });
    io.observe(el);
  });

  // project rows: a preview that follows the pointer (wide screens)
  if (matchMedia('(min-width: 960px) and (hover: hover)').matches) {
    $$('.prow').forEach((row) => {
      const th = $('.thumb', row); if (!th) return;
      row.addEventListener('mouseenter', () => row.classList.add('show'));
      row.addEventListener('mouseleave', () => row.classList.remove('show'));
      row.addEventListener('mousemove', (e) => { th.style.left = Math.min(innerWidth - 370, e.clientX + 30) + 'px'; th.style.top = Math.max(90, e.clientY - 120) + 'px'; });
    });
  }

  // wireframe / finished design toggle on a figure
  $$('[data-toggle]').forEach((b) => b.addEventListener('click', () => {
    const fig = b.closest('.shot'), wire = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', String(wire)); b.textContent = wire ? 'Show finished design' : 'Show wireframe';
    $('.s-mock', fig).hidden = wire; $('.s-wire', fig).hidden = !wire;
  }));

  // contact form: opens the visitor's email program with the message filled in
  const form = $('#contactForm');
  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const body = `${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})`;
    location.href = `mailto:${form.dataset.to}?subject=${encodeURIComponent('Hello from your portfolio')}&body=${encodeURIComponent(body)}`;
  });
  const y = $('#y'); if (y) y.textContent = new Date().getFullYear();
})();
