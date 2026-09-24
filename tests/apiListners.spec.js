const { test, expect, request } = require('@playwright/test');

test('API Request Intercept', async ({ page }) => {
    
    const un = page.locator('input#userEmail');
    const pwd = page.locator('input#userPassword');
    const login = page.locator('input#login');
     console.log("REQUEST:")
    page.on('request', request=>console.log(request.url())); //This line will be executed whenever an api request is made. The second argument will capture the endpoint and will print in the console
    console.log("RESPONSE:")
    page.on('response', response=>console.log(response.url(), response.status())); ////This line will be executed whenever an api RESPONSE is made. The second argument will capture the endpoint and will print in the console
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await un.fill('binita@email.com');
    await pwd.fill('Password1234#');
    await login.click();

    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").click();

   await page.pause();
})