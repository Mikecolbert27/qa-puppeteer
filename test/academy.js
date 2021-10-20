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
            devtools:true//有無需要開啟開發人員工具
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
        expect(afterSignUpurl).to.include('https://www.benq.academy/')//斷言:此page的url必須包含https://www.benq.academy/
        console.log("After Sign Up URL :",afterSignUpurl)
    })
    it('Take a training class ',async function(){
        await page.click('ul.nav-menu > li:nth-child(2) > a')
        await page.waitForTimeout(10000)//等待10000毫秒
        const trainedurl = await page.url()
        expect(trainedurl).to.include('/trained')//斷言:此page的url必須包含/trained
        await page.waitForTimeout(5000)//等待5000毫秒
        //等待課程列表出現
        await page.waitForSelector('#app')
        //等待AMS課程出現
        await page.waitForSelector('#app > div > div:nth-child(2) > ul > li:nth-child(12)')
        //點擊AMS的trained按鈕
        await page.waitForSelector('#app > div > div:nth-child(2) > ul > li:nth-child(12) > div:nth-child(2) > button')
        await page.click('#app > div > div:nth-child(2) > ul > li:nth-child(12) > div:nth-child(2) > button')
        await page.waitForTimeout(10000)//等待10000毫秒
        //斷言是否進入課程
        const trainedVideoUrl = await page.url()
        expect(trainedVideoUrl).to.include('/video')//斷言:此page的url必須包含/video
        expect(trainedVideoUrl).to.include('/QBMDQX')//斷言:此page的url是AMS的URL
        console.log("trainedVideo URL :",trainedVideoUrl)
        //等待課程播放器
        await page.waitForSelector('#youtubePlay')
        await page.click('#youtubePlay')
        //影片64000毫秒+等待跳轉至Certification頁面10000毫秒
        await page.waitForTimeout(75000)//等待75000毫秒
        const afterTrainedUrl = await page.url()
        expect(afterTrainedUrl).to.include('/trained/exam')//斷言:此page的url必須包含/trained/exam
        expect(afterTrainedUrl).to.include('/QBMDQX')//斷言:此page的url是AMS的URL
        console.log("After Trained URL :",afterTrainedUrl)
        await page.waitForTimeout(5000)//等待5000毫秒
    })
    it('Certification',async function(){
        await page.waitForSelector('#app')
        //Q1答題區
        await page.waitForSelector('#app > div > div.exam-box > div > div:nth-child(1) > div:nth-child(2)')
        //Q2答題區
        await page.waitForSelector('#app > div > div.exam-box > div > div:nth-child(2) > div:nth-child(2)')
        //Q3答題區
        await page.waitForSelector('#app > div > div.exam-box > div > div:nth-child(3) > div:nth-child(2)')
        //Q4答題區
        await page.waitForSelector('#app > div > div.exam-box > div > div:nth-child(4) > div:nth-child(2)')
        //Q5答題區
        await page.waitForSelector('#app > div > div.exam-box > div > div:nth-child(5) > div:nth-child(2)')


        
    })
    // it('Pass the test',async function(){
        
    // })
    // it('input first name & last name & company name on the form',async function(){
        
    // })
    // it('Get my Certification',async function(){
        
    // })
})
