import HomePage from "../pages/HomePage"
import TopBar from "../pages/components/TopBar"
import FeedBackPage from "../pages/FeedBack"
import LoginPage from "../pages/LoginPage"

// describe('Google Test',()=>{
//     it('should open google homepage', async()=>{
//         jest.setTimeout(15000)
//         await page.goto('https://google.com')
//         //await page.waitForTimeout(10000)
//     })
// })

describe('Example', ()=>{
    let homepage
    let topbar
    let loginpage
    let feedBackPage

    beforeAll(async()=>{
        homepage=new HomePage()
        topbar = new TopBar()
        loginpage = new LoginPage
        feedBackPage = new FeedBackPage()
    })

    it('homepage should work',async()=>{
        await homepage.visit()
    },10000)//10秒內完成

    it('navbar should be displayed', async()=>{
        await homepage.isNavbarDisplayed()
        await topbar.isTopBarDisplayed()
    },10000)//10秒內完成

    it('try to login', async()=>{
        await loginpage.visit()
        await loginpage.isLoginFormDisplayed()
        await loginpage.login("a4521005@gmail.com","baibai1005")
        await loginpage.wait(10000)
    },30000)//30秒內完成

    // it('feedback should work',async()=>{
    //     await feedBackPage.visit()
    //     await feedBackPage.isFeedbackFormDisplayed()
    //     await feedBackPage.submitFeedback("date","serial","subject","question")
    //     await feedBackPage.wait(5000)
    // },10000)//10秒內完成
})