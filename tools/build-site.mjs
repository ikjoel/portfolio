// node tools/build-site.mjs
// Builds the portfolio website in the "designer portfolio" format: Home, Work, a case study per product, Services, Contact, legal pages.
import { mkdirSync, writeFileSync, readdirSync, cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PERSON, PROJECTS, BY_SLUG, LIVE, COMPONENTS, CAPABILITIES, EXPERIENCE, EDUCATION, TOOLS, SERVICES, PROCESS } from './site-data.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const PHONE = new Set(['studypat-parent-results-mobile', 'install-app-pwa', 'virtual-lab-titration-mobile']);
const slugOf = (shot) => shot.mock.split('/').pop().replace('.svg', '');

const FONTS = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap';

function page({ file, depth, title, desc, body, active = '' }) {
  const R = '../'.repeat(depth);
  const nav = [['Work', 'work/index.html'], ['Services', 'services/index.html'], ['Contact', 'contact/index.html']];
  const html = `<!doctype html>
<html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#050b16">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website">
<link rel="icon" href="${R}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${R}site.css">
<script>document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="hd"><div class="wrap row">
  <a class="logo" href="${R}index.html" aria-label="${esc(PERSON.short)}, home"><i aria-hidden="true"></i>${esc(PERSON.short)}</a>
  <nav class="nav" aria-label="Main">${nav.map(([l, h]) => `<a href="${R}${h}"${active === l ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
  <div class="tools"><button class="icon-btn" id="theme" type="button" aria-label="Switch theme">☀</button><a class="btn" style="padding:10px 20px" href="${R}contact/index.html">Start a project</a><button class="menu-btn" id="menu" type="button" aria-controls="sheet">Menu</button></div>
</div></header>
<div class="sheet" id="sheet" aria-hidden="true" role="dialog" aria-label="Menu"><button class="icon-btn close" id="closeMenu" type="button" aria-label="Close menu">✕</button>
  <a href="${R}index.html">Home</a>${nav.map(([l, h]) => `<a href="${R}${h}">${l}</a>`).join('')}<a href="${R}code.html">Code</a><a href="${R}design-library.html">Design library</a></div>
<main id="main">
${body(R)}
</main>
<footer class="ft"><div class="wrap">
  <div class="cols">
    <div><a class="logo" href="${R}index.html"><i aria-hidden="true"></i>${esc(PERSON.short)}</a><p style="color:var(--muted);margin-top:12px;max-width:30ch">${esc(PERSON.role)} in ${esc(PERSON.city)}. Interfaces that people understand on the first try.</p></div>
    <div><h4>Pages</h4><a href="${R}index.html">Home</a><a href="${R}work/index.html">Work</a><a href="${R}services/index.html">Services</a><a href="${R}contact/index.html">Contact</a></div>
    <div><h4>More</h4><a href="${R}code.html">Code samples</a><a href="${R}design-library.html">Design library (61 screens)</a><a href="${R}full-stack.html">Full-stack view</a><a href="${R}software-engineer.html">Software engineer view</a><a href="${R}it-systems.html">IT and systems view</a></div>
    <div><h4>Elsewhere</h4><a href="${PERSON.github}">GitHub</a><a href="${PERSON.repo}">Portfolio repository</a><a href="mailto:${PERSON.email}">${esc(PERSON.email)}</a></div>
  </div>
  <div class="legal"><span>© <span id="y">2026</span> ${esc(PERSON.name)}. Screens use sample data.</span><span><a href="${R}legal/privacy-policy/index.html">Privacy policy</a> · <a href="${R}legal/terms-of-service/index.html">Terms of service</a></span></div>
</div></footer>
<script src="${R}site.js" defer></script>
</body></html>
`;
  const out = join(root, file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

const statusChip = (p) => `<span class="chip ${p.status === 'Prototype' ? 'warn' : ['Live', 'Released', 'Launched'].includes(p.status) ? 'live' : ''}">${esc(p.status)}</span>`;
const fig = (R, shot, extra = '') => {
  const ph = PHONE.has(slugOf(shot)) ? ' phone' : '';
  return `<figure class="shot${ph}${extra}" style="margin:0"><img class="s-mock" src="${R}${shot.mock}" alt="${esc(shot.caption)}" loading="lazy">${shot.wire ? `<img class="s-wire" src="${R}${shot.wire}" alt="${esc(shot.caption)} (wireframe)" loading="lazy" hidden>` : ''}<figcaption><span>${esc(shot.caption)}</span>${shot.wire ? '<button class="tg" type="button" data-toggle aria-pressed="false">Show wireframe</button>' : ''}</figcaption></figure>`;
};
const rows = (R, list) => list.map((p) => `
    <a class="prow rv" href="${R}work/${p.slug}/index.html"><span class="l">(${p.letter})</span><h3>${esc(p.name)}</h3><span class="cat">${esc(p.category)}</span><p>${esc(p.tagline)}</p><span class="go" aria-hidden="true">→</span><span class="thumb" aria-hidden="true"><img src="${R}${p.hero.mock}" alt=""></span></a>`).join('');

// Livora Suites ships real screenshots: copy them next to the site and list them as a gallery
const LIV_SRC = join(root, '..', 'projects', '06-livora-suites');
if (existsSync(LIV_SRC)) for (const d of ['mockups', 'wireframes', 'branding']) cpSync(join(LIV_SRC, d), join(root, 'assets', 'livora', d), { recursive: true });
const nice = (f) => { const t = f.replace(/\.[a-z]+$/, '').replace(/^(desktop|web)-/, '').replace(/^\d+-/, '').replace(/-/g, ' '); return t[0].toUpperCase() + t.slice(1); };
function gallery(R, p) {
  return `<section class="blk"><div class="wrap"><p class="lbl">(07)</p><h2 style="margin-bottom:8px">All screens</h2><p class="sub">Screenshots of the running apps with demo data (a sample hotel), and the wireframes. Select any image to open it full size.</p>${p.gallery.map((g) => {
    const files = readdirSync(join(LIV_SRC, g.dir)).filter((f) => /\.(png|svg)$/.test(f)).sort();
    return `<h3 style="margin-top:34px">${esc(g.title)} <span class="tag">${files.length}</span></h3><div class="gal">${files.map((f) => `<a class="gi" href="${R}assets/livora/${g.dir}/${f}"><img src="${R}assets/livora/${g.dir}/${f}" alt="${esc(g.title)}: ${esc(nice(f))}" loading="lazy"><span>${esc(nice(f))}</span></a>`).join('')}</div>`;
  }).join('')}</div></section>`;
}

/* ───────────────────────── HOME ───────────────────────── */
page({
  file: 'index.html', depth: 0, title: `${PERSON.name} · ${PERSON.role}`, desc: 'Front-end engineer in Lagos. I design, build and ship fast, clear, accessible interfaces for schools, exam centres and small businesses. Selected work, live products and code.',
  body: (R) => `
<section class="hero"><span class="orb o1"></span><span class="orb o2"></span>
  <div class="wrap">
    <div class="intro">
      <span class="pill"><b></b> Open to front-end engineer roles · ${esc(PERSON.city)} · remote-friendly</span>
      <h1>Building fast, clear and accessible <em class="grad">interfaces</em> people understand first time.</h1>
      <p class="byline">${esc(PERSON.name)}</p>
      <p class="lede">I’m a front-end engineer who designs the screen, writes the HTML, CSS and JavaScript, and ships it. Six products, built for schools, exam centres, hotels and small businesses, used on inexpensive phones and in busy halls.</p>
      <div class="cta"><a class="btn" href="${R}work/index.html">See the work <span class="arr">→</span></a><a class="btn ghost" href="${R}contact/index.html">Start a project</a><a class="btn ghost" href="${PERSON.github}">GitHub</a></div>
    </div>
    <div class="collage" aria-hidden="true">
      <div class="c c1"><img src="${R}${PROJECTS[0].hero.mock}" alt=""></div>
      <div class="c c2"><img src="${R}assets/screens/cbt-candidate-exam-screen.svg" alt=""></div>
      <div class="c c3"><img src="${R}assets/screens/studypat-parent-results-mobile.svg" alt=""></div>
    </div>
    <div class="stats rv"><div><strong data-count="6">6</strong><span>products designed and built</span></div><div><strong data-count="61">61</strong><span>screens designed, wireframe and mockup</span></div><div><strong data-count="20" data-suffix="+">20+</strong><span>schools registered on StudyPat</span></div><div><strong data-count="370" data-suffix="+">370+</strong><span>pages built and maintained</span></div></div>
  </div>
</section>

<section class="sec" id="work"><div class="wrap">
  <div class="sh rv"><h2>Selected work</h2><a class="more" href="${R}work/index.html">View all →</a></div>
  <div class="plist">${rows(R, PROJECTS)}</div>
</div></section>

<section class="sec alt"><div class="wrap">
  <div class="sh rv"><div><h2>Live works</h2><p class="sub" style="margin:10px 0 0">Real products you can open today.</p></div></div>
  <div class="cards">${LIVE.map((l) => `<a class="card rv" href="${l.href}"><span class="l">(${l.letter})</span><h3>${esc(l.name)}</h3><p>${esc(l.note)}</p><span class="url">${esc(l.href.replace('https://', ''))} ↗</span></a>`).join('')}</div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sh rv"><div><h2>Code &amp; components</h2><p class="sub" style="margin:10px 0 0">Real code from the products, with the problem each piece solves.</p></div><a class="more" href="${R}code.html">All code samples →</a></div>
  <div class="cards">${COMPONENTS.map((c) => `<a class="card comp rv" href="${R}${c.href}"><h3>${esc(c.title)}</h3><p>${esc(c.note)}</p><pre>${esc(c.code)}</pre></a>`).join('')}</div>
</div></section>

<section class="sec alt" style="padding-bottom:0"><div class="wrap"><div class="sh rv"><div><h2>Design shots</h2><p class="sub" style="margin:10px 0 0">A few of the 61 screens I designed, each as a wireframe and a mockup.</p></div><a class="more" href="${R}design-library.html">Open the design library →</a></div></div>
  <div class="shotrow"><div class="shots" aria-hidden="true">${[...Array(2)].map(() => ['livora:mockups/desktop-app/desktop-dashboard.png', 'livora:mockups/web-app/web-mobile-dashboard.png', 'studypat-admin-dashboard', 'cbt-live-exam-monitor', 'licence-shop-pricing', 'chuvor-client-control-panel', 'virtual-lab-titration-desktop', 'report-card', 'score-input', 'studypat-parent-results-mobile'].map((s) => s.startsWith('livora:') ? `<a class="${s.includes('mobile') ? 'ph' : ''}" href="${R}work/livora-suites/index.html" tabindex="-1"><img src="${R}assets/livora/${s.slice(7)}" alt="" loading="lazy"></a>` : `<a class="${s.includes('mobile') ? 'ph' : ''}" href="${R}design-library.html" tabindex="-1"><img src="${R}assets/screens/${s}.svg" alt="" loading="lazy"></a>`).join('')).join('')}</div></div>
  <div class="marq" style="margin-top:46px" aria-hidden="true"><div class="track">${[...TOOLS, ...TOOLS].map((t) => `<span>${esc(t)}</span>`).join('')}</div></div>
</section>

<section class="sec"><div class="wrap about">
  <div class="rv"><div class="mono-badge" aria-hidden="true">I</div><p class="lbl">(About me)</p>
    <p class="big">Friction between people and software usually comes from needless complexity. I’m driven by <em>simplicity</em> and clarity.</p>
    <p class="sub">I do it by starting with the user’s words, drawing the wireframe before any colour, building reusable components, and testing on a slow phone, with a keyboard, and in print. I have a BSc in Mathematics and Computer Science.</p>
    <p class="big" style="font-size:1.5rem;margin-top:22px">And how? <em>Human-centred engineering.</em></p></div>
  <div><p class="lbl rv">(Capabilities)</p><div class="caps">${CAPABILITIES.map((c) => `<div class="cap rv"><span class="l">(${c.letter})</span><h4>${esc(c.title)}</h4><p>${esc(c.text)}</p></div>`).join('')}</div></div>
</div></section>

<section class="sec alt"><div class="wrap">
  <div class="sh rv"><h2>Work experience</h2></div>
  <div class="exp">${EXPERIENCE.map((j) => `<div class="job rv"><span class="n">(${j.n})</span><div><h3>${esc(j.role)}</h3><span class="org">${esc(j.org)} · ${esc(j.when)}</span></div><p>${esc(j.text)}</p></div>`).join('')}</div>
  <div class="edu">${EDUCATION.map(([a, b, c]) => `<div class="rv"><b>${esc(a)}</b><span>${esc(b)}${c ? ' · ' + esc(c) : ''}</span></div>`).join('')}</div>
</div></section>

<section class="cta-big"><span class="orb o1" style="top:-200px;right:auto;left:20%"></span><div class="wrap" style="position:relative">
  <p class="lbl">(Contact)</p><h2 class="rv">Let’s build something <em class="grad">clear</em> together.</h2>
  <div class="row"><a class="btn" href="${R}contact/index.html">Start a project <span class="arr">→</span></a><a class="btn ghost" href="mailto:${PERSON.email}">${esc(PERSON.email)}</a></div>
</div></section>`,
});

/* ───────────────────────── WORK ───────────────────────── */
page({
  file: 'work/index.html', depth: 1, title: `Work · ${PERSON.name}`, desc: 'Six products designed and built end to end: a school platform, a hotel system, an exam system, a licence shop, a remote-access client and a 3D lab.', active: 'Work',
  body: (R) => `
<section class="cs-head"><div class="wrap"><p class="lbl">(Work)</p><h1>Six products, <em class="grad">designed</em> and built end to end.</h1><p class="lede">Each case study follows the same path: the problem, the solution, the key design decisions, the outcome, my role and what I took away.</p></div></section>
<section class="sec" style="padding-top:20px"><div class="wrap"><div class="plist">${rows(R, PROJECTS)}</div>
  <div class="codebox rv"><div><b>Want every screen?</b><br><span style="color:var(--muted)">61 screens, each as a wireframe and a mockup, grouped by function.</span></div><a class="btn ghost" href="${R}design-library.html">Open the design library</a></div></div></section>`,
});

/* ───────────────────────── CASE STUDIES ───────────────────────── */
for (const p of PROJECTS) {
  page({
    file: `work/${p.slug}/index.html`, depth: 2, title: `${p.name} · Case study · ${PERSON.name}`, desc: `${p.tagline} ${p.intro}`.slice(0, 280), active: 'Work',
    body: (R) => `
<section class="cs-head"><div class="wrap">
  <a class="tag" href="${R}work/index.html" style="text-decoration:none">← All work</a>
  <div class="chips" style="margin-top:22px"><span class="chip">(${p.letter})</span><span class="chip">${esc(p.category)}</span>${statusChip(p)}</div>
  <h1>${esc(p.name)}</h1><p class="lede">${esc(p.intro)}</p>
  <dl class="meta"><div><dt>Year</dt><dd>${esc(p.year)}</dd></div><div><dt>Category</dt><dd>${esc(p.category)}</dd></div><div><dt>My role</dt><dd>${esc(p.role)}</dd></div><div><dt>Stack</dt><dd>${esc(p.stack)}</dd></div><div><dt>Status</dt><dd>${esc(p.status)}${p.live ? ` · <a href="${p.live}">Visit ↗</a>` : ''}</dd></div></dl>
  ${fig(R, p.hero)}
</div></section>

<section class="blk"><div class="wrap two"><div><p class="lbl">(01)</p><h2>Problem</h2></div><div class="rv"><ul class="pts">${p.problem.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><div class="led"><b>This led to</b>${p.problem.led.map((x) => `· ${esc(x)}`).join('<br>')}</div></div></div></section>

<section class="blk"><div class="wrap two"><div><p class="lbl">(02)</p><h2>Solution</h2></div><div class="rv"><p style="font:500 clamp(1.2rem,2.2vw,1.7rem)/1.4 var(--display);margin:0">${esc(p.solution)}</p></div></div></section>

<section class="blk"><div class="wrap"><p class="lbl">(03)</p><h2 style="margin-bottom:10px">Key design decisions</h2>
  ${p.decisions.map((d, i) => `<div class="dec rv"><div><span class="num">${i + 1}.</span><h3>${esc(d.title)}</h3><ul class="pts">${d.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div>${d.shot ? `<div class="dmedia">${fig(R, d.shot)}</div>` : ''}</div>`).join('')}
</div></section>

<section class="blk"><div class="wrap two"><div><p class="lbl">(04)</p><h2>Outcome</h2></div><div class="rv"><ul class="pts">${p.outcome.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div></div></section>

<section class="blk"><div class="wrap two"><div><p class="lbl">(05)</p><h2>My role</h2></div><div class="rv"><ul class="pts">${p.myRole.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div></div></section>

<section class="blk"><div class="wrap two"><div><p class="lbl">(06)</p><h2>Key takeaway</h2></div><div class="rv"><p class="take">${esc(p.takeaway)}</p>
  ${p.concepts ? `<div class="note"><b>Concept screens.</b> These are design ideas I have drawn but not built.</div><div class="concepts">${p.concepts.map((c) => fig(R, c)).join('')}</div>` : ''}
  ${p.code ? `<div class="codebox"><div><b>See the code</b><br><span style="color:var(--muted)">Real code from this product, with the problem it solves.</span></div><a class="btn ghost" href="${R}${p.code.href}">${esc(p.code.label)} →</a></div>` : ''}
</div></div></section>

${p.gallery ? gallery(R, p) : ''}
<section class="sec alt"><div class="wrap"><div class="sh"><h2>More projects</h2><a class="more" href="${R}work/index.html">View all →</a></div>
  <div class="next">${p.more.map((s) => { const q = BY_SLUG[s]; return `<a href="${R}work/${q.slug}/index.html" class="rv"><span class="lbl">(${q.letter}) ${esc(q.category)}</span><h3>${esc(q.name)}</h3><p style="color:var(--muted);margin:0">${esc(q.tagline)}</p></a>`; }).join('')}</div></div></section>`,
  });
}

/* ───────────────────────── SERVICES ───────────────────────── */
page({
  file: 'services/index.html', depth: 1, title: `Services · ${PERSON.name}`, desc: 'Front-end development, Figma to code, progressive web apps, full-stack web apps, performance and accessibility.', active: 'Services',
  body: (R) => `
<section class="cs-head"><div class="wrap"><p class="lbl">(What I do)</p><h1>Services that keep things <em class="grad">clear</em>.</h1><p class="lede">I can join your team as a front-end engineer, or take a project from wireframe to deployment.</p></div></section>
<section class="sec" style="padding-top:20px"><div class="wrap"><div class="srv">${SERVICES.map((s) => `<div class="srow rv"><span class="l">(${s.letter})</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join('')}</div></div></section>
<section class="sec alt"><div class="wrap"><div class="sh"><h2>How I work</h2></div><div class="steps">${PROCESS.map(([t, d]) => `<div class="rv"><h4>${esc(t)}</h4><p>${esc(d)}</p></div>`).join('')}</div></div></section>
<section class="cta-big"><div class="wrap"><h2 class="rv">Have a project in mind?</h2><div class="row"><a class="btn" href="${R}contact/index.html">Start a project <span class="arr">→</span></a></div></div></section>`,
});

/* ───────────────────────── CONTACT ───────────────────────── */
page({
  file: 'contact/index.html', depth: 1, title: `Contact · ${PERSON.name}`, desc: 'Have a project in mind or a role to discuss? Send a message.', active: 'Contact',
  body: (R) => `
<section class="cs-head"><div class="wrap"><p class="lbl">(Contact me)</p><h1>Let’s <em class="grad">talk</em>.</h1><p class="lede">Have a project in mind, or a front-end role to discuss? Write a message. It opens in your email program, and I reply within a day.</p></div></section>
<section class="sec" style="padding-top:10px"><div class="wrap cgrid">
  <form class="cform rv" id="contactForm" data-to="${PERSON.email}"><label>Your name<input name="name" required autocomplete="name"></label><label>Your email<input name="email" type="email" required autocomplete="email"></label><label>Message<textarea name="message" required></textarea></label><div><button class="btn" type="submit">Write the email <span class="arr">→</span></button></div></form>
  <div class="reach rv"><p class="lbl">(Reach me)</p><a href="mailto:${PERSON.email}">${esc(PERSON.email)}</a><p class="lbl" style="margin-top:28px">(Elsewhere)</p><a href="${PERSON.github}">GitHub ↗</a><a href="${PERSON.repo}">Portfolio repository ↗</a><p style="font:400 .95rem var(--body);color:var(--muted);margin-top:24px">Based in ${esc(PERSON.city)}. Open to remote work.</p></div>
</div></section>`,
});

/* ───────────────────────── LEGAL ───────────────────────── */
page({
  file: 'legal/privacy-policy/index.html', depth: 2, title: `Privacy policy · ${PERSON.name}`, desc: 'How this portfolio handles information.',
  body: () => `<section class="cs-head"><div class="wrap prose"><p class="lbl">(Legal)</p><h1 style="font-size:clamp(2.2rem,5vw,3.6rem)">Privacy policy</h1>
<h2>What this site collects</h2><p>Nothing. This website has no accounts, no analytics and no advertising trackers. It stores one small preference in your browser (light or dark theme) and nothing else.</p>
<h2>Fonts</h2><p>The pages load fonts from Google Fonts, which may receive your IP address when the fonts are requested.</p>
<h2>The contact form</h2><p>The form does not send data to a server. It opens your own email program with the message filled in. I only receive what you choose to send.</p>
<h2>Email</h2><p>If you write to me, I use your message only to reply. I do not share it.</p>
<h2>Sample data</h2><p>Screens shown in this portfolio use sample data. No real school, student or customer is shown.</p>
<h2>Contact</h2><p>${PERSON.email}</p></div></section>`,
});
page({
  file: 'legal/terms-of-service/index.html', depth: 2, title: `Terms of service · ${PERSON.name}`, desc: 'Terms for using this portfolio website.',
  body: () => `<section class="cs-head"><div class="wrap prose"><p class="lbl">(Legal)</p><h1 style="font-size:clamp(2.2rem,5vw,3.6rem)">Terms of service</h1>
<h2>About this site</h2><p>This website presents my professional work. It is provided for information.</p>
<h2>Ownership</h2><p>The designs, text and code samples are mine unless stated. Product names and logos belong to their owners. Please ask before reusing my work.</p>
<h2>No warranty</h2><p>I try to keep the information accurate and current, but I do not guarantee it. Status labels (live, released, launched, prototype, concept) describe each project at the time of writing.</p>
<h2>Links</h2><p>The site links to other websites. I am not responsible for their content.</p>
<h2>Work with me</h2><p>Any project work is agreed separately, in writing, before it starts.</p></div></section>`,
});
console.log('site built: home, work, 6 case studies, services, contact, 2 legal pages');
