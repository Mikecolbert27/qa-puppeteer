const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const {click,getText,getCount,shouldNotExist,waitForText} = require('../lib/helper')

const generateEmailonAcademy = require('../lib/utils').generateEmailonAcademy

describe('BenQ Academy - Pass the test',()=>{
    let browser
    let page
    //Test Hooks:before, beforeEach, after, afterEach
    //before:每個test case執行之前先做的動作(page/browswer)
    before(async function(){
        browser=await puppeteer.launch({
            executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless:false,//無介面模式:有無需要開視窗,false要開,true不開
            slowMo:100,// slow down by 100ms
            //devtools:false//有無需要開啟開發人員工具
        })
        page=await browser.newPage()
        //設定像素
        await page.setViewport({width:1200,height:1000})

        await page.setDefaultTimeout(200000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation, page.waitForFunction, page.waitForFileChooser,page.waitForSelector等method的時間，預設是 30 秒
        await page.setDefaultNavigationTimeout(200000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation等method的時間，預設是 30 秒
    })
    //after:每個test case執行之後統一要做的動作(page/browswer)
    after(async function(){
        await browser.close()
    })
    // beforeEach(async function(){
    //     //Runs before each test steps(pre-step;像是登入)
    //     await page.goto('http://example.com/')
    // })
    //afterEach(async function(){
        //Runs after each test steps(所有test step執行完的步驟)
    //})

    it('Create a new account',async function(){
        await page.goto('https://www.benq.academy/register')
        await page.waitForSelector('form')
        //First name
        await page.type('form > div:nth-child(1) > div:nth-child(1) > input ','Celine',{delay:10})
        await page.waitForTimeout(100)//等待100毫秒
        //Last Name
        await page.type('form > div:nth-child(1) > div:nth-child(2) > input ','Test ',{delay:10})
        await page.waitForTimeout(100)//等待100毫秒
        //E-mail
        const testEmail = generateEmailonAcademy()
        await page.type('form > div:nth-child(2) > input ',testEmail,{delay:10})
        console.log("test email:",testEmail)
        await page.waitForTimeout(5000)
        //Company, school or organization name
        await page.type('#Workplace','Test By Celine',{delay:10})
        await page.waitForTimeout(100)//等待100毫秒
        //Profession(Teacher/Reseller/ITS)
        //選擇ITS
        await page.select('form > div:nth-child(4) > select', '3')
        // await selectITS.type('ITS');
        //Password
        await page.type('form > div:nth-child(5)  > input ','test123',{delay:10})
        await page.waitForTimeout(100)//等待100毫秒
        //Re-enter Password
        await page.type('form > div:nth-child(6) > input ','test123',{delay:10})
        await page.waitForTimeout(100)//等待100毫秒
        //點擊privace policy
        await page.click('form > div.text-xs > label > input',{clickCount:1})
        await page.waitForTimeout(5000)//等待5000毫秒
        //點擊submit
        await page.click('form > div.flex.justify-center > button')
        await page.waitForTimeout(10000)//等待10000毫秒
        //註冊完會自動導向至首頁
        const afterSignUpurl = await page.url()
        expect(afterSignUpurl).to.include('https://www.benq.academy/')//斷言:此page的url必須包含example.com
        console.log("After Sign Up URL :",afterSignUpurl)
    })
    // it('Take a training class ',async function(){
        
    // })
    // it('Certification',async function(){
        
    // })
    // it('Pass the test',async function(){
        
    // })
    // it('input first name & last name & company name on the form',async function(){
        
    // })
    // it('Get my Certification',async function(){
        
    // })
})
