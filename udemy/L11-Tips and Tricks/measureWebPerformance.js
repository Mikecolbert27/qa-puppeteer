const puppeteer = require('puppeteer');

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

    //execute navigation API within the page context
    const metrics = await page.evaluate(()=>JSON.stringify(window.performance));
    console.log(JSON.parse(metrics))
    
    await browser.close()
})()