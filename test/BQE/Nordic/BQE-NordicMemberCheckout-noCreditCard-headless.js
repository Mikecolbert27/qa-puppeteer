const puppeteer = require('puppeteer');
const expect = require('chai').expect;

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
        //Product Page
        await page.goto('https://shoptest.benq.eu/sc-buy/fk1mouse-zowie.html')
        await page.click('body > div.modals-wrapper > aside.modal-popup.benq_cookiebar_modal.modal-slide._inner-scroll._show > div.modal-inner-wrap > footer > button.close-button')
        await page.waitForTimeout(3000)//等待3000毫秒
        await page.waitForSelector('#product-addtocart-button')
        await page.click('#product-addtocart-button')
        await page.waitForTimeout(3000)//等待3000毫秒

        //Cart Page
        await shouldNotExist(page,'#product-addtocart-button')//如果沒過,很高的機率是invalid key
        await shouldNotExist(page,'#maincontent > div.page.messages > div:nth-child(2) > div > div')
        await page.waitForSelector('#maincontent > div.columns > div > div.page-title-wrapper > div > h1 > span')
        var text = await getText(page, '#maincontent > div.columns > div > div.page-title-wrapper > div > h1 > span')
        expect(text).to.be.a('string','Shopping Cart')
        await page.waitForTimeout(10000)//等待10000毫秒
        await page.waitForSelector('#maincontent > div.columns > div > div.cart-summary > ul > li:nth-child(1) > button')//Member Checkout
        await page.click('#maincontent > div.columns > div > div.cart-summary > ul > li:nth-child(1) > button')//Member Checkout
        await shouldNotExist(page,'#maincontent > div.columns > div > div.cart-summary > ul > li:nth-child(1) > button')//Member Checkout

        //Login Page
        await page.waitForTimeout(1000)//等待1000毫秒
        await page.waitForSelector('body > div.block.log_in > div > div > div.col-sm-7.col-xs-12.log_left > div')
        await page.type('#userName','celinetest123@gmail.com',{delay:100})
        await page.type('#password','test1234',{delay:100})
        await page.click('#login')
        await page.waitForTimeout(10000)//等待10000毫秒
        await shouldNotExist(page,'#login')
        await page.waitForSelector('#checkout')

        // Shipping Page
        var text = await getText(page, '#shipping > div.step-title > div')
        expect(text).to.be.a('string','Shipping Address')
        await page.waitForSelector('#shipping')
        await page.waitForTimeout(10000)//等待10000毫秒
        await page.waitForSelector('#checkout-step-shipping > div > div > div > div.shipping-address-item.not-selected-item > button.action.action-select-shipping-item')
        await page.click('#checkout-step-shipping > div > div > div > div.shipping-address-item.not-selected-item > button.action.action-select-shipping-item')//選擇地址簿
        await page.waitForSelector('#opc-sidebar > div.opc-block-summary')
        await page.waitForTimeout(10000)//等待10000毫秒
        //取得price, shipping, tax的文字
        const shippingCartSubtotalText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals.sub > td > span')
        const shippingShippingText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals.shipping.excl > td > span')
        const shippingTaxText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.totals-tax > td > span')
        const shippingOrderTotalText = await getText(page, '#opc-sidebar > div.opc-block-summary > table > tbody > tr.grand.totals > td > strong > span')
        //去除EUR 
        const shippingCartSubtotalNumIncludeComma = shippingCartSubtotalText.replace("EUR ","")
        const shippingShippingOnlyNumIncludeComma = shippingShippingText.replace("EUR ","")
        const shippingTaxOnlyNumIncludeComma = shippingTaxText.replace("EUR ","")
        const shippingOrderTotalNumIncludeComma = shippingOrderTotalText.replace("EUR ","")
        //去除逗號 
        function clear(str) { 
            str = str.replace(/,/g, "");//取消字串中出現的所有逗號 
            return str; 
        } 
        const shippingCartSubtotalNum = clear(shippingCartSubtotalNumIncludeComma)
        const shippingShippingOnlyNum = clear(shippingShippingOnlyNumIncludeComma)
        const shippingTaxOnlyNum = clear(shippingTaxOnlyNumIncludeComma)
        const shippingOrderTotalNum = clear(shippingOrderTotalNumIncludeComma)
        //將字串轉換成數字(包含小數值)
        const shippingCartSubtotal = parseFloat(shippingCartSubtotalNum)
        const shippingShipping = parseFloat(shippingShippingOnlyNum)
        const shippingTax = parseFloat(shippingTaxOnlyNum)
        const shippingOrderTotal = parseFloat(shippingOrderTotalNum )
        console.log('cartSubtotal(Shipping Page):',shippingCartSubtotal)
        console.log('shipping(Shipping Page):',shippingShipping)
        console.log('tax(Shipping Page):',shippingTax )
        console.log('orderTotal(Shipping Page):',shippingOrderTotal)
        //確認total information上的金額
        const shippingOrderTotalActual = shippingCartSubtotal+shippingShipping+shippingTax
        const shippingTaxRate = 0.25
        const shippingCartSubtotalAndShipping = shippingCartSubtotal+shippingShipping
        const shippingTaxActualUnfixed = shippingCartSubtotalAndShipping*shippingTaxRate
        const shippingTaxActualFixed = shippingTaxActualUnfixed.toFixed(2)//四捨五入取到小數點第二位
        const shippingTaxActual= parseFloat(shippingTaxActualFixed)//因為toFixed(2)回傳的是字串
        console.log('totalActual(Shipping Page):',shippingOrderTotalActual)//實際計算(應得)的數字
        console.log('taxActual(Shipping Page):',shippingTaxActual)//實際計算(應得)的數字
        //確認total information和實際計算(應得)的數字是否相同
        expect(shippingOrderTotal).to.equal(shippingOrderTotalActual)
        expect(shippingTax).to.equal(shippingTaxActual)
        await click(page,'#next-step-trigger')//Next
        await shouldNotExist(page,'#next-step-trigger')//Next

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
        const paymentTaxRate = 0.25
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
