// describe('Config test',()=>{
//     it('should work',()=>{
//         console.log("yeah")
//     })
// })

// import puppeteer from 'puppeteer'
import { step } from "mocha-steps";
import { expect } from "chai";
import Page from '../builder.js';
import LoginPage from '../pages/LoginPage.js';

describe('Mocha steps demo', () => {
    // let browser
    let page;
    // let mobile
    let loginPage;

    before(async () => {
        // browser=await puppeteer.launch({
        //     headless:true,
        //     executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        // })
        //page=await browser.newPage()
        page = await Page.build("Desktop");
        // mobile=await Page.build("Mobile")
        //await page.setDefaultTimeout(7000)
        loginPage = await new LoginPage(page);
    });
    after(async () => {
        await page.close();
        // await mobile.close()
    });
    step('should load google homepage', async () => {
        await page.goto('https://google.com');
    });
    // step('step 2 should Fail',async()=>{
    //     await page.waitForSelector("#FAIL")
    // })
    // step('step 3',async()=>{
    //     console.log("from step 3")
    // })
    // step('step 4',async()=>{
    //     console.log("from step 4")
    // })
    step("should load Benq homepage", async () => {
        await page.goto("https://www.benq.com/zh-tw/index.html");
        await page.waitAndClick("body > header > aside.line-2 > aside > aside > nav > aside:nth-child(1) > a");
        await page.waitForTimeout(5000);
    }, 10000);

    step("Login Button on Benq homepage is visible or not", async () => {
        await page.goto("https://www.benq.com/zh-tw/index.html");
        const signInButton = await page.isElementVisible("body > header > aside.line-1 > aside > nav > div.right-wrapper > div.log_area > a");
        expect(signInButton).to.be.true;
    });

    step("should display login form", async () => {
        await page.waitAndClick("body > header > aside.line-1 > aside > nav > div.right-wrapper > div.log_area > a");
        await page.waitForTimeout(10000);
        const loginForm = await page.isElementVisible("#AccountLogin");
        expect(loginForm).to.be.true;
        const username = await page.isElementVisible("#userName");
        expect(username).to.be.true;
        const password = await page.isElementVisible("#password");
        expect(password).to.be.true;
        const signInButton = await page.isElementVisible("body > header > aside.line-1 > aside > nav > div.right-wrapper > div.log_area > a");
        expect(signInButton).to.be.false;
    }, 20000);

    step('should login to application', async () => {
        // await page.waitAndType("#userName","a4521005@gmail.com")
        // await page.waitAndType("#password","baibai1005")
        // await page.waitAndClick("#login")
        await loginPage.login("a4521005@gmail.com", "baibai1005");
        await page.waitForTimeout(10000);
        const navbar = await page.isElementVisible("body > header > aside.line-2 > aside");
        expect(navbar).to.be.true;
    }, 30000);

    step("should have 7 navbar links", async () => {
        const navbarLinksCount = await page.getCount("body > header > aside.line-2 > aside > aside > nav > aside");
        expect(navbarLinksCount).to.equal(7);
    });
});