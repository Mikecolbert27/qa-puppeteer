const puppeteer = require('puppeteer')
const {percySnapshot}=require('@percy/puppeteer')

describe('Percy Visual Test',()=>{
    let browser
    let page

    beforeAll(async function(){
        browser=await puppeteer.launch({
            executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless:false,//有無需要開視窗,false要開,true不開
            //slowMo:100,// slow down by 100ms
            devtools:false//有無需要開啟開發人員工具
        })
        page=await browser.newPage()
        await page.setViewport({width:1200,height:1000})
    })
    afterAll(async function(){
        await browser.close()
    })
    // test('example', async () => {
    //     ...
    //   }, 1000); // timeout of 1s (default is 5s)
    test('Full Page Percy SnapShot',async()=>{
        await page.goto('https://example.com')
        await page.waitForTimeout(1000)
        await percySnapshot(Page, 'Example Page')
    })
})