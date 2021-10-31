const puppeteer = require('puppeteer-core');
const expect = require('chai').expect;

const {click,getText,getCount,shouldNotExist,waitForText, shouldExist} = require('../lib/helper')

describe('BQA enus key Spec(Monitor)-Design Monitors Series',()=>{
    let browser
    let page
    before(async function(){
        browser=await puppeteer.launch({
            // executablePath:
            // "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            executablePath:
            "./node_modules/puppeteer/.local-chromium/win32-901912/chrome-win/chrome",
            headless:false,//有無需要開視窗,false要開,true不開
            slowMo:100,// slow down by 100ms
            devtools:false//有無需要開啟開發人員工具
        })
        page=await browser.newPage()
        await page.setDefaultTimeout(200000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation, page.waitForFunction, page.waitForFileChooser,page.waitForSelector等method的時間，預設是 30 秒
        await page.setDefaultNavigationTimeout(200000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation等method的時間，預設是 30 秒
    })
    after(async function(){
        await browser.close()
    })

    it('PD2705Q',async function(){
        await page.setViewport({width:1200,height:1000})
        await page.goto('https://www.benq.com/en-us/monitor/designer.html')
        await click(page,'#seriesproducts_copy > div.right > div.more > i')
        await page.waitForTimeout(1000)//等待1000毫秒

        const pd2705q = await getText(page, '#seriesproducts_copy > div.right > ul.products > ul > li:nth-child(1) > a > div.b2c-product-card-title')
        expect(pd2705q).to.be.a('string','PD2705Q')
        console.log("Product:",pd2705q)
        const pd2705qSize = await getText(page, '#seriesproducts_copy > div.right > ul.products > ul > li:nth-child(1) > div.b2c-product-card-key-specs-area > div:nth-child(1) > p')
        expect(pd2705qSize).to.be.a('string','27"')
        console.log("pd2705q LCD Size (inch):",pd2705qSize)
        const pd2705qResolution = await getText(page, '#seriesproducts_copy > div.right > ul.products > ul > li:nth-child(1) > div.b2c-product-card-key-specs-area > div:nth-child(2) > p')
        expect(pd2705qResolution).to.be.a('string','QHD')
        console.log("pd2705q Resolution:",pd2705qResolution)
        const pd2705qFeature = await getText(page, '#seriesproducts_copy > div.right > ul.products > ul > li:nth-child(1) > div.b2c-product-card-key-specs-area > div:nth-child(3) > p')
        expect(pd2705qFeature).to.be.a('string','IPS')
        console.log("pd2705q Feature:",pd2705qFeature)
    })
    it('PD2700U',async function(){
        const pd2700u = await getText(page, '#seriesproducts_copy > div.right > ul.products > ul > li:nth-child(2) > a > div.b2c-product-card-title')
        expect(pd2700u).to.be.a('string','PD2700U ')
        console.log("Product:",pd2700u)
        const pd2700uSize = await getText(page, '#seriesproducts_copy > div.right > ul.products > ul > li:nth-child(2) > div.b2c-product-card-key-specs-area > div:nth-child(1) > p')
        expect(pd2700uSize).to.be.a('string','27"')
        console.log("pd2700u LCD Size (inch):",pd2700uSize)
        const pd2700uResolution = await getText(page, '#seriesproducts_copy > div.right > ul.products > ul > li:nth-child(2) > div.b2c-product-card-key-specs-area > div:nth-child(2) > p')
        expect(pd2700uResolution).to.be.a('string','UHD')
        console.log("pd2700u Resolution:",pd2700uResolution)
        const pd2700uFeature = await getText(page, '#seriesproducts_copy > div.right > ul.products > ul > li:nth-child(2) > div.b2c-product-card-key-specs-area > div:nth-child(3) > p')
        expect(pd2700uFeature).to.be.a('string','IPS')
        console.log("pd2700u Feature:",pd2700uFeature)
    })
})
describe('BQA enus key Spec(Monitor)-Photo-Editing Monitors Series',()=>{
    let browser
    let page
    before(async function(){
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
    after(async function(){
        await browser.close()
    })

    it('SW321C ',async function(){
        await page.setViewport({width:1200,height:1000})
        await page.goto('https://www.benq.com/en-us/monitor/photographer.html')
        await click(page,'#seriesproducts > div.right > div.more > i')
        await page.waitForTimeout(1000)//等待1000毫秒

        const sw321c = await getText(page, '#seriesproducts > div.right > ul.products > ul > li:nth-child(1) > a > div.b2c-product-card-title')
        expect(sw321c).to.be.a('string','SW321C ')
        console.log("Product:",sw321c)
        const sw321cSize = await getText(page, '#seriesproducts > div.right > ul.products > ul > li:nth-child(1) > div.b2c-product-card-key-specs-area > div:nth-child(1) > p')
        expect( sw321cSize).to.be.a('string','27"')
        console.log(" sw321c LCD Size (inch):", sw321cSize)
        const  sw321cResolution = await getText(page, '#seriesproducts > div.right > ul.products > ul > li:nth-child(1) > div.b2c-product-card-key-specs-area > div:nth-child(2) > p')
        console.log(" sw321c Resolution:", sw321cResolution)
        expect( sw321cResolution).to.be.a('string','UHD')
        const  sw321cFeature = await getText(page, '#seriesproducts > div.right > ul.products > ul > li:nth-child(1) > div.b2c-product-card-key-specs-area > div:nth-child(3) > p')
        console.log(" sw321c Feature:", sw321cFeature)
        expect( sw321cFeature).to.be.a('string','IPS')
    })
    it('SW271C ',async function(){
        const sw271c = await getText(page, '#seriesproducts > div.right > ul.products > ul > li:nth-child(2) > a > div.b2c-product-card-title')
        expect(sw271c).to.be.a('string','SW271C ')
        console.log("Product:",sw271c)
        const sw271cSize = await getText(page, '#seriesproducts > div.right > ul.products > ul > li:nth-child(2) > div.b2c-product-card-key-specs-area > div:nth-child(1) > p')
        expect(sw271cSize).to.be.a('string','27"')
        console.log("sw271c LCD Size (inch):",sw271cSize)
        const sw271cResolution = await getText(page, '#seriesproducts > div.right > ul.products > ul > li:nth-child(2) > div.b2c-product-card-key-specs-area > div:nth-child(2) > p')
        expect(sw271cResolution).to.be.a('string','UHD')
        console.log("sw271c Resolution:",sw271cResolution)
        const sw271cFeature = await getText(page, '#seriesproducts > div.right > ul.products > ul > li:nth-child(2) > div.b2c-product-card-key-specs-area > div:nth-child(3) > p')
        expect(sw271cFeature).to.be.a('string','IPS')
        console.log("sw271c Feature:",sw271cFeature)
    })
})
