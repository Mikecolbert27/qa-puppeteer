const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const {click,getText,getCount,shouldNotExist,waitForText} = require('../lib/helper')

describe('BQE Nordic EC Order Process - guest',()=>{
    let browser
    let page
    //Test Hooks:before, beforeEach, after, afterEach
    //before:每個test case執行之前先做的動作(page/browswer)
    before(async function(){
        browser=await puppeteer.launch({
            executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless:false,//有無需要開視窗,false要開,true不開
            //slowMo:100,// slow down by 100ms
            devtools:false//有無需要開啟開發人員工具
        })
        page=await browser.newPage()
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


    it('Guest Checkout',async function(){
        //Product Page
        await page.setViewport({width:1200,height:577})
        await page.goto('https://shoptest.benq.eu/sc-buy/fk1mouse-zowie.html')
        await click(page,'#product-addtocart-button')
        //Cart Page
        await shouldNotExist(page,'#product-addtocart-button')
        await page.waitForSelector('#maincontent')
        var text = await getText(page, '#maincontent > div.page-title-wrapper > div > h1 > span')
        expect(text).to.be.a('string','Shopping Cart')
        var text = await getText(page, '#maincontent > div.page.messages > div:nth-child(2) > div > div')
        expect(text).to.be.a('string','You added BenQ ZOWIE FK1 Gaming Mouse BLACK to your shopping cart.')
        var text = await getText(page, '#shopping-cart-table > tbody > tr > td.col.item > div > strong > a')
        expect(text).to.be.a('string','BenQ ZOWIE FK1 Gaming Mouse BLACK')
        await click(page,'#maincontent > div.columns > div > div.cart-summary > ul > li:nth-child(3) > button')
        


        //Shipping Page
        var text = await getText(page, '#checkout > ul > li.opc-progress-bar-item._active > span')
        expect(text).to.be.a('string','Shipping')
        await page.type('#customer-email','a4521005@outlook.com',{delay:10})//在email欄位輸入非會員email
        await page.waitForTimeout(100)//等待100毫秒
        await page.type('#shipping-new-address-form > div:nth-child(1) > div > input','Celine',{delay:10})//在first name欄位輸入收件人first name
        await page.waitForTimeout(100)//等待100毫秒

        await page.type('#shipping-new-address-form > div:nth-child(2) > div > input','Chiu',{delay:10})//在last name欄位輸入收件人last name
        //await page.select('#shipping-new-address-form > div:nth-child(6) > div > select','Sweden')//在Country of residence欄位選擇Sweden/Denmark/Finland
        //await page.waitForSelector('#shipping-new-address-form > div:nth-child(6) > div > div > div')
        //await page.select('select[name="country_id"]', 'Sweden');
        const selectElem = await page.$('select[name="country_id"]');
        await selectElem.type('Sweden');
        var text = await getText(page, '#shipping-new-address-form > div:nth-child(6) > div > div > div')
        expect(text).to.be.a('string','Shipment via Schenker. Note: Your Package will be Delivered to the Closest Schenker Access Point.')//若選擇Sweden會出現Schenker Access Point提示訊息
        await page.type('#shipping-new-address-form > fieldset > div > div > div > input','address',{delay:10})//在street address欄位輸入address
        await page.waitForTimeout(1000)//等待100毫秒
        await page.type('#shipping-new-address-form > div:nth-child(8) > div > input','city',{delay:10})//在city欄位輸入city
        await page.waitForTimeout(1000)//等待100毫秒
        await page.type('#shipping-new-address-form > div:nth-child(11) > div > input','111',{delay:10})//在zip code欄位輸入zip code
        await page.waitForTimeout(1000)//等待100毫秒
        await page.type('#shipping-new-address-form > div:nth-child(12) > div > input','886929861005',{delay:10})//在Phone Number欄位輸入Phone Number
        await page.waitForTimeout(10000)//等待5000毫秒
        await page.waitForSelector('#opc-sidebar > div.opc-block-summary')
        //取得price, shipping, tax的文字
        const cartSubtotalText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals.sub > td > span')
        // await waitForText(page,'#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals.shipping.excl > td > span',"EUR ")
        const shippingText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals.shipping.excl > td > span')
        const taxText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals-tax > td > span')
        const orderTotalText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.grand.totals > td > strong > span')
        //去除EUR 
        const cartSubtotalNum = cartSubtotalText.replace("EUR ","")
        const shippingOnlyNum = shippingText.replace("EUR ","")
        const taxOnlyNum = await taxText.replace("EUR ","")
        const orderTotalNum = await orderTotalText.replace("EUR ","")
        //將字串轉換成數字
        const cartSubtotal = parseInt(cartSubtotalNum)
        const shipping = parseInt(shippingOnlyNum)
        const tax = parseInt(taxOnlyNum)
        const orderTotal = parseInt(orderTotalNum)
        console.log('cartSubtotal:',cartSubtotal)
        console.log('shipping:',shipping)
        console.log('tax:',tax)
        console.log('orderTotal:',orderTotal)
        //確認total information上的金額
        const totalActual = cartSubtotal+shipping+tax
        const taxRate = 0.25
        const taxActual = cartSubtotal*taxRate
        console.log('totalActual:',totalActual)//實際計算(應得)的數字
        console.log('taxActual:',taxActual)//實際計算(應得)的數字
        //確認total information和實際計算(應得)的數字是否相同
        expect(tax).to.equal(taxActual)
        expect(orderTotal).to.equal(totalActual)
        await click(page,'#next-step-trigger')
        
        //Payment Page
        
      })

    
})
