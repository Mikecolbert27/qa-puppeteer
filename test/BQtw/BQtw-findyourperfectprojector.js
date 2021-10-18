const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const {click,getText,getCount,shouldNotExist,waitForText} = require('../lib/helper')

describe('Find your perfect projector',()=>{
    let browser
    let page
    before(async function(){
        browser=await puppeteer.launch({
            executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless:false,//有無需要開視窗,false要開,true不開
            slowMo:100,// slow down by 100ms
            devtools:false//有無需要開啟開發人員工具
        })
        page=await browser.newPage()
        await page.setDefaultTimeout(200000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation, page.waitForFunction, page.waitForFileChooser,page.waitForSelector等method的時間，預設是 30 秒
        await page.setDefaultNavigationTimeout(200000)//會修改goto,goBack,goForward,reload, setContent, waitForNavigation等method的時間，預設是 30 秒
    })
    after(async function(){
        await browser.close()
    })

    it('BQtw production - Find your perfect projector',async function(){
        await page.setViewport({width:1200,height:1000})
        //選擇投影機使用環境
        await page.goto('https://www.benq.com/zh-tw/projector/find-your-perfect-projector.html')
        const home = await getText(page, 'body > div.find-your-perfect-product > section:nth-child(3) > div > div.b2c-find-your-perfect-product-col-2.fader > div.col-2-line-1 > div.col-2-line-text')
        expect(home).to.be.a('string','家用')
        console.log(home)
        const company = await getText(page, 'body > div.find-your-perfect-product > section:nth-child(3) > div > div.b2c-find-your-perfect-product-col-2.fader > div.col-2-line-2 > div.col-2-line-text')
        expect(company).to.be.a('string','公司')
        console.log(company)
        await page.waitForSelector('body > div.find-your-perfect-product > section:nth-child(3) > div > div.b2c-find-your-perfect-product-col-2.fader > div.col-2-line-1 > div.img-content-col2')
        await page.waitForSelector('body > div.find-your-perfect-product > section:nth-child(3) > div > div.b2c-find-your-perfect-product-col-2.fader > div.col-2-line-2 > div.img-content-col2')
        await page.waitForTimeout(1000)//等待1000毫秒
        //選擇'家用'
        await page.click('body > div.find-your-perfect-product > section:nth-child(3) > div > div.b2c-find-your-perfect-product-col-2.fader > div.col-2-line-1 > div.img-content-col2')

        //希望的投影畫面大小
        await shouldNotExist(page,'body > div.find-your-perfect-product > section:nth-child(3) > div > div.b2c-find-your-perfect-product-col-2.fader > div.col-2-line-1 > div.img-content-col2')
        await shouldNotExist(page,'body > div.find-your-perfect-product > section:nth-child(3) > div > div.b2c-find-your-perfect-product-col-2.fader > div.col-2-line-2 > div.img-content-col2')
        const smaller = await getText(page, 'body > div.find-your-perfect-product > section:nth-child(4) > div > div.b2c-find-your-perfect-product-col-2.fader > div.col-2-line-1 > div.col-2-line-text')
        expect(smaller).to.be.a('string','小於 100 吋(寬231 x 高135公分)')
        console.log(smaller)
        const bigger = await getText(page, 'body > div.find-your-perfect-product > section:nth-child(4) > div > div.b2c-find-your-perfect-product-col-2.fader > div.col-2-line-2 > div.col-2-line-text')
        expect(bigger).to.be.a('string','大於 100 吋 (寬 231 x 高 135 公分)')
        console.log(bigger)
        await page.waitForSelector('body > div.find-your-perfect-product > section:nth-child(4) > div > div.b2c-find-your-perfect-product-col-2.fader > div.col-2-line-1 > div.img-content-col2 > img')
        await page.waitForSelector('body > div.find-your-perfect-product > section:nth-child(4) > div > div.b2c-find-your-perfect-product-col-2.fader > div.col-2-line-2 > div.img-content-col2 > img')
        await page.waitForTimeout(1000)//等待1000毫秒
        //選擇'小於 100 吋(寬231 x 高135公分)'
        await page.click('body > div.find-your-perfect-product > section:nth-child(4) > div > div.b2c-find-your-perfect-product-col-2.fader > div.col-2-line-1 > div.img-content-col2')

        //投影機到布幕的距離多遠
        await shouldNotExist(page, 'body > div.find-your-perfect-product > section:nth-child(4) > div > div.b2c-find-your-perfect-product-col-2.fader > div.col-2-line-1 > div.img-content-col2 > img')
        await shouldNotExist(page, 'body > div.find-your-perfect-product > section:nth-child(4) > div > div.b2c-find-your-perfect-product-col-2.fader > div.col-2-line-2 > div.img-content-col2 > img')
        const shortest = await getText(page, 'body > div.find-your-perfect-product > section:nth-child(5) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-1 > div.col-3-line-text')
        expect(shortest).to.be.a('string','1.5~2.5 公尺')
        console.log(shortest)
        const medium = await getText(page, 'body > div.find-your-perfect-product > section:nth-child(5) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-2 > div.col-3-line-text')
        expect(medium ).to.be.a('string','2.5~4.0 公尺')
        console.log(medium)
        const longest = await getText(page, 'body > div.find-your-perfect-product > section:nth-child(5) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-3 > div.col-3-line-text')
        expect(longest).to.be.a('string','2.5~4.0 公尺')
        console.log(longest)
        await page.waitForSelector('body > div.find-your-perfect-product > section:nth-child(5) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-1 > div.img-content-col3 > img')
        await page.waitForSelector('body > div.find-your-perfect-product > section:nth-child(5) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-2 > div.img-content-col3 > img')
        await page.waitForSelector('body > div.find-your-perfect-product > section:nth-child(5) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-3 > div.img-content-col3 > img')
        await page.waitForTimeout(1000)//等待1000毫秒
        //選擇'1.5~2.5 公尺'
        await page.click('body > div.find-your-perfect-product > section:nth-child(5) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-1 > div.img-content-col3 > img')

        //投影機到布幕的距離多遠
        await shouldNotExist(page, 'body > div.find-your-perfect-product > section:nth-child(5) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-1 > div.img-content-col3 > img')
        await shouldNotExist(page, 'body > div.find-your-perfect-product > section:nth-child(5) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-2 > div.img-content-col3 > img')
        await shouldNotExist(page, 'body > div.find-your-perfect-product > section:nth-child(5) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-3 > div.img-content-col3 > img')
        const strongLight = await getText(page, 'body > div.find-your-perfect-product > section:nth-child(6) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-1 > div.col-3-line-text')
        expect(strongLight).to.be.a('string','明亮環境(客廳 房間) (大於300 LUX)')
        console.log(strongLight)
        const lowLight = await getText(page, 'body > div.find-your-perfect-product > section:nth-child(6) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-2 > div.col-3-line-text')
        expect(lowLight).to.be.a('string','微光環境(可關燈、有窗簾的客廳 房間) (介於10~300 LUX之間)')
        console.log(lowLight)
        const noLight = await getText(page, 'body > div.find-your-perfect-product > section:nth-child(6) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-3 > div.col-3-line-text')
        expect(noLight).to.be.a('string','關燈環境(全暗客廳 房間 視聽室) (小於10 LUX)')
        console.log(noLight)
        await page.waitForSelector('body > div.find-your-perfect-product > section:nth-child(6) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-1 > div.img-content-col3 > img')
        await page.waitForSelector('body > div.find-your-perfect-product > section:nth-child(6) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-2 > div.img-content-col3 > img')
        await page.waitForSelector('body > div.find-your-perfect-product > section:nth-child(6) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-3 > div.img-content-col3 > img')
        await page.waitForTimeout(1000)//等待1000毫秒
        //選擇明亮環境 (客廳 房間) (大於 300 LUX)
        await page.click('body > div.find-your-perfect-product > section:nth-child(6) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-1 > div.img-content-col3 > img')

        // 哪一個是你最在乎的需求
        await shouldNotExist(page, 'body > div.find-your-perfect-product > section:nth-child(6) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-1 > div.img-content-col3 > img')
        await shouldNotExist(page, 'body > div.find-your-perfect-product > section:nth-child(6) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-2 > div.img-content-col3 > img')
        await shouldNotExist(page, 'body > div.find-your-perfect-product > section:nth-child(6) > div > div.b2c-find-your-perfect-product-col-3.fader > div.col-3-line-3 > div.img-content-col3 > img')
        const soapoperaAndMovie = await getText(page, 'body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-1 > div.col-5-line-text')
        expect(soapoperaAndMovie).to.be.a('string','追劇 看電影')
        console.log(soapoperaAndMovie)
        const game = await getText(page, 'body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-2 > div.col-5-line-text')
        expect(game).to.be.a('string','打電動')
        console.log(game)
        const ballGame = await getText(page, 'body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-3 > div.col-5-line-text')
        expect(ballGame).to.be.a('string','看球賽')
        console.log(ballGame)
        const youtube = await getText(page, 'body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-4 > div.col-5-line-text')
        expect(youtube).to.be.a('string','看串流影音 (Youtube… 等)')
        console.log(youtube)
        const portable = await getText(page, 'body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-5 > div.col-5-line-text')
        expect(portable).to.be.a('string','攜帶方便')
        console.log(portable)

        await page.waitForSelector('body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-1 > div.img-content-col5 > img')
        await page.waitForSelector('body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-2 > div.img-content-col5 > img')
        await page.waitForSelector('body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-3 > div.img-content-col5 > img')
        await page.waitForSelector('body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-4 > div.img-content-col5 > img')
        await page.waitForSelector('body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-5 > div.img-content-col5 > img')
        await page.waitForTimeout(1000)//等待1000毫秒
        //選擇追劇 看電影
        await page.click('body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-1 > div.img-content-col5 > img')

        //分析中
        await shouldNotExist(page, 'body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-1 > div.img-content-col5 > img')
        await shouldNotExist(page, 'body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-2 > div.img-content-col5 > img')
        await shouldNotExist(page, 'body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-3 > div.img-content-col5 > img')
        await shouldNotExist(page, 'body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-4 > div.img-content-col5 > img')
        await shouldNotExist(page, 'body > div.find-your-perfect-product > section:nth-child(7) > div > div.b2c-find-your-perfect-product-col-5.fader > div.col-5-line-5 > div.img-content-col5 > img')
        await page.waitForTimeout(5000)//等待5000毫秒(等待分析時間)
        
        //最佳推薦
        await page.waitForSelector('body > section')
        const recommend = await getText(page, 'body > section > section.b2c-find-your-perfect-product-result-sec > div > div.b2c-find-your-perfect-product-result-good-match-title')
        expect(recommend).to.be.a('string','最佳推薦')
        console.log(recommend)
        const bestRecommend = await getText(page, 'body > section > section.b2c-find-your-perfect-product-result-product-sec.clearfix > div.product-right > div.product-title')
        expect(bestRecommend).to.be.a('string','低延遲輸入 遊戲短焦三坪機｜W1210ST')
        console.log('最佳推薦',bestRecommend)
        const mayLikeFirst = await getText(page, 'body > section > section.b2c-find-your-perfect-product-result-compare-sec > div.b2c-find-your-perfect-product-result-compare-sec-list > div > a:nth-child(1) > div > div.compare-product-title')
        expect(mayLikeFirst).to.be.a('string','W2700i')
        console.log('您可能也會喜歡',mayLikeFirst)
        const mayLikeSecond = await getText(page, 'body > section > section.b2c-find-your-perfect-product-result-compare-sec > div.b2c-find-your-perfect-product-result-compare-sec-list > div > a:nth-child(2) > div > div.compare-product-title')
        expect(mayLikeSecond).to.be.a('string','W5700')
        console.log('您可能也會喜歡',mayLikeSecond)
        const mayLikeThird = await getText(page, 'body > section > section.b2c-find-your-perfect-product-result-compare-sec > div.b2c-find-your-perfect-product-result-compare-sec-list > div > a:nth-child(3) > div > div.compare-product-title')
        expect(mayLikeThird).to.be.a('string','W1700M')
        console.log('您可能也會喜歡',mayLikeThird)
        })
})
