const puppeteer = require('puppeteer')

describe('Device Emulations',()=>{
    let browser
    let page

    before(async function(){
        browser=await puppeteer.launch({
            executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless:false,//有無需要開視窗,false要開,true不開
            slowMo:10,// slow down by 10ms
            devtools:false//有無需要開啟開發人員工具
        })
        // page=await browser.newPage()
        const context = await browser.createIncognitoBrowserContext()//開啟無痕式視窗
        page=await context.newPage()
        
        await page.setDefaultTimeout(10000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation, page.waitForFunction, page.waitForFileChooser,page.waitForSelector等method的時間，預設是 30 秒
        await page.setDefaultNavigationTimeout(20000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation等method的時間，預設是 30 秒
    })
    after(async function(){
        await browser.close()
    })

    it('Destop Device Test',async function(){
        await page.setViewport({width:1650,height:1050})
        await page.goto('http://example.com/')
        await page.waitForTimeout(5000)//等待5000毫秒
    })
    it('Tablet Device Test',async function(){
        const tablet=puppeteer.devices['iPad landscape']
        await page.emulate(tablet)
        await page.goto('http://example.com/')
        await page.waitForTimeout(5000)//等待5000毫秒
    })

    it('Mobile Device Test',async function(){
        const mobile=puppeteer.devices['iPhone X']
        await page.emulate(mobile)
        await page.goto('http://example.com/')
        await page.waitForTimeout(5000)//等待5000毫秒
    })
})