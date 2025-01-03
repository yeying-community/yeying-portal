import {AccountManager} from '@yeying-community/yeying-next'
class $account {
  constructor() {
    this.manager = new AccountManager()
    console.log("account:",this.manager)
  }
  // 根据did判断是否登录
  isLogin() {
    const did = localStorage.getItem("did");
    if(did){
      const check = this.manager.isLogin(did)
      return !!check
    }
    return false
  }
  // 创建游客身份
  async createGuest() {
    const info = await this.manager.createGuest()
    // 登录
    const did = info.metadata.did
    this.manager.login(did)
    localStorage.setItem("did", did)
    return info
  }
}
export default new $account()
