# StudyPat: school management platform

**Live:** https://studypat.com · **Role:** designer-developer, owner · **Status:** live, 20+ schools registered

A multi-school platform for results, fees, parents, teachers, e-learning, exams and a public website for every school. Each school gets its own address (or its own domain), its own colours and an app that installs on a phone.

**Stack:** Laravel, Blade (370+ templates), Bootstrap 5, vanilla JavaScript (fetch, DOM), CSS variables, Chart.js, KaTeX and MathLive for maths, a service worker for installable apps.

## The problem
Schools in Nigeria run on paper, spreadsheets and WhatsApp. Staff are not technical, many parents only have a phone, data is slow and expensive, and a mistake in a report card is a real problem. Early users told me the product was "hard to manage": after registering they did not know what to do next.

## What I did on the front end

### 1. Made first use obvious
* Replaced a seven-step wizard that put "Students" last with a **Get Started card** that always shows the single next step, a progress bar and a checklist.
* One-click **presets** for grading and score divisions, because a new school should not have to design a grading system before adding a student.
* Hid empty quick actions until they could work, and replaced thin banners with something a user cannot miss.
* Wireframe → mockup: [dashboard](../../design/01-studypat/01-onboarding-and-dashboard/mockups/studypat-admin-dashboard.svg)

### 2. Wrote help into the interface, once, as components
A small library of Blade components (`help`, `steps`, `tip`, `next`, `empty`) put plain-language guidance on dozens of screens: CBT, results, people, admission, academics, finance, hostel, ID cards, billing, e-class and more. Pages were then checked by automated "does this page render for each role" tests.

### 3. Designed for the parent on a cheap phone
* The result page leads with the average and position; subject detail comes second.
* Report cards are **print-first**. Server-made PDFs cost about 1.2 s of CPU and 46 MB per card; the HTML page costs about 0.03 s and 14 MB. So parents print or "Save as PDF" in their own browser, and the print stylesheet does the layout.
* [Parent results (phone)](../../design/01-studypat/05-parents-and-students/mockups/studypat-parent-results-mobile.svg) · [Fees (phone)](../../design/01-studypat/05-parents-and-students/mockups/parent-fees-mobile.svg) · [Report card](../../design/01-studypat/03-results-and-assessment/mockups/report-card.svg)

### 4. An installable app per school
* A manifest, icons and a service worker generated **per school**, in the school's colour and name.
* A deliberate rule: **page HTML is never cached.** It holds personal data and form tokens, so stale pages would mean wrong data and failed forms. Only the offline page, shared assets and images are cached.
* Install prompt on Android, and step-by-step help on iPhone Safari. [Install screen](../../design/01-studypat/07-school-website-and-branding/mockups/install-app-pwa.svg)

### 5. White label and custom domains
Schools on the top plan can show their own domain and name everywhere. The front end follows one rule: any text, link or footer uses the school's brand helper, so "Powered by" and support wording disappear when the switch is on. [Domain screen](../../design/01-studypat/07-school-website-and-branding/mockups/custom-domain-white-label.svg)

### 6. A try-before-you-register demo
A private 30-minute sandbox school per visitor, with a bottom bar showing the countdown, a **View as** role switcher and a clear exit. [Demo screen](../../design/01-studypat/01-onboarding-and-dashboard/mockups/demo-sandbox.svg)

### 7. Results that explain themselves
Score entry has one box per named part, each showing its maximum; score divisions show a live "adds up to 100" check; the grading editor shows gaps. [Score input](../../design/01-studypat/03-results-and-assessment/mockups/score-input.svg) · [Score divisions](../../design/01-studypat/03-results-and-assessment/mockups/score-divisions.svg) · [Grading](../../design/01-studypat/03-results-and-assessment/mockups/grading-scale.svg)

## Numbers
* 370+ Blade templates (about 49,000 lines), 97 media queries, 12 print stylesheets, 170+ ARIA attributes, theme colours through CSS variables.
* 40+ automated test files; every redesigned area has a page-level check for each role.
* Search Console average position 9.3 over 28 days (October 2026) for target searches.

## What I would do next
* Move the heaviest screens (score entry, timetable) to a component framework with typed props (React and TypeScript).
* Add automated accessibility checks (axe) to the test run.
* Real offline support for reading results, behind a careful cache policy.

## Code
Real excerpts with an explanation: [see the code](../../code/README.md#studypat-reusable-help-components).

## All screens in this case study
See the [StudyPat design library](../../design/README.md#studypat): 32 screens in 9 categories.
