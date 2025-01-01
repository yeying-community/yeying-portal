class $account {
  constructor() {
    this.manager = new YeYing.AccountManager()
    console.log("account:",this.manager)
  }
  login(did) {
    console.log(`${did} has logged in.`)
  }

  logout() {
    console.log(`${this.manager.getActiveAccount()?.did} has logged out.`)
  }
  async createGuest() {
    const info = await this.manager.createGuest()
    return info
  }
}
export default new $account()
