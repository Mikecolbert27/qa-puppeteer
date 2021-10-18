import BasePage from "./BasePage"

export default class LoginPage extends BasePage{
    async visit(){
        await page.goto("https://club.benq.com/ICDS/Home/BenQAuth?system_id=G5&function=Login&lang=zh-tw&return_url=https%3A%2F%2Fwww.benq.com%2Fzh-tw%2Findex.login.html")
    }
    async isLoginFormDisplayed(){
        await page.waitForSelector("#AccountLogin")
        await page.waitForSelector("#userName")
        await page.waitForSelector("#password")

    }
    async login(user,password){
        await page.waitForSelector("#AccountLogin")
        await page.type("#userName",user)
        await page.type("#password",password)
        await page.click("#login")

        

    }
}