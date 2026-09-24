const ExcelJs = require('exceljs');
const {test, expect} = require('@playwright/test');

async function readWriteExcel(filePath, searchtext, textChange, change) 
{
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = searchExcel(worksheet, searchtext);
    const cell = worksheet.getCell((await output).row, (await output).column+change.colChange);
    cell.value = textChange;
    await workbook.xlsx.writeFile(filePath);

     
}

async function searchExcel(worksheet, searchtext)
{
    let output = {row:-1, column:-1}
    worksheet.eachRow((row, rowNumber)=>
   {
    row.eachCell((cell, colNumber)=>
    {
        if (cell.value == searchtext)
        {
            output = {row: rowNumber, column: colNumber}
        }
        console.log(cell.value);

    })
   })
   return output;
}

//readWriteExcel("C:/Users/New/OneDrive/ExcelDemo-1.xlsx", "Test 2", "Test2222");

test('upload download excel', async({page})=>
{
    const textsearch = "Mango";
    const updateValue = "1000";

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

    //Download the file
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name: 'Download'}).click();
    const download = await downloadPromise;
    const filePath = 'C:/Users/New/Downloads/download.xlsx';
    await download.saveAs(filePath); // This command is used for saving the downloaded file in the "filePath"
    //Ensure that the edit finishes before upload
    await readWriteExcel(filePath, textsearch, updateValue, {rowChange: 0, colChange: 2})
    await page.locator("#fileinput").setInputFiles("C:/Users/New/Downloads/download.xlsx"); //This will upload the updated excel sheet 

})