export default {
  install(app, options) {
    // 创建一个 account 对象
    app.config.globalProperties.$account = {
      manager: new YeYing.AccountManager(),

      login(did) {
        console.log(`${did} has logged in.`)
      },

      logout() {
        console.log(`${this.manager.getActiveAccount()?.did} has logged out.`)
      },
    }
  }
}