# Figma guide

Everything in this repository is ready to drop into Figma. **One thing to be clear about:** a native Figma file (`.fig`) can only be created inside Figma itself, and I did not have access to your Figma account. So what is provided is the next best thing, and it takes about 15 minutes to turn into your Figma files:

| What | Where | What it gives you in Figma |
|---|---|---|
| **One page per category** (wireframes and mockups) | `figma/pages/<product>/<category>--wireframes.svg` and `--mockups.svg` | Drop one file on a canvas and every screen of that category arrives, laid out and labelled, as editable vectors and live text |
| **Single screens** | `design/<product>/<category>/{wireframes,mockups}/<screen>.svg` | One screen at a time |
| **Design tokens** | `figma/tokens/studypat.tokens.json`, `chuvor.tokens.json` | Colours, spacing, radius, type sizes, in Tokens Studio format |

## 1. Create the files (one Figma file per product)

1. In Figma, create five files: **StudyPat**, **Chuvor CBT**, **CBT Licence Shop**, **Chuvor Client**, **Virtual Lab**.
2. In each file, make one **Figma page per category**, named exactly like the folders (for example `03 Results and assessment`).
3. Open the category's `--wireframes.svg`, drag it onto its Figma page. Do the same with `--mockups.svg` and place it below.
4. Each screen arrives as a nested group named after its file (for example `score-input`). If one arrives as a plain group, select it and press **Ctrl + Alt + G** to turn it into a frame, so it shows a size and can be used in prototypes.
5. Fonts: the files use *Plus Jakarta Sans* (StudyPat) and *Segoe UI* (Chuvor products). If a font is missing Figma shows a warning; install the font (Plus Jakarta Sans is free on Google Fonts) or choose "replace".

## 2. Load the design tokens

1. Install the free **Tokens Studio for Figma** plugin.
2. In the plugin choose *Load from file*, and pick `studypat.tokens.json` (for the StudyPat file) or `chuvor.tokens.json` (for the three Chuvor products).
3. Create Figma **Variables** or **Styles** from the token sets (the plugin has a button for each).
4. Replace raw colours on the imported frames with the variables. This is the step that turns pictures into a real design system.

| Token group | Examples |
|---|---|
| `color` | `primary`, `accent`, `ink`, `muted`, `line`, `good`, `warn`, `bad`, `info` (and `…Soft` backgrounds) |
| `spacing` | 4, 8, 16, 24, 32, 48 |
| `borderRadius` | 8, 12, 16, pill |
| `fontSizes` | 12, 14, 17, 20, 28, 44 |

## 3. Build the components (the part that is worth showing)

The screens were drawn from a small set of parts. Turn each into a **Figma component with variants** and swap the pasted shapes for instances:

| Component | Variants to make |
|---|---|
| **Button** | primary, ghost, soft, gold, danger · default, hover, disabled |
| **Chip / status** | good, warn, bad, info, muted |
| **Input field** | default, filled, error, disabled; with help text |
| **Select** | closed, open |
| **Switch / checkbox / radio** | on, off, disabled |
| **Card** | default, soft, highlighted |
| **Table** | header row, data row (with avatar, chip, button cells) |
| **Sidebar + top bar** | StudyPat school, StudyPat platform, Chuvor dark top bar |
| **Progress bar** | with and without label |
| **Empty / help / tip / next-step** | the same four helper patterns used in the real Blade components |

Group them on a `00 Components` page in each file and link the screens to them.

## 4. Prototype the main flows

Connect frames with *On click → Navigate to*. These flows tell the best stories in an interview:

1. **StudyPat:** Landing → Try the demo → Dashboard → Score input → Report card → Print.
2. **StudyPat (parent):** Sign in → Results (phone) → Fees (phone) → Pay.
3. **Chuvor CBT:** Candidate login → Photo check → Instructions → Exam → Review → Submit → Result slip.
4. **Licence shop:** Pricing → Checkout → Confirmation.
5. **Chuvor Client:** Enrol → Control panel approval → App window → Open your program.

## 5. Hand-off and sharing

* Turn on **Dev Mode** to show the spacing, colours and CSS to developers.
* Share each file with "Anyone with the link can view" and put the links in the table at the bottom of the main `README.md` and on the portfolio website.
* Keep the SVGs in this repository as the always-available copy.

## About the screens

* They are redrawn designs with **sample data**, not screenshots of real customers.
* Wireframes carry short red notes that explain each design decision.
* The generator that produced them is in `tools/`. Run `node tools/build.mjs` to rebuild everything after changing a screen.
