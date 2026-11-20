# Livora Suites: hotel management for the front desk, the kitchen and the owner

**Status:** built, shown here with demo data (a sample hotel, “Grand Plaza Lagos”) · **Role:** designer and front-end engineer (web and Windows)

Livora Suites is a hotel management system for independent hotels, resorts and small groups. I designed and built both front ends: a native Windows application that works offline, and a responsive web app that lets owners check any property from a phone. They share one design language, one feature set and 17 interface languages.

**Stack:** web client in vanilla JavaScript (ES modules), CSS custom properties, service worker and manifest (PWA), server-sent events · Windows client in C# 12 / .NET 8 WinForms with custom-drawn controls, Dapper and SQLite · supporting back end on Node.js (built-ins), SQLite or PostgreSQL, JWT and HMAC webhooks.

## The problem
Hotels need reservations, front desk, housekeeping, maintenance, billing, point of sale, kitchen and bar, reports and channel management, used by people with very different jobs and very little time to learn software. Existing tools are either built for big chains or too thin for a real hotel. The interface had to be:
- learnable in minutes by a new receptionist,
- readable at a glance by a manager,
- safe for a cook with greasy hands on a touch screen,
- usable in any language and with any currency,
- fast on an old PC and on a phone.

## Users and the design response
| Role | Needs | Design response |
|---|---|---|
| Owner / manager | Today’s numbers, all branches, reports | Colour-coded KPI dashboard; an “All branches” comparison; a branch switcher in the header |
| Front desk | Find and create bookings fast, check guests in and out | Search and filters above the list; a booking dialog with a live price quote; a room calendar |
| Housekeeping | Which rooms to clean, mark done | A task-first page; the role sees only rooms and tasks |
| Kitchen and bar | Their own tickets, oldest first, with allergies | A dedicated board, big buttons, auto-refresh and a sound for new orders; they land there after sign-in |
| Waiter | Take an order, add a note | A point-of-sale screen with tap-to-add menu and a note for the kitchen or bar |
| Accountant | Reports, exports, company accounts | Reports and exports pages; no operational controls |

## Process
1. **Information architecture.** I grouped the product by the job being done (front desk, operations, revenue, admin) and mapped eight roles onto those groups. [Wireframe](wireframes/09-information-architecture.svg)
2. **Wireframes.** Ten low-fidelity wireframes with numbered design decisions. [See them](wireframes)
3. **Design tokens.** One palette, type scale, radius and shadow set shared by the web CSS and the desktop UI code.
4. **Build.** The web client in hand-written ES modules; the desktop client in WinForms with custom-drawn controls.
5. **Verification.** An automated screenshot self-test opens every page and dialog in all 17 languages (these are the screenshots in this folder), plus automated checks of the underlying logic.

## Key design decisions
- **Colour means something, but never alone.** Each KPI family and status has its own accent; chips and labels repeat the state in words, so the interface works for colour-blind users and in black-and-white print.
- **Role-aware navigation.** People only see what they can use. Plan-locked features on the web are shown with a lock rather than hidden, so owners can see what an upgrade adds.
- **One primary action per screen or dialog**, always in the same place.
- **Safety-critical text stands out.** Allergy notes on kitchen tickets have their own highlighted row.
- **Language is a first-class setting.** Picking a language suggests a country and currency; nothing is locked in. Arabic mirrors the whole layout.
- **Recovery on the first screen.** “Restore from a backup” sits on the sign-in screen, because after a reinstall it is the first thing a hotel needs.
- **Self-service licensing.** The license page shows the license, what is used, the computer code, and a one-click transfer to a new computer.

## Engineering highlights
**Web (vanilla JavaScript, PWA).** ES modules, CSS custom properties, light and dark themes, charts in plain CSS and SVG, service worker and manifest, server-sent events for live updates, internationalisation with 17 locales and right-to-left layout, and a responsive layout that turns the sidebar into a tab strip and tables into cards.
**Desktop (C# / WinForms).** Custom-drawn navigation buttons, KPI cards and banners; a DPI-safe pixel-scaling helper; a right-to-left mirroring helper; background jobs (messaging, sync, backups) that keep the interface responsive; a single-instance guard; per-branch databases; and the screenshot self-test harness.
**Quality.** Automated logic tests (hundreds of checks), including end-to-end tests against a real license server and a simulated “format the computer, reinstall, restore from backup” scenario.

## Design tokens
| Token | Value |
|---|---|
| Brand | `#6d5dfc` |
| Accents | indigo `#6366f1` · violet `#8b5cf6` · teal `#14b8a6` · amber `#f59e0b` · rose `#f43f5e` · sky `#0ea5e9` · green `#22c55e` |
| Canvas / card / line | `#f4f5fb` / `#ffffff` / `#e7e9f2` (dark: `#0b1020` / `#131a2e` / `#243050`) |
| Sidebar | gradient `#111827` to `#1e1b4b` |
| Radius and type | 14 px cards, 8 to 10 px controls · Inter / Segoe UI / system, 14 px body, 24 px page title |

## Accessibility notes
- State is never colour-only (chips and text).
- Sign-in submits on Enter. A full keyboard-only walkthrough of every dialog is still to verify.
- Big buttons on the kitchen board; the mobile web collapses tables into cards.
- Right-to-left layouts are mirrored, not just right-aligned.
- Still to do: a formal screen-reader audit and a high-contrast theme.

## What I would do next
- Drag-to-move reservations on the room calendar.
- Offline activation for computers that never connect to the internet.
- A per-user dark-mode toggle on desktop.
- A keyboard-only walkthrough and a formal accessibility audit.
- Automated visual-regression tests built on the existing screenshot self-test.

## What I learned
- Designing for roles first, not pages first, removes most of the clutter.
- A screenshot harness that runs in every language catches layout bugs (truncation, overlap, right-to-left) that unit tests never see.
- Custom controls must be designed for DPI scaling from the first line, not retrofitted.

## Screens
- **Wireframes (10):** [wireframes](wireframes)
- **Windows app (26 screenshots, five of them in other languages):** [mockups/desktop-app](mockups/desktop-app)
- **Web app (16 screenshots, including phone and the guest portal):** [mockups/web-app](mockups/web-app)
- **Branding:** [branding](branding)

All screenshots are of the running apps with demo data. No real guest, hotel or customer appears.
