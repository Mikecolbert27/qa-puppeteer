const puppeteer = require ('puppeteer');
describe('Smoke Test', ()=>{
    it('should load website' ,async function(){
        let browser = await puppeteer.launch(
            {
                headless:true,
                executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            }
        )
        let page = await browser.newPage()
        await page.setDefaultTimeout(300000)
        await page.goto('https://devexpress.github.io/testcafe/example/')
        await page.waitForSelector('#main-form')
        await browser.close()
    })
})