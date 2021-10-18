const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('Payment Test',()=>{
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
        //先登入
        await page.goto('http://zero.webappsecurity.com/login.html')
        await page.waitForSelector('#login_form')
        await page.type('#user_login','username')
        await page.type('#user_password','password')
        await page.click('#user_remember_me','password')
        await page.click('input[type="submit"]')
    })
    //after:每個test case執行之後統一要做的動作(page/browswer)
    after(async function(){
        await browser.close()
    })
    //copy JS path
    it('Display Payment Form',async function(){
        await page.waitForSelector('#feedback')
        await page.click('.pay_bills_tab')
        await page.waitForSelector('.board')
    })
    it('Make Payment',async function(){
        await page.select('#sp_payee','Apple')
        await page.select('#sp_account','Savings')
        await page.type('#sp_amount','500')
        await page.type('#sp_date','2020-03-18')
        await page.keyboard.press('Enter')
        await page.type('#sp_description','Payment for rent.')
        await page.click('#sp_description')
        await page.waitForSelector('#alert_content')
    })
})