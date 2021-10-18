const {setWorldConstructor}=require('@cucumber/cucumber')
const {expect}=require('chai')
const puppeteer = require('puppeteer')

class CustomWorld{
    async launchBrowser(){
        this.browser = await puppeteer.launch(
            {
                headless:true,
                executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            }
        )
        this.page = await this.browser.newPage()
    }

    async closeBrowser(){
        await this.browser.close()
    }

    async visit(){
        await this.page.setViewport({width:1200,height:1000})
        await this.page.goto('https://g5-staging64.benq.eu/en-eu/index.html')
        await this.page.click('#btn_close')
        await this.page.waitForTimeout(1000)//等待1000毫秒
        await this.page.waitForSelector('body > header > aside.line-1 > aside > nav > div.right-wrapper > div.log_area > a')
        await this.page.click('body > header > aside.line-1 > aside > nav > div.right-wrapper > div.log_area > a')
    }
    async fillLoginForm(){
        await this.page.waitForSelector('#AccountLogin')
        await this.page.type('#userName','celinetest123@gmail.com',{delay:100})
        await this.page.type('#password','test1234',{delay:100})
    }

    async submitLogin(){
        await this.page.click('#login')
    }

    async verifySuccessLogin(){
        await this.page.waitForSelector('#loginName')
    }
}

setWorldConstructor(CustomWorld)