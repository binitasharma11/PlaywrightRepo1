const { test: base } = require('@playwright/test');

exports.customtest = base.extend(
    {
        testDataForOrder: 
        {
             "_comment": "storing the dataset as an array by enclosing them inside []. This helps by running the same test multiple times for different dataset",
            "userName" : "binita@email.com",
            "password" : "Password1234#"

        }
    }
)
//NOTES
//test = original template
//base = copy of that template
//customTest = modified template