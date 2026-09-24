class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.userName = page.locator('input#userEmail');
        this.password = page.locator('input#userPassword');
        this.signInbutton = page.locator('input#login');
    }

    async validLogin(userName, password)
    {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInbutton.click();
    }

    async gotoLoginPage()
    {
            this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }
}
module.exports = {LoginPage}