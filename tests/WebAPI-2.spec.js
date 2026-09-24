const {test} = require ('@playwright/test')
let webContext;

test.beforeAll(async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const un = page.locator('input#userEmail');
    const pwd = page.locator('input#userPassword');
    const login = page.locator('input#login');
    const email = "binita@email.com"


    await un.fill(email);
    await pwd.fill('Password1234#');
    await login.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.jason'}); //StorageState saves all the cookies and browser's storage to maintain user session
    webContext = await browser.newContext({storageState:'state.jason'}); // Open a new browser for the same user and same session having the StorageState saved. WebContect now contains all the StorageState and can be used in tests to skip login
})

test('Login', async({})=>
{
  
    const page = await webContext.newPage(); //Since webContext contains the storageState, the test will open a browser page for same sassion. No need to login again
    await page.goto ("https://rahulshettyacademy.com/client/#/dashboard/dash");
    console.log("Test 1: Navigate to Dashboard");
})

test('OrderPageTitle', async({})=>
{
  
    const page = await webContext.newPage(); //Since webContext contains the storageState, the test will open a browser page for same sassion. No need to login again
    await page.goto ("https://rahulshettyacademy.com/client/#/dashboard/myorders");
    console.log("Test 2: Page Title - "+await page.title());
})