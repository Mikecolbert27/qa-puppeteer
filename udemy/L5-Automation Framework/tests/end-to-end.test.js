import HomePage from "../pages/HomePage"
import TopBar from "../pages/components/TopBar"
import FeedBackPage from "../pages/FeedBack"
import LoginPage from "../pages/LoginPage"

import {username,password, timeout} from "../config.js"

describe("End to End Test",()=>{
    let homePage
    let feedbackPage
    let loginPage
    let topBar

    beforeAll(async()=>{
        homePage=new HomePage()
        loginPage=new LoginPage
        feedbackPage=new FeedBackPage()
        topbar = new TopBar()
    })
    
    it('should load homepage', async()=>{
        await homePage.visit()
        await homePage.isNavbarDisplayed()
    })
    it('should submit feedback',async()=>{
        await feedbackPage.isFeedbackFormDisplayed()
        await feedbackPage.submitFeedback("date","serial","subject","question")
    })
    it('should login in application',async()=>{
        await homePage.visit()
        await topBar.isTopBarDisplayed()
        await topBar.clickSignInButton()
        await loginPage.isLoginFormDisplayed()
        await loginPage.login(username,password)

    })
})