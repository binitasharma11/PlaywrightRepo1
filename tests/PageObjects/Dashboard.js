class Dashboard 
{
    constructor(page) 
    {
        this.page = page;
        this.element_1 = page.locator('//b[text()="ADIDAS ORIGINAL"]');
        this.titles = page.locator('.card-body b');
        this.productName = 'ZARA COAT 3';
        this.product = page.locator('.card-body');
        this.cart = page.locator('[routerlink="/dashboard/cart"]');
    }

    async findProductAddToCart() 
    {
        this.element_1.waitFor(); //waitFor() is used to wait for a particular element to load
        console.log("FIRST ITEM:", await this.element_1.textContent());
        await this.page.waitForLoadState('networkidle'); //wait dynamically until the page is loaded
        console.log("ITEM LIST:", await this.titles.allTextContents());

        const count = await this.product.count()
        console.log("NUMBER OF PRODUCTS:", count);

        for (let i = 0; i < count; ++i) 
            {
            if (await this.product.nth(i).locator("b").textContent() === this.productName) 
            {
                await this.product.nth(i).locator("text= Add To Cart").click();
                console.log("Adding item in CART")
                break;
            }

        }
        await this.cart.click();
    }
}
module.exports = {Dashboard}