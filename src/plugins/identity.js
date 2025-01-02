import {AccountManager} from '@yeying-community/yeying-next'
import {IdentityCodeEnum, NetworkTypeEnum} from '@yeying-community/yeying-web3'

class $identity {
  constructor() {
    this.manager = new AccountManager()
    console.log("identity:",this.manager)
  }
  async createPersonal(parent, name, description, avatar, password, extend) {
    const identity = await this.manager.createIdentity(password, {
      network: NetworkTypeEnum.NETWORK_TYPE_YEYING,
      name: name,
      code: IdentityCodeEnum.IDENTITY_CODE_PERSONAL,
      avatar: avatar,
      description: description,
      extend: extend,
    })
    const proxy = `http://${window.location.hostname}:${window.location.port}`
    const service = await this.manager.getNode(proxy)
    console.log(`whoami=${JSON.stringify(service)}`)
    return identity
  }
}
export default new $identity()
