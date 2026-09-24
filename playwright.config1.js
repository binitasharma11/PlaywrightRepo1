// @ts-check
import { defineConfig, devices } from '@playwright/test';
console.log("******** USING playwright.config1.js ********");
module.exports = defineConfig({

  testDir: './tests',
  retries: 1, // This will re-run the test cases after failure. Number of re-runs can be mentioned here
  timeout: 5 *1000, //Global Timeout
  expect : {
    timeout: 5000, //expect timeout
  },
  reporter: 'html',
  projects: [
    {
        name: 'safari',
        use: {
            //browserName: 'chromium',
            browserName: 'webkit',
            headless: false,
            screenshot: 'off', //on, off
            trace: 'on', //provides detail log of excecution. it can also be turned-off by 'off'
            //trace: 'retain-on-failure' //this will provide detail log only when test case fails
            ...devices['iphone.11'],
            video: 'on',
        }
    },
    {
        name: 'chrome',
        use: {
            browserName: 'chromium',
            headless: false,
            screenshot: 'on',
            trace: 'on', //provides detail log of excecution. it can also be turned-off by 'off'
            //trace: 'retain-on-failure' //this will provide detail log only when test case fails
            viewport: {width:720,height:720} //This is used for WEB-RESPONSIVE testing to validate elements are loading for different window sizes. Here we can provide the browser window sizes
            
        }
    }

  ]
 

});


//NOTES
//custom config file can be used cross browser testing
// To run tests using this conig file, use command as below"
// npx playwright test tests/testAsFixture.spec.js --config=playwright.config1.js

