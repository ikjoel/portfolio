// node tools/build.mjs
// Builds, from the screen definitions:
//   design/<project>/<category>/{wireframes,mockups}/<screen>.svg   every screen, one file each
//   figma/pages/<project>/<category>--{wireframes,mockups}.svg      one sheet per category (= one Figma page)
//   figma/tokens/*.tokens.json                                      design tokens (Tokens Studio format)
//   docs/assets/screens/*.svg and docs/design-library.html          the website's design library
//   design/README.md and design/screens.json                        the index
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { canvas, PALETTES } from './lib.mjs';
import { SCREENS as BASE } from './screens.mjs';
import { A } from './screens-studypat-a.mjs';
import { B } from './screens-studypat-b.mjs';
import { C } from './screens-chuvor.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PROJECTS = {
  'studypat': { dir: '01-studypat', name: 'StudyPat', blurb: 'School management platform (Laravel, Blade, Bootstrap, PWA)', url: 'https://studypat.com' },
  'chuvor-cbt': { dir: '02-chuvor-cbt', name: 'Chuvor CBT', blurb: 'Offline computer-based exams (ASP.NET Core)', url: 'https://chuvorint.com' },
  'cbt-licence-shop': { dir: '03-cbt-licence-shop', name: 'CBT Licence Shop', blurb: 'Online shop that sells and delivers exam-software licences (Laravel)', url: 'https://cbtlicense.chuvorint.com' },
  'chuvor-client': { dir: '04-chuvor-client', name: 'Chuvor Client', blurb: 'Secure remote access for company programs (.NET, Node, WireGuard)', url: '' },
  'virtual-lab': { dir: '05-virtual-lab', name: 'Virtual Lab', blurb: '3D science practicals in the browser (Three.js)', url: '' },
};
// the first ten screens were drawn before categories existed
const OLD = {
  'studypat-admin-dashboard': '01-onboarding-and-dashboard', 'studypat-parent-results-mobile': '05-parents-and-students',
  'cbt-candidate-exam-screen': '01-candidate', 'cbt-live-exam-monitor': '02-exam-centre-admin',
  'licence-shop-pricing': '01-storefront', 'licence-shop-order-confirmation': '01-storefront',
  'chuvor-client-app-window': '01-staff-app', 'chuvor-client-control-panel': '02-company-admin',
  'virtual-lab-titration-desktop': '01-student', 'virtual-lab-titration-mobile': '01-student',
};
const ALL = [...BASE.map((s) => ({ ...s, cat: OLD[s.slug] })), ...A, ...B, ...C];
const seen = new Set();
for (const s of ALL) { if (!s.cat) throw new Error('no category: ' + s.slug); if (seen.has(s.slug)) throw new Error('duplicate slug: ' + s.slug); seen.add(s.slug); if (!PROJECTS[s.project]) throw new Error('unknown project ' + s.project); }

// screens that show my proposed improvements, not features that are built (checked against the source on 2026-11-18)
const CONCEPT = new Set(['candidate-login', 'submit-review', 'result-slip', 'results-analysis', 'assign-practical', 'class-practical-results']);
const nice = (cat) => { const t = cat.replace(/^\d+-/, '').replace(/-/g, ' '); return t[0].toUpperCase() + t.slice(1); };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// start clean so renamed or removed screens never linger
for (const d of ['design', 'figma/pages', 'docs/assets/screens']) rmSync(join(root, d), { recursive: true, force: true });
for (const p of Object.values(PROJECTS)) for (const sub of ['wireframes', 'mockups']) rmSync(join(root, 'projects', p.dir, sub), { recursive: true, force: true });

const out = (rel, text) => { const f = join(root, rel); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, text); };

// 1. one file per screen, wireframe and mockup
const built = [];
for (const s of ALL) {
  const row = { ...s, svg: {} };
  for (const mode of ['wire', 'mock']) {
    const d = canvas(mode, s.pal, s.W, s.H, s.title);
    s.draw(d);
    row.svg[mode] = d.toSVG();
    out(`design/${PROJECTS[s.project].dir}/${s.cat}/${mode === 'wire' ? 'wireframes' : 'mockups'}/${s.slug}.svg`, row.svg[mode]);
    out(`docs/assets/screens/${mode === 'wire' ? 'wire-' : ''}${s.slug}.svg`, row.svg[mode]);
  }
  built.push(row);
}

// 2. one sheet per category = one Figma page. Every screen is a named nested frame on a labelled board.
const inner = (svg) => svg.replace(/^<svg[^>]*>\n?/, '').replace(/\n?<\/svg>\n?$/, '');
const groups = new Map();
for (const r of built) { const k = `${r.project}|${r.cat}`; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(r); }
const sheets = [];
for (const [k, rows] of groups) {
  const [project, cat] = k.split('|');
  for (const mode of ['wire', 'mock']) {
    const GAP = 120, PAD = 100, HEAD = 210, ROWW = 3400;
    let x = PAD, y = HEAD, rowH = 0, maxX = 0; const parts = [];
    for (const r of rows) {
      if (x > PAD && x + r.W > ROWW) { x = PAD; y += rowH + GAP + 50; rowH = 0; }
      parts.push(`<text x="${x}" y="${y - 18}" font-family="Segoe UI,Arial,sans-serif" font-size="30" font-weight="700" fill="#10233f">${esc(r.title)}</text>`);
      parts.push(`<svg id="${r.slug}" x="${x}" y="${y}" width="${r.W}" height="${r.H}" viewBox="0 0 ${r.W} ${r.H}" overflow="hidden">\n${inner(r.svg[mode])}\n</svg>`);
      x += r.W + GAP; maxX = Math.max(maxX, x); rowH = Math.max(rowH, r.H);
    }
    const W = Math.max(maxX - GAP + PAD, 1200), H = y + rowH + PAD;
    const label = mode === 'wire' ? 'Wireframes' : 'Mockups';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">\n<title>${esc(PROJECTS[project].name)} · ${esc(nice(cat))} · ${label}</title>\n<rect width="${W}" height="${H}" fill="#eef1f6"/>\n<text x="${PAD}" y="80" font-family="Segoe UI,Arial,sans-serif" font-size="56" font-weight="800" fill="#0f2f57">${esc(PROJECTS[project].name)} · ${esc(nice(cat))}</text>\n<text x="${PAD}" y="124" font-family="Segoe UI,Arial,sans-serif" font-size="26" fill="#52627a">${label} · sample data only · ${rows.length} screen${rows.length > 1 ? 's' : ''}</text>\n${parts.join('\n')}\n</svg>\n`;
    const rel = `figma/pages/${PROJECTS[project].dir}/${cat}--${label.toLowerCase()}.svg`;
    out(rel, svg); sheets.push({ project, cat, mode, rel, n: rows.length });
  }
}

// 3. design tokens (Tokens Studio / Figma Variables friendly)
const tokenFile = (name, pal, extra) => {
  const color = {}; for (const [k, v] of Object.entries(pal)) color[k] = { value: v, type: 'color' };
  return JSON.stringify({ global: { color, spacing: { xs: { value: '4', type: 'spacing' }, sm: { value: '8', type: 'spacing' }, md: { value: '16', type: 'spacing' }, lg: { value: '24', type: 'spacing' }, xl: { value: '32', type: 'spacing' }, xxl: { value: '48', type: 'spacing' } }, borderRadius: { sm: { value: '8', type: 'borderRadius' }, md: { value: '12', type: 'borderRadius' }, lg: { value: '16', type: 'borderRadius' }, pill: { value: '999', type: 'borderRadius' } }, fontFamilies: { body: { value: extra.font, type: 'fontFamilies' }, mono: { value: 'Consolas', type: 'fontFamilies' } }, fontSizes: { caption: { value: '12', type: 'fontSizes' }, body: { value: '14', type: 'fontSizes' }, lead: { value: '17', type: 'fontSizes' }, h3: { value: '20', type: 'fontSizes' }, h2: { value: '28', type: 'fontSizes' }, h1: { value: '44', type: 'fontSizes' } }, fontWeights: { regular: { value: '400', type: 'fontWeights' }, semibold: { value: '600', type: 'fontWeights' }, bold: { value: '800', type: 'fontWeights' } } } }, null, 2) + '\n';
};
out('figma/tokens/studypat.tokens.json', tokenFile('studypat', PALETTES.studypat, { font: 'Plus Jakarta Sans' }));
out('figma/tokens/chuvor.tokens.json', tokenFile('chuvor', PALETTES.chuvor, { font: 'Segoe UI' }));

// 4. index (markdown + json)
const manifest = built.map((r) => ({ slug: r.slug, title: r.title, concept: CONCEPT.has(r.slug), project: r.project, category: r.cat, width: r.W, height: r.H, wireframe: `design/${PROJECTS[r.project].dir}/${r.cat}/wireframes/${r.slug}.svg`, mockup: `design/${PROJECTS[r.project].dir}/${r.cat}/mockups/${r.slug}.svg` }));
out('design/screens.json', JSON.stringify(manifest, null, 2) + '\n');
let md = `# Design library\n\n${built.length} screens across ${Object.keys(PROJECTS).length} products, each drawn as a **wireframe** and as a finished **mockup**. All data is sample data. The screens are redrawn from the real products; those marked *(concept)* are proposed improvements that are not built.\n\nOpen any SVG in a browser, or drag it into Figma (see [../figma/FIGMA-GUIDE.md](../figma/FIGMA-GUIDE.md)). Ready-made Figma pages, one per category, are in [../figma/pages](../figma/pages).\n\n`;
md += `| Product | Categories | Screens |\n|---|---|---|\n`;
for (const [id, p] of Object.entries(PROJECTS)) { const rs = built.filter((r) => r.project === id); md += `| [${p.name}](#${p.name.toLowerCase().replace(/ /g, '-')}) | ${new Set(rs.map((r) => r.cat)).size} | ${rs.length} |\n`; }
for (const [id, p] of Object.entries(PROJECTS)) {
  md += `\n## ${p.name}\n\n${p.blurb}.${p.url ? ` Live: ${p.url}` : ''}\n`;
  for (const cat of [...new Set(built.filter((r) => r.project === id).map((r) => r.cat))].sort()) {
    md += `\n### ${nice(cat)}\n\n| Screen | Wireframe | Mockup | Figma page |\n|---|---|---|---|\n`;
    for (const r of built.filter((r) => r.project === id && r.cat === cat)) md += `| ${r.title}${CONCEPT.has(r.slug) ? ' *(concept)*' : ''} | [svg](${p.dir}/${cat}/wireframes/${r.slug}.svg) | [svg](${p.dir}/${cat}/mockups/${r.slug}.svg) | [wire](../figma/pages/${p.dir}/${cat}--wireframes.svg) · [mock](../figma/pages/${p.dir}/${cat}--mockups.svg) |\n`;
  }
}
out('design/README.md', md);

// 5. website design library page
const cards = (id) => [...new Set(built.filter((r) => r.project === id).map((r) => r.cat))].sort().map((cat) => `
      <section class="cat" aria-labelledby="${id}-${cat}">
        <h3 id="${id}-${cat}">${esc(nice(cat))}</h3>
        <div class="gallery">${built.filter((r) => r.project === id && r.cat === cat).map((r) => `
          <figure class="g ${r.W < 600 ? 'tall' : ''}">
            <a href="assets/screens/${r.slug}.svg" target="_blank" rel="noopener"><img class="s-mock" src="assets/screens/${r.slug}.svg" width="${r.W}" height="${r.H}" alt="${esc(r.title)} mockup" loading="lazy"><img class="s-wire" src="assets/screens/wire-${r.slug}.svg" width="${r.W}" height="${r.H}" alt="${esc(r.title)} wireframe" loading="lazy" hidden></a>
            <figcaption>${esc(r.title)}${CONCEPT.has(r.slug) ? ' <span class="chip">Concept</span>' : ''}</figcaption>
          </figure>`).join('')}
        </div>
      </section>`).join('');
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Design library · Egbujor Ikechukwu Joel</title>
<meta name="description" content="${built.length} screens across five products, each as a wireframe and a finished mockup, grouped by function.">
<meta name="theme-color" content="#0f2f57"><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="style.css"><link rel="stylesheet" href="library.css"></head>
<body><a class="skip" href="#lib">Skip to the library</a>
<header class="top"><div class="wrap bar"><a class="brand" href="index.html"><span class="mark" aria-hidden="true"></span>Joel Egbujor</a><nav aria-label="Main"><a href="index.html#work">Work</a><a href="design-library.html">Design library</a><a href="code.html">Code</a><a class="btn small" href="index.html#contact">Contact</a></nav></div></header>
<main id="lib" class="wrap section">
  <h1>Design library</h1>
  <p class="lede">${built.length} screens from five products, grouped by function. Each one is drawn twice: a grey wireframe for layout and flow, then the finished mockup. Everything uses <strong>sample data</strong>. Screens marked <span class="chip">Concept</span> are my proposed improvements, not built features.</p>
  <div class="toolbar" role="group" aria-label="Library controls">
    <div class="filters" role="group" aria-label="Product">
      <button type="button" class="f" data-p="all" aria-pressed="true">All products</button>${Object.entries(PROJECTS).map(([id, p]) => `<button type="button" class="f" data-p="${id}" aria-pressed="false">${p.name} <span>${built.filter((r) => r.project === id).length}</span></button>`).join('')}
    </div>
    <button type="button" class="toggle" id="wire" aria-pressed="false">Show wireframes</button>
  </div>
  ${Object.entries(PROJECTS).map(([id, p]) => `
  <div class="prod" data-p="${id}">
    <h2>${p.name}</h2><p class="sub">${p.blurb}.${p.url ? ` <a href="${p.url}">${p.url.replace('https://', '')} ↗</a>` : ''}</p>${cards(id)}
  </div>`).join('')}
</main>
<footer class="wrap foot"><p>Sample data only. The SVG files open in Figma by drag and drop. Source: github.com/ikjoel/portfolio</p></footer>
<script src="library.js" defer></script></body></html>
`;
out('docs/design-library.html', html);

console.log(`built ${built.length} screens, ${built.length * 2} SVGs, ${sheets.length} Figma pages`);
