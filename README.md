# Egbujor Ikechukwu Joel · Front-End Engineer portfolio

Lagos, Nigeria · github.com/ikjoel

I build interfaces that real people can use on a slow phone, in a busy school office or in an exam hall: I design the screens, write the HTML, CSS and JavaScript, connect them to the back end and keep them running.

This repository is my portfolio: **5 products, 61 screens, each drawn as a wireframe and as a finished mockup**, with case studies, design tokens and files ready for Figma.

> All screens use **sample data**. No real school, student or customer appears here. The screens are redrawn from the real products; a few are my proposed improvements and are marked **concept**. The full source code of the products is private; the [code](code) folder holds real excerpts.

## Start here

| I want to… | Go to |
|---|---|
| See the work as a website | `docs/index.html` (publish with GitHub Pages: Settings → Pages → Branch `main`, folder `/docs`) |
| Browse every screen by category | [design/README.md](design/README.md) · `docs/design-library.html` |
| Read how I think and what I decided | [projects](projects) (one case study per product) |
| Read the real code behind the screens | [code/README.md](code/README.md) · `docs/code.html` |
| Open the designs in Figma | [figma/FIGMA-GUIDE.md](figma/FIGMA-GUIDE.md) |
| Re-use the design tokens | [figma/tokens](figma/tokens) |
| See the portfolio plan and write-ups | [notes/PORTFOLIO-STRUCTURE.md](notes/PORTFOLIO-STRUCTURE.md) |

## The work

| # | Product | What it is | Screens | Live |
|---|---|---|---|---|
| 1 | [StudyPat](projects/01-studypat/README.md) | School management platform: results, fees, parents, e-learning, website, PWA | 32 | studypat.com |
| 2 | [Chuvor CBT](projects/02-chuvor-cbt/README.md) | Offline computer-based exams with a live monitor | 11 | chuvorint.com |
| 3 | [CBT Licence Shop](projects/03-cbt-licence-shop/README.md) | Sells and delivers exam-software licences | 5 | cbtlicense.chuvorint.com |
| 4 | [Chuvor Client](projects/04-chuvor-client/README.md) | Secure remote access to one company program (launched) | 7 | private |
| 5 | [Virtual Lab](projects/05-virtual-lab/README.md) | 3D science practicals in the browser (prototype) | 6 | private |

## Design library by category

| Product | Categories |
|---|---|
| StudyPat | Onboarding and dashboard · People and academics · Results and assessment · Finance and billing · Parents and students · E-learning and exams · School website and branding · Platform admin · Higher education |
| Chuvor CBT | Candidate · Exam-centre admin · Results and marking · Setup |
| CBT Licence Shop | Storefront · Owner admin |
| Chuvor Client | Staff app · Company admin · Platform owner · Ordering |
| Virtual Lab | Student · Teacher |

## Figma links

Add your Figma share links here once the files are created (see the guide):

| File | Link |
|---|---|
| StudyPat | _add link_ |
| Chuvor CBT | _add link_ |
| CBT Licence Shop | _add link_ |
| Chuvor Client | _add link_ |
| Virtual Lab | _add link_ |

## Repository map

```
design/     every screen, one SVG each: <product>/<category>/{wireframes,mockups}/
figma/      pages/ (one SVG per category = one Figma page), tokens/, FIGMA-GUIDE.md
projects/   one case study per product
code/       real code excerpts, copied verbatim, with an explanation of each
docs/       the portfolio website (plain HTML, CSS and a little JavaScript)
notes/      portfolio plan and write-ups
tools/      the generator: node tools/build.mjs rebuilds everything
```

## Rebuild

```
node tools/build.mjs        # screens, Figma pages, tokens, design library
node tools/build-code.mjs   # code page and code/README.md
```

Needs Node 18 or newer, nothing to install.
