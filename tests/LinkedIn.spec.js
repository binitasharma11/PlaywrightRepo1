const {test, expect} = require('@playwright/test');

test('Login to LinkedIn', async ({ page }) => {
  // Navigate to LinkedIn login
  await page.goto('https://www.linkedin.com/login');

  // Enter credentials
  await page.fill('#username', 'sharma.binita@hotmail.com');
  await page.fill('#password', '1LI01ml010#');
  await page.click('button[type="submit"]');

  // Wait for successful login (e.g., feed page)
  await page.waitForURL('**/feed');

    // Save session cookies + localStorage
 await context.storageState({ path: 'linkedin-session.json' });
 await browser.close();
});


;
