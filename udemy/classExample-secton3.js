const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const {click,getText,getCount,shouldNotExist} = require('../lib/helper')



describe('Advanced Puppeteer Automation',()=>{
    let browser
    let page
    //Test Hooks:before, beforeEach, after, afterEach
    //before:每個test case執行之前先做的動作(page/browswer)
    before(async function(){
        browser=await puppeteer.launch({
            executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless:false,//有無需要開視窗,false要開,true不開
            slowMo:110,// slow down by 110ms
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
    beforeEach(async function(){
        //Runs before each test steps(pre-step;像是登入)
        await page.goto('http://example.com/')
    })
    //afterEach(async function(){
        //Runs after each test steps(所有test step執行完的步驟)
    //})


    it('Element not exist',async function(){
        await page.goto('http://example.com/')
        await page.waitForXPath('//h1')
        const title = await page.title()
        const url = await page.url()
        // const text = await page.$eval('h1',element => element.textContent)//等待頁面上h1元素出現, $eval是只取得一個元素(querySelector)
        // const count = await page.$$eval('p',element => element.length)//等待頁面上所有的p元素出現, $$eval是取得所有的元素(querySelectorAll)
        const text = await getText(page, 'h1')
        const count = await getCount(page, 'p')


        expect(title).to.be.a('string','Example Domain')//斷言:此page的title必須為Example Domain
        expect(url).to.include('example.com')//斷言:此page的url必須包含example.com
        expect(text).to.be.a('string','Example Domain')//斷言:h1內容必須為Example Domain
        expect(count).to.equal(2)//斷言:此page的p元素的數目必須為2
        //按下sign in button以後是否消失
        await page.goto('http://zero.webappsecurity.com/index.html')
        //await page.waitForSelector('#signin_button')
        //await page.click('#signin_button')
        //await page.waitFor(()=> !document.querySelector('#signin_button'))//按下#signin_button以後, #signin_button是否消失
        await click(page,'#signin_button')
        // await page.waitForSelector('#signin_button',{
        //     hidden:true, 
        //     timeout:30000
        // })//等待#signin_button隱藏的時間是否在3000毫秒內
        await shouldNotExist(page,'#signin_button')
      })

    
})
