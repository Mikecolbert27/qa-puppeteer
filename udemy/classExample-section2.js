const puppeteer = require('puppeteer');
const expect = require('chai').expect;


describe('Puppeteer Basics',()=>{
    it('should launch the browser',async function(){
        const browser = await puppeteer.launch({
            executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless: false, //有無需要開視窗,false要開,true不開
            slowMo: 250, // slow down by 250ms
            devtools:true //有無需要開啟開發人員工具
          });
        const page = await browser.newPage()
        await page.goto('http://example.com/')
        await page.waitForTimeout(3000)//等待3000毫秒
        await page.waitForSelector('h1')
        await page.reload()//等待頁面重新整理
        await page.waitForTimeout(3000)//等待3000毫秒
        await page.waitForSelector('h1')
        await browser.close()
    })
    it('goBack and goForward ',async function(){
        const browser = await puppeteer.launch({
            executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless: false, //有無需要開視窗,false要開,true不開
            slowMo: 250, // slow down by 250ms
            devtools:true //有無需要開啟開發人員工具
          });
        const page = await browser.newPage()
        await page.goto('http://example.com/')
        await page.waitForSelector('h1')
        await page.goto('https://dev.to/')
        await page.waitForSelector('#sidebar-wrapper-left')//等待其中一個Id出現
        await page.goBack()//成功返回上一頁
        await page.waitForSelector('h1')
        await page.goForward()//成功按下一頁
        await page.waitForSelector('#sidebar-wrapper-left')//等待其中一個Id出現
        await browser.close()
    })
    it('input name successfully ',async function(){
        const browser = await puppeteer.launch({
            executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless: false, //有無需要開視窗,false要開,true不開
            slowMo: 250, // slow down by 250ms
            devtools:true //有無需要開啟開發人員工具
          });
        const page = await browser.newPage()
        await page.goto('https://devexpress.github.io/testcafe/example/')
        await page.type('#developer-name','Celine',{delay:200})//在id為developer-name的欄位裡輸入Celine,然後再停頓200毫秒
        await page.waitForTimeout(5000)//等待5000毫秒
        await browser.close()
    })
    it('interacting with Buttons and Checkbox ',async function(){
        const browser = await puppeteer.launch({
            executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless: false, //有無需要開視窗,false要開,true不開
            slowMo: 250, // slow down by 250ms
            devtools:true //有無需要開啟開發人員工具
          });
        const page = await browser.newPage()
        await page.goto('https://devexpress.github.io/testcafe/example/')
        await page.type('#developer-name','Celine',{delay:200})//在id為developer-name的欄位裡輸入Celine,然後再停頓200毫秒
        await page.click('#remote-testing',{clickCount:1})//點擊id為remote-testing的checkbox,點擊1次
        await page.waitForTimeout(5000)//等待5000毫秒
        await browser.close()
    })
    it('interacting with DropDown ',async function(){
        const browser = await puppeteer.launch({
            executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless: false, //有無需要開視窗,false要開,true不開
            slowMo: 250, // slow down by 250ms
            devtools:true //有無需要開啟開發人員工具
          });
        const page = await browser.newPage()
        await page.goto('https://devexpress.github.io/testcafe/example/')
        await page.select('#preferred-interface','JavaScript API')//點擊DropDown下拉式選單, 選擇JavaScript API這個option
        const message = 'Lets fill that message'
        await page.type('#comments',message)//點擊id為comments的欄位輸入Lets fill that message
        await page.click('#submit-button')//點擊id為remote-testing的checkbox,點擊1次
        await page.waitForTimeout(5000)//等待5000毫秒
        await browser.close()
    })
    it('submit a form successfully',async function(){
        const browser = await puppeteer.launch({
            executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless: false, //有無需要開視窗,false要開,true不開
            slowMo: 250, // slow down by 250ms
            devtools:true //有無需要開啟開發人員工具
          });
        const page = await browser.newPage()
        await page.goto('https://devexpress.github.io/testcafe/example/')
        await page.type('#developer-name','Celine',{delay:200})//在id為developer-name的欄位裡輸入Celine,然後再停頓200毫秒
        await page.click('#remote-testing',{clickCount:1})//點擊id為remote-testing的checkbox,點擊1次
        await page.select('#preferred-interface','JavaScript API')//點擊DropDown下拉式選單, 選擇JavaScript API這個option
        const message = 'Lets fill that message'
        await page.type('#comments',message)//點擊id為comments的欄位輸入Lets fill that message
        await page.click('#submit-button')//點擊id為remote-testing的checkbox,點擊1次
        await page.waitForSelector('.result-content')//等待submit成功的畫面
        await page.waitForTimeout(5000)//等待5000毫秒
        await browser.close()
    })
    it('Get Page title and URL',async function(){
      const browser = await puppeteer.launch({
          executablePath:
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
          headless: false, //有無需要開視窗,false要開,true不開
          slowMo: 250, // slow down by 250ms
          devtools:true //有無需要開啟開發人員工具
        });
      const page = await browser.newPage()
      await page.goto('http://example.com/')
      const title = await page.title()//等待頁面的title出現
      const url = await page.url()//等待url出現
      console.log('title',title)//記在終端機上, 此page的title
      console.log('url',url)//記在終端機上, 此page的url
      await browser.close()
  })
  it('Get Element Text',async function(){
    const browser = await puppeteer.launch({
        executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: false, //有無需要開視窗,false要開,true不開
        slowMo: 250, // slow down by 250ms
        devtools:true //有無需要開啟開發人員工具
      });
    const page = await browser.newPage()
    await page.goto('http://example.com/')
    const title = await page.title()
    const url = await page.url()
    const text = await page.$eval('h1',element => element.textContent)//等待頁面上h1元素出現
    console.log('Text in the H1:'+text)//記在終端機上, h1的內容
    await browser.close()
  })
  it('Get Element Count',async function(){
    const browser = await puppeteer.launch({
        executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: false, //有無需要開視窗,false要開,true不開
        slowMo: 250, // slow down by 250ms
        devtools:true //有無需要開啟開發人員工具
      });
    const page = await browser.newPage()
    await page.goto('http://example.com/')
    const title = await page.title()
    const url = await page.url()
    const text = await page.$eval('h1',element => element.textContent)//等待頁面上h1元素出現, $eval是只取得一個元素(querySelector)
    const count = await page.$$eval('p',element => element.length)//等待頁面上所有的p元素出現, $$eval是取得所有的元素(querySelectorAll)
    console.log('Text in the H1:'+text)//記在終端機上, h1的內容
    console.log('Number of p tags on the page:'+count)//記在終端機上, p的數目
    await browser.close()
  })
  it('Assertions(expect)',async function(){
    const browser = await puppeteer.launch({
        executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: false, //有無需要開視窗,false要開,true不開
        slowMo: 250, // slow down by 250ms
        devtools:true //有無需要開啟開發人員工具
      });
    const page = await browser.newPage()
    await page.goto('http://example.com/')
    const title = await page.title()
    const url = await page.url()
    const text = await page.$eval('h1',element => element.textContent)//等待頁面上h1元素出現, $eval是只取得一個元素(querySelector)
    const count = await page.$$eval('p',element => element.length)//等待頁面上所有的p元素出現, $$eval是取得所有的元素(querySelectorAll)
    expect(title).to.be.a('string','Example Domain')//斷言:此page的title必須為Example Domain
    expect(url).to.include('example.com')//斷言:此page的url必須包含example.com
    expect(text).to.be.a('string','Example Domain')//斷言:h1內容必須為Example Domain
    expect(count).to.equal(2)//斷言:此page的p元素的數目必須為2
    await browser.close()
  })
  it('Set Default Timeouts',async function(){
    const browser = await puppeteer.launch({
        executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: false, //有無需要開視窗,false要開,true不開
        slowMo: 250, // slow down by 250ms
        devtools:true //有無需要開啟開發人員工具
      });
    const page = await browser.newPage()
    await page.setDefaultTimeout(10000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation, page.waitForFunction, page.waitForFileChooser,page.waitForSelector等method的時間，預設是 30 秒
    await page.setDefaultNavigationTimeout(20000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation等method的時間，預設是 30 秒

    await page.goto('http://example.com/')
    const title = await page.title()
    const url = await page.url()
setDefaultTimeout
    expect(title).to.be.a('string','Example Domain')//斷言:此page的title必須為Example Domain
    expect(url).to.include('example.com')//斷言:此page的url必須包含example.com
    expect(text).to.be.a('string','Example Domain')//斷言:h1內容必須為Example Domain
    expect(count).to.equal(2)//斷言:此page的p元素的數目必須為2
    await browser.close()
  })
  it('Keyboard Press Simulation',async function(){
    const browser = await puppeteer.launch({
        executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: false, //有無需要開視窗,false要開,true不開
        slowMo: 250, // slow down by 250ms
        devtools:true //有無需要開啟開發人員工具
      });
    const page = await browser.newPage()
    await page.setDefaultTimeout(10000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation, page.waitForFunction, page.waitForFileChooser,page.waitForSelector等method的時間，預設是 30 秒
    await page.setDefaultNavigationTimeout(20000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation等method的時間，預設是 30 秒

    // 在搜尋欄輸入term
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.type('#searchTerm','Term')//在搜尋欄(id為#searchTerm)輸入term
    await page.keyboard.press('Enter',{delay:10})//在鍵盤上按下Enter
    await page.waitForTimeout(5000)//等待5000毫秒
    
    await browser.close()
  })
  it('Wait for Xpath',async function(){
    const browser = await puppeteer.launch({
        executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: false, //有無需要開視窗,false要開,true不開
        slowMo: 250, // slow down by 250ms
        devtools:true //有無需要開啟開發人員工具
      });
    const page = await browser.newPage()
    await page.setDefaultTimeout(10000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation, page.waitForFunction, page.waitForFileChooser,page.waitForSelector等method的時間，預設是 30 秒
    await page.setDefaultNavigationTimeout(20000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation等method的時間，預設是 30 秒


    await page.goto('http://example.com/')
    await page.waitForXPath('//h1')
    const title = await page.title()
    const url = await page.url()
    const text = await page.$eval('h1',element => element.textContent)//等待頁面上h1元素出現, $eval是只取得一個元素(querySelector)
    const count = await page.$$eval('p',element => element.length)//等待頁面上所有的p元素出現, $$eval是取得所有的元素(querySelectorAll)
    expect(title).to.be.a('string','Example Domain')//斷言:此page的title必須為Example Domain
    expect(url).to.include('example.com')//斷言:此page的url必須包含example.com
    expect(text).to.be.a('string','Example Domain')//斷言:h1內容必須為Example Domain
    expect(count).to.equal(2)//斷言:此page的p元素的數目必須為2
    await browser.close()
  })
  it('Element not exist',async function(){
    const browser = await puppeteer.launch({
        executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: false, //有無需要開視窗,false要開,true不開
        slowMo: 250, // slow down by 250ms
        devtools:true //有無需要開啟開發人員工具
      });
    const page = await browser.newPage()
    await page.setDefaultTimeout(10000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation, page.waitForFunction, page.waitForFileChooser,page.waitForSelector等method的時間，預設是 30 秒
    await page.setDefaultNavigationTimeout(20000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation等method的時間，預設是 30 秒


    await page.goto('http://example.com/')
    await page.waitForXPath('//h1')
    const title = await page.title()
    const url = await page.url()
    const text = await page.$eval('h1',element => element.textContent)//等待頁面上h1元素出現, $eval是只取得一個元素(querySelector)
    const count = await page.$$eval('p',element => element.length)//等待頁面上所有的p元素出現, $$eval是取得所有的元素(querySelectorAll)
    expect(title).to.be.a('string','Example Domain')//斷言:此page的title必須為Example Domain
    expect(url).to.include('example.com')//斷言:此page的url必須包含example.com
    expect(text).to.be.a('string','Example Domain')//斷言:h1內容必須為Example Domain
    expect(count).to.equal(2)//斷言:此page的p元素的數目必須為2
    //按下sign in button以後是否消失
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.waitForSelector('#signin_button')
    await page.click('#signin_button')
    //await page.waitFor(()=> !document.querySelector('#signin_button'))//按下#signin_button以後, #signin_button是否消失
    await page.waitForSelector('#signin_button',{
      hidden:true, 
      timeout:3000})//等待#signin_button隱藏的時間是否在3000毫秒內
    await browser.close()
  })
})
