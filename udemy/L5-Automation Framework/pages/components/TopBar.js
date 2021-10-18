export default class TopBar{
    async isTopBarDisplayed(){
        await page.waitForSelector("body > header > aside.line-1")
        await page.waitForSelector("body > header > aside.line-1 > aside > nav > div.right-wrapper > div.log_area > a")
    }
    async clickSignInButton(){
        await page.click("body > header > aside.line-1 > aside > nav > div.right-wrapper > div.log_area > a")
    }
    // async clickSearchButton(){
    //     await page.click("body > header > aside.line-1 > aside > label")
    // }
}
