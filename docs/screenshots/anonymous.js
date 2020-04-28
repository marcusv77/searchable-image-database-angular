const puppeteer = require('puppeteer');

/*
Screen size

- Apple iPad Pro	iOS	12.9	32.8	2732	2048
- Dell XPS 13	Windows	13.3	33.8	1920	1080
- Google Pixel	Android	5.0	12.7	1080	1920
- Apple iPhone 4 (4, 4S)	iOS	3.5	8.9	640	960
- 
*/

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });
    await page.goto('http://localhost:8080/', {waitUntil: 'networkidle0'});
    await page.screenshot({path: 'anonymous-index.png'});
    await Promise.all([
        page.waitForNavigation({waitUntil: 'networkidle0'}),
        page.click('a[href="/about"]'),
      ]);
    await page.screenshot({path: 'anonymous-about.png'});
    await Promise.all([
        page.waitForSelector('a[href="/classification"]'),
        page.click('a#ClassificationDropdown'),
      ]);
    await Promise.all([
        page.waitForNavigation({waitUntil: 'networkidle0'}),
        page.click('a[href="/classification"]'),
      ]);
    await page.screenshot({path: 'anonymous-classification.png'});
    await Promise.all([
        page.waitForNavigation({waitUntil: 'networkidle0'}),
        page.click('a[href="/downloads"]'),
      ]);
    await page.screenshot({path: 'anonymous-downloads.png'});
    
    await browser.close();
})();
