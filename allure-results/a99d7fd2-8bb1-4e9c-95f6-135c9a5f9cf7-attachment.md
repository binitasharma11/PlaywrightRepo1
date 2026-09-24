# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Assignment1.spec.js >> assignmet1
- Location: tests\Assignment1.spec.js:4:1

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e11] [cursor=pointer]:
      - /url: https://techsmarthire.com/
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - generic [ref=e28]:
    - paragraph [ref=e30]: Thank you for Shopping With Us
    - generic [ref=e31]:
      - generic [ref=e32]: order summary
      - generic [ref=e34]:
        - text: Order Id
        - generic [ref=e35]: 6a0e353917ee3e78ba8c9df3
      - generic [ref=e37]:
        - generic [ref=e39]:
          - generic [ref=e40]: Billing Address
          - paragraph [ref=e41]: binita@email.com
          - paragraph [ref=e42]: Country - Cuba
        - generic [ref=e44]:
          - generic [ref=e45]: Delivery Address
          - paragraph [ref=e46]: binita@email.com
          - paragraph [ref=e47]: Country - Cuba
      - generic [ref=e50]: Product Ordered
      - generic [ref=e53]:
        - img [ref=e55]
        - generic [ref=e56]:
          - generic [ref=e57]: iphone 13 pro
          - generic [ref=e58]:
            - generic [ref=e59]: by ECOM
            - generic [ref=e60]: $ 55000
      - generic [ref=e62] [cursor=pointer]: View Orders
```

# Test source

```ts
  1  | const { title } = require('node:process');
  2  | const { text } = require('node:stream/consumers');
  3  | const {test, expect} = require ('playwright/test')
  4  | test('assignmet1', async({page})=>
  5  | {
  6  |     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  7  |     console.log("PAGE TITLE: ",await page.title());
  8  |     const un = page.locator('input#userEmail');
  9  |     const pwd = page.locator('input#userPassword');
  10 |     const login = page.locator('input#login');
  11 |     //const element_1 = page.locator('.card-body>>h5>>b');
  12 |     const element_1 = page.locator('//b[text()="ADIDAS ORIGINAL"]');
  13 |     const titles = page.locator('.card-body b');
  14 |     const productName = 'ZARA COAT 3';
  15 |     const product = page.locator('.card-body');
  16 |     const cart = page.locator('[routerlink="/dashboard/cart"]');
  17 |     const email = "binita@email.com"
  18 | 
  19 | 
  20 |     await un.fill(email);
  21 |     await pwd.fill('Password1234#');
  22 |     await login.click();
  23 |     //console.log(await element_1.first().textContent());
  24 |     element_1.waitFor(); //waitFor() is used to wait for a particular element to load
  25 |     console.log("FIRST ITEM:",await element_1.textContent());
  26 |     await page.waitForLoadState('networkidle'); //wait dynamically until the page is loaded
  27 |     console.log("ITEM LIST:",await titles.allTextContents());
  28 | 
  29 |     const count = await product.count()
  30 |     console.log("NUMBER OF PRODUCTS:",count);
  31 | 
  32 |     for(let i=0; i<count; ++i)
  33 |     {
  34 |        if(await product.nth(i).locator("b").textContent() === productName)
  35 |        {
  36 |             await product.nth(i).locator("text= Add To Cart").click();
  37 |             console.log("Adding item in CART")
  38 |             break;
  39 |        }       
  40 | 
  41 |     }
  42 |     await cart.click();
  43 |     await page.locator("div li").first().waitFor();
  44 |     const itemInCart = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
  45 |     expect(itemInCart).toBeTruthy();
  46 | 
  47 |     //Click on Buy Now button
  48 |     await page.locator("text=Buy Now").click();
  49 |     await page.locator("input[placeholder='Select Country']").pressSequentially("ind"); //pressSequentially is used for enter letters one by one and not all together at once.
  50 |     const dropdown = page.locator(".ta-results");
  51 |     await dropdown.waitFor();
  52 |     const optionCount = await dropdown.locator("button").count();
  53 |     for(let i=0; i<optionCount; ++i)
  54 |     {
  55 |         const text = await dropdown.locator("button").nth(i).textContent();
  56 |         if(text ===" India")
  57 |         {
  58 |             await dropdown.locator("button").nth(i).click();
  59 |             break;
  60 |         }
  61 | 
  62 | 
  63 |     }
  64 |     expect(page.locator("label[type='text']")).toHaveText(email);
  65 |     page.locator(".action__submit").click();
  66 |     await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  67 |     const orderNumber = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  68 |     const order = orderNumber.replace(/[^a-zA-Z0-9]/g,'');
  69 |     console.log("ORDER#",orderNumber);
  70 |     console.log("NEW ORDER#",order);
  71 | 
  72 |     await page.locator("label[routerlink='/dashboard/myorders']").click();
  73 | 
  74 |     
  75 |     //expect (page.locator("table.table tr").first()).toBeVisible;
  76 |     await page.locator("tbody").waitFor();
  77 |     const rows = await page.locator("tbody tr");
  78 |     console.log("NUMBER OF ORDERS: ", await rows.count());
  79 |     for(let i=0; i<await rows.count(); i++)
  80 |     {
  81 |        const rowOrder =await rows.nth(i).locator("th").textContent();
  82 |        console.log(rowOrder);
  83 |        if (order.includes(rowOrder)) //toHaveText() is a web-first assertion designed for browser-based testing, while .includes() is a standard JavaScript string method used for manual logic
  84 |       //if(order === rowOrder) // Strict Equality (===): Best for checking if two strings are identical in value and type
  85 |        {
  86 |         //await page.locator(".btn.btn-primary").first().click();
  87 |         await rows.nth(i).locator("button").first().click();
  88 |         break;
  89 |        }
  90 |     }
  91 |     const orderIdDetails = await page.locator(".col-text").textContent();
> 92 |     expect (order.includes(orderIdDetails)).toBeTruthy();
     |                                             ^ Error: expect(received).toBeTruthy()
  93 |     //await page.pause();
  94 | 
  95 | })
```