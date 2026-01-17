const { test, expect } = require('./fixtures/pageObjects');
const {
  epic,
  feature,
  story,
  severity,
  owner
} = require('allure-js-commons');
require("./setup/hooks");

test("Complete end to end purchase flow", async ({
  loginpage,
  homepage,
  cartpage,
  endtoendpage
}) => {

   epic('Swag LABS complete purchase flow');
   feature('Validate end to end purchase functionality');
   story('As a user, I want to complete a full purchase flow from login to checkout');
   severity('critical');
   owner('QA-Team');

  await test.step("Login with valid credentials", async () => {
    console.log("STEP: Login with valid credentials");
    await loginpage.login("standard_user", "secret_sauce");
  });

  await test.step("Add products to cart", async () => {
    console.log("STEP: Add Sauce Labs Backpack to cart");
    await homepage.addtocartbyname("Sauce Labs Backpack");

    console.log("STEP: Add Sauce Labs Bike Light to cart");
    await homepage.addtocartbyname("Sauce Labs Bike Light");
  });

  await test.step("Navigate to cart page", async () => {
    console.log("STEP: Navigate to cart page");
    await cartpage.navigateToCart();
  });

  await test.step("Complete checkout process", async () => {
    console.log("STEP: Complete checkout with user details");
    await endtoendpage.checkoutprocess("John", "Doe", "12345");
  });

  await test.step("Verify order confirmation is displayed", async () => {
    console.log("STEP: Verify order confirmation text is visible");
    expect(await endtoendpage.ordertxt.isVisible()).toBeTruthy();
  });

});
