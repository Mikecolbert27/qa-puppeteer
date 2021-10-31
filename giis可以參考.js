//Css Selector For The Poster Url
const request = require("request-promise")
const cheerio = require("cheerio")

const sampleResult = {
    title:'	沙丘 (2021)',
    rank:1,
    imdbRating:8.4,
    descriptionUrl:"https://www.imdb.com/title/tt1160419/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=ea4e08e1-c8a3-47b5-ac3a-75026647c16e&pf_rd_r=8X55K5BXN3HNPYBA1VVC&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=moviemeter&ref_=chtmvm_tt_1",
    posterUrl:"https://www.imdb.com/title/tt1160419/mediaviewer/rm2910452737/"
}

async function scrapeTitlesRanksAndRatings(){
    const result = await request.get("https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm")
    const $ = await cheerio.load(result)
    const movies = $("tr").map((i,element)=>{
        const title = $(element).find("td.titleColumn > a").text().trim()
        const imdbRating = $(element).find("td.ratingColumn.imdbRating > strong").text().trim()
        const descriptionUrl = "https://www.imdb.com/"+$(element).find("td.titleColumn > a").attr("href")

        return {title,imdbRating, rank:i, descriptionUrl}
    }).get()
    console.log(movies)
}

scrapeTitlesRanksAndRatings()

// node ./L16/index102.js