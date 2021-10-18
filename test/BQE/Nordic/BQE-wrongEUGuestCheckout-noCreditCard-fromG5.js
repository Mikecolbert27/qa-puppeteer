const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const {click,getText,getCount,shouldNotExist,waitForText} = require('../lib/helper')

describe('BQE Nordic EC Order Process - Guest',()=>{
    let browser
    let page
    //Test Hooks:before, beforeEach, after, afterEach
    //before:每個test case執行之前先做的動作(page/browswer)
    before(async function(){
        browser=await puppeteer.launch({
            // executablePath:
            // "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless:false,//有無需要開視窗,false要開,true不開
            //slowMo:100,// slow down by 100ms
            //devtools:false//有無需要開啟開發人員工具
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

    it('Member Checkout Test',async function(){
        //設定像素
        await page.setViewport({width:1200,height:1000})
        //設定使用者代理
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
        //Product Page
        await page.goto('https://shop.benq.eu/eu-buy/ex3501r.html')
        await page.waitForResponse(response => response.status() === 200)
        await page.click('body > div.modals-wrapper > aside.modal-popup.benq_cookiebar_modal.modal-slide._inner-scroll._show > div.modal-inner-wrap > footer > button.close-button')
        await page.waitForTimeout(5000)//等待5000毫秒
        await page.click('#product-addtocart-button')

        //Cart Page
        await shouldNotExist(page,'#product-addtocart-button')
        await shouldNotExist(page,'#maincontent > div.page.messages > div:nth-child(2) > div > div')
        await page.waitForSelector('#maincontent > div.page.messages > div:nth-child(2) > div > div > div')
        var text = await getText(page, '#maincontent > div.page-title-wrapper > div > h1 > span')
        expect(text).to.be.a('string','Shopping Cart')
        await page.waitForTimeout(10000)//等待10000毫秒
        await page.click('#shopping-cart-table > tbody > tr > td.col.qty > div > div > div > button.increaseQty-cart-item')//增加商品
        await page.waitForTimeout(10000)//等待10000毫秒
        await page.waitForSelector('#shopping-cart-table > tbody > tr > td.col.qty > div > div > span.input-text-qty')//qty更新
        var qty = await getText(page, '#shopping-cart-table > tbody > tr > td.col.qty > div > div > span.input-text-qty')
        expect(qty).to.be.a('string','2')
        await page.waitForSelector('#maincontent > div.columns > div > div.cart-summary > ul > li:nth-child(3) > button')//Guest Checkout
        await page.click('#maincontent > div.columns > div > div.cart-summary > ul > li:nth-child(3) > button')//Guest Checkout
        await shouldNotExist(page,'#maincontent > div.columns > div > div.cart-summary > ul > li:nth-child(3) > button')//Guest Checkout

        // Shipping Page
        var text = await getText(page, '#shipping > div.step-title > div')
        expect(text).to.be.a('string','Shipping Address')
        await page.waitForSelector('#shipping')
        await page.waitForTimeout(10000)//等待10000毫秒
        await page.type('#customer-email','a4521005@outlook.com',{delay:10})//在email欄位輸入非會員email
        await page.waitForTimeout(100)//等待100毫秒
        await page.type('#shipping-new-address-form > div:nth-child(1) > div > input','Celine',{delay:10})//在first name欄位輸入收件人first name
        await page.waitForTimeout(100)//等待100毫秒
        await page.type('#shipping-new-address-form > div:nth-child(2) > div > input','Chiu',{delay:10})//在last name欄位輸入收件人last name
        //await page.select('select[name="country_id"]', 'Sweden');
        const selectSweden = await page.$('select[name="country_id"]');
        await selectSweden.type('Austria');
        await page.waitForTimeout(5000)//等待5000毫秒
        await page.type('#shipping-new-address-form > fieldset > div > div > div > input','address',{delay:10})//在street address欄位輸入address
        await page.waitForTimeout(10000)//等待10000毫秒
        await page.keyboard.press('Enter')
        await page.waitForSelector('#shipping-new-address-form > div:nth-child(8)')
        await page.type('#shipping-new-address-form > div:nth-child(8) > div > input','city',{delay:10})//在city欄位輸入city
        await page.waitForTimeout(3000)//等待3000毫秒
        const selectBurgenland = await page.$('select[name="region_id"]');
        await selectBurgenland.type('Burgenland');
        await page.waitForTimeout(5000)//等待5000毫秒
        await page.type('#shipping-new-address-form > div:nth-child(11) > div > input','2413',{delay:10})//在zip code欄位輸入zip code
        await page.waitForTimeout(5000)//等待5000毫秒//捷克會辨認郵遞區號所以要等久一點
        await page.type('#shipping-new-address-form > div:nth-child(12) > div > input','886929861005',{delay:10})//在Phone Number欄位輸入Phone Number
        await page.waitForTimeout(5000)//等待5000毫秒
        await page.waitForSelector('#opc-sidebar > div.opc-block-summary')
        await page.waitForTimeout(15000)//等待15000毫秒
        //取得price, shipping, tax的文字
        const shippingCartSubtotalText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals.sub > td > span')
        const shippingShippingText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals.shipping.excl > td > span')
        const shippingTaxText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals-tax > td > span')
        const shippingOrderTotalText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.grand.totals > td > strong > span')
        //去除EUR 
        const shippingCartSubtotalNum = shippingCartSubtotalText.replace("EUR ","")
        const shippingShippingOnlyNum = shippingShippingText.replace("EUR ","")
        const shippingTaxOnlyNum = await shippingTaxText.replace("EUR ","")
        const shippingOrderTotalNum = await shippingOrderTotalText.replace("EUR ","")
        //將字串轉換成數字
        const shippingCartSubtotal = parseInt(shippingCartSubtotalNum)
        const shippingShipping = parseInt(shippingShippingOnlyNum )
        const shippingTax = parseInt(shippingTaxOnlyNum)
        const shippingOrderTotal = parseInt(shippingOrderTotalNum )
        console.log('cartSubtotal(Shipping Page):',shippingCartSubtotal)
        console.log('shipping(Shipping Page):',shippingShipping)
        console.log('tax(Shipping Page):',shippingTax )
        console.log('orderTotal(Shipping Page):',shippingOrderTotal)
        //確認total information上的金額
        const shippingTotalActual = shippingCartSubtotal+shippingShipping+shippingTax
        const shippingTaxRate = 0.2 //奧地利稅率
        const shippingCartSubtotalAndShipping = shippingCartSubtotal+shippingShipping
        const shippingTaxActual = shippingCartSubtotalAndShipping*shippingTaxRate
        console.log('totalActual(Shipping Page):',shippingTotalActual)//實際計算(應得)的數字
        console.log('taxActual(Shipping Page):',shippingTaxActual)//實際計算(應得)的數字
        //確認total information和實際計算(應得)的數字是否相同
        expect(shippingTax).to.equal(shippingTaxActual)
        expect(shippingOrderTotal).to.equal(shippingTotalActual)
        await page.waitForTimeout(10000)//等待10000毫秒
        await click(page,'#next-step-trigger')
        await shouldNotExist(page,'#next-step-trigger')

        //Payment Page
        await page.waitForSelector('#co-payment-form > fieldset > legend > span')
        await page.waitForSelector('#co-payment-form > fieldset > div.shipping-information')
        await page.waitForTimeout(5000)//等待5000毫秒
        await page.waitForSelector('#opc-sidebar > div.opc-block-summary')
        //取得price, shipping, tax的文字
        const paymentCartSubtotalText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals.sub > td > span')
        const paymentShippingText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals.shipping.excl > td > span')
        const paymentTaxText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals-tax > td > span')
        const paymentOrderTotalText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.grand.totals > td > strong > span')
        //去除EUR 
        const paymentCartSubtotalNumIncludeComma = paymentCartSubtotalText.replace("EUR ","")
        const paymentShippingOnlyNumIncludeComma = paymentShippingText.replace("EUR ","")
        const paymentTaxOnlyNumIncludeComma = paymentTaxText.replace("EUR ","")
        const paymentOrderTotalNumIncludeComma = paymentOrderTotalText.replace("EUR ","")
        //去除逗號 
        function clear(str) { 
            str = str.replace(/,/g, "");//取消字串中出現的所有逗號 
            return str; 
        } 
        const paymentCartSubtotalNum = clear(paymentCartSubtotalNumIncludeComma)
        const paymentShippingOnlyNum = clear(paymentShippingOnlyNumIncludeComma)
        const paymentTaxOnlyNum = clear(paymentTaxOnlyNumIncludeComma)
        const paymentOrderTotalNum = clear(paymentOrderTotalNumIncludeComma)
        //將字串轉換成數字
        const paymentCartSubtotal = parseFloat(paymentCartSubtotalNum)
        const paymentShipping = parseFloat(paymentShippingOnlyNum)
        const paymentTax = parseFloat(paymentTaxOnlyNum )
        const paymentOrderTotal = parseFloat(paymentOrderTotalNum )
        console.log('cartSubtotal(Payment Page):',paymentCartSubtotal)
        console.log('shipping(Payment Page):',paymentShipping)
        console.log('tax(Payment Page):',paymentTax )
        console.log('orderTotal(Payment Page):',paymentOrderTotal)
        //確認total information上的金額
        const paymentOrderTotalActual = paymentCartSubtotal+paymentShipping+paymentTax
        const paymentTaxRate = 0.2 //奧地利稅率
        const paymentCartSubtotalAndShipping = paymentCartSubtotal+paymentShipping
        const paymentTaxActualUnfixed = paymentCartSubtotalAndShipping*paymentTaxRate
        const paymentTaxActualFixed = paymentTaxActualUnfixed.toFixed(2)//四捨五入取到小數點第二位
        const paymentTaxActual= parseFloat(paymentTaxActualFixed)//因為toFixed(2)回傳的是字串
        console.log('totalActual(Payment Page):',paymentOrderTotalActual)//實際計算(應得)的數字
        console.log('taxActual(Payment Page):',paymentTaxActual)//實際計算(應得)的數字
        //確認total information和實際計算(應得)的數字是否相同
        expect(paymentOrderTotal).to.equal(paymentOrderTotalActual)
        expect(paymentTax).to.equal(paymentTaxActual)
        await page.waitForTimeout(5000)//等待5000毫秒
        })
})
