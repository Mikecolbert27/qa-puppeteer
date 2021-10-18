const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('E2E test- Login Test',()=>{
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
        await page.setDefaultTimeout(100000)//頁面導向,功能等等的時間限制,如果沒特別限制,每個動作puppeteer依照package.json上的設定好的時間
        await page.setDefaultNavigationTimeout(200000)//頁面導向時間限制,每個動作puppeteer依照package.json上的設定好的時間
    })
    //after:每個test case執行之後統一要做的動作(page/browswer)
    after(async function(){
        await browser.close()
    })
    //copy JS path
    it('Login Test - Invalid Credentials',async function(){
        await page.setViewport({width:1709,height:1133})
        await page.goto('https://g5-staging64.benq.com/en-us/index.html')
        await page.waitForSelector('body > header > aside.line-1 > aside > nav > div.right-wrapper > div.log_area > a')
        await page.click('body > header > aside.line-1 > aside > nav > div.right-wrapper > div.log_area > a')
        await page.waitForSelector('#AccountLogin')
        await page.type('#userName','invalidcred@gmail.com')
        await page.type('#password','invalidpassword')
        await page.click('#login')
        await page.waitForSelector('#AccountLogin > div.form_item.invalid')
      })
      it('Login Test - Valid Credentials',async function(){
        await page.setViewport({width:1709,height:1133})
        await page.goto('https://g5-staging64.benq.com/en-us/index.html')
        await page.waitForSelector('body > header > aside.line-1 > aside > nav > div.right-wrapper > div.log_area > a')
        await page.click('body > header > aside.line-1 > aside > nav > div.right-wrapper > div.log_area > a')
        await page.waitForSelector('#AccountLogin')
        await page.type('#userName','celinesoftware@gmail.com')
        await page.type('#password','baibai1005')
        await page.click('#login')
        await page.waitForSelector('#loginName')
      })
})

