const puppeteer = require('puppeteer');

(async()=>{
    const browser = await puppeteer.launch(
        {
            headless:false,
            executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        }
    )
    const page = await browser.newPage()

    await page.goto('https://www.benq.com/en-us/index.html', {waitUntil:"networkidle0"})
    await page.screenshot({path: "benq-b2c.png", fullPage:true})
    await browser.close()
})()