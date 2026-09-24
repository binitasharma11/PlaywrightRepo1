const {test, expect} = require("@playwright/test");
const {LoginPage} = require('./PageObjects/LoginPage');

/*test("Login", async({page}) =>
{
    const loginPage = new LoginPage(page);
    const userName = "binita@email.com";
    const password = "Password1234#";
    await loginPage.gotoLoginPage();
    await loginPage.validLogin(userName, password);
    await page.pause();
})*/

test("Login", async ({ page }) => {

    const loginPage = new LoginPage(page);
    const userName = "binita@email.com";
    const password = "Password1234#";

    await loginPage.gotoLoginPage();
    await loginPage.validLogin(userName, password);

    await page.pause();
});