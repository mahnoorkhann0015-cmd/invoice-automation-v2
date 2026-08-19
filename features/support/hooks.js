const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
require('dotenv').config();

setDefaultTimeout(60 * 1000);

let browser;
let sharedContext;
let sharedPage;

BeforeAll(async function () {
  const browserType = process.env.BROWSER || 'chromium';
  const headless = process.env.HEADLESS === 'true';

  const browserEngines = { chromium, firefox, webkit };
  browser = await browserEngines[browserType].launch({
    headless,
    slowMo: headless ? 0 : 300
  });

  // Ek hi window/tab poore suite me reuse hoga
  sharedContext = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  sharedPage = await sharedContext.newPage();
});

Before(async function () {
  this.context = sharedContext;
  this.page = sharedPage;
});

After(async function (scenario) {
  if (scenario.result.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  // Page yahan close nahi karni - agla scenario isi window ko use karega
});

AfterAll(async function () {
  if (sharedContext) await sharedContext.close();
  if (browser) await browser.close();
});