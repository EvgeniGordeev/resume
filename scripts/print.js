/*jshint esversion: 11 */
/*jshint node: true */
const puppeteer = require('puppeteer');
const path = require('path');

const ROOT = path.join(__dirname, '..');   // scripts/ lives one level below the repo root

(async () => {
    "use strict";
    const browser = await puppeteer.launch({channel: 'chrome'}),
        page = await browser.newPage();
    await page.goto('http://localhost:3001?print', {waitUntil: 'networkidle2'});
    let margin = "0.33in";
    await page.pdf({
        path: path.join(ROOT, 'downloads/Evgeni_Gordeev_CV_html.pdf'),
        printBackground: true,
        preferCSSPageSize: true,
        format: 'Letter',
        scale: 0.95, // prevent spilling language skills to extra page
        margin: {
            top: margin,
            right: margin,
            bottom: margin,
            left: margin
        }
    });

    await browser.close();
})();
