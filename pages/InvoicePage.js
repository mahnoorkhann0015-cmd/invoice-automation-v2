const BasePage = require('./BasePage');

class InvoicePage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Navigation
    this.sidebarArrow = page.locator('.ri-arrow-right-s-line').first();
    this.uploadInvoiceLink = page.getByRole('link', { name: '- Upload Invoice' });
    this.addInvoiceButton = page.getByRole('button', { name: 'Add Invoice' });

    // Invoice header fields
    this.scenarioIdInput = page.getByRole('textbox', { name: 'Scenario ID Invoice Type' });
    this.sellerInvoiceNoInput = page.getByRole('textbox', { name: 'Seller Invoice No.' });
    this.invoiceDatePicker = page.locator('.ant-picker-input').first();
    this.poNoInput = page.getByRole('textbox', { name: 'PO No.', exact: true });
    this.poDatePicker = page.locator('div:nth-child(6) > .col-md-12 > .mb-3 > .row > .col-12.col-md-8 > .position-relative > .ant-picker > .ant-picker-input');
    this.doNoInput = page.getByRole('textbox', { name: 'DO No.', exact: true });
    this.doDatePicker = page.locator('div:nth-child(8) > .col-md-12 > .mb-3 > .row > .col-12.col-md-8 > .position-relative > .ant-picker > .ant-picker-input');
    this.specialDiscountInput = page.getByRole('textbox', { name: 'Special/Futher Discount', exact: true });

    // Buyer details
    this.buyerBusinessNameInput = page.locator('input[name="buyerBusinessName"]');
    this.buyerNtnCnicInput = page.locator('input[name="buyerNtnCnic"]');
    this.buyerAddressInput = page.locator('textarea[name="buyerAddress"]');
    this.buyerProvinceDropdown = page.locator('div:nth-child(4) > .col-md-12 > .mb-3 > .row > .col-md-7 > .position-relative > .d-flex > div > .css-b62m3t-container > .js-example-basic-multiple.mb-0__control > .js-example-basic-multiple.mb-0__indicators > .js-example-basic-multiple.mb-0__indicator > .css-8mmkcg');
    this.buyerRegistrationTypeDropdown = page.locator('div:nth-child(5) > .col-md-12 > .mb-3 > .row > .col-md-7 > .position-relative > .d-flex > div > .css-b62m3t-container > .js-example-basic-multiple.mb-0__control > .js-example-basic-multiple.mb-0__indicators > .js-example-basic-multiple.mb-0__indicator > .css-8mmkcg');

    // Invoice item fields
    this.addInvoiceItemButton = page.getByRole('button', { name: 'Add Invoice Item' });
    this.hsCodeDropdown = page.locator('.col-md-6 > .position-relative > .d-flex > div > .css-b62m3t-container > .js-example-basic-multiple.mb-0__control > .js-example-basic-multiple.mb-0__indicators > .js-example-basic-multiple.mb-0__indicator > .css-8mmkcg');
    this.sellerItemCodeInput = page.getByRole('textbox', { name: 'Seller Item Code', exact: true });
    this.productDescriptionInput = page.getByRole('textbox', { name: 'Product Description', exact: true });
    this.quantityInput = page.getByRole('textbox', { name: 'Enter Quantity' });
    this.salesExcTaxInput = page.getByRole('textbox', { name: 'Sales (Exc. Tax)', exact: true });
    this.taxRateInput = page.getByRole('textbox', { name: 'Tax Rate (%)', exact: true });
    this.furtherTaxInput = page.getByRole('textbox', { name: 'Further Tax', exact: true });
    this.extraTaxInput = page.getByRole('textbox', { name: 'Extra Tax', exact: true });
    this.fedPayableInput = page.getByRole('textbox', { name: 'FED Payable', exact: true });
    this.itemDiscountInput = page.getByRole('textbox', { name: 'Discount', exact: true });
    this.fixedRetailPriceInput = page.getByRole('textbox', { name: 'Fixed Notified/Retail Price', exact: true });
    this.stWithheldInput = page.getByRole('textbox', { name: 'ST Withheld', exact: true });
    this.sroScheduleNoInput = page.getByRole('textbox', { name: 'SRO Schedule No.', exact: true });
    this.sroItemSerialInput = page.getByRole('textbox', { name: 'SRO Item Serial', exact: true });
    this.sroScheduleDropdown = page.locator('div:nth-child(18) > .mb-3 > .row > .col-md-7 > .position-relative > .d-flex > div > .css-b62m3t-container > .js-example-basic-multiple.mb-0__control > .js-example-basic-multiple.mb-0__indicators > .js-example-basic-multiple.mb-0__indicator > .css-8mmkcg');
    this.addItemSubmitButton = page.getByRole('button', { name: 'Add', exact: true });

    // Final submit
    this.finalAddInvoiceButton = page.getByRole('button', { name: 'Add Invoice', exact: true });

    // Post invoice (listing page)
    this.postInvoiceButton = page.getByRole('button', { name: 'Post Invoice' });

    // Post-submit navigation links
    this.postingErrorsLink = page.getByRole('link', { name: /Posting Errors/ });
    this.invalidInvoiceLink = page.getByRole('link', { name: '- Invalid Invoice' });
    this.postedInvoiceLink = page.getByRole('link', { name: '- Posted Invoice' });
    this.processingInvoicesLink = page.getByRole('link', { name: /Processing Invoices/ });
  }

  async goto(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async navigateToUploadInvoice() {
  await this.page.goto(process.env.BASE_URL + '/invoice', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await this.page.waitForTimeout(500);
}

  async openAddInvoiceForm() {
    await this.addInvoiceButton.click();
  }

  async fillInvoiceHeader({ scenarioId, sellerInvoiceNo, poNo, doNo, specialDiscount }) {
    await this.scenarioIdInput.click();
    await this.scenarioIdInput.fill(scenarioId);

    await this.sellerInvoiceNoInput.click();
    await this.sellerInvoiceNoInput.fill(sellerInvoiceNo);

    await this.poNoInput.click();
    await this.poNoInput.fill(poNo);

    await this.doNoInput.click();
    await this.doNoInput.fill(doNo);

    await this.specialDiscountInput.click();
    await this.specialDiscountInput.fill(specialDiscount);
  }

  async selectInvoiceDate(day) {
    await this.invoiceDatePicker.click();
    await this.page.getByText(day, { exact: true }).click();
  }

  async selectPoDate(day) {
    await this.poDatePicker.click();
    await this.page.getByText(day, { exact: true }).nth(1).click();
  }

  async selectDoDate(day) {
    await this.doDatePicker.click();
    await this.page.getByText(day, { exact: true }).nth(2).click();
  }

  async fillBuyerDetails({ businessName, ntnCnic, address, province, registrationType }) {
    await this.buyerBusinessNameInput.click();
    await this.buyerBusinessNameInput.fill(businessName);

    await this.buyerNtnCnicInput.click();
    await this.buyerNtnCnicInput.fill(ntnCnic);

    await this.buyerAddressInput.click();
    await this.buyerAddressInput.fill(address);

    await this.buyerProvinceDropdown.click();
    await this.page.getByRole('option', { name: province }).click();
    await this.page.waitForTimeout(500);

    await this.buyerRegistrationTypeDropdown.click();
    await this.page.getByRole('option', { name: registrationType, exact: true }).click();
    await this.page.waitForTimeout(500);
  }

  async openAddInvoiceItem() {
    await this.addInvoiceItemButton.click();
  }

  async selectHsCode(hsCode) {
    await this.hsCodeDropdown.click();
    await this.page.getByRole('option', { name: hsCode }).click();
  }

  async fillInvoiceItem(item) {
    await this.sellerItemCodeInput.click();
    await this.sellerItemCodeInput.fill(item.sellerItemCode);

    await this.productDescriptionInput.click();
    await this.productDescriptionInput.fill(item.description);

    await this.quantityInput.click();
    await this.quantityInput.fill(String(item.quantity));

    await this.salesExcTaxInput.click();
    await this.salesExcTaxInput.fill(String(item.salesExcTax));

    await this.taxRateInput.click();
    await this.taxRateInput.fill(String(item.taxRate));

    await this.furtherTaxInput.click();
    await this.furtherTaxInput.fill(String(item.furtherTax));

    await this.extraTaxInput.click();
    await this.extraTaxInput.fill(String(item.extraTax));

    await this.fedPayableInput.click();
    await this.fedPayableInput.fill(String(item.fedPayable));

    await this.itemDiscountInput.click();
    await this.itemDiscountInput.fill(String(item.discount));

    await this.fixedRetailPriceInput.click();
    await this.fixedRetailPriceInput.fill(String(item.fixedRetailPrice));

    await this.stWithheldInput.click();
    await this.stWithheldInput.fill(String(item.stWithheld));

    await this.sroScheduleNoInput.click();
    await this.sroScheduleNoInput.fill(String(item.sroScheduleNo));

    await this.sroItemSerialInput.click();
    await this.sroItemSerialInput.fill(String(item.sroItemSerial));
  }

  async selectSroSchedule(scheduleName) {
    await this.sroScheduleDropdown.click();
    await this.page.getByRole('option', { name: scheduleName }).click();
  }

  async submitInvoiceItem() {
    await this.addItemSubmitButton.click();
  }

  async submitInvoice() {
    await this.finalAddInvoiceButton.click();
  }

  async checkFirstAvailableInvoice() {
    const firstCheckbox = this.page.locator('.ant-checkbox-wrapper > .ant-checkbox > #posted_invoice').first();
    await firstCheckbox.waitFor({ state: 'visible', timeout: 15000 });
    await firstCheckbox.check();
  }

  async postInvoice() {
    await this.postInvoiceButton.click();
  }

  async openPostingErrors() {
    await this.postingErrorsLink.click();
  }

  async openInvalidInvoice() {
    await this.invalidInvoiceLink.click();
  }

  async openPostedInvoice() {
    await this.postedInvoiceLink.click();
  }

  async openProcessingInvoices() {
    await this.processingInvoicesLink.click();
  }
}

module.exports = InvoicePage;