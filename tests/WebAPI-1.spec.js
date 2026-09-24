const { test, expect, request } = require('@playwright/test');
const loginPayload = { userEmail: "binita@email.com", userPassword: "Password1234#" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };
let orderID;
let token;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    //LOGIN
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        { data: loginPayload })
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    //CREATE ORDER
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    //orderID = await orderResponseJson.orders[0];

});

test('API login', async ({ page }) => {

    page.addInitScript(value =>  //to  insert the TOKEN in our test we need to use addInitScripts(). This function allows to insert a javascript code inside playwright test
    {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
})

test.only('VerifyOrderHistory', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");
    console.log('ORDER-ID', orderID);

    //loop over the table row and compare the order-id
    const Rows = await page.locator('table tbody tr');
    console.log("Rows.count = " + await Rows.count());
    for (let i = 0; i < await Rows.count(); i++) {
        const row = Rows.nth(i).locator('th');
        console.log("Row" + i + " = " + await row.textContent());

        if (orderID === await row.textContent()) {
            await Rows.locator('button').first().click();
            break;
        }
    }

   
    await page.pause();
})