const puppeteer = require('puppeteer');

(async()=>{
    const browser = await puppeteer.launch(
        {
            headless:false,
            executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        }
    )
    const context = await browser.createIncognitoBrowserContext()
    const page = await context.newPage()

    await page.goto('https://www.benq.com/en-us/index.html')
    await page.waitForSelector('body')
    await page.waitForTimeout(10000)
    await browser.close()
})()