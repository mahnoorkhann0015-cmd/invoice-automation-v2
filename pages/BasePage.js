class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  }

  async click(locator) {
    await this.page.locator(locator).click();
  }

  async fill(locator, text) {
    await this.page.locator(locator).fill(text);
  }

  async getText(locator) {
    return await this.page.locator(locator).innerText();
  }

  async isVisible(locator) {
    return await this.page.locator(locator).isVisible();
  }

  async waitForText(locator, text) {
    await this.page.locator(locator).filter({ hasText: text }).waitFor({ state: 'visible' });
  }
}

module.exports = BasePage;
