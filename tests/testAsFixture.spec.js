const {test, expect} = require("@playwright/test");
const { customtest: customTest } = require('../utils/test-base');
const {LoginPage} = require('./PageObjects/LoginPage');
//const dataset = JSON.parse(JSON.stringify(require("../utils/jsonDataDriven_TestData.json")));


customTest(`Login`, async ({ page, testDataForOrder }) => 
    { 

    const loginPage = new LoginPage(page);
    const userName = testDataForOrder.userName;
    const password = testDataForOrder.password;

    await loginPage.gotoLoginPage();
    await loginPage.validLogin(userName, password);

    //await page.pause();
});
