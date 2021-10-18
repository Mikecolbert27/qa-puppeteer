const puppeteer = require ('puppeteer');

describe('E2E test',()=>{
    let browser
    let page

    before(async function(){
        browser = await puppeteer.launch(
            {
                headless:true,
                executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            }
        )
        page=await browser.newPage()
        await page.setDefaultTimeout(10000)
    })

    after(async function(){
        await browser.close()
    })

    it('E2E test',async function(){
        await page.goto('https://devexpress.github.io/testcafe/example/')
        await page.waitForSelector('#main-form')
        await page.type('#developer-name','hi')
        await page.click('#tried-test-cafe')
        await page.click('#submit-button')
        await page.waitForSelector('#article-header')
    })

    it('should select value from select box',async function(){
        await page.goto('https://devexpress.github.io/testcafe/example/')
        await page.waitForSelector('#main-form')
        await page.select('#preferred-interface','JavaScript API')
    })
})