const puppeteer = require('puppeteer');

(async()=>{
    //FakingGeolocations
    const browser = await puppeteer.launch(
        {
            headless:false,
            executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        }
    )
    const page = await browser.newPage()

    //Grant permissins for geolocation change(設定假的地理資訊)
    const context = browser.defaultBrowserContext()
    await context.overridePermissions('https://www.benq.com/en-us/index.html', ['geolocation'])
    await page.goto('https://www.benq.com/en-us/index.html')
    await page.waitForSelector('body')

    //change geolocation to the NewYork(設定紐約地理資訊)
    var latitudeNY = 43.095654 
    var longitudeNY = Math.abs(75.669487); //轉成負數
    await page.setGeolocation({latitude:latitudeNY, longitude:longitudeNY})

    await browser.close()
})()