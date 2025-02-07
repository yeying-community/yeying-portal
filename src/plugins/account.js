import {AccountManager} from '@yeying-community/yeying-next'
class $account {
  constructor() {
    this.manager = new AccountManager()
    console.log("account:",this.manager)
  }
  // 获取指定 DID 对应的区块链地址。
  getBlockAddress(did) {
    return this.manager.getBlockAddress(did)
  }
  // 导出身份信息。
  async exportIdentity(did){
    const identity = await exportIdentity(did);
    return identity
  }
  // 登录
  async login(did,password){
    const Account = await this.manager.login(did,password)
    return Account
  }
  // 注册:创建一个新的身份，并在区块链上生成地址。
  async createIdentity(password, template){
    const newIdentity = await this.manager.createIdentity(password, template);
    return newIdentity
  }
  // 登录导入身份信息。
  async importIdentity(code){
    const Identity = await this.manager.importIdentity(code)
    return Identity
  }
  // 获取当前激活的账号信息。
  getActiveAccount(){
    const activeAccount = this.manager.getActiveAccount()
    return activeAccount
  }
  // 根据did判断是否登录
  isLogin(did) {
    const check = this.manager.isLogin(did)
    return !!check
  }
  // 创建游客身份
  // async createGuest() {
  //   const info = await this.manager.createGuest()
  //   // 登录
  //   const did = info.metadata.did
  //   // await this.manager.login(did)
  //   return info
  // }
}
export default new $account()
