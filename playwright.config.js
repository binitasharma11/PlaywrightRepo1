// @ts-check
const { defineConfig, devices } = require('@playwright/test');
console.log("******** USING playwright.config.js ********");
module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    ['line'],
    ['allure-playwright']
  ],
  use: {
    browserName: 'webkit',
    headless: false,
    screenshot: 'on',
    trace: 'on'
  },
});
