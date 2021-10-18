const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const {click,getText,getCount,shouldNotExist,waitForText} = require('../lib/helper')

describe('GA View Check',()=>{
    let browser
    let page
    //Test Hooks:before, beforeEach, after, afterEach
    //before:每個test case執行之前先做的動作(page/browswer)
    // before(async function(){
    //     browser=await puppeteer.launch({
    //         executablePath:
    //         "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    //         headless:false,//有無需要開視窗,false要開,true不開
    //         //slowMo:100,// slow down by 100ms
    //         devtools:false//有無需要開啟開發人員工具
    //     })
    //     page=await browser.newPage()
    //     await page.setDefaultTimeout(200000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation, page.waitForFunction, page.waitForFileChooser,page.waitForSelector等method的時間，預設是 30 秒
    //     await page.setDefaultNavigationTimeout(200000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation等method的時間，預設是 30 秒
    // })
    //after:每個test case執行之後統一要做的動作(page/browswer)
    // after(async function(){
    //     await browser.close()
    // })
    beforeEach(async function(){
        browser=await puppeteer.launch({
            executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless:false,//有無需要開視窗,false要開,true不開
            slowMo:100,// slow down by 100ms
            devtools:false//有無需要開啟開發人員工具
        })
        page=await browser.newPage()
        await page.setDefaultTimeout(200000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation, page.waitForFunction, page.waitForFileChooser,page.waitForSelector等method的時間，預設是 30 秒
        await page.setDefaultNavigationTimeout(200000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation等method的時間，預設是 30 秒
    })
    afterEach(async function(){
        // Runs after each test steps(所有test step執行完的步驟)
        await browser.close()
    })


    it('club-lang',async function(){
        await page.setViewport({width:1200,height:1000})
        //club-lang會員中心
        await page.goto('https://g5-staging64.benq.eu/en-eu/index.html')
        await page.waitForTimeout(5000)//等待5000毫秒
        await page.click('#btn_close')
        await page.waitForTimeout(1000)//等待1000毫秒
        await page.waitForSelector('body > header > aside.line-1 > aside > nav > div.right-wrapper > div.log_area > a')
        await page.click('body > header > aside.line-1 > aside > nav > div.right-wrapper > div.log_area > a')
        await page.waitForSelector('#AccountLogin')
        const clublangurl = await page.url()
        console.log(clublangurl)
        expect(clublangurl).to.include('lang=en-eu')
    })
    it('Business',async function(){
        await page.setViewport({width:1200,height:1000})
        //B2C上面的Business是否為該國家的B2B網站
        await page.goto('https://g5-staging64.benq.eu/en-eu/index.html')
        await page.waitForTimeout(5000)//等待5000毫秒
        await page.click('#btn_close')
        await page.waitForTimeout(1000)//等待1000毫秒
        await page.waitForSelector('body > header > aside.line-1 > aside > nav > div.left-wrapper > a:nth-child(1)')
        await page.click('body > header > aside.line-1 > aside > nav > div.left-wrapper > a:nth-child(1)')
        //await page.waitForSelector('body > div.b2b-site.en-eu > header > div > div:nth-child(2) > nav > a.logo')
        const businessurl = await page.url()
        console.log(businessurl)
        expect(businessurl).to.include('en-eu')
    })
})
