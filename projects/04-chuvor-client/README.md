# Chuvor Client: secure access to one company program

**Status:** launched and in use · **Role:** designer-developer, owner

Staff use approved computers to open one company program (an accounting package, for example) from anywhere. Nobody else can get in, and receipts and documents print quickly on the person's own printer. It is sold as a monthly subscription to many companies.

**Stack:** .NET (Windows Forms app, command-line tool), Node.js (control panel and API, no dependencies), WireGuard tunnel, Inno Setup installer.

## The problem
The users are shop and office staff, not IT people. They must never see a network setting. The company administrator must approve or remove a computer in a click. The owner needs many companies on one platform with an expiry date that is enforced automatically.

## Design decisions

### The staff app
* **One obvious action**: a large "Open your program" button, with two lines under it explaining what happens next.
* **Status in a sentence**: "Connected to your company computer", with a live "Connection quality: Excellent · delay 18 ms" line.
* **Subscription visible**: days left, and what happens if it ends. Unavailable and expiring states have their own messages.
* **Help under every control**, in everyday words.
* **High-DPI aware** layout, tested by screenshot at several scales.
* [App window](../../design/04-chuvor-client/01-staff-app/mockups/chuvor-client-app-window.svg) · [Enrol this computer](../../design/04-chuvor-client/01-staff-app/mockups/enrol-computer.svg)

### The company control panel
* **Computers table** with plain statuses (Online, Offline, Waiting, Revoked) and one button per row.
* **One-time codes** to add a computer, with their rules written beside them.
* **Settings that explain themselves**: every switch says what it does and what "off" means; program path with a Notepad test first; picture quality as three choices, not a slider.
* [Control panel](../../design/04-chuvor-client/02-company-admin/mockups/chuvor-client-control-panel.svg) · [Settings](../../design/04-chuvor-client/02-company-admin/mockups/settings-page.svg)

### The platform owner's view
* Customers list where the state (Active, Ending soon, Grace) is **computed from dates**, so it is always right.
* A plans page where a plan with no price is simply not for sale. [Customers](../../design/04-chuvor-client/03-platform-owner/mockups/platform-customers.svg) · [Plans](../../design/04-chuvor-client/03-platform-owner/mockups/platform-plans.svg) · [Order page](../../design/04-chuvor-client/04-ordering/mockups/order-page.svg)

## Engineering that supports the design
* 143 automated checks on the control panel, including that one company can never see another's data. A real bug was caught and fixed this way: a refused request that still executed.
* Direct-connection logic with 24 checks against a simulated network; connection-quality grading with its own self-test.
* A fast raw print path, measured with a built-in speed test.

## What I would do next
* Build the installer into a signed release and add auto-update.
* Replace the Windows Forms window with a web-technology interface so design changes ship faster.
* Add two-step sign-in for administrators.

## Code
Real excerpts with an explanation: [see the code](../../code/README.md#chuvor-client-connection-quality-in-plain-words-and-state-from-dates).

## All screens in this case study
[Chuvor Client design library](../../design/README.md#chuvor-client): 7 screens in 4 categories.
