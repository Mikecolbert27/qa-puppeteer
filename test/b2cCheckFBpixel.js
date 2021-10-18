
const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const {click,getText,getCount,shouldNotExist,waitForText} = require('../lib/helper')

describe('FB pixel Check - B2C',()=>{
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

    it('FB pixel Check',async function(){
        await page.goto('https://www.lamudi.co.id/newdevelopments/');

        // wait for element defined by XPath appear in page
        await page.waitForXPath("(//span[@class='CountTitle-number'])[1]");
    
        // evaluate XPath expression of the target selector (it return array of ElementHandle)
        let elHandle = await page.$x("(//span[@class='CountTitle-number'])[1]");
    
        // prepare to get the textContent of the selector above (use page.evaluate)
        let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);
    
        console.log('Total Property Number is:', lamudiNewPropertyCount);
        })
})


const puppeteer = require('puppeteer');

(async () => {
    // set some options (set headless to false so we can see 
    // this automated browsing experience)
    let launchOptions = { headless: false, args: ['--start-maximized'] };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // set viewport and user agent (just in case for nice viewing)
    await page.setViewport({width: 1366, height: 768});
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    // go to the target web
    await page.goto('https://www.lamudi.co.id/newdevelopments/');

    // wait for element defined by XPath appear in page
    await page.waitForXPath("(//span[@class='CountTitle-number'])[1]");

    // evaluate XPath expression of the target selector (it return array of ElementHandle)
    let elHandle = await page.$x("(//span[@class='CountTitle-number'])[1]");

    // prepare to get the textContent of the selector above (use page.evaluate)
    let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);

    console.log('Total Property Number is:', lamudiNewPropertyCount);

    // close the browser
    await browser.close();
})();