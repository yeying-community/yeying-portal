import {AccountManager} from '@yeying-community/yeying-next'
import {IdentityCodeEnum, NetworkTypeEnum} from '@yeying-community/yeying-web3'

export default {
  install(app, options) {
    // 创建一个 account 对象
    app.config.globalProperties.$identity = {
      manager: new AccountManager(),

      async createPersonal(parent, name, description, avatar, password, extend) {
        return await this.manager.createIdentity(password, {
          network: NetworkTypeEnum.NETWORK_TYPE_YEYING,
          name: name,
          code: IdentityCodeEnum.IDENTITY_CODE_PERSONAL,
          avatar: avatar,
          description: description,
          extend: extend,
        })
      },
    }
  }
}