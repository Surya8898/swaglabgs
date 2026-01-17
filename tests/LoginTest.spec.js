const { test, expect } = require('./fixtures/pageObjects');
const {
  epic,
  feature,
  story,
  severity,
  owner
} = require('allure-js-commons');
require('./setup/hooks');

test(
  "Login Test | valid user lands on home page",
  async ({ loginpage, homepage, testData }) => {

   epic('Swag LABS Login');
   feature('Validate Login Functionality');
   story('As a user, I want to log in with valid credentials so that I can access the home page');
   severity('critical');
   owner('QA-Team');

    await test.step('Login with valid credentials', async () => {
      console.log('STEP: Logging in with valid credentials');
      await loginpage.login(testData.username, testData.password);
    });

    await test.step('Verify home page is displayed', async () => {
      console.log('STEP: Verifying home page header');
      await expect(homepage.VerifyhomepageTxt()).toBeVisible();
    });
  }
);

test(
  "Login Test | invalid user shows error message",
  async ({ loginpage }) => {

   epic('Swag LABS Login');
   feature('Validate Login Functionality');
   story('As a user, I want to see an error message when logging in with invalid credentials');
   severity('critical');
   owner('QA-Team');

    await test.step('Attempt login without username', async () => {
      console.log('STEP: Attempting login with missing username');
      const result = await loginpage.errormsgcheck();
      expect(result).toBeTruthy();
    });
  }
);

