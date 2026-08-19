const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
require('dotenv').config();

Given('user is on the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto(process.env.BASE_URL + '/login');
});

When('user enters valid email and password', async function () {
  await this.loginPage.fillCredentials(process.env.EMAIL, process.env.PASSWORD);
});

When('user clicks on the Sign In button', async function () {
  await this.loginPage.clickSignIn();
});

Then('user should be redirected to the dashboard', async function () {
  const success = await this.loginPage.isLoginSuccessful();
  expect(success).toBeTruthy();
});
