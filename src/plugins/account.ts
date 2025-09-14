import { IndexedCache } from '@yeying-community/yeying-next'

import {
    ServiceCodeEnum,
    // ProviderCodeEnum,
    // SessionProvider,
    // LlmProvider,
    NamespaceProvider,
    Uploader,
    // ProviderProvider,
    // UserProvider,
    LinkProvider,
    ApplicationProvider,
    AuditProvider,
    ServiceProvider
} from '@yeying-community/yeying-client-ts'
// import {ApplicationProvider} from '@yeying-community/yeying-next'
// import {IdentityCodeEnum, NetworkTypeEnum} from '@yeying-community/yeying-web3'
// import {getLocalStorage} from '@/utils/common'
// import type {CacheTable} from './types'
import { $account } from '@yeying-community/yeying-wallet'
import $service from "@/plugins/service";

let namespaceProvider = null
let uploader = null
let linkProvider = null
let applicationProvider = null
let userInfo = null
let auditProvider = null
let serviceCenterProvider = null
let indexedCache: IndexedCache = null

// 初始化提供者
async function initializeProviders() {
    // if(sessionManager||llmManager)return
    userInfo = await $account.getActiveIdentity()
    const did = userInfo?.metadata?.did
    let blockAddress = null
    if (did) {
        blockAddress = await $account.getBlockAddress(did)
    }
    // const blockAddress = getLocalStorage('blockAddress')
    if (!blockAddress) return
    // let proxy = getLocalStorage('proxy')||{}
    // let agent = null
    let warehouse = null
    let serviceProvider = null
    if (blockAddress) {
        serviceProvider = await $service.search(1, 10, {"code": "SERVICE_CODE_NODE"})
        warehouse = await $service.search(1, 10, {"code": "SERVICE_CODE_WAREHOUSE"})
    }
    const securityAlgorithm = userInfo?.securityConfig?.algorithm
    const serviceProviderOption = {
        proxy: serviceProvider && serviceProvider[1] && serviceProvider[1].proxy,
        blockAddress
    }
    // const agentProviderOption = {
    //   proxy:agent&&agent[0]&&agent[0].proxy, blockAddress
    // }
    const warehouseProviderOption = {
        proxy: warehouse && warehouse[0] && warehouse[0].proxy,
        blockAddress
    }
    // sessionManager = new SessionProvider(agentProviderOption)
    // llmManager = new LlmProvider(agentProviderOption)
    namespaceProvider = new NamespaceProvider(warehouseProviderOption)
    uploader = new Uploader(warehouseProviderOption, securityAlgorithm)
    // providerProvider = new ProviderProvider(agentProviderOption)
    // userProvider = new UserProvider(agentProviderOption)
    linkProvider = new LinkProvider(warehouseProviderOption)
    applicationProvider = new ApplicationProvider(serviceProviderOption)
    indexedCache = new IndexedCache('yeying-protal', 1)
    await indexedCache.open([
        {
            // 表名
            name: 'applications', 
            // 主键字段
            key: 'uid', 
            // 主键是否自增，走采用 uuid 作为主键
            autoIncrement: false, 
            // 索引：keyPath 表示列名； name 表示索引名； unique 表示字段值是否唯一
            indexes: [{ keyPath: 'did', name: 'did', unique: false }]
        },
        {
            name: 'services',
            key: 'uid',
            autoIncrement: false,
            indexes: [{ keyPath: 'did', name: 'did', unique: false }]
        }
    ])

    auditProvider = new AuditProvider(serviceProviderOption)
    serviceCenterProvider = new ServiceProvider(serviceProviderOption)
    console.log("初始化结束")
}
// 页面加载时初始化提供者
// if (typeof window !== 'undefined') {
//   window.addEventListener('load', () => {
//     initializeProviders();
//   });
// }
export {
    applicationProvider,
    initializeProviders,
    namespaceProvider,
    uploader,
    linkProvider,
    auditProvider,
    userInfo,
    serviceCenterProvider,
    indexedCache
}
// export {applicationProvider,namespaceProvider,llmManager,sessionManager,uploader,providerProvider,linkProvider,initializeProviders,indexedCache,userProvider}
