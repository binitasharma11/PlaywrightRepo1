const {test, expect} = require("@playwright/test");
const {POManager} = require('./PageObjects/POManager');
//const {LoginPage} = require('./PageObjects/LoginPage');
//const {Dashboard} = require('./PageObjects/Dashboard');
//const {Cart} = require('./PageObjects/Cart');

test("LoginAndAddToCart", async ({ page }) => {


    //const loginPage = new LoginPage(page);
    //const dashboard = new Dashboard(page);
    //const cart = new Cart(page);
    const poManager = new POManager(page);

    const userName = "binita@email.com";
    const password = "Password1234#";

    const loginPage = poManager.getLoginPage();
    const dashboard = poManager.getDashboardPage();
    const cart = poManager.getCartPage();

    await loginPage.gotoLoginPage();
    await loginPage.validLogin(userName, password);

    await dashboard.findProductAddToCart();

    await cart.placeOrder();

    await page.pause();
});

