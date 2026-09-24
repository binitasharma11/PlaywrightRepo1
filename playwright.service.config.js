const { defineConfig } = require('@playwright/test');
const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { DefaultAzureCredential } = require('@azure/identity');
const base = require('./playwright.config');

module.exports = defineConfig({
  ...base,
  ...createAzurePlaywrightConfig(base, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000,
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
  }),
  reporter: [
    ['html', { open: 'never' }],
  ],
});
