const puppeteer = require('puppeteer');
const devices = puppeteer.devices['iPhone X'];


(async()=>{
    const browser = await puppeteer.launch(
        {
            headless:false,
            executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        }
    )
    const page = await browser.newPage()
    await page.emulate(devices)
    await page.goto('https://www.benq.com/en-us/index.html')
    await page.waitForTimeout(10000)
    await browser.close()
})()