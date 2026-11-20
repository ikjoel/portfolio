// node tools/build-code.mjs  -> writes docs/code.html and code/README.md from the real code files in code/
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { SWITCHER } from './switcher.mjs';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const site = (p) => p.replace(/^design\/[^/]+\/[^/]+\/mockups\//, 'assets/screens/');
const SHOT = (p, cat, slug) => `design/${p}/${cat}/mockups/${slug}.svg`;

const PROJECT = { studypat: 'StudyPat', cbt: 'Chuvor CBT', client: 'Chuvor Client', lab: 'Virtual Lab' };
const BLOCKS = [
  {
    project: 'studypat', title: 'Reusable help components', stack: 'Blade · JavaScript · CSS',
    problem: 'New users did not know what to do and could not find help. Help text was being rewritten on every page.',
    what: 'Five Blade components (help, steps, tip, next-step, empty-state) plus a small script and stylesheet. A page writes one line, for example <x-ux.help tone="tip">, and gets a consistent callout. A callout can be closed and stays closed (remembered in the browser). Pages that save as you type get one shared "Saving... / All changes saved / 2 not saved" indicator with a retry button, and the browser warns before leaving with unsaved work.',
    points: ['Props with defaults, so the common case is one line.', 'role="note", aria-label, aria-current and role="status" so assistive technology can follow them.', 'localStorage wrapped in try/catch so private browsing never breaks a page.', 'One save-state object (uxSave) instead of every page inventing its own.'],
    files: ['01-studypat/blade-ux-components/help.blade.php', '01-studypat/blade-ux-components/steps.blade.php', '01-studypat/blade-ux-components/next.blade.php', '01-studypat/blade-ux-components/tip.blade.php', '01-studypat/blade-ux-components/empty.blade.php', '01-studypat/blade-ux-components/ux-behaviour.blade.php', '01-studypat/blade-ux-components/ux-styles.blade.php'],
    shots: [['Dashboard with the Get Started card', SHOT('01-studypat', '01-onboarding-and-dashboard', 'studypat-admin-dashboard')], ['Score divisions with the live check', SHOT('01-studypat', '03-results-and-assessment', 'score-divisions')]],
  },
  {
    project: 'studypat', title: 'Get Started card and the setup checklist', stack: 'Laravel service · Blade',
    problem: 'Schools said "after registering I don\'t know what to do next". A seven-step wizard put Students last.',
    what: 'One class, SetupProgress, is the single source of truth for the checklist, the next step, the percentage and the minutes left. The Get Started card, the wizard banner, the sidebar and the "where next" links all read it, so they can never disagree.',
    points: ['Order chosen for the user: classes, then students (what they came to do), then rules.', 'Each step carries its own plain-language explanation and time estimate.', 'The card hides itself when setup is finished or the admin chooses "I will set up later".', 'White-labelled schools get no StudyPat support link.'],
    files: ['01-studypat/get-started/SetupProgress.php', '01-studypat/get-started/get-started-card.blade.php'],
    shots: [['Dashboard with the Get Started card', SHOT('01-studypat', '01-onboarding-and-dashboard', 'studypat-admin-dashboard')]],
  },
  {
    project: 'studypat', title: 'Install-as-an-app prompt', stack: 'Vanilla JavaScript · PWA',
    problem: 'Parents on phones should be able to open the school like an app. Android and iPhone install differently.',
    what: 'One partial that adds the manifest, theme colour and icons for the current school, registers the service worker, shows an Install card on Android (beforeinstallprompt), shows the two taps on iPhone Safari, remembers a dismissal for 14 days, hides itself once installed, and offers the help guide once when the installed app is first opened.',
    points: ['Branded per school: name, colour and icon come from one helper.', 'iOS detection that excludes Chrome, Firefox, Edge and Opera on iOS (which cannot add to home screen).', 'All storage access in try/catch.', 'A data-install-app hook so any menu link can offer the same thing.'],
    files: ['01-studypat/pwa/install-prompt-and-welcome.blade.php'],
    shots: [['Install card on a phone', SHOT('01-studypat', '07-school-website-and-branding', 'install-app-pwa')]],
  },
  {
    project: 'studypat', title: 'Service worker: pages are never cached', stack: 'JavaScript · Service Worker',
    problem: 'An installable app tempts you to cache everything. But pages hold personal data and form tokens, and stale pages mean wrong data and failed forms.',
    what: 'A deliberately small service worker. Page navigations always go to the network and fall back to an offline page. Only the offline page, shared libraries and fonts, and static images are kept on the phone: cache-first for shared libraries, stale-while-revalidate for images.',
    points: ['Versioned cache names, and old caches deleted on activate.', 'Only GET requests; range requests skipped.', 'skipWaiting and clients.claim so an update takes effect without a double reload.', 'The rule is written in the file header so the next developer does not add page caching by accident.'],
    files: ['01-studypat/pwa/service-worker.js'],
    shots: [['Install card on a phone', SHOT('01-studypat', '07-school-website-and-branding', 'install-app-pwa')]],
  },
  {
    project: 'studypat', title: 'Demo countdown bar', stack: 'Blade · vanilla JavaScript',
    problem: 'Visitors should try the product without registering, but the demo must clearly end and never confuse a visitor about where they are.',
    what: 'A fixed bar on every page of a private demo: a DEMO badge, a clock that turns red in the last five minutes, a "View as" role switcher, a register link, and an End demo button with a confirmation.',
    points: ['Time left comes from the server, so reloading cannot reset it.', 'Role switch submits on change, with a real <label>.', 'Redirects to a friendly "demo ended" page at zero.'],
    files: ['01-studypat/demo/demo-countdown-bar.blade.php'],
    shots: [['Demo bar on the dashboard', SHOT('01-studypat', '01-onboarding-and-dashboard', 'demo-sandbox')]],
  },
  {
    project: 'cbt', title: 'The exam screen: save queue, timer, safety', stack: 'Vanilla JavaScript · fetch',
    problem: 'In an exam hall the network is poor and a lost answer is serious. The candidate must always know whether their work is saved.',
    what: 'Every answer goes into a queue and is re-sent until the server says "saved". Each answer carries a version, so a newer edit made while an older one is in flight is never lost. Failures retry with exponential back-off (2 s, 4 s … up to 15 s). A status line shows "All answers saved", "Saving…" or "2 not saved, retrying". The timer counts to a deadline and is re-synchronised with the server clock every 20 seconds. A phone is kept awake, and leaving the tab is reported to the invigilator.',
    points: ['One shape for every question, whatever the server\'s letter case.', 'Anything that is not JSON (a login page, an error page) counts as a failed save, so the answer is kept and retried.', 'Answers the server will never accept are dropped instead of retried forever.', 'A lost violation report can never break the exam.', 'The Screen Wake Lock API with a safe fallback.'],
    files: ['02-chuvor-cbt/exam-client.js'],
    shots: [['The candidate exam screen', SHOT('02-chuvor-cbt', '01-candidate', 'cbt-candidate-exam-screen')]],
  },
  {
    project: 'cbt', title: 'Live monitor refresh', stack: 'Vanilla JavaScript · fetch',
    problem: 'The person in the hall needs an up-to-date picture of every candidate, even when the network is weak.',
    what: 'One request at a time, never overlapping. It refreshes every 3 seconds, slows to 8 seconds after repeated failures, and shows a clear banner when what is on screen may be out of date. Filtering and paging are done on the server so a big hall stays fast. Actions (add time, end an attempt) report plainly what happened or that nothing may have changed.',
    points: ['A busy flag stops requests piling up on a slow line.', 'Honest error messages that say what to do next.', 'cache: "no-store" so a proxy never serves an old picture.'],
    files: ['02-chuvor-cbt/live-monitor-polling.js'],
    shots: [['The live monitor', SHOT('02-chuvor-cbt', '02-exam-centre-admin', 'cbt-live-exam-monitor')]],
  },
  {
    project: 'client', title: 'Connection quality in plain words, and state from dates', stack: 'C# · JavaScript',
    problem: 'Non-technical staff say "it is slow" or "it hangs". Support needs to know in one glance whether the connection is the cause. The owner needs expiry that cannot go wrong.',
    what: 'ConnectionQuality turns the last eight delay measurements into a grade (Excellent, Good, Fair, Poor) and a sentence that tells the user what to try. serviceState computes a customer\'s state (ok, expiring, grace, expired, suspended, pending) from dates every time, so it is never stored and never stale.',
    points: ['A self-test found a one-lost-message case wrongly marked "Poor"; the rule was fixed so one hiccup is at most "Fair".', 'Jitter is counted, because delay that jumps around feels bad even when the average is fine.', 'The same state function feeds the app, the admin panel and the access check.'],
    files: ['04-chuvor-client/ConnectionQuality.cs', '04-chuvor-client/service-state.mjs'],
    shots: [['The staff app', SHOT('04-chuvor-client', '01-staff-app', 'chuvor-client-app-window')], ['The control panel', SHOT('04-chuvor-client', '02-company-admin', 'chuvor-client-control-panel')]],
  },
  {
    project: 'lab', title: 'Per-student values, marking and render on demand', stack: 'JavaScript · Three.js',
    problem: 'Practicals must be marked fairly without copying, and a 3D scene must run on a cheap phone.',
    what: 'A seeded random generator gives each student their own hidden values, so a friend\'s answer is wrong for you. Marking uses accuracy bands and returns a line for every mark with a note saying what to improve. The render loop redraws the 3D scene only when something changed (a "dirty" flag), and a Low graphics switch reduces work further.',
    points: ['Pure functions for the logic, so it is testable in Node (21 checks).', 'Every mark line carries its own explanation.', 'Render on demand keeps phones cool and fast.'],
    files: ['05-virtual-lab/marking-and-render-loop.js'],
    shots: [['Lab on desktop', SHOT('05-virtual-lab', '01-student', 'virtual-lab-titration-desktop')], ['Lab on a phone', SHOT('05-virtual-lab', '01-student', 'virtual-lab-titration-mobile')]],
  },
];

const read = (f) => readFileSync(join(root, 'code', f), 'utf8').replace(/^﻿/, '');
const lines = (t) => t.split('\n').length;
const lang = (f) => f.split('.').pop();

/* ── code/README.md ── */
let md = `# Code

Real code from the products, copied **verbatim** (excerpts are marked). Every file is in use; none of it was written for the portfolio. Nothing here contains keys, passwords, server addresses or customer data. The full products are private.

How to read this folder: each section says **the problem**, **what the code does**, the **good parts to notice**, and links to the **screen** it produces. The same content is on the website at \`docs/code.html\`.

> Honest note: StudyPat is server-rendered with Blade, vanilla JavaScript and CSS. These samples show how I build components and behaviour in that stack. React and TypeScript are what I am adding now.

| Product | Solution | Files |
|---|---|---|
`;
BLOCKS.forEach((b) => { md += `| ${PROJECT[b.project]} | ${b.title} | ${b.files.map((f) => `[${f.split('/').pop()}](${f})`).join(', ')} |\n`; });
BLOCKS.forEach((b) => {
  md += `\n## ${PROJECT[b.project]}: ${b.title}\n\n*${b.stack}*\n\n**The problem.** ${b.problem}\n\n**What the code does.** ${b.what}\n\n**Good parts to notice**\n${b.points.map((p) => `- ${p}`).join('\n')}\n\n**Files:** ${b.files.map((f) => `[${f}](${f}) (${lines(read(f))} lines)`).join(' · ')}\n\n**The screens:** ${b.shots.map(([t, p]) => `[${t}](../${p})`).join(' · ')}\n`;
});
writeFileSync(join(root, 'code', 'README.md'), md);

/* ── docs/code.html ── */
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Code · Ikechukwu Ikechukwu Egbujor</title>
<meta name="description" content="Real front-end code from four products: reusable components, an autosave queue for exams, a service worker policy, and more. Each sample explains the problem it solves.">
<meta name="theme-color" content="#0f2f57"><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="style.css"><link rel="stylesheet" href="roles.css"><link rel="stylesheet" href="code.css"></head>
<body><a class="skip" href="#code">Skip to the code</a>
<header class="top"><div class="wrap bar"><a class="brand" href="index.html"><span class="mark" aria-hidden="true"></span>Ikechukwu Egbujor</a><nav aria-label="Main"><a href="index.html#work">Work</a><a href="design-library.html">Design library</a><a href="code.html">Code</a><a class="btn small" href="index.html#contact">Contact</a></nav></div></header>
${SWITCHER('')}
<main id="code" class="wrap section">
  <h1>The code behind the screens</h1>
  <p class="lede">Real code from the products, copied exactly as it runs. Each sample says what problem it solves and what to notice. No keys, passwords or customer data. The full products are private.</p>
  <p class="note">StudyPat is server-rendered (Blade, vanilla JavaScript, CSS). These samples show how I build components and behaviour in that stack; React and TypeScript are what I am adding now.</p>
  <nav class="toc" aria-label="Samples">${BLOCKS.map((b, i) => `<a href="#c${i}">${esc(PROJECT[b.project])}: ${esc(b.title)}</a>`).join('')}</nav>
  ${BLOCKS.map((b, i) => `
  <article class="block" id="c${i}">
    <p class="tags">${esc(PROJECT[b.project])} · ${esc(b.stack)}</p>
    <h2>${esc(b.title)}</h2>
    <div class="two">
      <div>
        <h3>The problem</h3><p>${esc(b.problem)}</p>
        <h3>What the code does</h3><p>${esc(b.what)}</p>
        <h3>Good parts to notice</h3><ul>${b.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      </div>
      <div class="shots">${b.shots.map(([t, p]) => `<figure><a href="${site(p)}"><img src="${site(p)}" alt="${esc(t)}" loading="lazy"></a><figcaption>${esc(t)}</figcaption></figure>`).join('')}</div>
    </div>
    ${b.files.map((f, j) => `<details class="file"${j === 0 ? ' open' : ''}><summary><code>${esc(f)}</code> <span>${lines(read(f))} lines</span></summary><pre tabindex="0"><code class="lang-${lang(f)}">${esc(read(f))}</code></pre></details>`).join('')}
  </article>`).join('')}
</main>
<footer class="wrap foot"><p>Source: github.com/ikjoel/portfolio/tree/main/code</p></footer>
</body></html>
`;
writeFileSync(join(root, 'docs', 'code.html'), html);
console.log(`code page and README written: ${BLOCKS.length} solutions, ${BLOCKS.reduce((n, b) => n + b.files.length, 0)} files`);
