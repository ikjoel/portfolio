// Shared interface parts used by every screen: app shells, tables, tabs, switches, forms.
// They only call the drawing primitives from lib.mjs, so each part renders as wireframe or mockup automatically.

export const SP_NAV = ['Dashboard', 'Start here', 'Students', 'Academics', 'Results', 'Finance', 'E-Class', 'CBT exams', 'School website', 'Billing', 'Help'];

/** StudyPat school sidebar + top bar. Returns the content origin. */
export function spShell(d, o) {
  const { active = 'Dashboard', title = active, sub = '', action = null, chip = '2026/2027 · First Term', user = 'MO', nav = SP_NAV, brand = 'StudyPat' } = o;
  d.R(0, 0, 248, d.H, { f: 'surface', s: 'line', r: 0 });
  d.R(28, 24, 34, 34, { f: 'primary', r: 10 }); d.T(76, 49, brand, { z: 21, w: 800 });
  nav.forEach((l, i) => {
    const y = 92 + i * 46, a = l === active;
    if (a) d.R(14, y - 4, 220, 40, { f: 'soft', r: 10 });
    d.Icon(30, y + 5, 18, { f: a ? 'primary' : 'soft' }); d.T(62, y + 19, l, { z: 14.5, w: a ? 700 : 500, f: a ? 'primary' : 'ink' });
  });
  d.R(248, 0, d.W - 248, 72, { f: 'surface', s: 'line', r: 0 }); d.T(284, 45, title, { z: 22, w: 800 });
  if (chip) d.Chip(d.W - 350, 25, chip, { k: 'info' });
  d.Avatar(d.W - 72, 36, 18, user);
  if (sub) d.T(284, 112, sub, { z: 14, f: 'muted' });
  if (action) d.Btn(d.W - 36 - action.w, 92, action.w, 44, action.label, { z: 14, k: action.k ?? 'primary' });
  return { x: 284, y: 156, w: d.W - 320 };
}

/** Dark top-bar shell used by the Chuvor products. */
export function topShell(d, o) {
  const { brand = ['CHUVOR', 'CBT'], links = [], active = 0, tail = '' } = o;
  d.R(0, 0, d.W, 72, { f: 'dark', r: 0 });
  d.T(32, 45, brand[0], { z: 20, w: 800, f: 'onDark' }); d.T(32 + brand[0].length * 14 + 10, 45, brand[1], { z: 20, w: 800, f: 'accent' });
  links.forEach((l, i) => d.T(420 + i * 150, 45, l, { z: 14.5, w: i === active ? 800 : 500, f: i === active ? 'accent' : 'onDark' }));
  if (tail) d.T(d.W - 32, 45, tail, { z: 14, f: 'onDark', a: 'end' });
}

export function tabs(d, x, y, items, active = 0, gap = 28) {
  let cx = x;
  items.forEach((t, i) => {
    const w = Math.round(t.length * 8 + 4);
    d.T(cx, y, t, { z: 14.5, w: i === active ? 800 : 500, f: i === active ? 'primary' : 'muted' });
    if (i === active) d.R(cx, y + 10, w, 3, { f: 'accent', r: 2 });
    cx += w + gap;
  });
  d.Ln(x, y + 12, x + 1000, y + 12, { s: 'line' });
}

export function sw(d, x, y, on = true) {
  d.R(x, y, 44, 24, { f: on ? 'primary' : 'soft', s: d.wire ? 'line' : null, r: 12 });
  d.C(on ? x + 32 : x + 12, y + 12, 9, { f: 'surface', s: d.wire ? 'line' : null });
}
export function chk(d, x, y, on = true) {
  d.R(x, y, 20, 20, { f: on ? 'primary' : 'surface', s: 'line', r: 5, sw: d.wire ? 1.5 : 1 });
  if (on) d.T(x + 10, y + 15, '✓', { z: 13, w: 800, f: 'onPrimary', a: 'middle' });
}
export function radio(d, x, y, on = true) { d.C(x, y, 9, { f: 'surface', s: 'line', sw: 1.5 }); if (on) d.C(x, y, 5, { f: 'primary', s: d.wire ? 'line' : null }); }
export function sel(d, x, y, w, label, val) {
  d.T(x, y, label, { z: 12, w: 600, f: 'muted' });
  d.R(x, y + 8, w, 40, { f: 'surface', s: 'line', r: 9, sw: d.wire ? 1.5 : 1 }); d.T(x + 14, y + 33, val, { z: 14 }); d.T(x + w - 22, y + 33, '▾', { z: 13, f: 'muted' });
}
export function search(d, x, y, w, ph = 'Search') {
  d.R(x, y, w, 40, { f: 'surface', s: 'line', r: 10, sw: d.wire ? 1.5 : 1 }); d.T(x + 40, y + 25, ph, { z: 14, f: 'muted' }); d.R(x + 14, y + 12, 16, 16, { f: 'soft', s: d.wire ? 'line' : null, r: 8 });
}
export function pager(d, x, y, text = 'Showing 1–8 of 482') {
  d.T(x, y, text, { z: 13, f: 'muted' });
  ['‹', '1', '2', '3', '›'].forEach((t, i) => { d.R(x + 640 + i * 40, y - 20, 32, 32, { f: i === 1 ? 'primary' : 'surface', s: 'line', r: 8 }); d.T(x + 656 + i * 40, y, t, { z: 13, w: 700, f: i === 1 ? 'onPrimary' : 'ink', a: 'middle' }); });
}
export function kpi(d, x, y, w, label, val, sub = '', k = 'muted') {
  d.Card(x, y, w, 104, { r: 14 }); d.T(x + 22, y + 34, label, { z: 13, f: 'muted', w: 600 }); d.T(x + 22, y + 74, val, { z: 30, w: 800 });
  if (sub) { const cw = Math.round(sub.length * 6.6 + 22); d.Chip(x + w - 20 - cw, y + 50, sub, { k }); }
}
export function paper(d, x, y, w, h) { d.R(x, y, w, h, { f: 'surface', s: 'line', r: 4, sh: true }); }
export function browser(d, x, y, w, h, url) {
  d.R(x, y, w, h, { f: 'surface', s: 'line', r: 12, sh: true }); d.R(x, y, w, 40, { f: 'soft', r: 12 }); d.R(x, y + 24, w, 16, { f: 'soft', r: 0 });
  [0, 1, 2].forEach((i) => d.C(x + 20 + i * 18, y + 20, 5, { f: 'line' })); d.R(x + 90, y + 8, w - 120, 24, { f: 'surface', s: 'line', r: 12 }); d.T(x + 106, y + 25, url, { z: 12, f: 'muted' });
}
export function heading(d, x, y, t, s = '') { d.T(x, y, t, { z: 17, w: 800 }); if (s) d.T(x, y + 22, s, { z: 12.5, f: 'muted' }); }

/**
 * Table in a card. cols: [{h, x, a}] (x = offset from the card's left padding, a = 'end' to right-align)
 * cells: string | {b} | {chip,k} | {av,sub} | {btn,k,w} | {bar} | {in} | {chk}
 */
export function table(d, x, y, w, cols, rows, o = {}) {
  const { rowH = 52, title = '', sub = '' } = o;
  const top = title ? 70 : 0, hh = 44, H = top + hh + rows.length * rowH + 12;
  d.Card(x, y, w, H, { r: 16 });
  if (title) heading(d, x + 24, y + 34, title, sub);
  cols.forEach((c) => d.T(x + 24 + c.x, y + top + 28, c.h, { z: 12, w: 700, f: 'muted', a: c.a === 'end' ? 'end' : 'start' }));
  d.Ln(x + 24, y + top + hh - 6, x + w - 24, y + top + hh - 6);
  rows.forEach((r, i) => {
    const ry = y + top + hh + i * rowH, base = ry + rowH / 2 + 5;
    if (i) d.Ln(x + 24, ry, x + w - 24, ry, { s: 'soft' });
    r.forEach((c, j) => {
      const col = cols[j], cx = x + 24 + col.x, end = col.a === 'end';
      if (typeof c === 'string') d.T(cx, base, c, { z: 13.5, a: end ? 'end' : 'start', f: j === 0 ? 'ink' : 'muted' });
      else if (c.b) d.T(cx, base, c.b, { z: 13.5, w: 700, a: end ? 'end' : 'start' });
      else if (c.chip) d.Chip(end ? cx - Math.round(c.chip.length * 6.6 + 22) : cx, base - 20, c.chip, { k: c.k });
      else if (c.av) { d.Avatar(cx + 15, base - 5, 15, c.av[0]); d.T(cx + 38, base - (c.sub ? 4 : 0), c.av, { z: 13.5, w: 700 }); if (c.sub) d.T(cx + 38, base + 12, c.sub, { z: 11.5, f: 'muted' }); }
      else if (c.btn) d.Btn(end ? cx - (c.w ?? 84) : cx, base - 19, c.w ?? 84, 34, c.btn, { k: c.k ?? 'ghost', z: 12.5 });
      else if (c.bar != null) { d.Prog(cx, base - 4, c.w ?? 110, c.bar, { h: 8 }); }
      else if (c.in != null) { d.R(cx, base - 20, c.w ?? 64, 36, { f: 'surface', s: 'line', r: 8, sw: d.wire ? 1.5 : 1 }); d.T(cx + (c.w ?? 64) / 2, base + 3, String(c.in), { z: 14, w: 700, a: 'middle' }); }
      else if (c.chk != null) chk(d, cx, base - 15, c.chk);
    });
  });
  return y + H;
}
