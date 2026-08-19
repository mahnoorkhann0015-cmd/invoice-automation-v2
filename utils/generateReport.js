const reporter = require('cucumber-html-reporter');
const path = require('path');

const options = {
  theme: 'bootstrap',
  jsonFile: path.join(__dirname, '../reports/cucumber_report.json'),
  output: path.join(__dirname, '../reports/cucumber_report_pretty.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'Test Environment': 'QA',
    Browser: process.env.BROWSER || 'chromium',
    Platform: process.platform
  }
};

reporter.generate(options);
