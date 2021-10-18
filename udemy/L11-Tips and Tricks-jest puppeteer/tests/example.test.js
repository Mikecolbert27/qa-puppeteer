describe('Google HomePage',()=>{
    beforeAll(async()=>{
        await page.goto('https://google.com')
    })

    it('should load google home page', async()=>{
        await page.waitForSelector('input[name="q"]')
        let title = await page.title()
        console.log("Title IS :"+title)
    },15000)
})