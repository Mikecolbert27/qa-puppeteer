export default class HomePage{
    constructor(page){
        this.page=page
    }
    async visit(){
        await this.page.goto('https://www.benq.com/en-us/index.html')
    }
}
