const { test, expect } = require('./fixtures/pageObjects');
const {
  epic,
  feature,
  story,
  severity,
  owner
} = require('allure-js-commons');
require("./setup/hooks");

test("successful navigation to cart page", async ({ loginpage, cartpage }) => {

    epic('Swag LABS cart page');
   feature('Validate cart Page Navigation Functionality');
   story('As a user, I want to navigate to the cart page successfully');
   severity('critical');
   owner('QA-Team');

  await test.step("Login with valid credentials", async () => {
    console.log("STEP: Login with valid credentials");
    await loginpage.login("standard_user", "secret_sauce");
  });

  await test.step("Navigate to cart page", async () => {
    console.log("STEP: Navigate to cart page");
    const cartTitle = await cartpage.navigateToCart();
    expect(await cartTitle.isVisible()).toBeTruthy();
  });

});

test("product is displayed in cart after adding to cart", async ({
  loginpage,
  homepage,
  cartpage
}) => {

    epic('Swag LABS cart page');
   feature('Validate product Display in Cart Functionality');
   story('As a user, I want to see products displayed in the cart after adding them');
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

  await test.step("Verify product is displayed in cart", async () => {
    console.log("STEP: Verify Sauce Labs Backpack is displayed in cart");
    expect(
      await cartpage.productincartcheck("Sauce Labs Backpack")
    ).toBeVisible();
  });

});
