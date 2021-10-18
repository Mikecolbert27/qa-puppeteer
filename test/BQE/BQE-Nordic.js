const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const {click,getText,getCount,shouldNotExist} = require('../lib/helper')

describe('BQE Nordic EC Order Process',()=>{
    let browser
    let page
    //Test Hooks:before, beforeEach, after, afterEach
    //before:每個test case執行之前先做的動作(page/browswer)
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
        await page.waitForSelector('#maincontent')
        var text = await getText(page, '#maincontent > div.page-title-wrapper > div > h1 > span')
        expect(text).to.be.a('string','Shopping Cart')
        var text = await getText(page, '#maincontent > div.page.messages > div:nth-child(2) > div > div')
        expect(text).to.be.a('string','You added BenQ ZOWIE FK1 Gaming Mouse BLACK to your shopping cart.')
        var text = await getText(page, '#shopping-cart-table > tbody > tr > td.col.item > div > strong > a')
        expect(text).to.be.a('string','BenQ ZOWIE FK1 Gaming Mouse BLACK')
        await click(page,'#maincontent > div.columns > div > div.cart-summary > ul > li:nth-child(3) > button')

        //Shipping Page
        // await page.waitForSelector('#shipping')
        // await page.waitForSelector('#checkoutSteps')
        var text = await getText(page, '#checkout > ul > li.opc-progress-bar-item._active > span')
        expect(text).to.be.a('string','Shipping')
        await page.type('#customer-email','a4521005@outlook.com',{delay:100})//在email欄位輸入非會員email
        await page.waitForTimeout(1000)//等待1000毫秒
        await page.type('#shipping-new-address-form > div:nth-child(1) > div > input','Celine',{delay:100})//在first name欄位輸入收件人first name
        await page.waitForTimeout(1000)//等待1000毫秒

        await page.type('#shipping-new-address-form > div:nth-child(2) > div > input','Chiu',{delay:100})//在last name欄位輸入收件人last name
        await page.select('#shipping-new-address-form > div:nth-child(6) > div > select','Sweden')//在Country of residence欄位選擇Sweden/Denmark/Finland
        await page.waitForSelector('#shipping-new-address-form > div:nth-child(6) > div > div > div')
        var text = await getText(page, '#shipping-new-address-form > div:nth-child(6) > div > div > div')
        expect(text).to.be.a('string','Shipment via Schenker. Note: Your Package will be Delivered to the Closest Schenker Access Point.')//若選擇Sweden會出現Schenker Access Point提示訊息
        await page.type('#shipping-new-address-form > fieldset > div > div > div > input','address',{delay:100})//在street address欄位輸入address
        await page.waitForTimeout(1000)//等待1000毫秒
        await page.type('#shipping-new-address-form > div:nth-child(8) > div > input','city',{delay:100})//在city欄位輸入city
        await page.waitForTimeout(1000)//等待1000毫秒
        await page.type('#shipping-new-address-form > div:nth-child(11) > div > input','111',{delay:100})//在zip code欄位輸入zip code
        await page.waitForTimeout(1000)//等待1000毫秒
        await page.type('#shipping-new-address-form > div:nth-child(12) > div > input','886929861005',{delay:100})//在Phone Number欄位輸入Phone Number
        await page.waitForTimeout(1000)//等待1000毫秒
        await click(page,'#next-step-trigger')
        
        //Payment Page
        // await page.waitForSelector('#checkoutSteps')
        var text = await getText(page, '#co-payment-form > fieldset > legend > span')
        expect(text).to.be.a('string','Payment Information')
        
        await page.waitForSelector('#co-payment-form > fieldset')

        // await click(page,'#checkout-payment-method-load > div > div > div:nth-child(2) > div.payment-method-title.field.choice > label > input[type=radio]+label:before')
        //點擊信用卡adyen
        //await page.click('#checkout-payment-method-load > div > div > div:nth-child(3) > div.payment-method-title.field.choice ',{clickCount:1})
        //const adyen = await page.$x('//div[@class="payment-method-title field choice"]/label')
        //await adyen[0].click()
        //await page.mouse(x,y,{button:left})
        //await click(page,'#checkout-payment-method-load > div > div > div:nth-child(3) > div.payment-method-title.field.choice')

        
        await page.waitForSelector('#cardContainer')
        await page.type('#encryptedCardNumber','2222 4000 1000 0008',{delay:100})
        await page.type('#encryptedExpiryDate','0330',{delay:100})
        //await page.waitForSelector('#cardContainer > div > div > div.adyen-checkout__card-input__form._3jXHyitM6npsG088lgDkjo > div.adyen-checkout__card__form > div.adyen-checkout__card__exp-cvc.adyen-checkout__field-wrapper > div.adyen-checkout__field.adyen-checkout__field--50.adyen-checkout__field--expiryDate > label > span.adyen-checkout__input-wrapper > span.adyen-checkout-input__inline-validation.adyen-checkout-input__inline-validation--valid > span > svg')

        await page.type('#encryptedSecurityCode','737',{delay:100})
        //await page.waitForSelector('#cardContainer > div > div > div.adyen-checkout__card-input__form._3jXHyitM6npsG088lgDkjo > div.adyen-checkout__card__form > div.adyen-checkout__card__exp-cvc.adyen-checkout__field-wrapper > div.adyen-checkout__field.adyen-checkout__field--50.adyen-checkout__field__cvc.adyen-checkout__field--securityCode > label > span.adyen-checkout__input-wrapper > span.adyen-checkout-input__inline-validation.adyen-checkout-input__inline-validation--valid > span > svg')

        await page.type('#cardContainer > div > div > div.adyen-checkout__card-input__form._3jXHyitM6npsG088lgDkjo > div.adyen-checkout__field.adyen-checkout__card__holderName > label > span.adyen-checkout__input-wrapper > input','2222 4000 1000 0008',{delay:100})
        //await page.waitForSelector('#cardContainer > div > div > div.adyen-checkout__card-input__form._3jXHyitM6npsG088lgDkjo > div.adyen-checkout__field.adyen-checkout__card__holderName > label > span.adyen-checkout__input-wrapper > span > span > svg')
        await page.click('#opc-sidebar > div.opc-block-summary > div:nth-child(4) > div > div > input',{clickCount:1})//點擊I agree to BenQ Terms & Condition的checkbox,點擊1次
        await page.waitForTimeout(1000)//等待5000毫秒

        await page.click('#place-order-trigger')//點擊placeOrder


        
 




       // expect(title).to.be.a('string','Example Domain')//斷言:此page的title必須為Example Domain
       // expect(url).to.include('example.com')//斷言:此page的url必須包含example.com
       // expect(text).to.be.a('string','Example Domain')//斷言:h1內容必須為Example Domain
      //  expect(count).to.equal(2)//斷言:此page的p元素的數目必須為2
        //按下sign in button以後是否消失
        //await page.goto('http://zero.webappsecurity.com/index.html')
     //await click(page,'#signin_button')

        //await shouldNotExist(page,'#signin_button')
      })

    
})
