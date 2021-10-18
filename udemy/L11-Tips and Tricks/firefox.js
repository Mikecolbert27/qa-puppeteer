const puppeteer = require('puppeteer-firefox');
//目前已無維護
(async()=>{
    const browser = await puppeteer.launch(
        {
            headless:false,
            executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        }
    )
    const page = await browser.newPage()

    await page.goto('https://www.benq.com/en-us/index.html')
    await page.waitForSelector('body')

    await page.waitForTimeout(5000)
    
    await browser.close()
})()