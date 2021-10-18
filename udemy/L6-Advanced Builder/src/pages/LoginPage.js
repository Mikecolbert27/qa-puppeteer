export default class LoginPage {
    constructor(page){
        this.page=page
    }
    async login(user_id, user_password){
        await this.page.waitAndType("#userName",user_id)
        await this.page.waitAndType("#password",user_password)
        await this.page.waitAndClick("#login")

    }
}