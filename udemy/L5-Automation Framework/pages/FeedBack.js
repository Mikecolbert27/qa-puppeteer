import BasePage from "./BasePage"

export default class FeedBackPage extends BasePage{
    async visit(){
        await page.goto("https://g5-staging64.benq.com/en-us/support/contact-us/email-us.html")
    }
    async isFeedbackFormDisplayed(){
        await page.waitForSelector("#input-date")
        await page.waitForSelector("#input-serial")
        await page.waitForSelector("#input-subject")
        await page.waitForSelector("#input-question")
    }
    async submitFeedback(date,serial,subject,question){
        await page.type("#input-date",date)
        await page.type("#input-serial",serial)
        await page.type("#input-subject",subject)
        await page.type("#input-question",question)
        await page.click('input[type="submit"]')
    }
}