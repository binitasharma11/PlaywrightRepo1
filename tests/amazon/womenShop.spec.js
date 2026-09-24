const { test, expect } = require('@playwright/test');

test.use({
    storageState: 'playwright/.auth/amazon.json'
});

test('Amazon account page', async ({ page }) => {

    await page.goto('https://www.amazon.com/');
    await page.locator('.hm-icon').click();
    await page.getByText("Clothing, Shoes, Jewelry & Watches").click();
    await page.getByRole("Link", { name: "Women" }).click();
    await page.getByRole('link', { name: 'Dresses', exact: true }).click();
    await page.getByRole('link').filter({ hasText: "Cinq a Sept Women's Crepe Khloe Blazer" }).click();
    await page.locator("#add-to-cart-button").click();
    await page.locator(".nav-cart-icon").click();
    await page.locator("input[value='Proceed to checkout']").click();

    console.log(await page.title());
    await page.pause();

    //await expect(page).toHaveTitle(/Amazon/i);

    // Your test starts here.
    // No username/password/OTP required.

});