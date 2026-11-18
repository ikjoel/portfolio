# Chuvor CBT: offline computer-based exams

**Live:** in use at exam halls · https://chuvorint.com · **Role:** designer-developer, owner

Software that runs an exam on a local network with no internet: a calm screen for the candidate, and a live monitor for the person in the hall.

**Stack:** ASP.NET Core 8 (Razor Pages), SignalR for live updates, SQL Server, KaTeX for maths, Inno Setup installer.

## The problem
Exam halls are stressful. Candidates are young, power and internet fail, and a single mistake (a lost answer, a wrong submit) is serious. The invigilator must see the whole room at once and act fast.

## Design decisions

### The candidate screen
* **One question at a time, large type.** Nothing competes with the question.
* **A question palette** with answered, flagged, current and unanswered states. States use shape and a number as well as colour, so they survive a poor screen and colour-blind users.
* **The selected answer is obvious**: thicker border, filled letter, tinted row.
* **A visible timer and an "all saved" chip.** The candidate is never left wondering whether work is kept.
* [Exam screen](../../design/02-chuvor-cbt/01-candidate/mockups/cbt-candidate-exam-screen.svg)

### Before and after the exam
* [Sign-in with photo check](../../design/02-chuvor-cbt/01-candidate/mockups/candidate-login.svg): stops one candidate sitting for another.
* [Instructions](../../design/02-chuvor-cbt/01-candidate/mockups/exam-instructions.svg): five numbered rules in everyday words, and a tick before "Start".
* [Review before submit](../../design/02-chuvor-cbt/01-candidate/mockups/submit-review.svg): counts first, then the exact questions to fix. Submitting is deliberate.
* [Result slip](../../design/02-chuvor-cbt/01-candidate/mockups/result-slip.svg): score, grade and a QR code to verify it.

### The live monitor
* Sixteen candidate cards at a glance: name, seat, progress and a status **word** (Writing, Tab left, Offline, Submitted).
* Real-time updates through SignalR; alerts at the side, with one-click actions: add time, pause all, message the hall.
* [Live monitor](../../design/02-chuvor-cbt/02-exam-centre-admin/mockups/cbt-live-exam-monitor.svg)

### Setting up and marking
* [Exam setup](../../design/02-chuvor-cbt/02-exam-centre-admin/mockups/exam-setup.svg) with fairness options as plain switches (shuffle questions, shuffle options, warn on leaving the tab).
* [Question import](../../design/02-chuvor-cbt/02-exam-centre-admin/mockups/question-import.svg): validates every row and names each problem in plain words before saving.
* [Theory marking workspace](../../design/02-chuvor-cbt/03-results-and-marking/mockups/theory-marking.svg): anonymous mode, marking scheme beside the answer, keyboard shortcuts.
* [Results analysis](../../design/02-chuvor-cbt/03-results-and-marking/mockups/results-analysis.svg): score spread and hardest questions.
* [Licence activation](../../design/02-chuvor-cbt/04-setup/mockups/licence-activation.svg): computer-tied, works offline.

## Engineering that supports the design
* Per-candidate shuffling of questions and answers; automatic marking.
* Maths shown with KaTeX, typed with MathLive in the question editor.
* Designed for hundreds of candidates at once and checked with a scripted load test before reaching a hall.
* Signed licence files and clock checks.

## What I would do next
* Move the monitor to a component framework with typed props.
* Add an accessibility audit and keyboard-only exam mode.
* A seating map in the live monitor.

## All screens in this case study
[Chuvor CBT design library](../../design/README.md#chuvor-cbt): 11 screens in 4 categories.
