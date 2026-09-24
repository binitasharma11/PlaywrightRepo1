const ExcelJs = require('exceljs');
const {test, expect} = require('@playwright/test');

async function readWriteExcel(filePath, searchtext, textChange) 
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

readWriteExcel("C:/Users/New/OneDrive/ExcelDemo-1.xlsx", "Test 2", "Test2222");

