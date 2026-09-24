const { test, expect, request } = require('@playwright/test');

test('API Request Intercept', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const un = page.locator('input#userEmail');
    const pwd = page.locator('input#userPassword');
    const login = page.locator('input#login');

    await un.fill('binita@email.com');
    await pwd.fill('Password1234#');
    await login.click();

    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69f28768f86ba51a6593d999' })
    )
    await page.locator('.btn-primary').first().click();
    await expect(page.locator('.blink_me')).toHaveText("You are not authorize to view this order");
    await page.pause();
})