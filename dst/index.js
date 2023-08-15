"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs = require("fs");
// const cheerio = require('cheerio');
// async function convertToCSV(array:string[][]) {
//   let csvContent = "";
// //   // Combine the array elements into CSV rows
//   const rows = array.map(row => row.join(","));
//   // Combine the rows into a single string
//   csvContent += rows.join("\n");
//   // Write the CSV content to a file
//   fs.writeFileSync("data.csv", csvContent, "utf-8");
// }
// let v:string[][];
var finalObject = {};
let ind = 0;
let t2 = async (URL) => {
    var myGlobalObject = {};
    try {
        const browser = await puppeteer_1.default.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setViewport({
            width: 10, height: 8,
            deviceScaleFactor: 1
        });
        await page.goto(URL, { waitUntil: 'networkidle2' });
        const names2 = await page.$x('//div/div/div/table[@class="table table-striped property-details"]');
        if (names2.length > 0) {
            for (let i2 = 0; i2 < names2.length; i2++) {
                console.log("aa");
                if (i2 < 2) {
                    const tableData = await page.evaluate((el, myGlobalObject) => {
                        const table = el.querySelector('tbody');
                        if (!table) {
                            return null; // No table found
                        }
                        const rows = Array.from(table.querySelectorAll('tr'));
                        const tableContent = rows.map(row => {
                            const head = row.querySelector('th')?.innerText;
                            const dat = row.querySelector('td')?.innerText;
                            console.log("Abhaya", head, dat);
                            if (head)
                                myGlobalObject[head] = dat || '';
                        });
                        return myGlobalObject;
                    }, names2[i2], myGlobalObject);
                    myGlobalObject = tableData;
                }
                else {
                    const tableData = await page.evaluate((el, myGlobalObject) => {
                        const caption = el.querySelector('caption')?.innerText;
                        const table = el.querySelector('tbody');
                        const hh = el.querySelector('thead');
                        if (!table || !hh) {
                            return null; // No table found
                        }
                        const headings = Array.from(hh.querySelectorAll('th')).map(th => th.innerText);
                        const rows = Array.from(table.querySelectorAll('td')).map(td => td.innerText);
                        console.log("caption", caption);
                        let n = headings.length;
                        if (caption) {
                            myGlobalObject[caption] = {};
                            for (let x = 0; x < n; x++) {
                                myGlobalObject[caption][headings[x]] = rows[x] || '';
                            }
                        }
                        return myGlobalObject;
                    }, names2[i2], myGlobalObject);
                    myGlobalObject = tableData;
                }
            }
            //     console.log(myGlobalObject);
            //     console.log("APPS");
        }
        const names3 = await page.$x('//div/div/div/dl[@class="property-details property-deeds"]');
        // console.log("size",names3.length)
        if (names3.length > 0) {
            let vec = [];
            for (let i2 = 0; i2 < names3.length; i2++) {
                const tableData = await page.evaluate((el, vec) => {
                    const tab = Array.from(el.querySelectorAll('dt')).map(th => th.innerText);
                    const rows = Array.from(el.querySelectorAll('dd'));
                    if (!rows) {
                        return null; // No table found
                    }
                    const regex = /<b>([^<]+)<\/b>: ([^<]+)/g;
                    let ii = 0;
                    let obj = {};
                    for (let row of rows) {
                        let match;
                        let row1 = row.innerHTML.toString();
                        if (tab[ii] == 'Details' || tab[ii] == 'Loan') {
                            let keyValuePairs = {};
                            while ((match = regex.exec(row1)) !== null) {
                                const key = match[1].trim();
                                const value = match[2].trim();
                                keyValuePairs[key] = value;
                            }
                            obj[tab[ii]] = keyValuePairs;
                        }
                        else {
                            obj[tab[ii]] = row1;
                        }
                        ii++;
                    }
                    vec.push(obj);
                    return vec;
                }, names3[i2], vec);
                vec = tableData;
            }
            myGlobalObject["Deeds, Mortgages, Titles & Sales History"] = vec;
            //     console.log(myGlobalObject);
        }
        // let name4="";
        const names4 = await page.$x('//div/div/div/table[@class="table table-striped pd-table col-1"]');
        if (names4.length > 0) {
            for (let i2 = 0; i2 < names4.length; i2++) {
                const tableData = await page.evaluate((el, myGlobalObject) => {
                    const caption = el.querySelector('caption')?.innerText;
                    const table = el.querySelector('tbody');
                    if (!table) {
                        return null; // No table found
                    }
                    if (caption) {
                        myGlobalObject[caption] = {};
                    }
                    const rows = Array.from(table.querySelectorAll('tr'));
                    const tableContent = rows.map(row => {
                        const head = row.querySelector('th')?.innerText;
                        const dat = row.querySelector('td')?.innerText;
                        if (head && caption)
                            myGlobalObject[caption][head] = dat || '';
                    });
                    // return tableContent
                    return myGlobalObject;
                }, names4[i2], myGlobalObject);
                myGlobalObject = tableData;
            }
            // console.log(myGlobalObject);
        }
        console.log(ind, "YES");
    }
    catch (e) {
        console.log(ind, "NO");
    }
    // ind++;
    return myGlobalObject;
};
let t1 = async (URL) => {
    try {
        const browser = await puppeteer_1.default.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setViewport({
            width: 10, height: 8,
            deviceScaleFactor: 1
        });
        await page.goto(URL, { waitUntil: 'networkidle2' });
        const names2 = await page.$x('//div/div/div/div[@class="list-group"]/ul[@class="list-group-items lgl"]/li');
        if (names2.length > 0) {
            for (let i2 = 0; i2 < names2.length; i2++) {
                let name2 = await page.evaluate(el => el.innerHTML, names2[i2]);
                let link3 = "";
                for (let ii2 = 10; ii2 < name2.length; ii2++) {
                    if (name2[ii2] == `"`)
                        break;
                    link3 += name2[ii2];
                }
                // console.log(link3)
                let url4 = "https://www.countyoffice.org/" + link3;
                finalObject[ind] = await t2(url4);
                ind++;
            }
        }
    }
    catch (e) {
        console.log(e);
    }
};
let main_actual = async () => {
    try {
        const browser = await puppeteer_1.default.launch({ headless: false });
        const page = await browser.newPage();
        const url = 'https://www.countyoffice.org/garland-tx-property-records/#prstreets';
        await page.setViewport({
            width: 1280, height: 800,
            deviceScaleFactor: 1
        });
        await page.goto(url, { waitUntil: 'networkidle2' });
        const names = await page.$x('//div/div/div/div/div/div/ul/li');
        if (names.length > 0) {
            for (let i = 0; i < names.length; i++) {
                let name = await page.evaluate(el => el.innerHTML, names[i]);
                let link = "";
                for (let ii = 10; ii < name.length; ii++) {
                    if (name[ii] == "/")
                        break;
                    link += name[ii];
                }
                // console.log(link);
                // if(i==0){
                let link2 = "https://www.countyoffice.org/" + link + "/";
                await t1(link2);
                // }
                if (ind > 50)
                    break;
            }
        }
        const filename = "new_file.json";
        fs.writeFileSync(filename, JSON.stringify(finalObject, null));
        // console.log("Error");
    }
    catch (e) {
        console.log(e);
    }
};
let main = async () => {
    await main_actual();
};
main();
