# CBT Licence Shop: sell and deliver software licences

**Live:** https://cbtlicense.chuvorint.com · **Role:** designer-developer, owner

An online shop that sells licences for the exam software and delivers them by email and download, with no human in the loop.

**Stack:** Laravel, Blade, Flutterwave checkout, Mailgun, scheduled reconciliation job, 30 automated tests.

## The problem
Buyers are exam-centre owners, often paying from a phone, often nervous about paying online. After paying they need to know three things straight away: "Did it work?", "Where is my licence?", "What do I do next?". The owner needs to be sure no paid order is ever lost.

## Design decisions
* **A pricing page that helps people decide.** One main action ("See prices"), one quiet alternative, a highlighted plan. [Pricing](../../design/03-cbt-licence-shop/01-storefront/mockups/licence-shop-pricing.svg)
* **A requirements page that answers the real question.** Which server PC do I need for how many candidates? One table, six rows, plus the three things every size needs. [Requirements](../../design/03-cbt-licence-shop/01-storefront/mockups/requirements-page.svg)
* **A short checkout.** Four fields, the computer ID asked with a help line saying where to find it, a summary beside the form, and a reassurance line about delivery. [Checkout](../../design/03-cbt-licence-shop/01-storefront/mockups/checkout-form.svg)
* **A confirmation page that answers "did it work?"**: finished steps with ticks, then the licence file, the installer, and a help button. [Confirmation](../../design/03-cbt-licence-shop/01-storefront/mockups/licence-shop-order-confirmation.svg)
* **An owner admin that shows what needs a look**: orders, payment and delivery state, and the result of the nightly reconciliation. [Orders](../../design/03-cbt-licence-shop/02-owner-admin/mockups/orders-admin.svg)

## Engineering that supports the design
* The payment is verified **on the server**, and a scheduled job checks again, so a lost webhook never loses an order.
* Licences are signed files tied to the buyer's computer.
* Delivery by email and by download page.

## What I would do next
* Order tracking by link, without an account.
* A component-based storefront with typed props.
* Accessibility and performance budgets in the build.

## All screens in this case study
[Licence shop design library](../../design/README.md#cbt-licence-shop): 5 screens in 2 categories.
