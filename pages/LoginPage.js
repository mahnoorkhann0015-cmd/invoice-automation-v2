const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'Enter email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async goto(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  }

  async fillCredentials(email, password) {
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async login(email, password) {
    await this.fillCredentials(email, password);
    await this.clickSignIn();
  }

  async isLoginSuccessful() {
    // Login ke baad user dashboard pe redirect hota hai
    await this.page.waitForURL('**/dashboard', { timeout: 15000 });
    return this.page.url().includes('/dashboard');
  }
}

module.exports = LoginPage;
