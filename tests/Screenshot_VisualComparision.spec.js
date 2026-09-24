const{test,expect} = require('@playwright/test')

test('Capture Screenshot', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    await expect (page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'tests/Screenshots/LocatorSnap.png'}); //This will take the screenshot of one locator only.
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'tests/Screenshots/pageSnap.png'}); //This will take full pge screenshot

})

test.only('Visual validation', async({page})=>
{
    await page.goto("https://www.w3schools.com/");
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('landing.png'); //This will fail for the 1st time as there will be no screenshots in the path, but later it will do a complete visual compaision. The folder is created automatically same as the file name to store the screenshots
});
