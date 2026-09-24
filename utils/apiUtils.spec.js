class apiUtils
{
    constructor(apiContext, loginPayload)
    {
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;

    }

    async gettoken()
    {        
        //LOGIN
        
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
            {data: this.loginPayload})
            //expect loginResponse.ok().toBeTruthy();
            const loginResponseJson = await loginResponse.json();
            this.token = loginResponseJson.token;
            console.log(this.token);
            return(this.token);
    }

    async createOrder(orderPayload)
    {
        let response = {};
        response.token = await this.gettoken();
        const orderResponse =await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data: orderPayload,
        headers: {
                    'Authorization': this.token,
                    'Content-Type' : 'application/json'
                 },
    })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    const orderID = await orderResponseJson.orders[0];
    console.log("ORDER ID = "+orderID);
    response.orderID = orderID;
    return response;
    }
}
module.exports = {apiUtils};