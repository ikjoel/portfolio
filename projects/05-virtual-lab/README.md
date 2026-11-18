# Virtual Lab: 3D science practicals in the browser

**Status:** working prototype (not yet released) · **Role:** designer-developer, owner

Students who have no laboratory can still do a practical: titration (chemistry) and Ohm's law (physics) in a 3D scene that runs on a phone, then get marked automatically.

**Stack:** Three.js (WebGL), vanilla JavaScript in a single file, Node checks for the marking logic.

## The problem
Many schools have no lab equipment, but the exam still asks about practicals. The audience has cheap phones and old laptops, so performance is the gate: if it runs at 10 frames per second it is not usable.

## Design decisions
* **Phone first.** The 3D scene sits on top; controls live in a **bottom sheet** within thumb reach. [Phone layout](../../design/05-virtual-lab/01-student/mockups/virtual-lab-titration-mobile.svg)
* **Guided, not crowded.** A numbered step list; the current step is highlighted; formulas appear only **after a hint**, so students think first. [Desktop layout](../../design/05-virtual-lab/01-student/mockups/virtual-lab-titration-desktop.svg)
* **Honest marking.** Hidden values differ per student, so answers cannot be copied. Readings, calculation, final answer and conclusion are marked separately out of 20. [Marking breakdown](../../design/05-virtual-lab/01-student/mockups/practical-marking.svg)
* **A second experiment from the same pattern**: Ohm's law with a live voltage-against-current graph. [Ohm's law](../../design/05-virtual-lab/01-student/mockups/ohms-law-desktop.svg)
* **Teacher tools**: assign a practical to a class with a due date and options; see marks by part, and send them to continuous assessment only when ready. [Assign](../../design/05-virtual-lab/02-teacher/mockups/assign-practical.svg) · [Class results](../../design/05-virtual-lab/02-teacher/mockups/class-practical-results.svg)

## Performance work
* **Render on demand**: the scene redraws only when something changes.
* A **Low graphics** switch for old devices.
* A **Test speed** button during development.
* 60 frames per second on an old Intel HD 520 laptop in the prototype.
* 21 automated checks cover the marking logic.

## What I would do next
* Fold it into StudyPat as a plan add-on.
* A second language layer for instructions.
* Offline caching, once the experiments are stable.

## Code
Real excerpts with an explanation: [see the code](../../code/README.md#virtual-lab-per-student-values-marking-and-render-on-demand).

## All screens in this case study
[Virtual Lab design library](../../design/README.md#virtual-lab): 6 screens in 2 categories.
