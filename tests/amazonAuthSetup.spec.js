const { test: setup, expect } = require('@playwright/test');

const authFile = 'playwright/.auth/amazon.json';

setup('authenticate to Amazon', async ({ page }) => {

    await page.goto('https://www.amazon.com/');

    // Click Sign in
    await page.getByText("Hello, sign in").click();

    // Enter email/phone
    await page.locator('#ap_email_login').fill("binitatest0@gmail.com");

    await page.locator('.a-button-input').click();

    // Enter password
    await page.locator('#ap_password').fill("Test1234#");

    await page.locator('#signInSubmit').click();

    // Amazon may now ask for OTP.
    console.log('Waiting for Amazon OTP...');

    // PAUSE HERE so you can enter the OTP manually.
    await page.pause();

    // After you manually enter OTP and complete login,
    // continue execution.

    await page.context().storageState({
        path: authFile
    });

    console.log('Amazon authentication state saved.');
});