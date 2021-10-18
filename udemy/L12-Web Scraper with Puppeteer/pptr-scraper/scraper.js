/**
 * Web Scraper for books
 */

const puppeteer = require('puppeteer')
const random_useragent = require('random-useragent')
const fs = require('fs')
const { url } = require('./config')

;(async () => {
  // Open Browser
  const browser = await puppeteer.launch({ headless: true })
  const page = browser.newPage()

  // Setup Browser
  await page.setDefaultTimeout(10000)
  await page.setViewport({ width: 1200, height: 800 })
  await page.setUSerAgent(random_useragent.getRandom())

  // Get Data from Bookstore
  const name_selector = '.product_main > h1'
  const price_selector = '.price_color'
  await page.goto(url)
  await page.waitForSelector(name_selector)
  await page.waitForSelector(price_selector)
  const name = await page.$eval(name_selector, e => e.innerHTML)
  const price = await page.$eval(price_selector, e => e.innerHTML)
  const nameTrim = name.trim()
  const priceTrim = price.trim()

  // Get current date and time
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const fullDate = `${day}/${month}/${year}`

  // Store data into text file
  const logger = fs.createWriteStream('log.txt', { flags: 'a' })
  logger.write(`${fullDate} - ${nameTrim} - ${priceTrim}`)
  logger.close()

  // Close Browser
  await browser.close()
})().catch(error => {
  console.log(error)
  process.exit(1)
})
