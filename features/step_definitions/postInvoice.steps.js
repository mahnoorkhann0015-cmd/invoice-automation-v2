const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('user selects the first available invoice for posting', async function () {
  await this.invoicePage.checkFirstAvailableInvoice();
});

When('user clicks the Post Invoice button', async function () {
  await this.invoicePage.postInvoice();
});

Then('posting result should be visible', async function () {
  await this.page.waitForLoadState('networkidle');
  const postingErrorsVisible = await this.invoicePage.postingErrorsLink.isVisible().catch(() => false);
  expect(postingErrorsVisible).toBeTruthy();
});