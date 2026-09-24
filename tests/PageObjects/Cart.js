class Cart
{
    constructor(page)
    {
        this.page = page;
        this.table = page.locator("div li");
        this.itemInCart = page.locator("h3:has-text('ZARA COAT 3')");
        this.BuyNow = page.locator("text=Buy Now");
        this.country = page.locator("input[placeholder='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.optionCount = this.dropdown.locator("button");
        this.actionSubmit = page.locator(".action__submit");
    
    
    }

    async placeOrder()
    {
        await this.table.first().waitFor();
            const itemInCart = await this.itemInCart.isVisible()
            //expect(itemInCart).toBeTruthy();
        
            //Click on Buy Now button
            await this.BuyNow.click();
            await this.country.pressSequentially("ind"); //pressSequentially is used for enter letters one by one and not all together at once.
            await this.dropdown.waitFor();
            const optionCount = await this.optionCount.count();
            for(let i=0; i<optionCount; ++i)
            {
                const text = await this.optionCount.nth(i).textContent();
                if(text ===" India")
                {
                    await this.optionCount.nth(i).click();
                    break;
                }
        
        
            }
            //expect(page.locator("label[type='text']")).toHaveText(email);
            this.actionSubmit.click();
    }
}
module.exports = {Cart}