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
    await page.pdf({
        path: 'downloads/Evgeni_Gordeev_CV.pdf',
        printBackground: true,
        preferCSSPageSize: true,
        // width: '1080px',
        format: 'Letter',
        margin: {
            top: "0.4in",
            right: "0.4in",
            bottom: "0.4in",
            left: "0.4in"
        }
    });

    await browser.close();
})();
