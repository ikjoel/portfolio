// Tiny drawing kit: describe a screen once, render it as a grey WIREFRAME or as a branded MOCKUP.
// Output is plain SVG (text stays text, shapes stay shapes), so it opens in Figma by drag-and-drop and is editable there.

export const FONT = "'Plus Jakarta Sans','Segoe UI',Arial,sans-serif";

const WIRE = {
  bg: '#ffffff', surface: '#ffffff', soft: '#f0f0f0', line: '#b5b5b5', ink: '#333333', muted: '#8a8a8a',
  primary: '#d6d6d6', onPrimary: '#333333', accent: '#a8a8a8', dark: '#e2e2e2', onDark: '#333333',
  good: '#bdbdbd', goodSoft: '#ececec', warn: '#bdbdbd', warnSoft: '#ececec', bad: '#bdbdbd', badSoft: '#ececec', info: '#bdbdbd', infoSoft: '#ececec',
};

export const PALETTES = {
  studypat: {
    bg: '#F7F6FC', surface: '#FFFFFF', soft: '#EEEDFB', line: '#E8E6F2', ink: '#1B1740', muted: '#6B6890', primary: '#4F46E5', onPrimary: '#FFFFFF',
    accent: '#EF9F27', dark: '#1B1740', onDark: '#FFFFFF',
    good: '#3B6D11', goodSoft: '#EAF3DE', warn: '#633806', warnSoft: '#FAEEDA', bad: '#993C1D', badSoft: '#FAECE7', info: '#185FA5', infoSoft: '#E6F1FB',
  },
  chuvor: {
    bg: '#F4F7FB', surface: '#FFFFFF', soft: '#E8EFF8', line: '#DCE4EF', ink: '#0f2f57', muted: '#5B7090', primary: '#0f2f57', onPrimary: '#FFFFFF',
    accent: '#c9a24a', dark: '#0f2f57', onDark: '#FFFFFF',
    good: '#1E7A4C', goodSoft: '#E3F4EA', warn: '#8A6A12', warnSoft: '#FBF1D6', bad: '#B3372B', badSoft: '#FBE6E3', info: '#2f6fb5', infoSoft: '#E3EEF9',
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function canvas(mode, palName, W, H, title) {
  const wire = mode === 'wire';
  const pal = PALETTES[palName];
  const col = (r) => (r == null ? 'none' : wire ? (WIRE[r] ?? (String(r).startsWith('#') ? r : '#e5e5e5')) : (pal[r] ?? r));
  const out = [];
  const add = (s) => out.push(s);
  const api = {
    wire, W, H, col,
    R(x, y, w, h, o = {}) {
      const { f = 'surface', s = null, r = 10, sh = false, sw = 1, op = 1, dash = null } = o;
      const rad = wire ? Math.min(r, 4) : r;
      add(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rad}" fill="${col(f)}"${f ? '' : ''} ${s ? `stroke="${col(s)}" stroke-width="${sw}"` : ''} ${op !== 1 ? `opacity="${op}"` : ''} ${dash ? `stroke-dasharray="${dash}"` : ''} ${sh && !wire ? 'filter="url(#sh)"' : ''}/>`);
    },
    // a card: in the wireframe it has an outline, in the mockup a soft shadow
    Card(x, y, w, h, o = {}) { api.R(x, y, w, h, { f: o.f ?? 'surface', s: wire ? 'line' : (o.s ?? 'line'), r: o.r ?? 14, sh: true, sw: wire ? 1.5 : 1 }); },
    T(x, y, s, o = {}) {
      const { z = 14, w = 400, f = 'ink', a = 'start', op = 1, mono = false } = o;
      // in a wireframe every text colour role becomes plain dark grey so it stays readable on grey fills
      const tc = wire && ['primary', 'accent', 'onPrimary', 'onDark', 'good', 'warn', 'bad', 'info'].includes(f) ? '#2b2b2b' : col(f);
      add(`<text x="${x}" y="${y}" font-family="${mono ? 'Consolas,monospace' : FONT}" font-size="${z}" font-weight="${w}" fill="${tc}" text-anchor="${a}"${op !== 1 ? ` opacity="${op}"` : ''}>${esc(s)}</text>`);
    },
    Ln(x1, y1, x2, y2, o = {}) {
      const { s = 'line', sw = 1, dash = null } = o;
      add(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col(s)}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`);
    },
    C(cx, cy, r, o = {}) {
      const { f = 'soft', s = null, sw = 1 } = o;
      add(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${col(f)}" ${s ? `stroke="${col(s)}" stroke-width="${sw}"` : ''}/>`);
    },
    Img(x, y, w, h, label = 'image', o = {}) {
      if (wire) {
        add(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#f6f6f6" stroke="#b5b5b5" stroke-width="1.5"/>`);
        add(`<line x1="${x}" y1="${y}" x2="${x + w}" y2="${y + h}" stroke="#cfcfcf"/><line x1="${x + w}" y1="${y}" x2="${x}" y2="${y + h}" stroke="#cfcfcf"/>`);
        api.T(x + w / 2, y + h / 2 + 4, label, { z: 12, f: 'muted', a: 'middle' });
      } else {
        const id = 'g' + Math.random().toString(36).slice(2, 7);
        add(`<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${o.c1 ?? pal.primary}"/><stop offset="1" stop-color="${o.c2 ?? pal.info}"/></linearGradient></defs>`);
        add(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 12}" fill="url(#${id})" opacity="${o.op ?? 0.92}"/>`);
        if (label && o.showLabel !== false) api.T(x + w / 2, y + h / 2 + 4, label, { z: 12, f: 'onDark', a: 'middle', op: 0.8 });
      }
    },
    Btn(x, y, w, h, label, o = {}) {
      const { k = 'primary', z = 14 } = o;
      const fill = { primary: 'primary', ghost: 'surface', soft: 'soft', danger: 'bad', gold: 'accent', good: 'good' }[k] ?? 'primary';
      const txt = { primary: 'onPrimary', ghost: 'ink', soft: 'ink', danger: 'onPrimary', gold: 'ink', good: 'onPrimary' }[k] ?? 'onPrimary';
      api.R(x, y, w, h, { f: fill, s: k === 'ghost' || wire ? 'line' : null, r: 10, sw: wire ? 1.5 : 1 });
      api.T(x + w / 2, y + h / 2 + z * 0.35, label, { z, w: 600, f: txt, a: 'middle' });
    },
    Chip(x, y, label, o = {}) {
      const { k = 'muted' } = o;
      const w = Math.round(label.length * 6.6 + 22);
      const fill = { good: 'goodSoft', warn: 'warnSoft', bad: 'badSoft', info: 'infoSoft', muted: 'soft' }[k];
      const txt = { good: 'good', warn: 'warn', bad: 'bad', info: 'info', muted: 'muted' }[k];
      api.R(x, y, w, 22, { f: fill, s: wire ? 'line' : null, r: 11 });
      api.T(x + w / 2, y + 15, label, { z: 11.5, w: 600, f: txt, a: 'middle' });
      return w;
    },
    Input(x, y, w, label, val = '', o = {}) {
      api.T(x, y, label, { z: 12, w: 600, f: 'muted' });
      api.R(x, y + 8, w, 40, { f: 'surface', s: 'line', r: 9, sw: wire ? 1.5 : 1 });
      api.T(x + 14, y + 33, val, { z: 14, f: val ? 'ink' : 'muted' });
      if (o.help) api.T(x, y + 66, o.help, { z: 11.5, f: 'muted' });
    },
    Prog(x, y, w, pct, o = {}) {
      const { h = 8, f = 'primary' } = o;
      api.R(x, y, w, h, { f: 'soft', r: h / 2 });
      api.R(x, y, Math.max(h, (w * pct) / 100), h, { f, r: h / 2 });
    },
    Avatar(cx, cy, r, ini) {
      api.C(cx, cy, r, { f: 'soft', s: wire ? 'line' : null });
      api.T(cx, cy + r * 0.3, ini, { z: r * 0.85, w: 700, f: wire ? 'ink' : 'primary', a: 'middle' });
    },
    Icon(x, y, s = 18, o = {}) { api.R(x, y, s, s, { f: o.f ?? 'soft', s: wire ? 'line' : null, r: 5 }); },
    // wireframe-only callout, so a wireframe explains its own decisions
    Note(x, y, text, o = {}) {
      if (!wire) return;
      const { dx = 18, dy = 0 } = o;
      add(`<circle cx="${x}" cy="${y}" r="5" fill="#c0392b"/>`);
      add(`<path d="M${x} ${y} L${x + dx} ${y + dy}" stroke="#c0392b" stroke-width="1.2"/>`);
      if (dx < 0) api.T(x + dx - 4, y + dy + 4, text, { z: 12.5, w: 600, f: '#c0392b', a: 'end' });
      else api.T(x + dx + 4, y + dy + 4, text, { z: 12.5, w: 600, f: '#c0392b' });
    },
    out,
    toSVG() {
      const bg = col('bg');
      const defs = wire ? '' : `<defs><filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="3" stdDeviation="7" flood-color="#1b1740" flood-opacity="0.09"/></filter></defs>`;
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)} (${wire ? 'wireframe' : 'mockup'})">\n<title>${esc(title)} (${wire ? 'wireframe' : 'mockup'})</title>${defs}\n<rect width="${W}" height="${H}" fill="${bg}"/>\n${out.join('\n')}\n</svg>\n`;
    },
  };
  return api;
}
