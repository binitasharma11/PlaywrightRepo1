const {test, expect} = require('@playwright/test');


//Using browser fixture
test(`@smoke First Playwright test`, async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    const password = page.locator ("[type='password']");
    const signin = page.locator ('#signInBtn');
    const cardTitles = page.locator(".card-body a");
   
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log (await page.title())
    await username.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await signin.click();
    console.log (await page.locator("[style*='block']").textContent());
    await expect(page.locator("*[style*='block']")).toContainText('Incorrect username/password.');
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signin.click();
    console.log(await cardTitles.first().textContent());
    console.log (await cardTitles.nth(1).textContent()); //this will return the second element. Indexing starts with 0
    console.log (await cardTitles.last().textContent());
    console.log (await cardTitles.allTextContents()); // This will return a array of all matching elements
});


//Using page fixture
test(`@smoke Page Playwright test`, async ({page})=>
{
        await page.goto("https://google.com")
        //get the title
       console.log (await page.title())
       //assertion
       await expect(page).toHaveTitle("Google")
    });


test(`@web uiControls`, async({page})=>
{
    const username = page.locator('#username');
    const password = page.locator ("[type='password']");
    const signin = page.locator ('#signInBtn');
    const dropdown = page.locator('select.form-control');
    const radiobutton = page.locator('span.checkmark');
    const user = page.locator('button#okayBtn');
    const terms = page.locator('input#terms');
    const docLink = page.locator('[href*="documents-request"]');
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await username.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await radiobutton.last().click();
    await expect(radiobutton.last()).toBeChecked(); // This is an assertion to check that the chechbox is checked or not.
    console.log(await radiobutton.last().isChecked()); //.isChecked is not an assertion, it will return the boolean value(T/F). This will just print the returned value in the console.
    await user.click();
    await dropdown.selectOption("consult");
    await terms.click();
    await expect (terms).toBeChecked();
    await terms.uncheck();
    expect(await terms.isChecked()).toBeFalsy();
    await expect(docLink).toHaveAttribute("class","blinkingText");

    //await page.pause(); // This will pause the execution and user will have to option to resume in the pop-up window.
   

})

test(`@web child windows handling`, async({browser})=>
{
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator('#username');
    const docLink = page.locator('[href*="documents-request"]');

    const [newPage] = await Promise.all( // Execute the set of instructions parallelly and continues iterating untill all the instructions are fulfilled.
    [context.waitForEvent('page'), // listen and catch the new page details in page2
    docLink.click(),
    ])
   const text = await newPage.locator(".red").textContent();
    console.log(text);

    //Split the text to extract only thr domain name from the text. Split function can be used for this.
    const arrayText = text.split("@")
    console.log(arrayText);
    const domain = arrayText[1].split(" ");
    console.log(domain[0]);

    //Fetch the text from 2nd page and enter it into 1st page textbox
    await username.fill(domain[0]); // usrname is an element in the 1st page, and Doman[0] is the value from 2nd page.
    console.log(await username.inputValue()); //inputValue() fetches the user input during the runtime. Whereas textContent() fetches the text which is already present in the DOM
    await page.pause();
})