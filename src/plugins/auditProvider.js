// recycle 回收站  区块提供者类，用于与区块链交互，提供数据的获取和存储功能。

// import { ProviderCodeEnum } from '@yeying-community/yeying-client-ts';
// import { ProviderCodeEnum } from '@yeying-community/yeying-web3'
import { auditProvider } from './account'

class $auditProvider {
    async create(params) {
        console.log(params, '--params666-')
        return await auditProvider.create(params)
        // return new Promise((resolve, reject) => {
        //   resolve(params)
        // })
    }
}
export default new $auditProvider()
