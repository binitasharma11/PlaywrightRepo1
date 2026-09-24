import{test,expect} from '@playwright/test'
test('Playwright Special locators', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click(); //getByLabel works well with radio buttons, check-boxes, drop-downs.
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button",{name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", {name:'Shop'}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole('button').click(); //filter() is used to filter out 1 element out of several based on the condition provided inside the braces

})