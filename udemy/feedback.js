const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('Feedback Test',()=>{
    let browser
    let page
    //before:每個test case執行之前先做的動作(page/browswer)
    before(async function(){
        browser=await puppeteer.launch({
            executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless:false,//有無需要開視窗,false要開,true不開
            slowMo:10,// slow down by 10ms
            devtools:false//有無需要開啟開發人員工具
        })
        page=await browser.newPage()
        await page.setDefaultTimeout(10000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation, page.waitForFunction, page.waitForFileChooser,page.waitForSelector等method的時間，預設是 30 秒
        await page.setDefaultNavigationTimeout(20000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation等method的時間，預設是 30 秒
    })
    //after:每個test case執行之後統一要做的動作(page/browswer)
    after(async function(){
        await browser.close()
    })
    //copy JS path
    it('Display Feedback Form',async function(){
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#feedback')
        await page.click('#feedback')
    })
    it('Submit Feedback Form',async function(){
        await page.waitForSelector('form')
        await page.type('#name','test test')
        await page.type('#email','test@gmail.com')
        await page.type('#subject','test')
        await page.type('#comment','hbmwprbmhwrpibm')
        await page.click('input[type="submit"]')
    })
    it('Display Result Page',async function(){
        await page.waitForSelector('#feedback-title')
        const url = await page.url()
        expect(url).to.include('/sendFeedback.html')
    })

})