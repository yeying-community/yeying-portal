import {AccountManager} from '@yeying-community/yeying-next'
class $account {
  constructor() {
    this.manager = new AccountManager()
    console.log("account:",this.manager)
  }
  getAccout(){
    return this.manager
  }
  getBlockAddress() {
    const info = this.manager.getActiveAccount()
    return this.manager.getBlockAddress(info.did)
  }
  // 根据did判断是否登录
  async isLogin() {
    const info = this.manager.getActiveAccount()

    const {did,name} = info || {}
    if(name=="Guest"){
      await this.manager.login(did)
    }
    const check = this.manager.isLogin(did)
    return !!check
  }
  // 创建游客身份
  async createGuest() {
    const info = await this.manager.createGuest()
    // 登录
    const did = info.metadata.did
    // await this.manager.login(did)
    return info
  }
}
export default new $account()
