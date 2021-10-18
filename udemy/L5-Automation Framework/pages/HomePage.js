import BasePage from "./BasePage"

export default class HomePage extends BasePage{
    async visit(){
        await page.setViewport({width:1200,height:1000})
        await page.goto("https://www.benq.com/zh-tw/index.html")
        await page.waitForSelector("body > header > aside.line-2 > aside > aside")
    }

    async isNavbarDisplayed(){
        await page.waitForSelector("body > header > aside.line-2 > aside > aside > nav")
        await page.waitForSelector("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(1) > a")
        await page.waitForSelector("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(2) > a")
        await page.waitForSelector("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(3) > a")
        await page.waitForSelector("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(4) > a")
        await page.waitForSelector("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(5) > a")
        await page.waitForSelector("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(6) > a")
        await page.waitForSelector("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(7) > a")
    }
    async clickNewPromotionLink(){
        // await page.waitForSelector("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(1) > a")
        await page.click("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(1) > a")
    }
    async clickTVLink(){
        // await page.waitForSelector("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(2) > a")
        await page.click("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(2) > a")
    }
    async clickMonitorLink(){
        // await page.waitForSelector("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(3) > a")
        await page.click("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(3) > a")
    }
    async clickProjectorLink(){
        // await page.waitForSelector("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(4) > a")
        await page.click("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(4) > a")
    }
    async clickLampLink(){
        // await page.waitForSelector("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(5) > a")
        await page.click("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(5) > a")
    }
    async clickTrevoloLink(){
        // await page.waitForSelector("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(6) > a")
        await page.click("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(6) > a")
    }
    async clickPDPLink(){
        // await page.waitForSelector("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(7) > a")
        await page.click("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(7) > a")
    }
}