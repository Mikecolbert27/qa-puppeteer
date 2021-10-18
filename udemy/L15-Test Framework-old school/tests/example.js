const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const config = require('../lib/config.js')
const click = require('../lib/helpers').click
const typeText = require('../lib/helpers').typeText
const loadUrl = require('../lib/helpers').loadUrl
const getText = require('../lib/helpers').getText
const getCount = require('../lib/helpers').getCount
const waitForText = require('../lib/helpers').waitForText
const pressKey = require('../lib/helpers').pressKey
const shouldExist = require('../lib/helpers').shouldExist
const shouldNotExist = require('../lib/helpers').shouldNotExist

// const generateID = require('../lib/utils').generateID
// const generateEmail = require('../lib/utils').generateEmail
// const generateNumbers = require('../lib/utils').generateNumbers
const utils = require('../lib/utils')

describe('Puppeteer Basics',()=>{

    let browser
    let page

    beforeEach(async function(){
        browser = await puppeteer.launch({
            executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            //headless: false, //有無需要開視窗,false要開,true不開
            headless:config.isHeadless,
            //slowMo: 250, // slow down by 250ms
            slowMo:config.slowMo,
            //devtools:true //有無需要開啟開發人員工具
            devtools:config.isDevtools,
            timeout:config.launchTimeout
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(config.waitingTimeout)
        await page.setViewport({
            width:config.viewportWidth,
            height:config.viewportHeight
        })
    })
    afterEach(async function(){
        await browser.close()
    })
    it('my first test step ',async function(){
        await page.goto(config.baseUrl)
        // await loadUrl(page, config.baseUrl)
        // await page.waitForSelector('#hero-html-wrapper > div')
        await shouldExist(page,'#hero-html-wrapper > div')

        const url = await page.url()
        const title = await page.title()

        expect(url).to.contain('dev')
        expect(title).to.contains('Community')
    })
    it('browser reload', async()=>{
        // await page.goto('https://dev.to/')
        await page.goto(config.baseUrl)
        await page.reload()
        // await page.waitForSelector('#hero-html-wrapper > div')
        await shouldExist(page,'#hero-html-wrapper > div')

        await waitForText(page, 'body', 'Enter event portal')

        const url = await page.url()
        const title = await page.title()

        await page.waitForTimeout(3000)

        expect(url).to.contain('dev')
        expect(title).to.contains('Community')
    })
    it('click method',async()=>{
        await page.goto(config.baseUrl)
        // await loadUrl(page, config.baseUrl)
        // await page.waitForSelector('#write-link')
        // await page.click('#write-link')
        await click(page,"body > header > div > div.flex.items-center.h-100.ml-auto > a.crayons-btn:nth-child(2)")
        // await page.waitForSelector('#page-content-inner > section > div')
        await shouldExist(page,'#page-content-inner > section > div')
    })
    it('submit searchBox',async()=>{
        await page.goto(config.baseUrl)
        // await loadUrl(page, config.baseUrl)
        // await page.waitForSelector('#header-search > form > div > div > input')
        // await page.type('#header-search > form > div > div > input','Javascript')
        await typeText(page,"Javascript",'#header-search > form > div > div > input')
        await page.waitForTimeout(5000)
        // await page.keyboard.press('Enter')
        await pressKey(page, 'Enter')
        // await page.waitForSelector('#articles-list')
        await shouldExist(page,'#articles-list')
    })
    it('generate ID',async()=>{
        await page.goto(config.baseUrl)
        // await loadUrl(page, config.baseUrl)
        // await page.waitForSelector('#header-search > form > div > div > input')
        // await page.type('#header-search > form > div > div > input','Javascript')
        // await typeText(page,"Javascript",'#header-search > form > div > div > input')
        await typeText(page, utils.generateID(15),'#header-search > form > div > div > input')
        await page.waitForTimeout(5000)
        // await page.keyboard.press('Enter')
        await pressKey(page, 'Enter')
        // await page.waitForSelector('#articles-list')
        await shouldExist(page,'#articles-list')
    })
    it('generate email',async()=>{
        await page.goto(config.baseUrl)
        // await loadUrl(page, config.baseUrl)
        // await page.waitForSelector('#header-search > form > div > div > input')
        // await page.type('#header-search > form > div > div > input','Javascript')
        // await typeText(page,"Javascript",'#header-search > form > div > div > input')
        await typeText(page, utils.generateEmail(),'#header-search > form > div > div > input')
        await page.waitForTimeout(5000)
        // await page.keyboard.press('Enter')
        await pressKey(page, 'Enter')
        // await page.waitForSelector('#articles-list')
        await shouldExist(page,'#articles-list')
    })
    it('generate Numbers',async()=>{
        await page.goto(config.baseUrl)
        // await loadUrl(page, config.baseUrl)
        // await page.waitForSelector('#header-search > form > div > div > input')
        // await page.type('#header-search > form > div > div > input','Javascript')
        // await typeText(page,"Javascript",'#header-search > form > div > div > input')
        await typeText(page, utils.generateNumbers(),'#header-search > form > div > div > input')
        await page.waitForTimeout(5000)
        // await page.keyboard.press('Enter')
        await pressKey(page, 'Enter')
        // await page.waitForSelector('#articles-list')
        await shouldExist(page,'#articles-list')
    })
})
