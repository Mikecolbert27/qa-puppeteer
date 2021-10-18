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
    await page.pdf({path: "benq-b2c.pdf", format:"a4"})
    await browser.close()
})()