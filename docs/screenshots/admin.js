const puppeteer = require('puppeteer-extra');
puppeteer.use(require('puppeteer-extra-plugin-angular')());

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
    await page.navigateUntilReady('http://localhost:8080/');
    await page.screenshot({path: 'index.png'});
    await page.clickIfExists('a[data-target="#modal-login"');
    await page.screenshot({path: 'login.png'});
    
    await browser.close();
})();
