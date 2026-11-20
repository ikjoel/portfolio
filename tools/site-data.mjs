// Content for the portfolio website (home, work, case studies, services, contact).
// Facts only: everything here comes from the products, their code and tests. No invented results.

export const PERSON = {
  name: 'Ikechukwu Ikechukwu Egbujor', short: 'Ikechukwu Egbujor', role: 'Front-End Engineer', city: 'Lagos, Nigeria',
  email: 'ikjoel231@gmail.com', github: 'https://github.com/ikjoel', repo: 'https://github.com/ikjoel/portfolio',
};

const S = (slug, caption) => ({ mock: `assets/screens/${slug}.svg`, wire: `assets/screens/wire-${slug}.svg`, caption });

export const PROJECTS = [
  /* ───────────────────────── StudyPat ───────────────────────── */
  {
    slug: 'studypat', letter: 'a', category: 'Education · SaaS', name: 'StudyPat', tagline: 'A school platform that parents, teachers and administrators actually understand.',
    year: '2025 to now', role: 'Designer and front-end engineer (also back end)', stack: 'Blade · Bootstrap 5 · JavaScript · CSS variables · PWA · Laravel', status: 'Live', live: 'https://studypat.com',
    intro: 'StudyPat runs results, fees, parents, e-learning, exams and a website for each school. I designed and built the interface for administrators, teachers, parents and students, and made every school’s portal an installable app in its own colours.',
    hero: S('studypat-admin-dashboard', 'Administrator dashboard with the Get Started card'),
    problem: {
      points: ['After registering, new schools did not know what to do next; a seven-step wizard put “Students” last.', 'Help text was written again on every page, in a different style each time.', 'Parents use inexpensive phones on slow, expensive data and want one answer: how did my child do?', 'Server-made PDF report cards were slow and heavy.'],
      led: ['New schools stalling at setup', 'Inconsistent, hard-to-find help', 'Slow report cards on busy days'],
    },
    solution: 'I replaced the wizard with one card that always shows the single next step, wrote the help once as reusable components, made the parent’s result page lead with the answer, and turned every portal into an installable app that never caches personal pages.',
    decisions: [
      { title: 'One clear next step', bullets: ['A Get Started card with a progress bar, a checklist and the one button to press next.', 'One-click presets for grading and score divisions, so a school can begin before designing rules.', 'Empty quick actions hidden until they can work.'], shot: null },
      { title: 'Help written once, as components', bullets: ['Five Blade components (help, steps, tip, next-step, empty-state) plus one shared “Saving… / All changes saved” indicator.', 'Callouts that can be closed and stay closed.', 'Used across dozens of screens, each batch covered by page checks for every role.'], shot: S('score-divisions', 'Score divisions with a live “adds up to 100” check') },
      { title: 'Designed for the parent on a phone', bullets: ['The result page leads with average and position; subject detail comes second.', 'Print-first report cards: 12 print stylesheets; parents print or “Save as PDF” in their own browser.', 'A report-card page costs about 0.03 s and 14 MB against about 1.2 s and 46 MB for a server PDF.'], shot: S('studypat-parent-results-mobile', 'Parent result view on a phone') },
      { title: 'An installable app for every school', bullets: ['A manifest, icons and a service worker generated per school, in the school’s name and colour.', 'Install prompt on Android; two-tap help on iPhone.', 'A deliberate rule: page HTML is never cached, so personal data and form tokens are never stale.'], shot: S('install-app-pwa', 'Install card on a phone') },
    ],
    outcome: ['20+ schools registered.', 'Report cards that open fast on a cheap phone, with no server PDF load.', 'Google page one for target searches within weeks (average position 9.3 over 28 days in Search Console, October 2026).', 'A reusable help library the whole product now uses.'],
    myRole: ['Interface design: wireframes, mockups, tokens and UX writing.', 'Front end: Blade components, CSS, JavaScript, PWA and service worker.', 'Back end, data, payments and deployment, because I own the product.'],
    takeaway: 'People do not need more features on screen. They need to know what to do next, and to trust that what they see is current.',
    code: { href: 'code.html#c0', label: 'Read the help-component code' },
    more: ['chuvor-cbt', 'cbt-licence-shop'],
  },

  /* ───────────────────────── Chuvor CBT ───────────────────────── */
  {
    slug: 'chuvor-cbt', letter: 'b', category: 'Exams · Offline software', name: 'Chuvor CBT', tagline: 'An exam screen that never loses an answer, on a network that sometimes fails.',
    year: '2026', role: 'Designer and engineer', stack: 'ASP.NET Core · Razor Pages · SQL Server · JavaScript (fetch) · MathJax', status: 'Released', live: 'https://chuvorint.com',
    intro: 'Chuvor CBT runs computer-based exams on a local network with no internet. I built the candidate’s exam screen, the invigilator’s live monitor, question import, theory marking, reports and licensing.',
    hero: S('cbt-candidate-exam-screen', 'The candidate exam screen'),
    problem: {
      points: ['Exam halls are stressful and the network is not perfect.', 'A lost answer or an accidental submit is a serious mistake for a young candidate.', 'The person in the hall must see every candidate at once and act fast.', 'Candidates should not be able to leave the exam page unnoticed.'],
      led: ['Fear of losing work', 'Invigilators guessing', 'Little trust in the system'],
    },
    solution: 'One question at a time with a numbered palette, a save queue that never gives up, a server-synchronised timer, and a live monitor that tells the truth about how fresh its picture is.',
    decisions: [
      { title: 'A save queue that never gives up', bullets: ['Every answer is versioned and re-sent with exponential back-off until the server confirms.', 'A status line says “All answers saved”, “Saving” or “2 not saved, retrying”.', 'Anything that is not valid JSON (a login page, an error) counts as a failed save, so the answer is kept.'], shot: null },
      { title: 'A palette that says where you are', bullets: ['Current, answered, unanswered and unsaved are four clearly different states, not colour alone.', 'The timer counts to a deadline and re-synchronises with the server clock every 20 seconds.', 'Mathematics shown with MathJax.'], shot: null },
      { title: 'A live monitor that is honest', bullets: ['Refreshes every 3 seconds, one request at a time, slows to 8 seconds on a bad connection and shows a banner when the picture may be out of date.', 'Filtering and paging happen on the server so a large hall stays fast.', 'Actions such as ending an attempt or giving extra minutes say plainly what happened.'], shot: S('cbt-live-exam-monitor', 'Live monitor') },
      { title: 'Integrity without drama', bullets: ['Tab switches, copy and paste are reported; too many violations submit the exam automatically.', 'A phone’s screen is kept awake during the exam.', 'A lost violation report can never break the exam.'], shot: null },
    ],
    outcome: ['Released and sold as computer-tied licences.', 'Designed for hundreds of candidates at once and checked with a scripted load test before release.', 'Question import, theory marking and class reports built into the same product.'],
    myRole: ['Exam screen and live monitor: interaction design and code.', 'Save queue, timer and integrity logic in JavaScript.', 'Back end, licensing and installer.'],
    takeaway: 'In a high-stakes moment, the interface’s job is to remove doubt: say what is saved, say what is fresh, and never lose the user’s work.',
    concepts: [S('candidate-login', 'Concept: sign-in with photo check'), S('submit-review', 'Concept: review before submit'), S('result-slip', 'Concept: result slip with verification code')],
    code: { href: 'code.html#c5', label: 'Read the save-queue code' },
    more: ['studypat', 'virtual-lab'],
  },

  /* ───────────────────────── CBT Licence Shop ───────────────────────── */
  {
    slug: 'cbt-licence-shop', letter: 'c', category: 'E-commerce · Software', name: 'CBT Licence Shop', tagline: 'Sell a software licence online and deliver it with nobody in the loop.',
    year: '2026', role: 'Designer and full-stack engineer', stack: 'Laravel · Blade · Flutterwave · Mailgun · scheduled jobs', status: 'Live', live: 'https://cbtlicense.chuvorint.com',
    intro: 'The shop sells licences for the exam software. Buyers are exam-centre owners paying from a phone. I designed the storefront and built payment, delivery and the owner’s admin.',
    hero: S('licence-shop-pricing', 'Pricing page'),
    problem: {
      points: ['Buyers hesitate to pay online, and wonder after paying whether it worked.', 'They also ask, before buying, which server computer they need.', 'The owner must be certain that no paid order is ever lost.'],
      led: ['Abandoned checkouts', 'Support questions about hardware', 'Fear of missing orders'],
    },
    solution: 'A pricing page that helps people decide, a requirements page that answers the hardware question, server-side payment verification, and automatic delivery of the signed licence by email and download.',
    decisions: [
      { title: 'Pricing that helps people decide', bullets: ['One main action and one quiet alternative.', 'A highlighted plan, and sample prices clearly marked as samples in the portfolio.'], shot: null },
      { title: 'Answer the hardware question before it is asked', bullets: ['A single table: how many candidates at once, and which computer you need.', 'The three things every size needs: Windows 10 or 11, a UPS and a wired Gigabit link.'], shot: S('requirements-page', 'Requirements: choose the server PC') },
      { title: 'A payment that is never lost', bullets: ['Every payment verified on the server, plus webhook handling.', 'A scheduled reconciliation job re-checks every paid order.', 'The signed licence is delivered by email and by download.'], shot: S('checkout-form', 'Checkout') },
      { title: 'An owner who can see what needs a look', bullets: ['Orders list with payment and delivery state.', 'The result of the nightly reconciliation shown on the dashboard.', 'An agent portal for resellers.'], shot: S('orders-admin', 'Owner’s orders view') },
    ],
    outcome: ['Live and selling.', '30 automated tests.', 'Lost webhooks cannot lose an order.'],
    myRole: ['Storefront design and implementation.', 'Payment verification, webhooks, reconciliation and email delivery.', 'Owner admin and agent portal.'],
    takeaway: 'Trust is built by answering the next question before the user asks it.',
    code: null,
    more: ['chuvor-cbt', 'chuvor-client'],
  },

  /* ───────────────────────── Chuvor Client ───────────────────────── */
  {
    slug: 'chuvor-client', letter: 'd', category: 'Remote access · SaaS', name: 'Chuvor Client', tagline: 'Secure access to one company program, for people who never want to see a network setting.',
    year: '2026', role: 'Designer and engineer', stack: '.NET (Windows Forms) · Node.js · WireGuard · Inno Setup', status: 'Launched', live: '',
    intro: 'Staff open one company program from approved computers only, and receipts and documents print quickly on their own printer. It is sold as a subscription to many companies. I designed the Windows app and the control panels and built the platform behind them.',
    hero: S('chuvor-client-app-window', 'The Windows app'),
    problem: {
      points: ['The users are shop and office staff, not IT people.', 'The administrator must approve or remove a computer in one click.', 'The owner needs many companies on one platform with expiry that cannot go wrong.', 'Support needs to know quickly whether “slow” is the network or the program.'],
      led: ['Fear of settings', 'Slow, uncertain support', 'Risk of access after expiry'],
    },
    solution: 'One large button, a status in a sentence, help under every control, and a control plane where state is computed from dates and every refused action is tested.',
    decisions: [
      { title: 'One obvious action', bullets: ['A large “Open your program” button with two lines under it saying what happens next.', 'Status in a sentence: “Connected to your company computer”.'], shot: null },
      { title: 'Quality in plain words', bullets: ['The last eight delay measurements become Excellent, Good, Fair or Poor, with a sentence on what to try.', 'Jitter and lost messages are counted, not just the average.'], shot: null },
      { title: 'A control panel that explains itself', bullets: ['Computers table with plain statuses and one button per row.', 'One-time codes to add a computer, with their rules written beside them.', 'Every switch says what it does and what “off” means.'], shot: S('chuvor-client-control-panel', 'Company control panel') },
      { title: 'State from dates, never stored', bullets: ['Active, ending soon, grace, expired, suspended and pending are computed every time.', 'The same function feeds the app, the admin panel and the access check.'], shot: S('platform-customers', 'Platform owner’s customers view') },
    ],
    outcome: ['Launched and in use.', '143 automated checks on the platform, including that one company can never see another’s data.', 'One test exposed a real bug (a refused request still ran), which I fixed.'],
    myRole: ['Interface design for the app and panels.', 'Windows Forms app, control panel and API.', 'Network, installer and documentation.'],
    takeaway: 'Non-technical users need fewer choices, not more explanations. Design the one path, and make everything else safe.',
    code: { href: 'code.html#c7', label: 'Read the connection-quality code' },
    more: ['cbt-licence-shop', 'virtual-lab'],
  },

  /* ───────────────────────── Virtual Lab ───────────────────────── */
  {
    slug: 'virtual-lab', letter: 'e', category: 'Education · 3D · Prototype', name: 'Virtual Lab', tagline: 'Science practicals in a phone browser, for students who have no laboratory.',
    year: '2026', role: 'Designer and front-end engineer', stack: 'Three.js · WebGL · JavaScript', status: 'Prototype', live: '',
    intro: 'Titration and Ohm’s law run in a 3D scene on a phone, and students are marked automatically. Performance is the design constraint, because the audience has inexpensive phones and old laptops.',
    hero: S('virtual-lab-titration-desktop', 'Titration on desktop'),
    problem: {
      points: ['Many schools have no lab equipment, but exams still ask about practicals.', 'Phones and old laptops cannot run a heavy 3D scene.', 'Practical marks must be fair and cannot be copied from a friend.'],
      led: ['Students practising theory only', 'Unfair or copied marks', 'Unusable 3D on cheap devices'],
    },
    solution: 'A guided, phone-first lab: render only when something changes, a Low graphics switch, a step list, formulas only after a hint, and per-student hidden values with line-by-line marking.',
    decisions: [
      { title: 'Phone first', bullets: ['The 3D scene on top, the controls in a bottom sheet within thumb reach.', 'A Low graphics switch for older devices.'], shot: S('virtual-lab-titration-mobile', 'Titration on a phone') },
      { title: 'Guided, not crowded', bullets: ['A numbered step list with the current step highlighted.', 'Formulas appear only after a hint, so students think first.'], shot: null },
      { title: 'Marking that explains itself', bullets: ['A seeded generator gives each student different hidden values.', 'Every mark line carries a note saying what to improve.'], shot: S('practical-marking', 'Marking breakdown') },
      { title: 'A second experiment from the same pattern', bullets: ['Ohm’s law with a live voltage-against-current graph.'], shot: S('ohms-law-desktop', 'Ohm’s law') },
    ],
    outcome: ['60 frames per second on an old Intel HD 520 laptop in the prototype.', '21 automated checks cover the marking logic.', 'A working prototype with two experiments.'],
    myRole: ['Interaction and layout design.', 'Three.js scene, render loop and marking logic.', 'Performance tuning and tests.'],
    takeaway: 'When the device is the limit, performance is not a technical detail. It is the design.',
    concepts: [S('assign-practical', 'Concept: teacher assigns a practical'), S('class-practical-results', 'Concept: class results')],
    code: { href: 'code.html#c8', label: 'Read the render-loop code' },
    more: ['studypat', 'chuvor-client'],
  },
];

export const BY_SLUG = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]));

export const LIVE = [
  { letter: 'a', name: 'StudyPat', note: 'School management platform', href: 'https://studypat.com' },
  { letter: 'b', name: 'CBT Licence Shop', note: 'Sells exam-software licences', href: 'https://cbtlicense.chuvorint.com' },
  { letter: 'c', name: 'Chuvor International', note: 'The company site', href: 'https://chuvorint.com' },
];

export const COMPONENTS = [
  { title: 'Help components', note: 'Five Blade components and one save indicator used across dozens of screens', href: 'code.html#c0', code: "<x-ux.help tone=\"tip\" dismiss=\"score-split\">\n  Active divisions must add up to 100.\n</x-ux.help>" },
  { title: 'Answer save queue', note: 'Versioned, retried with back-off until the server confirms', href: 'code.html#c5', code: "dirty.set(qid, ++version);\n// ...\nretryTimer = setTimeout(flush,\n  Math.min(15000, 2000 * 2 ** (failCount - 1)));" },
  { title: 'Service worker policy', note: 'Pages always from the network; only static files cached', href: 'code.html#c3', code: "if (request.mode === 'navigate') {\n  event.respondWith(\n    fetch(request).catch(() => caches.match(OFFLINE_URL)));\n}" },
  { title: 'Connection quality', note: 'Delay, jitter and loss turned into plain words', href: 'code.html#c7', code: "var g = avgMs <= 50 ? 0 : avgMs <= 100 ? 1 : avgMs <= 200 ? 2 : 3;\nif (jitter > 150) g = Math.max(g, 2);" },
];

export const CAPABILITIES = [
  { letter: 'a', title: 'Front-end development', text: 'Semantic HTML, modern CSS and JavaScript. Fast, responsive, accessible pages that work on inexpensive phones and in print.' },
  { letter: 'b', title: 'UI design and design systems', text: 'Wireframes, mockups, design tokens and reusable components, built so design and code stay in step.' },
  { letter: 'c', title: 'Progressive web apps', text: 'Installable apps with a manifest, service worker and a careful cache policy that keeps personal data fresh.' },
  { letter: 'd', title: 'Full-stack web applications', text: 'Laravel, ASP.NET Core and Node.js with MySQL or SQL Server, payments, email and deployment.' },
];

export const EXPERIENCE = [
  { n: '01', role: 'Founder and Lead Software Developer', org: 'Chuvor International', when: '2025 to present', text: 'I own five products from design to deployment: StudyPat, Chuvor CBT, the CBT Licence Shop, Chuvor Client and Virtual Lab. I design the screens, write the front end and the back end, deploy, and support the users. I run the full loop: listen to complaints, sketch a wireframe, build it, test it on a low-end phone, and check whether the problem went away.' },
  { n: '02', role: 'Product Manager and Back-End Developer', org: 'Fhope Technologies', when: '2023', text: 'I built the server-side logic, MySQL databases and REST APIs behind the company’s applications in PHP and Laravel, and worked as product manager alongside development, turning business needs into user stories and keeping the backlog in order.' },
  { n: '03', role: 'Junior Software Engineering Intern', org: 'Leval International', when: '2021', text: 'My first professional role in software: I helped develop and debug software components and scripts, and gave technical support and hardware and software troubleshooting.' },
];

export const EDUCATION = [
  ['BSc Mathematics and Computer Science', 'National Open University of Nigeria', '2021'],
  ['Data Analysis', 'ALX', ''],
  ['Prompt Engineering', 'ALX', ''],
  ['Back-End Developer certificate', 'ILID Institute', ''],
];

export const TOOLS = ['HTML', 'CSS', 'JavaScript', 'Blade', 'Bootstrap', 'Three.js', 'Chart.js', 'PWA', 'Figma', 'Laravel', 'ASP.NET Core', 'Node.js', 'MySQL', 'Git', 'Linux'];

export const SERVICES = [
  { letter: 'a', title: 'Front-end development', text: 'Responsive, accessible interfaces in semantic HTML, CSS and JavaScript, with components you can reuse.' },
  { letter: 'b', title: 'Figma to code', text: 'I turn designs into working pages, keeping spacing, colour and type in shared tokens so nothing drifts.' },
  { letter: 'c', title: 'Progressive web apps', text: 'Installable, fast apps with offline fallbacks and a cache policy that is safe for personal data.' },
  { letter: 'd', title: 'Full-stack web apps', text: 'Laravel, ASP.NET Core or Node.js with databases, payments, email and deployment on Linux.' },
  { letter: 'e', title: 'Performance and accessibility', text: 'Measured speed on slow devices, keyboard and screen-reader basics, print and dark-mode styles.' },
];
export const PROCESS = [
  ['Understand', 'I start with the user’s words and one sentence on what hurts today.'],
  ['Wireframe', 'Grey boxes first: layout, order and the one main action.'],
  ['Design', 'Colour, type and states in a small token set.'],
  ['Build', 'Semantic HTML, CSS variables and reusable components, mobile first.'],
  ['Check', 'Keyboard, contrast, empty, loading and error states, print and small screens.'],
  ['Learn', 'Watch real use and fix the real problem.'],
];
