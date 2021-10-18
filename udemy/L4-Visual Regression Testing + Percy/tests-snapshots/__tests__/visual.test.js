const puppeteer = require('puppeteer')
const chromium = require('chromium');
const {toMatchImageSnapshot}=require('jest-image-snapshot')

expect.extend({toMatchImageSnapshot})

describe('Visual Regression Testing',()=>{
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
    
    //整頁截圖
    test('Full Page Snapshot',async function(){
        await page.goto('https://www.example.com')
        await page.waitForSelector('h1')
        const image = await page.screenshot()
        expect(image).toMatchImageSnapshot({
            failureTresholdType:'pixel',
            failureTreshold:500
            //截圖和網站的誤差小於500pixel
        },100000)
    })
    //特定元素截圖
    test('Single Element Snapshot',async function(){
        await page.goto('https://www.example.com')
        const h1 = await page.waitForSelector('h1')
        const image = await h1.screenshot()
        expect(image).toMatchImageSnapshot({
            failureTresholdType:'percent',
            failureTreshold:0.01
            //截圖和網站的誤差小於0.01percent
        })
    },100000)//100000是指設定test時間
    //Mobile截圖
    test('Mobile Snapshot',async function(){
        await page.goto('https://www.example.com')
        await page.waitForSelector('h1')
        await page.emulate(puppeteer.devices['iPhone X'])
        const image = await page.screenshot()
        expect(image).toMatchImageSnapshot({
            failureTresholdType:'percent',
            failureTreshold:0.01
            //截圖和網站的誤差小於0.01percent
        })
    },100000)//100000是指設定test時間
    //Tablet截圖
    test('Tablet Snapshot',async function(){
        await page.goto('https://www.example.com')
        await page.waitForSelector('h1')
        await page.emulate(puppeteer.devices['iPad landscape'])
        const image = await page.screenshot()
        expect(image).toMatchImageSnapshot({
            failureTresholdType:'percent',
            failureTreshold:0.01
            //截圖和網站的誤差小於0.01percent
        })
    },100000)//100000是指設定test時間
    //Remove Element截圖
    test('Remove Element Before Snapshot',async function(){
        await page.goto('https://www.example.com')
        await page.evaluate(()=>{
            ;(document.querySelectorAll('h1')||[]).forEach(el=>el.remove())
        })
        await page.waitForTimeout(5000)
    },100000)//100000是指設定test時間
})