const {test, expect} = require("@playwright/test");
const {LoginPage} = require('./PageObjects/LoginPage');
const dataset = JSON.parse(JSON.stringify(require("../utils/jsonDataDriven_TestData.json")));

for(const data of dataset)
{
test(`Login as ${data.userName}`, async ({ page }) => { //this test is used to login as multiple users which are defined in the jsonDataDriven_TestData file. We are getting the count of array and looping the test for each dataset

    const loginPage = new LoginPage(page);
    const userName = data.userName;
    const password = data.password;

    await loginPage.gotoLoginPage();
    await loginPage.validLogin(userName, password);

    //await page.pause();
});
}