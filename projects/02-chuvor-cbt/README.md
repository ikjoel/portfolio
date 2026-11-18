# Chuvor CBT: offline computer-based exams

**Status:** released · https://chuvorint.com · **Role:** designer-developer, owner

Software that runs an exam on a local network with no internet: a calm screen for the candidate, and a live monitor for the person in the hall.

**Stack:** ASP.NET Core 8 (Razor Pages), SQL Server, JavaScript (fetch), MathJax for maths, Inno Setup installer.

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
* **Concept:** [Sign-in with photo check](../../design/02-chuvor-cbt/01-candidate/mockups/candidate-login.svg): stops one candidate sitting for another.
* **Concept:** [Instructions](../../design/02-chuvor-cbt/01-candidate/mockups/exam-instructions.svg): five numbered rules in everyday words, and a tick before "Start".
* **Concept:** [Review before submit](../../design/02-chuvor-cbt/01-candidate/mockups/submit-review.svg): counts first, then the exact questions to fix. Submitting is deliberate.
* **Concept:** [Result slip](../../design/02-chuvor-cbt/01-candidate/mockups/result-slip.svg): score, grade and a QR code to verify it.

### The live monitor
* Sixteen candidate cards at a glance: name, seat, progress and a status **word** (Writing, Tab left, Offline, Submitted).
* The page refreshes by polling: every 3 seconds, one request at a time, slowing to 8 seconds and showing a banner when the connection is bad, so the person in the hall knows when the picture may be out of date. Filters and paging run on the server. Actions include ending an attempt and giving extra minutes. (Pause-all and message-the-hall on the mockup are ideas, not built.)
* [Live monitor](../../design/02-chuvor-cbt/02-exam-centre-admin/mockups/cbt-live-exam-monitor.svg)

### Setting up and marking
* [Exam setup](../../design/02-chuvor-cbt/02-exam-centre-admin/mockups/exam-setup.svg) with fairness options as plain switches (shuffle questions, shuffle options, warn on leaving the tab).
* [Question import](../../design/02-chuvor-cbt/02-exam-centre-admin/mockups/question-import.svg): validates every row and names each problem in plain words before saving.
* [Theory marking workspace](../../design/02-chuvor-cbt/03-results-and-marking/mockups/theory-marking.svg): anonymous mode, marking scheme beside the answer, keyboard shortcuts.
* **Concept (partly built):** [Results analysis](../../design/02-chuvor-cbt/03-results-and-marking/mockups/results-analysis.svg): score spread and hardest questions.
* [Licence activation](../../design/02-chuvor-cbt/04-setup/mockups/licence-activation.svg): computer-tied, works offline.

## Engineering that supports the design
* Per-candidate shuffling of questions and answers; automatic marking.
* Maths shown with MathJax in the exam screen.
* A **save queue**: every answer is versioned and re-sent with back-off until the server confirms, and the screen says whether work is saved. See [the code](../../code/README.md#chuvor-cbt-the-exam-screen-save-queue-timer-safety).
* Designed for hundreds of candidates at once and checked with a scripted load test before reaching a hall.
* Signed licence files and clock checks.

## Screens marked concept
The mockups are redrawn from the real product. Those marked **Concept** show improvements I have designed but not built (a photo check at sign-in, a review page before submit, a QR result slip, item analysis).

## What I would do next
* Move the monitor to a component framework with typed props.
* Add an accessibility audit and keyboard-only exam mode.
* A seating map in the live monitor.

## All screens in this case study
[Chuvor CBT design library](../../design/README.md#chuvor-cbt): 11 screens in 4 categories.
