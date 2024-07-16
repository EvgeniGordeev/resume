/*jshint esversion: 11 */
/*jshint node: true */
const puppeteer = require('puppeteer');

(async () => {
    "use strict";
    const browser = await puppeteer.launch(),
        page = await browser.newPage();
    await page.goto('http://localhost:3001?print', {waitUntil: 'networkidle2'});
    await page.addStyleTag(
        {
            content: 'div.print img.photo { width: 200px;}'
        }
    );
    let margin = "0.33in";
    await page.pdf({
        path: 'downloads/Evgeni_Gordeev_CV.pdf',
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
