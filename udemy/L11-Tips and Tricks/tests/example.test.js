import puppeteer from 'puppeteer';
import Homepage from "./homePage.js";

describe('mocha step test',()=>{
    let browser
    let page

    before(async()=>{
        browser = await puppeteer.launch(
            {
                headless:false,
                executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            }
        )
        page = await browser.newPage();
        await page.setDefaultTimeout(20000)
    })

    after(async()=>{
        await browser.close()
    })

    step('Loads Homepage', async()=>{
        const homepage = new Homepage(page)
        // await this.page.goto('https://www.benq.com/en-us/index.html')
        await homepage.visit()
    })
    step('step 2 ', async()=>{
        await page.waitForSelector("#fail")
    })

    step('step 3 ', async()=>{
        await page.waitForSelector("#fail")
    })
})