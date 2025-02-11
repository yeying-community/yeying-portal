import {SupportProvider, Authenticate} from '@yeying-community/yeying-next'
import $account from './account'
// import {Authenticate} from "../../../src/provider/common/authenticate";
// import {SupportProvider} from "../../../src/provider/support/support";
// import {getBlockAddress, getProvider} from "../common/common";
// import {ProviderOption} from "../../../src/provider/common/model";
// import {ServiceCodeEnum} from "../../../src/yeying/api/common/code_pb";



// describe('Support', () => {
//     it('faq', async () => {
//         const supportProvider = new SupportProvider(new Authenticate(blockAddress), provider)
//         await supportProvider.collectFaq("feature", 'test@gmail.com', "for test.")
//         console.log(`Success to collect faq=${blockAddress.identifier}`)
//     })
// })
class $surpport {
  constructor() {
    // this.getProvider()
  }
  getProvider(){
    const blockAddress = $account.getBlockAddress()
    const providerOptions = {proxy: "http://47.116.123.62:8441"}
    this.provider = new SupportProvider(new Authenticate(blockAddress), providerOptions)
  }

  // 联系我们
  async handleContact(form) {
    this.getProvider()
    console.log("collect faq data:", form)
    const info = await this.provider.collectFaq(form.pro_type, form.email, form.describe)
    return info
  }
}
export default new $surpport()