const{test, expect, request} = require('@playwright/test');
const {apiUtils} = require('../utils/apiUtils.spec.js');


const loginPayload = {userEmail: "binita@email.com", userPassword: "Password1234#"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5"}]};
const fakePayloadOrders = {"data":[],"message":"No Orders"};


let response;

test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
    const apiUtils_obj = new apiUtils(apiContext, loginPayload);
    response = await apiUtils_obj.createOrder(orderPayload);
})

test('intercept API response', async({page})=>
{
    page.addInitScript(value =>{
        window.localStorage.setItem('token',value);}, response.token)

    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
        async route => 
        {
            const response = await page.request.fetch(route.request());
            let body =JSON.stringify(fakePayloadOrders); //JSON.stringify is used to convert into JSON format
            route.fulfill(
            {
                response,
                body,
            });
        });

    await page.locator("button[routerlink*='myorders']").click();
    //await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());
});