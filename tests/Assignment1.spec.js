const { title } = require('node:process');
const { text } = require('node:stream/consumers');
const {test, expect} = require ('playwright/test')
test('assignmet1', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log("PAGE TITLE: ",await page.title());
    const un = page.locator('input#userEmail');
    const pwd = page.locator('input#userPassword');
    const login = page.locator('input#login');
    //const element_1 = page.locator('.card-body>>h5>>b');
    const element_1 = page.locator('//b[text()="ADIDAS ORIGINAL"]');
    const titles = page.locator('.card-body b');
    const productName = 'ZARA COAT 3';
    const product = page.locator('.card-body');
    const cart = page.locator('[routerlink="/dashboard/cart"]');
    const email = "binita@email.com"


    await un.fill(email);
    await pwd.fill('Password1234#');
    await login.click();
    //console.log(await element_1.first().textContent());
    element_1.waitFor(); //waitFor() is used to wait for a particular element to load
    console.log("FIRST ITEM:",await element_1.textContent());
    await page.waitForLoadState('networkidle'); //wait dynamically until the page is loaded
    console.log("ITEM LIST:",await titles.allTextContents());

    const count = await product.count()
    console.log("NUMBER OF PRODUCTS:",count);

    for(let i=0; i<count; ++i)
    {
       if(await product.nth(i).locator("b").textContent() === productName)
       {
            await product.nth(i).locator("text= Add To Cart").click();
            console.log("Adding item in CART")
            break;
       }       

    }
    await cart.click();
    await page.locator("div li").first().waitFor();
    const itemInCart = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
    expect(itemInCart).toBeTruthy();

    //Click on Buy Now button
    await page.locator("text=Buy Now").click();
    await page.locator("input[placeholder='Select Country']").pressSequentially("ind"); //pressSequentially is used for enter letters one by one and not all together at once.
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionCount = await dropdown.locator("button").count();
    for(let i=0; i<optionCount; ++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text ===" India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }


    }
    expect(page.locator("label[type='text']")).toHaveText(email);
    page.locator(".action__submit").click();
    await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderNumber = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const order = orderNumber.replace(/[^a-zA-Z0-9]/g,'');
    console.log("ORDER#",orderNumber);
    console.log("NEW ORDER#",order);

    await page.locator("label[routerlink='/dashboard/myorders']").click();

    
    //expect (page.locator("table.table tr").first()).toBeVisible;
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    console.log("NUMBER OF ORDERS: ", await rows.count());
    for(let i=0; i<await rows.count(); i++)
    {
       const rowOrder =await rows.nth(i).locator("th").textContent();
       console.log(rowOrder);
       if (order.includes(rowOrder)) //toHaveText() is a web-first assertion designed for browser-based testing, while .includes() is a standard JavaScript string method used for manual logic
      //if(order === rowOrder) // Strict Equality (===): Best for checking if two strings are identical in value and type
       {
        //await page.locator(".btn.btn-primary").first().click();
        await rows.nth(i).locator("button").first().click();
        break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect (order.includes(orderIdDetails)).toBeTruthy();
    //await page.pause();

})