const { test, expect, request } = require('@playwright/test');

test('API Request Intercept', async ({ page }) => {
    
    const un = page.locator('input#userEmail');
    const pwd = page.locator('input#userPassword');
    const login = page.locator('input#login');
    //page.route('**/*.css', route=>route.abort()); // This command is used to block the CSS styling in all the pages
    //page.route('**/*.{jpg,jpeg,png}', route=>route.abort()); //This command is used to block pictures
    await page.route('https://rahulshettyacademy.com/api/ecom/order/**',route=>{route.abort()}) // Intercept all API calls and block them.
    /*await page.route('https://rahulshettyacademy.com/api/ecom/order/**', route => {  //If we want to mock instead of block api calls
        route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: [] })
    });*/

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await un.fill('binita@email.com');
    await pwd.fill('Password1234#');
    await login.click();

    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").click();

   //await page.pause();
})