const fs = require('fs');
const path = require('path');

const resultsDir = path.resolve('allure-results');
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir);
}

const envData = `
Environment=${process.env.ENV || 'LOCAL'}
Browser=${process.env.BROWSER || 'chromium'}
BaseURL=${process.env.BASE_URL || 'http://localhost'}
OS=${process.platform}
Node=${process.version}
BuildNumber=${process.env.BUILD_NUMBER || 'local'}
`.trim();

fs.writeFileSync(
  path.join(resultsDir, 'environment.properties'),
  envData
);
