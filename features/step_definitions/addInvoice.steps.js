const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const InvoicePage = require('../../pages/InvoicePage');
const testData = require('../../utils/testData');
require('dotenv').config();

Given('user is logged in to the application', async function () {
  // Same window reuse ho raha hai - login pehle hi Login scenario me ho chuka hai
  if (!this.page.url().includes('dashboard')) {
    await this.page.goto(process.env.BASE_URL + '/dashboard', { waitUntil: 'domcontentloaded', timeout: 60000 });
  }
});

Given('user navigates to the Upload Invoice page', async function () {
  this.invoicePage = new InvoicePage(this.page);
  await this.invoicePage.navigateToUploadInvoice();
});

When('user opens the Add Invoice form', async function () {
  await this.invoicePage.openAddInvoiceForm();
});

When('user fills invoice header details', async function () {
  await this.invoicePage.fillInvoiceHeader(testData.invoiceHeader);
});

When('user selects invoice date {string}', async function (day) {
  await this.invoicePage.selectInvoiceDate(day);
});

When('user fills PO date {string} and DO date {string}', async function (poDay, doDay) {
  await this.invoicePage.selectPoDate(poDay);
  await this.invoicePage.selectDoDate(doDay);
});

When('user fills buyer details', async function () {
  await this.invoicePage.fillBuyerDetails(testData.buyer);
});

When('user adds an invoice item with HS code {string}', async function (hsCode) {
  await this.invoicePage.openAddInvoiceItem();
  await this.invoicePage.selectHsCode(hsCode);
  await this.invoicePage.fillInvoiceItem(testData.invoiceItem);
  await this.invoicePage.selectSroSchedule(testData.invoiceItem.sroSchedule);
});

When('user submits the invoice item', async function () {
  await this.invoicePage.submitInvoiceItem();
});

When('user submits the invoice', async function () {
  await this.invoicePage.submitInvoice();
});

Then('invoice should be added successfully', async function () {
  // Add Invoice form successfully submit hone par is page pe redirect hota hai
  await this.page.waitForLoadState('networkidle');
  expect(this.page.url()).toContain('invoice-items-template');
});
