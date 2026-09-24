const {LoginPage} = require('./LoginPage');
const {Dashboard} = require('./Dashboard');
const {Cart} = require('./Cart');

class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginpage = new LoginPage(page);
        this.dashboard = new Dashboard(page);
        this.cart = new Cart(page);
    }
    getLoginPage()
    {
        return this.loginpage;
    }

    getDashboardPage()
    {
        return this.dashboard;
    }

    getCartPage()
    {
        return this.cart;
    }

}
module.exports = {POManager}