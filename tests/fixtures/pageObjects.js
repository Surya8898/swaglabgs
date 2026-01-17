const { test: base } = require('@playwright/test');
const testData = require('../../testData/data.json');

const LoginPage = require('../../Pages/LoginPage.spec');
const HomePage = require('../../Pages/HomePage.spec');
const CartPage = require('../../Pages/CartPage.spec');
const Endtoendpage = require('../../Pages/Endtoendpage.spec');

exports.test = base.extend({
  loginpage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homepage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  cartpage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  endtoendpage: async ({ page }, use) => {
    await use(new Endtoendpage(page));
  },

    testData: async ({}, use) => {
    await use(testData);
  },
});

exports.expect = base.expect;
