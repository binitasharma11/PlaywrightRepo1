const{test,expect} = require('@playwright/test')

test('Popup validation', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
  //  await page.goto("http://google.com");
  //  await page.goBack();
  //  await page.goForward();
    await expect (page.locator("#displayed-text")).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect (page.locator("#displayed-text")).toBeHidden();

    //Handle ALERT pop-up
    
    page.on('dialog', dailog => dailog.accept()) //'on' method listens for event. accept or reject are the actions that can be performed.
    await page.locator('#confirmbtn').click();

    //MOUSE HOVER
    //await page.pause();
    await page.locator('#mousehover').hover();
    

    //HANDELING FRAMES
    const framespage = page.frameLocator('#courses-iframe');
    await framespage.locator('a[href*="lifetime-access"]:visible').click();
    const textCheck = await framespage.locator('.text h2').textContent();
    console.log(textCheck.split(" ")[1]);
    await page.pause();
})