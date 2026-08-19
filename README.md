# Invoice Automation — Playwright + Cucumber BDD (JavaScript)

Digital Invoice application ke liye automation framework: **Login → Add Invoice → Post Invoice**.

## Project Structure

```
invoice-automation/
├── package.json
├── cucumber.js                  # Cucumber config (profiles, formats)
├── .env                         # BASE_URL, credentials, browser settings
├── features/
│   ├── login.feature
│   ├── addInvoice.feature
│   ├── postInvoice.feature
│   ├── step_definitions/
│   │   ├── login.steps.js
│   │   ├── addInvoice.steps.js
│   │   └── postInvoice.steps.js
│   └── support/
│       ├── world.js             # Custom World (page/context/browser holder)
│       └── hooks.js             # Before/After hooks — browser launch/close
├── pages/
│   ├── BasePage.js              # Common reusable actions
│   ├── LoginPage.js
│   └── InvoicePage.js
├── utils/
│   └── generateReport.js        # Pretty HTML report generator
└── reports/                     # Auto-generated test reports (json/html)
```

## Prerequisites

1. **Node.js** (v18 ya usse upar) — [nodejs.org](https://nodejs.org) se install karo.
2. **VS Code** — [code.visualstudio.com](https://code.visualstudio.com)

## VS Code Extensions (install karo)

VS Code kholo → `Ctrl+Shift+X` (Extensions panel) → ye install karo:

| Extension | Kaam |
|---|---|
| **Cucumber (Gherkin) Full Support** by Alexander Krechik | `.feature` files me syntax highlighting, autocomplete, step definitions se navigate karna |
| **Playwright Test for VSCode** by Microsoft | Test runner, debugging, trace viewer |
| **ESLint** | Code quality/linting |
| **DotENV** by mikestead | `.env` file syntax highlighting |
| **GitLens** (optional) | Git history/blame |

VS Code terminal se bhi install kar sakte ho:
```bash
code --install-extension alexkrechik.cucumberautocomplete
code --install-extension ms-playwright.playwright
code --install-extension dbaeumer.vscode-eslint
code --install-extension mikestead.dotenv
```

## Setup Steps

```bash
# 1. Project folder me jao
cd invoice-automation

# 2. Dependencies install karo
npm install

# 3. Playwright browsers install karo (chromium, firefox, webkit)
npx playwright install

# 4. .env file me apni app ka URL aur credentials daalo
# BASE_URL=https://your-invoice-app.com
# USERNAME=testuser@example.com
# PASSWORD=YourPassword123
```

## Selectors update karna (IMPORTANT)

`pages/LoginPage.js` aur `pages/InvoicePage.js` me abhi generic placeholder selectors hain
(jaise `#username`, `#new-invoice-btn`). Apni actual application khol kar DevTools
(`F12` → Inspect) se real IDs/classes nikal kar in files me update karo.

## Test Run karna

```bash
# Sab tests run karo
npm test

# Sirf login tests
npm run test:login

# Sirf add invoice tests
npm run test:addInvoice

# Sirf post invoice tests
npm run test:postInvoice

# Tests + pretty HTML report
npm run test:report
```

Report `reports/cucumber_report_pretty.html` me generate hoga — browser me khul jayega automatically.

## Headless mode

`.env` me `HEADLESS=true` set karo CI/CD ya background run ke liye.

## Notes

- Failure hone par automatically screenshot capture hoke Cucumber report me attach ho jata hai (`hooks.js` dekho).
- Video recording enable karne ke liye `.env` me `RECORD_VIDEO=true` add karo.
- Tags (`@login`, `@addInvoice`, `@postInvoice`, `@smoke`) se selective test run kar sakte ho.
