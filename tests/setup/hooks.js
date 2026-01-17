const { test } = require('@playwright/test');

test.beforeEach(async ({ page }, testInfo) => {

  await page.goto('/');

  console.log(`\n=== TEST STARTED ===`);
  console.log(`Test Name : ${testInfo.title}`);

});

test.afterEach(async ({ page }, testInfo) => {

    console.log(`=== TEST ENDED ===`);
  console.log(`Test Name : ${testInfo.title}`);
  console.log(`Status    : ${testInfo.status}`);

  // Run only when test fails unexpectedly
  if (testInfo.status !== testInfo.expectedStatus) {

    console.log(`❌ ERROR: ${testInfo.error?.message}`);
    const errorMessage = testInfo.error?.message || 'No error message';
    const stackTrace = testInfo.error?.stack || 'No stack trace';

    // -------- Attach failure log --------
    await testInfo.attach('Failure Log', {
      body: `
Test Name : ${testInfo.title}
Status    : ${testInfo.status}
URL       : ${page.url()}
Timestamp : ${new Date().toISOString()}

Error Message:
${errorMessage}

Stack Trace:
${stackTrace}
      `,
      contentType: 'text/plain',
    });

    // -------- Take screenshot --------
    const screenshot = await page.screenshot({ fullPage: true });

    await testInfo.attach('Failure Screenshot', {
      body: screenshot,
      contentType: 'image/png',
    });
  }
});
