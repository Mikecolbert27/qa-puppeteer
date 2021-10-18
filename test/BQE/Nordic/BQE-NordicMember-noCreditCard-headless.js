const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const chromium = require('chromium');

const {click,getText,getCount,shouldNotExist,waitForText} = require('../lib/helper')

describe('BQE Nordic EC Order Process - Member',()=>{
    let browser
    let page
    //Test Hooks:before, beforeEach, after, afterEach
    //before:每個test case執行之前先做的動作(page/browswer)
    before(async function(){
        browser=await puppeteer.launch({
            // executablePath:
            // "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless:true,//有無需要開視窗,false要開,true不開
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
        await page.setViewport({width:1200,height:1000})
        //Login Page
        await page.goto('https://g5-staging64.benq.eu/en-eu/index.html')
        await page.click('#btn_close')
        await page.waitForTimeout(1000)//等待1000毫秒
        await page.waitForSelector('body > header > aside.line-1 > aside > nav > div.right-wrapper > div.log_area > a')
        await page.click('body > header > aside.line-1 > aside > nav > div.right-wrapper > div.log_area > a')
        await page.waitForSelector('#AccountLogin')
        await page.type('#userName','celinetest123@gmail.com',{delay:100})
        await page.type('#password','test1234',{delay:100})
        await page.click('#login')
        await shouldNotExist(page,'#login')
        await page.waitForSelector('#loginName')

        //Product Page
        await page.goto('https://shoptest.benq.eu/sc-buy/fk1mouse-zowie.html')
        await page.waitForTimeout(3000)//等待3000毫秒
        await page.waitForSelector('#product-addtocart-button')
        await page.click('#product-addtocart-button')
        //invalid key - const invalidKey = await shouldNotExist(page,'#maincontent > div.page.messages > div:nth-child(2) > div > div')
        // await Promise.all([
        //     page.reload(),
        //     page.waitForNavigation()
        // ]);
        // await page.click('body > div.page-wrapper > header > aside.line-1 > aside > nav > div.minicart-wrapper');
        // await page.click('#top-cart-btn-checkout')
        //await page.reload(),
        //await page.goto('https://shoptest.benq.eu/sc-buy/fk1mouse-zowie.html')
        //await page.click('#product-addtocart-button')

        //Cart Page
        await shouldNotExist(page,'#product-addtocart-button')
        await shouldNotExist(page,'#maincontent > div.page.messages > div:nth-child(2) > div > div')
        await page.waitForSelector('#maincontent > div.columns > div > div.page-title-wrapper > div > h1 > span')
        var text = await getText(page, '#maincontent > div.columns > div > div.page-title-wrapper > div > h1 > span')
        expect(text).to.be.a('string','Shopping Cart')
        await page.waitForTimeout(10000)//等待10000毫秒
        //var text = await getText(page, '#maincontent > div.page.messages > div:nth-child(2) > div > div')
        //expect(text).to.be.a('string','You added BenQ ZOWIE FK1 Gaming Mouse BLACK to your shopping cart.')
        //var text = await getText(page, '#shopping-cart-table > tbody > tr > td.col.item > div > strong > a')
        //expect(text).to.be.a('string','BenQ ZOWIE FK1 Gaming Mouse BLACK')
        await page.waitForSelector('#maincontent > div.columns > div > div.cart-summary > ul > li:nth-child(1) > button')//Next
        await page.click('#maincontent > div.columns > div > div.cart-summary > ul > li:nth-child(1) > button')//Next
        await shouldNotExist(page,'#maincontent > div.columns > div > div.cart-summary > ul > li:nth-child(1) > button')//Next

        //503 issue(有時候發生)
        //await page.goBack(),//因為有時候會503,所以先返回上一頁
        //await page.waitForTimeout(15000)//等待15000毫秒
        //await page.waitForSelector('#maincontent > div.columns > div > div.cart-summary > ul > li:nth-child(1) > button')//Next
        //await page.click('#maincontent > div.columns > div > div.cart-summary > ul > li:nth-child(1) > button')//Next
        //await shouldNotExist(page,'#maincontent > div.columns > div > div.cart-summary > ul > li:nth-child(1) > button')//Next
        // Shipping Page
        var text = await getText(page, '#checkout > ul > li.opc-progress-bar-item._active > span')
        expect(text).to.be.a('string','Shipping')
        await page.waitForSelector('#shipping')
        //await page.click(' #checkout-step-shipping > div > div > div > div:nth-child(1) > button.action.edit-address-link')//打開地址簿#checkout-step-shipping > div > div > div > div.shipping-address-item.selected-item > button.action.edit-address-link
        //await page.click('#shipping-save-in-address-book')
        //await page.click('#body > div.modals-wrapper > aside.modal-popup.modal-slide._inner-scroll._show > div.modal-inner-wrap > footer > button.action.primary.action-save-address')
        //await shouldNotExist(page,'#modal-content-19')
        await page.waitForTimeout(15000)//等待15000毫秒
        await page.waitForSelector('#checkout-step-shipping > div.field.addresses > div > div > div:nth-child(1) > button.action.action-select-shipping-item')
        await page.click('#checkout-step-shipping > div.field.addresses > div > div > div:nth-child(1) > button.action.action-select-shipping-item')//選擇地址簿的sweden
        await page.waitForSelector('#opc-sidebar > div.opc-block-summary')
        await page.waitForTimeout(20000)//等待20000毫秒
        //取得price, shipping, tax的文字
        const shippingCartSubtotalText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals.sub > td > span')
        // await waitForText(page,'#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals.shipping.excl > td > span',"EUR ")
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
        const shippingShipping = parseInt(shippingShippingOnlyNum)
        const shippingTax = parseInt(shippingTaxOnlyNum )
        const shippingOrderTotal = parseInt(shippingOrderTotalNum )
        console.log('cartSubtotal(Shipping Page):',shippingCartSubtotal)
        console.log('shipping(Shipping Page):',shippingShipping)
        console.log('tax(Shipping Page):',shippingTax )
        console.log('orderTotal(Shipping Page):',shippingOrderTotal)
        //確認total information上的金額
        const shippingOrderTotalActual = shippingCartSubtotal+shippingShipping+shippingTax
        const shippingTaxRate = 0.25
        const shippingCartSubtotalAndShipping = shippingCartSubtotal+shippingShipping
        const shippingTaxActual = shippingCartSubtotalAndShipping*shippingTaxRate
        console.log('totalActual(Shipping Page):',shippingOrderTotalActual)//實際計算(應得)的數字
        console.log('taxActual(Shipping Page):',shippingTaxActual)//實際計算(應得)的數字
        //確認total information和實際計算(應得)的數字是否相同
        expect(shippingTax).to.equal(shippingTaxActual)
        expect(shippingOrderTotal).to.equal(shippingOrderTotalActual)
        await click(page,'#next-step-trigger')//Next
        await shouldNotExist(page,'#next-step-trigger')//Next

        //Payment Page
        await page.waitForSelector('#co-payment-form > fieldset > legend > span')
        await page.waitForSelector('#co-payment-form > fieldset > div.shipping-information')
        await page.waitForTimeout(5000)//等待5000毫秒
        await page.waitForSelector('#opc-sidebar > div.opc-block-summary')
        //取得price, shipping, tax的文字
        const paymentCartSubtotalText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals.sub > td > span')
        // await waitForText(page,'#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals.shipping.excl > td > span',"EUR ")
        const paymentShippingText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals.shipping.excl > td > span')
        const paymentTaxText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals-tax > td > span')
        const paymentOrderTotalText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.grand.totals > td > strong > span')
        //去除EUR 
        const paymentCartSubtotalNum = paymentCartSubtotalText.replace("EUR ","")
        const paymentShippingOnlyNum = paymentShippingText.replace("EUR ","")
        const paymentTaxOnlyNum = await paymentTaxText.replace("EUR ","")
        const paymentOrderTotalNum = await paymentOrderTotalText.replace("EUR ","")
        //將字串轉換成數字
        const paymentCartSubtotal = parseInt(paymentCartSubtotalNum)
        const paymentShipping = parseInt(paymentShippingOnlyNum)
        const paymentTax = parseInt(paymentTaxOnlyNum )
        const paymentOrderTotal = parseInt(paymentOrderTotalNum )
        console.log('cartSubtotal(Payment Page):',paymentCartSubtotal)
        console.log('shipping(Payment Page):',paymentShipping)
        console.log('tax(Payment Page):',paymentTax )
        console.log('orderTotal(Payment Page):',paymentOrderTotal)
        //確認total information上的金額
        const paymentOrderTotalActual = paymentCartSubtotal+paymentShipping+paymentTax
        const paymentTaxRate = 0.25
        const paymentCartSubtotalAndShipping = paymentCartSubtotal+paymentShipping
        const paymentTaxActual = paymentCartSubtotalAndShipping*paymentTaxRate
        console.log('totalActual(Payment Page):',paymentOrderTotalActual)//實際計算(應得)的數字
        console.log('taxActual(Payment Page):',paymentTaxActual)//實際計算(應得)的數字
        //確認total information和實際計算(應得)的數字是否相同
        expect(paymentTax).to.equal(paymentTaxActual)
        expect(paymentOrderTotal).to.equal(paymentOrderTotalActual)
        await page.waitForTimeout(5000)//等待5000毫秒

        //移除購物車品項, 免得商品按到缺貨
        await page.goto('https://shoptest.benq.eu/sc-buy/checkout/cart/')
        await page.waitForSelector('#shopping-cart-table > tbody > tr > td.col.actionsiso > div > a.action.action-delete')
        await page.waitForTimeout(5000)//等待5000毫秒
        await page.click('#shopping-cart-table > tbody > tr > td.col.actionsiso > div > a.action.action-delete')
        await page.waitForTimeout(5000)//等待5000毫秒
        await page.waitForSelector('body > div.modals-wrapper > aside.modal-popup.confirm._show > div.modal-inner-wrap')
        await page.waitForSelector('body > div.modals-wrapper > aside.modal-popup.confirm._show > div.modal-inner-wrap > footer > button.action-primary.action-accept')
        await page.click('body > div.modals-wrapper > aside.modal-popup.confirm._show > div.modal-inner-wrap > footer > button.action-primary.action-accept')
        await page.waitForTimeout(5000)//等待5000毫秒
        await shouldNotExist(page,'body > div.modals-wrapper > aside.modal-popup.confirm._show > div.modal-inner-wrap > footer > button.action-primary.action-accept')
        await page.waitForSelector('#maincontent > div.columns > div > div.cart-empty > p:nth-child(1)')
        const emptyCart= await getText(page, '#maincontent > div.columns > div > div.cart-empty > p:nth-child(1)')
        expect(emptyCart).to.be.a('string','You have no items in your shopping cart.')
        await page.waitForTimeout(3000)//等待3000毫秒
        })
})
