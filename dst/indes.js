"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs = require("fs");
// async function convertToCSV(array:string[][]) {
//   let csvContent = "";
// //   // Combine the array elements into CSV rows
//   const rows = array.map(row => row.join(","));
//   // Combine the rows into a single string
//   csvContent += rows.join("\n");
//   // Write the CSV content to a file
//   fs.writeFileSync("data.csv", csvContent, "utf-8");
// }
function writeToCSV(data, filePath) {
    const csvContent = data.map(row => row.join(",")).join("\n");
    fs.writeFileSync(filePath, csvContent, "utf-8");
    console.log("Data successfully written to CSV file.");
}
let pathh = "a.csv";
let v;
let t2 = async (URL) => {
    try {
        let li = [];
        const browser = await puppeteer_1.default.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setViewport({
            width: 10, height: 8,
            deviceScaleFactor: 1
        });
        await page.goto(URL, { waitUntil: 'networkidle2' });
        const names2 = await page.$x('//div/div/div/table[@class="table table-striped property-details"]');
        let name2 = "";
        if (names2.length > 0) {
            for (let i2 = 0; i2 < names2.length; i2++) {
                name2 = await page.evaluate(el => el.innerText, names2[i2]);
                // console.log(name2)
                console.log(typeof (name2));
                // li.push(name2);
            }
        }
        let name3 = "";
        const names3 = await page.$x('//div/div/div/dl[@class="property-details property-deeds"]');
        if (names3.length > 0) {
            for (let i2 = 0; i2 < names3.length; i2++) {
                name3 = await page.evaluate(el => el.innerText, names3[i2]);
                // console.log(name3)
                li.push(name3);
            }
        }
        let name4 = "";
        const names4 = await page.$x('//div/div/div/table[@class="table table-striped pd-table col-1"]');
        if (names4.length > 0) {
            for (let i2 = 0; i2 < names4.length; i2++) {
                name4 = await page.evaluate(el => el.innerText, names4[i2]);
                // console.log(name4)
                li.push(name4);
            }
        }
        let tt = [li];
        // tt.push(li);
        writeToCSV(tt, pathh);
        // li.push(name2)
        // li.push(name3)
        // li.push(name4)
        // console.log(li)
        console.log("YES");
        // v.push(li);
        // console.log(name2+name3+name4);
    }
    catch (e) {
        console.log(e);
    }
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
                await t2(url4);
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
                if (i == 0) {
                    let link2 = "https://www.countyoffice.org/" + link + "/";
                    await t1(link2);
                }
            }
        }
        // console.table(v);
        console.log("Error");
        // await sleep_for(page,1000,2000);
    }
    catch (e) {
        console.log(e);
    }
};
let main = async () => {
    await main_actual();
    // await convertToCSV(v);
    // await t1("https://www.countyoffice.org/16th-st-garland-tx-property-records/")
};
main(); //bootstrap