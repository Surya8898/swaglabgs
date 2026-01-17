const { test, expect } = require('./fixtures/pageObjects');
const {
  epic,
  feature,
  story,
  severity,
  owner
} = require('allure-js-commons');
require("./setup/hooks");

test("product is displayed in home page after login", async ({ loginpage, homepage, testData }) => {

   epic('Swag LABS homepage');
   feature('Validate product Display Functionality');
   story('As a user, I want to see products displayed on the home page after logging in');
   severity('critical');
   owner('QA-Team');

  await test.step("Login with valid credentials", async () => {
    console.log("STEP: Login with valid credentials");
    await loginpage.login(testData.username, testData.password);
  });

  await test.step("Verify products are displayed on home page", async () => {
    console.log("STEP: Verify product count is greater than 0");
    expect(await homepage.getProductCount()).toBeGreaterThan(0);
  });

});

test("Add to cart button works correctly", async ({ loginpage, homepage, testData }) => {


   epic('Swag LABS homepage');
   feature('Validate product Display Functionality');
   story('As a user, I want to see products displayed on the home page after logging in');
   severity('critical');
   owner('QA-Team');

  await test.step("Login with valid credentials", async () => {
    console.log("STEP: Login with valid credentials");
    await loginpage.login(testData.username, testData.password);
  });

  await test.step("Add product to cart", async () => {
    console.log("STEP: Add Sauce Labs Bolt T-Shirt to cart");
    await homepage.addtocartbyname("Sauce Labs Bolt T-Shirt");
  });

  await test.step("Verify remove button is visible", async () => {
    console.log("STEP: Verify Remove button is visible");
    expect(await homepage.removebutton().isVisible()).toBeTruthy();
  });

});

test("Verify home page filter works correctly", async ({ loginpage, homepage }) => {

   epic('Swag LABS homepage');
   feature('Validate product filter Functionality');
   story('As a user, I want to filter products on the home page to see them in a specific order');
   severity('major');
   owner('QA-Team');

  await test.step("Login with valid credentials", async () => {
    console.log("STEP: Login with valid credentials");
    await loginpage.login("standard_user", "secret_sauce");
  });

  await test.step("Verify product sorting order", async () => {
    console.log("STEP: Fetch product names and verify reverse sorting");
    const productNames = await homepage.getProductNames();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);
  });

});

test("verify cart count after adding products", async ({ loginpage, homepage }) => {

   epic('Swag LABS homepage');
   feature('Validate product cart count Functionality');
   story('As a user, I want to see the cart count update after adding products to the cart');
   severity('major');
   owner('QA-Team');

  await test.step("Login with valid credentials", async () => {
    console.log("STEP: Login with valid credentials");
    await loginpage.login("standard_user", "secret_sauce");
  });

  await test.step("Add multiple products to cart", async () => {
    console.log("STEP: Add Sauce Labs Bolt T-Shirt to cart");
    await homepage.addtocartbyname("Sauce Labs Bolt T-Shirt");

    console.log("STEP: Add Sauce Labs Fleece Jacket to cart");
    await homepage.addtocartbyname("Sauce Labs Fleece Jacket");
  });

  await test.step("Verify cart count", async () => {
    console.log("STEP: Verify cart count is 2");
    const cartCount = await homepage.getCartCount();
    expect(cartCount).toBe('2');
  });

});
