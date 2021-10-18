//Web scraper for books
const puppeteer = require('puppeteer');
const { urlEX2510, urlEX2780Q } = require('./config.js');
const fs = require('fs');
const random_useragent = require('random-useragent');

//EX2510
(async ()=>{
    //Open Browser
    const browser = await puppeteer.launch(
        {
            headless:false,
            executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        }
    )
    const page = await browser.newPage()

    //SetUp Browser
    await page.setDefaultTimeout(30000)
    await page.setViewport({width:1200, height:800})
    await page.setUserAgent(random_useragent.getRandom()) //Make Scraper Undetectable

    //Get data from store
    const name_selector = "body > section.component-container-products.phase3-component-container-products > div > div > div:nth-child(2) > div > h1"
    const price_selector ="body > section.component-container-products.phase3-component-container-products > div > div > div:nth-child(2) > div > div.main_buy > p.component-products-right-price.fontsize-20.component-products-promote-price.promote-price.promote-price-block"
    await page.goto(urlEX2510)
    await page.waitForSelector(name_selector)
    await page.waitForSelector(price_selector)
    const name = await page.$eval(name_selector, e=>e.innerHTML)
    const price = await page.$eval(price_selector, e=>e.innerHTML)
    const nameTrim = name.trim()
    const priceTrim = price.trim()

    //Get current date and time
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const fullDate = `${day}/${month}/${year}`

    console.log(fullDate+" "+nameTrim+" "+priceTrim)

    //Save Data to the text file
    const logger = fs.createWriteStream('log.txt', {flags: 'a'})
    logger.write(`${fullDate} - ${nameTrim} - ${priceTrim}\n`)
    logger.close()

    //close Browser
    await browser.close()
    //here goes scraper code
})().catch(error=>{
    console.log(error)
    process.exit(1)
})

//EX2780Q
;(async ()=>{
    //Open Browser
    const browser = await puppeteer.launch(
        {
            headless:false,
            executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        }
    )
    const page = await browser.newPage()

    //SetUp Browser
    await page.setDefaultTimeout(30000)
    await page.setViewport({width:1200, height:800})
    await page.setUserAgent(random_useragent.getRandom()) //Make Scraper Undetectable

    //Get data from store
    const name_selector = "body > section.component-container-products.phase3-component-container-products > div > div > div:nth-child(2) > div > h1"
    const price_selector ="body > section.component-container-products.phase3-component-container-products > div > div > div:nth-child(2) > div > div.main_buy > p.component-products-right-price.fontsize-20.component-products-promote-price.promote-price.promote-price-block"
    await page.goto(urlEX2780Q)
    await page.waitForSelector(name_selector)
    await page.waitForSelector(price_selector)
    const name = await page.$eval(name_selector, e=>e.innerHTML)
    const price = await page.$eval(price_selector, e=>e.innerHTML)
    const nameTrim = name.trim()
    const priceTrim = price.trim()

    //Get current date and time
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const fullDate = `${day}/${month}/${year}`

    console.log(fullDate+" "+nameTrim+" "+priceTrim)

    //Save Data to the text file
    const logger = fs.createWriteStream('log.txt', {flags: 'a'})
    logger.write(`${fullDate} - ${nameTrim} - ${priceTrim}\n`)
    logger.close()

    //close Browser
    await browser.close()
    //here goes scraper code
})().catch(error=>{
    console.log(error)
    process.exit(1)
})