// recycle 回收站  区块提供者类，用于与区块链交互，提供数据的获取和存储功能。

// import { ProviderCodeEnum } from '@yeying-community/yeying-client-ts';
// import { ProviderCodeEnum } from '@yeying-community/yeying-web3'
import { applicationProvider } from './account'

class $application {
  async search(page,pageSize,condition){
    let params = {}
    params.page = page||1
    params.pageSize = pageSize||10
    params.condition = condition||{}
    return await applicationProvider.search(params.page,params.pageSize,params.condition)
  }
  
}
export default new $application()