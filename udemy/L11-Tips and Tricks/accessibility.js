const puppeteer = require('puppeteer');

(async()=>{
    //accessibility test
    const browser = await puppeteer.launch(
        {
            headless:false,
            executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        }
    )
    const page = await browser.newPage()

    await page.goto('https://www.benq.com/en-us/index.html')
    await page.waitForSelector('body')

    const snapshot = await page.accessibility.snapshot()
    console.log(snapshot)
    
    await browser.close()
})()