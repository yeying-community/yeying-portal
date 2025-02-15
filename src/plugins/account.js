import {IdentityManager} from '@yeying-community/yeying-next'
import {IdentityCodeEnum, NetworkTypeEnum} from '@yeying-community/yeying-web3'
class $account {
  constructor() {
    this.manager = new IdentityManager()
    this.codeList = [
      { id: null, name: '请选择' },
      {name:"个人",id:1,},
      {name:"组织",id:2,},
      {name:"服务",id:3,},
      {name:"应用",id:4,},
      {name:"资产",id:5,},
    ]
    this.codeMap = {
      1: IdentityCodeEnum.IDENTITY_CODE_PERSONAL,
      2: IdentityCodeEnum.IDENTITY_CODE_ORGANIZATION,
      3: IdentityCodeEnum.IDENTITY_CODE_SERVICE,
      4: IdentityCodeEnum.IDENTITY_CODE_APPLICATION,
      5: IdentityCodeEnum.IDENTITY_CODE_ASSET
    }
    this.networkList = [
      { id: null, name: '请选择' },
      {name:"夜莺网络",id:2020,}
    ]
    this.networkMap = {
      2020: NetworkTypeEnum.NETWORK_TYPE_YEYING
    }
    // this.mail = new MailProvider()
    console.log("account:",this.manager)
  }
  // 获取指定 DID 对应的区块链地址。
  getBlockAddress(did) {
    return this.manager.getBlockAddress(did)
  }
  // 导出身份信息。
  async exportIdentity(did){
    const identity = await this.manager.exportIdentity(did);
    return identity
  }
  // 登录
  async login(did,password){
    const Account = await this.manager.login(did,password)
    return Account
  }
  // 注册:创建一个新的身份，并在区块链上生成地址。
  async createIdentity(password, pamras){
    const template = {
      network: this.networkMap[pamras.network],
      name: pamras.name,
      code: this.codeMap[pamras.code],}
    const newIdentity = await this.manager.createIdentity(password, template);
    return newIdentity
  }
  // 登录导入身份信息。
  async importIdentity(code, pwd){
    const Identity = await this.manager.importIdentity(code, pwd)
    return Identity
  }
  // 获取当前激活的账号信息。
  async getActiveIdentity(){
    const activeAccount = await this.manager.getActiveIdentity()
    return activeAccount
  }
  // 获取当前激活的账号信息。
  getActiveDid(){
    const did = this.manager.getActiveDid()
    return did
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
