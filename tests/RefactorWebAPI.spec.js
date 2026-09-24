const {test, expect, request} = require ('@playwright/test');
const loginPayload = {userEmail: "binita@email.com", userPassword: "Password1234#"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5"}]};
const {apiUtils}=require('../utils/apiUtils.spec.js')
let response;

test.beforeAll( async()=>
{
const apiContext = await request.newContext();
const apiUtils_obj = new apiUtils(apiContext, loginPayload);
response = await apiUtils_obj.createOrder(orderPayload);
});

test('API login and navigate to dashboard', async({page})=>
{
   
    page.addInitScript(value =>  //to  insert the TOKEN in our test we need to use addInitScripts(). This function allows to insert a javascript code inside playwright test
        { 
            window.localStorage.setItem('token', value);
        }, apiUtils_obj.token);
        await page.goto ("https://rahulshettyacademy.com/client/#/dashboard/dash");
 }) 

 test.only('VerifyOrderHistory',async({page})=>
{
    page.addInitScript(value =>
    {
        window.localStorage.setItem('token', value);
    },response.token);
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");
    console.log('ORDER-ID',response.orderID);
  
    //loop over the table row and compare the order-id
    const Rows = await page.locator('table tbody tr');
    console.log("Rows.count = "+await Rows.count());
    for(let i=0; i<await Rows.count(); i++)
    {
        const row = Rows.nth(i).locator('th');
        console.log("Row"+i+" = "+await row.textContent());

        if(response.orderID===await row.textContent())
        {
            await Rows.locator('button').first().click();
            break;
        }
    }


    await page.pause();
})