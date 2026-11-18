// One source of truth for the role-specific portfolio pages AND the role-specific CVs (the CV build imports this file).
// Public-safe on purpose: no phone numbers, no server addresses, no file paths, no open weaknesses.
// Every claim comes from the products themselves (code, tests, notes); nothing is invented.

const CASE = (n) => `https://github.com/ikjoel/portfolio/tree/main/projects/${n}`;
const CODE = (a) => `code.html#${a}`;

export const ROLES = [
  /* ═════════════════════════ FULL-STACK ═════════════════════════ */
  {
    id: 'full-stack', label: 'Full-stack', page: 'full-stack.html', file: 'Full-Stack-Engineer', title: 'Full-Stack Engineer',
    tagline: 'Laravel · PHP · ASP.NET Core · Node.js · MySQL · REST APIs · payments · deployment · responsive front end',
    headline: 'I take a feature from the database to the screen, then deploy it and keep it running.',
    lede: 'I design the data, write the back end and the interface, connect payments, email and messaging, deploy to Linux and look after it. Three products went from idea to real users this way.',
    summary: [
      'Full-stack engineer who owns a feature end to end: the data model, the server code, the API, the interface, the payment or email integration, the deployment and the support that follows. I have taken three products from idea to real users on my own, including a multi-school platform with 20+ registered schools, an offline exam system and an online shop that sells and delivers software licences.',
      'I care about the parts that decide whether software can be trusted: money that always adds up, a payment that is never lost, one customer never seeing another’s data, and pages that work on an inexpensive phone. I write automated tests for the risky parts, and I write down how things work so the next developer can change them.',
      'My strongest stack is Laravel and PHP with MySQL, plus ASP.NET Core and Node.js; on the front end, semantic HTML, CSS and JavaScript with reusable components. I am adding React and TypeScript.',
    ],
    strengths: [
      { t: 'Data you can trust', d: 'Fee ledgers with carry-forward, billing by term or session, nightly audits that check every school’s books balance, and repair commands with undo.' },
      { t: 'Payments that never get lost', d: 'Flutterwave checkout, server-side verification, idempotent activation, webhooks, and a scheduled job that recovers a payment if a webhook fails.' },
      { t: 'Multi-tenant by design', d: 'Every school has its own address or domain, with automatic DNS checks and certificates, role-based access, and isolation covered by tests.' },
      { t: 'Shipped and operated', d: 'Deployment on Linux, backups, cron jobs, email and WhatsApp integrations, activity logs and a support desk that watches production.' },
    ],
    projects: [
      {
        name: 'StudyPat', kind: 'Multi-tenant school management platform', when: '2025 to present', link: 'studypat.com',
        stack: 'Laravel 13 · PHP 8 · MySQL · Blade · JavaScript · Flutterwave · Mailgun · Twilio WhatsApp',
        bullets: [
          'Designed the data model for results, continuous assessment, fees, billing, parents and staff for many schools in one database, with every school-facing route protected by a tenant check and covered by tests.',
          'Modelled money carefully: fee ledgers with term-to-term carry-forward, a “paid equals recorded” rule, billing by term or by whole session (5% off), partner commissions, and nightly audits that confirm every school’s books balance.',
          'Integrated Flutterwave end to end: hosted checkout, server-side verification, webhook handling and a scheduled reconciliation job so a payment is never lost; plus Mailgun email, Twilio WhatsApp, Google sign-in and PDF invoices and report cards.',
          'Built custom-domain onboarding: a school points its domain, a scheduled job checks DNS, obtains a certificate and switches the domain on, with white-label branding behind a per-school switch.',
          'Automated support: onboarding emails, a setup checker that finds common mistakes and repairs the safe ones with undo, bulk upload tools with validation, and a support desk with three severity tiers and written playbooks.',
          'Built AI-assisted comment suggestions for report cards (teacher accepts, edits or removes) with usage limits that scale by plan.',
          'Found and fixed a password-reset vulnerability and an open photo endpoint (signed URLs); added role-based permissions, security headers and an activity log.',
        ],
        see: [['Case study', CASE('01-studypat')], ['Code', CODE('c0')]],
      },
      {
        name: 'CBT licence shop', kind: 'E-commerce for software licences', when: '2026', link: 'cbtlicense.chuvorint.com',
        stack: 'Laravel · Blade · Flutterwave · Mailgun · scheduled jobs',
        bullets: [
          'Built the storefront, checkout, owner admin, agent portal for resellers and an installer download page.',
          'Verified every payment on the server and re-checked nightly, so a lost webhook never loses an order; delivered the signed licence by email and download automatically.',
          'Covered the shop with 30 automated tests.',
        ],
        see: [['Case study', CASE('03-cbt-licence-shop')]],
      },
      {
        name: 'Chuvor CBT', kind: 'Offline computer-based exams', when: '2026', link: 'chuvorint.com',
        stack: 'ASP.NET Core 8 · Razor Pages · SQL Server · JavaScript',
        bullets: [
          'Built the exam screen with a save queue: every answer is versioned and re-sent with back-off until the server confirms, so no answer is lost on a poor network.',
          'Built the live monitor, question import, theory marking, reports, a REST API with API-key authentication so the exam software can pull rosters and questions and send results back, and signed computer-tied licences.',
          'Designed for hundreds of candidates and checked with a scripted load test.',
        ],
        see: [['Case study', CASE('02-chuvor-cbt')], ['Code', CODE('c5')]],
      },
      {
        name: 'Chuvor Client', kind: 'Multi-company secure remote access', when: '2026', link: '',
        stack: 'Node.js (no dependencies) · SQLite · .NET · WireGuard',
        bullets: [
          'Built the multi-company control panel and API: customers, plans, computer limits, expiry and grace days computed from dates, enrolment codes, approve and revoke, and Paystack payments with signature checks.',
          'Covered by 143 automated checks, including that one company can never see another’s data; one test exposed a real bug (a refused request still ran) which I fixed.',
        ],
        see: [['Case study', CASE('04-chuvor-client')], ['Code', CODE('c7')]],
      },
    ],
    skills: [
      ['Back end', 'PHP 8 and Laravel 13 · ASP.NET Core 8 (Razor Pages, Entity Framework) · Node.js · REST APIs and API-key authentication · queues, scheduled jobs and webhooks · PDF generation'],
      ['Data', 'MySQL, SQL Server, SQLite · data modelling and migrations · ledgers and reconciliation · reporting · nightly audits and repair commands'],
      ['Front end', 'Semantic HTML5 · CSS3 (Flexbox, Grid, variables, print and dark styles) · JavaScript ES6+ (fetch, async) · Blade components · Bootstrap 5 · PWAs and service workers · Chart.js · Three.js'],
      ['Integrations', 'Flutterwave and Paystack (checkout, verification, webhooks) · Mailgun · Twilio WhatsApp · Google sign-in · Anthropic API · Search Console'],
      ['Quality and security', 'PHPUnit · scripted load tests · role-based access · signed URLs · tenant isolation tests · security headers · activity logging'],
      ['Delivery', 'Git and GitHub · Linux deployment (Apache, PHP-FPM, cron, TLS, backups) · Inno Setup installers · documentation and playbooks'],
      ['Currently adding', 'React and TypeScript'],
    ],
    practice: {
      title: 'How I deliver', lead: 'A full-stack feature is only done when it is safe, observable and understood.',
      bullets: ['Model the data first, including the money and the edge cases.', 'Write a test for the risky part before trusting it.', 'Verify every payment on the server, and re-check it on a schedule.', 'Make a refused action refuse, and test the side effects, not only the message.', 'Log what matters so support can see a problem before the customer reports it.', 'Document the rule behind every non-obvious decision.'],
    },
  },

  /* ═════════════════════════ SOFTWARE ENGINEER ═════════════════════════ */
  {
    id: 'software-engineer', label: 'Software engineer', page: 'software-engineer.html', file: 'Software-Engineer', title: 'Software Engineer',
    tagline: 'C# · .NET · PHP · JavaScript · SQL · system design · testing · security · performance',
    headline: 'I design software that stays correct under load, on bad networks and when people make mistakes.',
    lede: 'From signed, computer-tied licences to a state machine for peer-to-peer connections and an adaptive rate limiter, I build systems with clear rules and tests that pin them down.',
    summary: [
      'Software engineer who designs and builds complete systems: a multi-tenant school platform, an offline exam system, a licensing system with signed licence files, and a secure remote-access platform with its own control plane. I work from clear rules (what must always be true), write tests that pin those rules down, and measure performance instead of guessing.',
      'I am comfortable across PHP and Laravel, C# and ASP.NET Core, Node.js and JavaScript, with SQL databases, and I move between desktop, web and server code. I have found and fixed real security flaws in my own systems, written the load tests, and kept the documentation that lets someone else take over.',
      'I am adding React and TypeScript, and deeper algorithms and system-design practice, to work well inside a larger engineering team.',
    ],
    strengths: [
      { t: 'Rules first, then code', d: 'Subscription state computed from dates, a ledger that must always add up, a connection that may only switch paths when it is safe: each is written as a rule and tested.' },
      { t: 'Security as engineering', d: 'Signed licence files with tamper and clock checks, per-account and per-IP sign-in limits, signed URLs, tenant isolation tests, an adaptive rate limiter with a behaviour score.' },
      { t: 'Measured performance', d: 'Scripted load tests for hundreds of exam candidates, measured CPU and memory per page, render-on-demand 3D, and print-first pages that cost 40 times less than server PDFs.' },
      { t: 'Tested', d: '143 checks on one platform, 24 on a connection state machine, 21 on marking logic, 30 on a shop, and 40+ test files on the school platform.' },
    ],
    projects: [
      {
        name: 'Chuvor Client', kind: 'Secure remote-access platform', when: '2026', link: '',
        stack: 'C# (.NET, Windows Forms) · Node.js · SQLite · WireGuard · Inno Setup',
        bullets: [
          'Designed a multi-company private network: each company gets its own address block, user computers can reach only their company’s computer, and the hub’s firewall rules are generated per person from the control panel.',
          'Wrote the control plane: customers, plans, limits, enrolment codes, computer approval, and subscription state computed from dates so it is never stored or stale; sign-in with hashed passwords, lockout, CSRF tokens and owner versus customer roles.',
          'Built a state machine that can move two computers onto a direct connection and back, with make-before-break switching, a 15-second silence fallback and back-off; 24 checks run it against a simulated network.',
          'Wrote a fast raw print bridge that accepts only the company computer’s address and streams to the Windows spooler, with a built-in speed test.',
          '143 automated checks, including cross-company isolation; one caught a real bug (a refused request still executed), which I fixed.',
        ],
        see: [['Case study', CASE('04-chuvor-client')], ['Code', CODE('c7')]],
      },
      {
        name: 'Chuvor CBT and licensing', kind: 'Offline exams and computer-tied licences', when: '2026', link: 'chuvorint.com',
        stack: 'ASP.NET Core 8 · SQL Server · C# · JavaScript',
        bullets: [
          'Designed a licensing system: computer-tied licence files signed with RSA, tamper and clock-rollback checks, and an offline activation flow.',
          'Built a REST API with API-key authentication so the exam software can pull rosters and questions and send results back.',
          'Built an exam client with a versioned save queue and exponential back-off so no answer is lost on a poor network, and verified capacity with a scripted load test for hundreds of candidates.',
        ],
        see: [['Case study', CASE('02-chuvor-cbt')], ['Code', CODE('c5')]],
      },
      {
        name: 'StudyPat', kind: 'Multi-tenant school platform', when: '2025 to present', link: 'studypat.com',
        stack: 'Laravel 13 · PHP 8 · MySQL · JavaScript',
        bullets: [
          'Built an adaptive request guard: a cost-weighted budget per IP and per account, a behaviour score that decays over five minutes, a ban ladder (15 minutes to 24 hours), shared-school-network handling, shadow mode before enforcement, and a rule that it fails open.',
          'Modelled fees, results and billing with rules that tests pin down (fee carry-forward, paid equals recorded, term activation), plus nightly audits and repair commands with undo.',
          'Measured instead of guessing: a report-card PDF cost about 1.2 s of CPU and 46 MB, the HTML page about 0.03 s and 14 MB, so parents print from their own browser.',
          'Found and fixed a password-reset vulnerability and an open photo endpoint; wrote a written security audit of my own system.',
        ],
        see: [['Case study', CASE('01-studypat')], ['Code', CODE('c1')]],
      },
      {
        name: 'Virtual Lab', kind: '3D practicals with fair marking', when: '2026', link: '',
        stack: 'JavaScript · Three.js · Node checks',
        bullets: [
          'Pure, seeded functions give each student different hidden values; marking returns a line per mark with an explanation; 21 checks cover the logic.',
          'Render-on-demand loop keeps the scene at 60 frames per second on an old laptop GPU.',
        ],
        see: [['Case study', CASE('05-virtual-lab')], ['Code', CODE('c8')]],
      },
    ],
    skills: [
      ['Languages', 'C# · PHP 8 · JavaScript (ES6+) · SQL · Python (test and load tools) · PowerShell and Bash'],
      ['Frameworks', 'ASP.NET Core 8 · Laravel 13 · Node.js · Windows Forms · Three.js'],
      ['Design and architecture', 'Multi-tenant design · state machines · ledgers and reconciliation · licensing and signatures · API design · separation of control plane and data plane'],
      ['Testing and quality', 'PHPUnit · scripted end-to-end checks · load-test harnesses · self-tests for logic · test-by-side-effect for security rules'],
      ['Security', 'RSA-signed licences · password hashing (scrypt, bcrypt) · CSRF · lockouts and rate limits · signed URLs · tenant isolation · WireGuard networks'],
      ['Data', 'MySQL · SQL Server · SQLite · migrations · backups and restore tests'],
      ['Tools', 'Git · GitHub · Linux · Inno Setup · browser developer tools · Figma'],
      ['Currently adding', 'React, TypeScript, and structured algorithm and system-design practice'],
    ],
    practice: {
      title: 'Engineering practice', lead: 'How I keep software correct as it grows.',
      bullets: ['Write down what must always be true, then test exactly that.', 'Compute state from facts (dates, ledgers) instead of storing it.', 'Prefer small, pure functions for logic, so it can be tested without a browser or a server.', 'Measure before and after every performance claim.', 'Fail safe: a guard fails open, a repair has an undo, a licence check refuses clearly.', 'Keep a written decision for every trap I find, so no one falls in twice.'],
    },
  },

  /* ═════════════════════════ IT / SYSTEMS ═════════════════════════ */
  {
    id: 'it-systems', label: 'IT and systems', page: 'it-systems.html', file: 'IT-Systems-and-Support', title: 'IT Systems and Support Engineer',
    tagline: 'Linux servers · networks and VPN · backups · security · Windows and virtualisation · user support',
    headline: 'I keep real systems running: servers, networks, backups, security, and the people who use them.',
    lede: 'I run the production servers behind my own products, design the networks that exam halls and offices depend on, and write the runbooks and tools that make support fast.',
    summary: [
      'IT and systems engineer with hands-on experience running production Linux servers, setting up networks and secure remote access, protecting systems, backing them up and supporting the people who depend on them. I operate the infrastructure behind my own products, so I have lived with outages, attacks, certificates, updates and 2 a.m. problems, and I have written down what I learned.',
      'I am a developer as well as an administrator, so I automate: backup and update routines, health checks, alerts, diagnostics for support, and installers for non-technical users. I explain technical problems in plain language and write short, clear guides for the person at the other end.',
      'I hold a BSc in Mathematics and Computer Science and ALX certificates in Data Analysis and Prompt Engineering; I am working towards vendor certifications (for example CompTIA Network+ and Security+, or Microsoft Azure fundamentals).',
    ],
    strengths: [
      { t: 'Servers', d: 'Production Linux (AlmaLinux): Apache, PHP-FPM, MariaDB on localhost only, firewall, intrusion banning, key-only SSH, security updates, and TLS including automatic certificates for customers’ own domains.' },
      { t: 'Backups that restore', d: 'Nightly encrypted database backups and weekly file backups with fixed retention, a copy of the key kept separately, and a restore tested into a scratch database before I trusted it.' },
      { t: 'Networks and remote access', d: 'LAN design for exam halls, and a private WireGuard network where each company is separated and computers can reach only what they should.' },
      { t: 'Security and response', d: 'A written audit of my own systems, an adaptive rate limiter with a flood alert, and a response runbook with levels, commands and message templates.' },
    ],
    projects: [
      {
        name: 'Production hosting for StudyPat', kind: 'Server administration and security', when: '2025 to present', link: 'studypat.com',
        stack: 'AlmaLinux · Apache · PHP-FPM · MariaDB · Redis · firewalld · fail2ban · SELinux · cron',
        bullets: [
          'Administer the production server: Apache with security headers and hidden version, PHP-FPM sized from measurements, MariaDB reachable only from the server itself, firewall with only the needed services, intrusion banning with a growing ban time, SSH with keys only, and regular security updates.',
          'Designed and tested backups: nightly encrypted database dumps and weekly file archives with retention, a separate copy of the key, and a restore into a scratch database that matched row counts.',
          'Measured the server (response time, CPU per visit, memory per worker), tuned PHP-FPM limits, estimated capacity per hardware size and wrote an upgrade plan for when more schools arrive.',
          'Added defence in depth: an adaptive rate-limiting guard running in shadow mode before enforcement, jails that block repeat offenders at the firewall, flood limits in Apache, and an early-warning email alert.',
          'Wrote a DDoS response runbook (four levels, commands, message templates) and a written security audit of my own system with a prioritised list of findings.',
          'Built custom-domain onboarding: DNS checks, automatic certificates (Let’s Encrypt) and per-domain web server configuration, run by a scheduled job.',
        ],
        see: [],
      },
      {
        name: 'Chuvor Client', kind: 'Secure remote access for companies', when: '2026', link: '',
        stack: 'WireGuard · Windows (RDP, firewall, spooler) · Linux hub · Node.js control panel',
        bullets: [
          'Designed a hub-and-spoke WireGuard network: every computer connects out to the hub, so customers need no public address and any router works; each company has its own address block and firewall rules.',
          'Restricted Remote Desktop to the private network only, forced users into a single program, and kept sessions alive through internet cuts.',
          'Built a fast print path from the company computer to each person’s own printer, with a speed test and a diagnostic tool that tells support what is slow and why.',
          'Wrote setup scripts for the company computer (remote desktop, graphics, printing, power) and written guides for Windows Pro versus Windows Server with Remote Desktop licences.',
          'Added a connection-quality grade (delay, jitter, loss) in plain words so support can tell whether the network or the program is the cause.',
        ],
        see: [['Case study', CASE('04-chuvor-client')], ['Code', CODE('c7')]],
      },
      {
        name: 'Exam hall setup (Chuvor CBT)', kind: 'Networks and server sizing for exam centres', when: '2026', link: 'chuvorint.com',
        stack: 'Gigabit LAN · Windows 10/11 · SQL Server · Inno Setup',
        bullets: [
          'Set up local networks for exam halls: wired Gigabit switches in a star layout, a wired server, and a UPS, so hundreds of candidates can write offline.',
          'Wrote hardware sizing guidance by number of candidates (from a 4 GB entry-level PC up to a 32 GB server for 500) and published it as the requirements page.',
          'Packaged the software for non-technical staff with a Windows installer and a licence activation that works without internet.',
        ],
        see: [['Case study', CASE('02-chuvor-cbt')]],
      },
      {
        name: 'Support and monitoring systems', kind: 'Keeping customers working', when: '2026', link: '',
        stack: 'Laravel · cron · email alerts · playbooks',
        bullets: [
          'Built a support desk that watches production: failed-sign-in bursts, repeated server errors, custom domains that fail, payments that were taken but not applied, and stale backups; three severity tiers, a daily digest, and 14 written playbooks.',
          'Added an activity log and a school-health page that show who did what and which customers have gone quiet.',
          'Built a self-diagnosing setup checker that repairs only what is provably safe and keeps an undo for 30 days.',
        ],
        see: [],
      },
    ],
    skills: [
      ['Linux and servers', 'AlmaLinux / RHEL family · Apache · PHP-FPM · MariaDB / MySQL · Redis · systemd · cron · SELinux basics · firewalld · fail2ban · SSH hardening · package and security updates'],
      ['Networking', 'TCP/IP · DNS (A records, propagation, custom domains) · Gigabit LAN design · WireGuard VPN · routing and NAT concepts · firewall rules (nftables, Windows Firewall) · QoS for printing'],
      ['Windows and virtualisation', 'Windows 10/11 and Windows Server concepts · Remote Desktop and licensing · Group Policy settings · Proxmox VE and Hyper-V (VM per user design) · installers (Inno Setup)'],
      ['Security', 'Hardening · TLS and certificates · rate limiting and abuse detection · audits and findings · backup encryption · access control and least privilege · incident runbooks'],
      ['Backup and recovery', 'Encrypted backups · retention policy · restore drills · off-site copy planning'],
      ['Monitoring and support', 'Logs and activity trails · alerts and digests · playbooks · diagnostic tools · plain-language user guides · WhatsApp and email support'],
      ['Scripting', 'Bash · PowerShell · Python · PHP and JavaScript for automation'],
      ['Currently working towards', 'CompTIA Network+ / Security+ or Microsoft Azure fundamentals (to add a vendor certificate to the hands-on experience)'],
    ],
    practice: {
      title: 'Operations practice', lead: 'The habits that keep a small team’s systems safe.',
      bullets: ['Change one thing at a time, keep a way back, and test the way back.', 'Take a backup before every change; test a restore before you need it.', 'Prefer fixing the cause to restarting the symptom, and write down what the cause was.', 'Start a new defence in monitoring-only mode before turning it on.', 'Explain every problem in words the user understands.', 'Keep runbooks short enough to use at 2 a.m.'],
    },
  },
];

export const BY_ID = Object.fromEntries(ROLES.map((r) => [r.id, r]));
