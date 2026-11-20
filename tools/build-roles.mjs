// node tools/build-roles.mjs -> writes docs/full-stack.html, docs/software-engineer.html, docs/it-systems.html
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROLES } from './roles.mjs';
import { SWITCHER } from './switcher.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');


for (const r of ROLES) {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(r.title)} · Ikechukwu Ikechukwu Egbujor</title>
<meta name="description" content="${esc(r.lede)}">
<meta name="theme-color" content="#0f2f57"><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="style.css"><link rel="stylesheet" href="roles.css"></head>
<body><a class="skip" href="#work">Skip to my work</a>
<header class="top"><div class="wrap bar"><a class="brand" href="index.html"><span class="mark" aria-hidden="true"></span>Ikechukwu Egbujor</a><nav aria-label="Main"><a href="#work">Work</a><a href="#skills">Skills</a><a href="design-library.html">Design library</a><a href="code.html">Code</a><a class="btn small" href="#contact">Contact</a></nav></div></header>
${SWITCHER(r.id)}
<main>
  <section class="hero wrap">
    <p class="eyebrow">${esc(r.title)}</p>
    <h1>${esc(r.headline)}</h1>
    <p class="lede">${esc(r.lede)}</p>
    <div class="cta"><a class="btn" href="#work">See the work</a> <a class="btn ghost" href="code.html">Read the code</a> <a class="btn ghost" href="https://github.com/ikjoel">GitHub</a></div>
    <ul class="proof strong" aria-label="What I bring">${r.strengths.map((s) => `<li><strong>${esc(s.t)}</strong><span>${esc(s.d)}</span></li>`).join('')}</ul>
  </section>

  <section class="wrap section sum"><h2>About this role</h2>${r.summary.map((p) => `<p>${esc(p)}</p>`).join('')}</section>

  <section id="work" class="wrap section">
    <h2>Selected work</h2>
    <p class="sub">The same products appear in every view of this portfolio; this page shows the parts that matter for this role.</p>
    ${r.projects.map((p) => `
    <article class="rproj">
      <p class="tags">${esc(p.stack)}</p>
      <h3>${esc(p.name)} <span class="kind">· ${esc(p.kind)}</span></h3>
      <p class="when">${esc(p.when)}${p.link ? ` · <a href="https://${p.link}">${esc(p.link)} ↗</a>` : ''}</p>
      <ul class="points">${p.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
      ${p.see.length ? `<p class="actions">${p.see.map(([t, h]) => `<a href="${h}">${esc(t)}</a>`).join('')}</p>` : ''}
    </article>`).join('')}
  </section>

  <section class="band"><div class="wrap section">
    <h2>${esc(r.practice.title)}</h2><p class="sub">${esc(r.practice.lead)}</p>
    <ul class="practice">${r.practice.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
  </div></section>

  <section id="skills" class="wrap section">
    <h2>Skills</h2>
    <div class="grid3">${r.skills.map(([k, v]) => `<div><h3>${esc(k)}</h3><p>${esc(v)}</p></div>`).join('')}</div>
  </section>

  <section class="band"><div class="wrap section about">
    <div><h2>Education and training</h2>
      <ul class="edu"><li><b>BSc Mathematics and Computer Science</b>, National Open University of Nigeria, 2021</li><li><b>Data Analysis</b>, ALX</li><li><b>Prompt Engineering</b>, ALX</li><li><b>Back-End Developer certificate</b>, ILID Institute</li></ul></div>
    <ul class="facts"><li><b>Based in</b> Lagos, Nigeria</li><li><b>Open to</b> ${esc(r.title.toLowerCase())} roles, remote or on-site</li><li><b>Also see</b> <a href="index.html">the front-end view</a></li></ul>
  </div></section>

  <section id="contact" class="wrap section contact"><h2>Let’s talk</h2><p class="sub">I reply within a day.</p><p><a class="btn" href="mailto:ikjoel231@gmail.com">ikjoel231@gmail.com</a> <a class="btn ghost" href="https://github.com/ikjoel">github.com/ikjoel</a></p></section>
</main>
<footer class="wrap foot"><p>© <span id="y">2026</span> Ikechukwu Ikechukwu Egbujor. Screens use sample data. Server details are described at a high level on purpose.</p></footer>
<script>document.getElementById('y').textContent=new Date().getFullYear();</script>
</body></html>
`;
  writeFileSync(join(root, 'docs', r.page), html);
}
writeFileSync(join(root, 'docs', 'roles.css'), `/* Role pages and the role switcher. Builds on style.css. */
.roles{background:var(--surface);border-bottom:1px solid var(--line);display:flex;gap:6px 8px;flex-wrap:wrap;align-items:center;justify-content:center;padding:8px 16px;font-size:.88rem}
.roles span{color:var(--muted);margin-right:6px}
.roles a{text-decoration:none;font-weight:700;color:var(--ink);background:var(--bg);border:1px solid var(--line);padding:5px 12px;border-radius:99px}
.roles a[aria-current="page"]{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}
.proof.strong{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.proof.strong li strong{font-size:1.05rem;color:var(--ink);margin-bottom:6px}
.proof.strong li span{display:block;line-height:1.5}
.sum p{max-width:78ch;font-size:1.05rem}
.rproj{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:clamp(18px,3vw,30px);margin-top:22px;box-shadow:var(--shadow)}
.rproj h3{margin-bottom:2px}.rproj .kind{font-weight:500;color:var(--muted);font-size:1rem}
.rproj .when{color:var(--muted);font-size:.92rem}
.actions a{margin-right:18px;font-weight:700}
.practice{columns:2 320px;column-gap:var(--gap);padding-left:1.1em}
.practice li{margin-bottom:.6em;break-inside:avoid}
.edu{padding-left:1.1em}.edu li{margin-bottom:.4em}
`);
console.log('role pages written:', ROLES.map((r) => r.page).join(', '));
