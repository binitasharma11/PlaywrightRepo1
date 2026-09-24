# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UIBasicstest.spec.js >> uiControls
- Location: tests\UIBasicstest.spec.js:42:6

# Error details

```
Error: expect(locator).toBeChecked() failed

Locator:  locator('span.checkmark').first()
Expected: checked
Received: unchecked
Timeout:  5000ms

Call log:
  - Expect "toBeChecked" with timeout 5000ms
  - waiting for locator('span.checkmark').first()
    9 × locator resolved to <span class="checkmark"></span>
      - unexpected value "unchecked"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - link "Free Access to InterviewQues/ResumeAssistance/Material" [ref=e3] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/documents-request
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e4] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
  - generic [ref=e5]:
    - heading [level=3] [ref=e6]:
      - img [ref=e8]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]: "Username:"
        - textbox "Username:" [ref=e17]: rahulshetty
      - generic [ref=e18]:
        - generic [ref=e19]: "Password:"
        - textbox "Password:" [ref=e20]: Learning@830$3mK2
      - generic [ref=e22]:
        - generic [ref=e23] [cursor=pointer]:
          - text: Admin
          - radio "Admin" [ref=e24]
        - generic [ref=e26] [cursor=pointer]:
          - text: User
          - radio "User" [checked] [ref=e27]
      - combobox [ref=e30]:
        - option "Student" [selected]
        - option "Teacher"
        - option "Consultant"
      - generic [ref=e31]:
        - generic [ref=e32]:
          - checkbox "I Agree to the terms and conditions" [ref=e34]
          - generic [ref=e35]:
            - text: I Agree to the
            - link "terms and conditions" [ref=e36]:
              - /url: "#"
        - button "Sign In" [ref=e37] [cursor=pointer]
      - paragraph [ref=e39]:
        - text: (username is
        - generic [ref=e40]: rahulshettyacademy
        - text: and Password is
        - generic [ref=e41]: Learning@830$3mK2
        - text: )
  - generic [ref=e43]:
    - paragraph [ref=e45]: You will be limited to only fewer functionalities of the app. Proceed?
    - generic [ref=e46]:
      - button "Cancel" [ref=e47] [cursor=pointer]
      - button "Okay" [ref=e48] [cursor=pointer]
```

# Test source

```ts
  1  | const {test, expect} = require('@playwright/test');
  2  | 
  3  | //Using browser fixture
  4  | test('First Playwright test', async ({browser})=>
  5  | {
  6  |     const context = await browser.newContext();
  7  |     const page = await context.newPage();
  8  |     const username = page.locator('#username');
  9  |     const password = page.locator ("[type='password']");
  10 |     const signin = page.locator ('#signInBtn');
  11 |     const cardTitles = page.locator(".card-body a");
  12 |    
  13 |     
  14 |     await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  15 |     console.log (await page.title())
  16 |     await username.fill("rahulshetty");
  17 |     await password.fill("Learning@830$3mK2");
  18 |     await signin.click();
  19 |     console.log (await page.locator("[style*='block']").textContent());
  20 |     await expect(page.locator("*[style*='block']")).toContainText('Incorrect username/password.');
  21 |     await username.fill("");
  22 |     await username.fill("rahulshettyacademy");
  23 |     await signin.click();
  24 |     console.log(await cardTitles.first().textContent());
  25 |     console.log (await cardTitles.nth(1).textContent()); //this will return the second element. Indexing starts with 0
  26 |     console.log (await cardTitles.last().textContent());
  27 |     console.log (await cardTitles.allTextContents()); // This will return a array of all matching elements
  28 | });
  29 | 
  30 | 
  31 | //Using page fixture
  32 | test('Page Playwright test', async ({page})=>
  33 | {
  34 |         await page.goto("https://google.com")
  35 |         //get the title
  36 |        console.log (await page.title())
  37 |        //assertion
  38 |        await expect(page).toHaveTitle("Google")
  39 |     });
  40 | 
  41 | 
  42 | test.only('uiControls', async({page})=>
  43 | {
  44 |     const username = page.locator('#username');
  45 |     const password = page.locator ("[type='password']");
  46 |     const signin = page.locator ('#signInBtn');
  47 |     const dropdown = page.locator('select.form-control');
  48 |     const radiobutton = page.locator('span.checkmark');
  49 |     const user = page.locator('button#okayBtn');
  50 |     const terms = page.locator('input#terms');
  51 |     const docLink = page.locator('[href*="documents-request"]');
  52 |     
  53 |     await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  54 |     await username.fill("rahulshetty");
  55 |     await password.fill("Learning@830$3mK2");
  56 |     await radiobutton.last().click();
> 57 |     await expect(radiobutton.first()).toBeChecked(); // This is an assertion to check that the chechbox is checked or not.
     |                                       ^ Error: expect(locator).toBeChecked() failed
  58 |     console.log(await radiobutton.nth(0).isChecked()); //.isChecked is not an assertion, it will return the boolean value(T/F). This will just print the returned value in the console.
  59 |     console.log(await radiobutton.last().isChecked()); //.isChecked is not an assertion, it will return the boolean value(T/F). This will just print the returned value in the console.
  60 |     await user.click();
  61 |     await dropdown.selectOption("consult");
  62 |     await terms.click();
  63 |     await expect (terms).toBeChecked();
  64 |     await terms.uncheck();
  65 |     expect(await terms.isChecked()).toBeFalsy();
  66 |     await expect(docLink).toHaveAttribute("class","blinkingText");
  67 | 
  68 |     //await page.pause(); // This will pause the execution and user will have to option to resume in the pop-up window.
  69 |    
  70 | 
  71 | })
  72 | 
  73 | test('child windows handling', async({browser})=>
  74 | {
  75 |     
  76 |     const context = await browser.newContext();
  77 |     const page = await context.newPage();
  78 |     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  79 |     const username = page.locator('#username');
  80 |     const docLink = page.locator('[href*="documents-request"]');
  81 | 
  82 |     const [newPage] = await Promise.all( // Execute the set of instructions parallelly and continues iterating untill all the instructions are fulfilled.
  83 |     [context.waitForEvent('page'), // listen and catch the new page details in page2
  84 |     docLink.click(),
  85 |     ])
  86 |    const text = await newPage.locator(".red").textContent();
  87 |     console.log(text);
  88 | 
  89 |     //Split the text to extract only thr domain name from the text. Split function can be used for this.
  90 |     const arrayText = text.split("@")
  91 |     console.log(arrayText);
  92 |     const domain = arrayText[1].split(" ");
  93 |     console.log(domain[0]);
  94 | 
  95 |     //Fetch the text from 2nd page and enter it into 1st page textbox
  96 |     await username.fill(domain[0]); // usrname is an element in the 1st page, and Doman[0] is the value from 2nd page.
  97 |     console.log(await username.inputValue()); //inputValue() fetches the user input during the runtime. Whereas textContent() fetches the text which is already present in the DOM
  98 |     await page.pause();
  99 | })
```