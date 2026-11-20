# Portfolio plan: structure, write-ups and how to present it

## 1. What a front-end hiring team looks for
1. **Can you build to a design?** Pixel-careful, responsive, real states (empty, loading, error).
2. **Can you work with a designer?** You read Figma, ask good questions, and explain trade-offs.
3. **Do you care about the user?** Accessibility, speed on poor devices, plain language.
4. **Can you ship and maintain?** Live products, tests, deployments, bug fixes.
5. **Can you communicate?** Short, clear write-ups. This repository is the evidence.

## 2. The portfolio site: page by page
The site is `docs/index.html` (home) plus `docs/design-library.html`.

| Section | Purpose | Content |
|---|---|---|
| **Header** | Orientation | Name, Work, Process, Skills, About, Contact |
| **Hero** | Say who you are in one sentence | "I build interfaces that real people can use on a slow phone, in a busy school office, or in an exam hall." Two buttons: See the work, GitHub |
| **Proof strip** | Numbers a reader can trust | 370+ pages, 6 products, 20+ schools, installable PWA |
| **Selected work** | The core | One card per product: finished mockup, switch to wireframe, 3–4 decisions, links to the live site and case study |
| **How I work with design** | Shows you fit a team with a UI/UX engineer | The six-step loop: understand, wireframe, design, build, check, learn |
| **Design library** | Depth for those who want it | 61 screens, filter by product, wireframe/mockup switch |
| **Skills** | Honest and grouped | Front end, design and hand-off, back end and tools; "currently adding React and TypeScript" |
| **About** | A human paragraph | Where you are, what you have done alone, what you want in a team |
| **Contact** | One clear action | Email and GitHub |

Quality bar for the site itself (it is also a sample of your work): semantic HTML, keyboard focus styles, skip link, light and dark themes, reduced-motion support, no external fonts or trackers, images with width and height, under 2 MB of images on first load.

## 3. Case-study template (used in `projects/*/README.md`)
1. **Header line:** live link, role, status.
2. **One-paragraph summary** and the **stack**.
3. **The problem:** who the users are and what hurt.
4. **Design decisions:** each one is *decision → reason → picture*.
5. **Engineering that supports the design:** the proof it works.
6. **Numbers:** only ones that are true and checkable.
7. **What I would do next:** shows judgement.
8. **Screens index:** link to the library.

Rules: say "I", name the trade-off, never claim what is not done (Virtual Lab is a "prototype"; screens that are proposals are marked "concept").

## 4. Write-ups to use as the story for each product

**StudyPat (the headline project).** "Schools told me they could not find what to do after registering. I replaced a seven-step wizard with one card that always shows the next step, wrote help into the interface as reusable components, and made report cards print-first so parents on cheap phones never wait for a server-made PDF. Each school gets an installable app in its own colours, and page HTML is never cached, so personal data is never stale."

**Chuvor CBT.** "An exam hall is stressful, so the candidate sees one large question, a numbered palette and a clear 'saved' note, and the person in the hall sees every candidate's status as a word, not only a colour. It runs offline and was load-tested before release."

**CBT Licence Shop.** "A buyer paying from a phone needs to know three things the moment they pay: did it work, where is my licence, what do I do next. The confirmation page answers all three, and a nightly job guarantees no paid order is lost."

**Chuvor Client.** "Non-technical staff open one program with one button; the administrator approves a computer in one click. State (active, ending soon, grace) is computed from dates so it is always right. It is launched and in use."

**Virtual Lab.** "Performance is the design constraint: render on demand, a Low graphics switch, and controls in a thumb-reach bottom sheet."

## 5. Interview talking points
* **A design decision I changed because of users:** the StudyPat setup wizard.
* **A trade-off:** print-first report cards instead of server PDFs (measured 0.03 s against 1.2 s of CPU).
* **A bug I found and fixed:** a refused request still executed in the Chuvor Client control panel; tests now check the side effects, not only the error message.
* **A mistake that taught me something:** a template directive written without a space broke every school's sign-in page once; now all templates are compile-checked before deploying.
* **How I work with designers:** ask for empty, loading and error states early; share a wireframe before colours; agree tokens (colour, spacing, radius) so design and code stay in step.
* **Gaps, honestly:** React and TypeScript are what I am adding now; my production work is server-rendered with Blade, vanilla JavaScript and component-style partials.

## 6. Publishing checklist
1. Create an **empty public repository** on GitHub named `portfolio` under your account.
2. Push this folder to it (commands in the main chat reply).
3. In the repository: **Settings → Pages → Deploy from a branch → `main` → `/docs`**. Your site appears at `https://ikjoel.github.io/portfolio/`.
4. Create the five Figma files, add their links to the table in `README.md`.
5. Pin the repository on your GitHub profile; add the site link to your CV and LinkedIn.
6. Add a short **GitHub profile README** (a repository named `ikjoel` with a `README.md`) that links to the portfolio.
7. Before sharing, re-read for anything private: no real names, phone numbers, school data, keys or server addresses.

## 7. Suggested GitHub profile README

```md
### Hi, I'm Ikechukwu 👋
Front-end engineer in Lagos. I build interfaces for schools, exam centres and small businesses in Nigeria.

- 🏫 **StudyPat**: school management platform, studypat.com
- 🖥️ **Chuvor CBT**: offline computer-based exams
- 🎨 **Portfolio and design library**: github.com/ikjoel/portfolio

Tools: HTML · CSS · JavaScript · Blade · Bootstrap · Three.js · Laravel · Figma
Currently learning: React · TypeScript
```
