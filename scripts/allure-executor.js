const fs = require('fs');
const path = require('path');

const executor = {
  name: 'Jenkins',
  type: 'jenkins',
  buildName: `#${process.env.BUILD_NUMBER || 'local'}`,
  buildUrl: process.env.BUILD_URL || '',
  reportUrl: process.env.BUILD_URL
    ? `${process.env.BUILD_URL}allure`
    : ''
};

const resultsDir = path.resolve('allure-results');
fs.writeFileSync(
  path.join(resultsDir, 'executor.json'),
  JSON.stringify(executor, null, 2)
);
