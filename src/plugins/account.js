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
  ServiceProvider,
} from '@yeying-community/yeying-client-ts'
// import {ApplicationProvider} from '@yeying-community/yeying-next'
// import {IdentityCodeEnum, NetworkTypeEnum} from '@yeying-community/yeying-web3'
// import {getLocalStorage} from '@/utils/common'
// import type {CacheTable} from './types'
import { $account } from '@yeying-community/yeying-wallet'

export const TEST_TABLES = [
  {
    name: 'table1',
    key: 'id',
    autoIncrement: false,
    indexes: [
      {
        keyPath: 'name',
        name: 'name',
        unique: false,
      },
    ],
  },
  {
    name: 'addTable',
    key: 'id',
    autoIncrement: false,
    indexes: [
      {
        keyPath: 'name',
        name: 'name',
        unique: false,
      },
    ],
  },
]

let namespaceProvider = null
// let llmManager = null;
// let sessionManager = null;
let uploader = null
// let providerProvider = null;
// let userProvider = null;
let linkProvider = null
// let indexedCache = null;
let applicationProvider = null
let userInfo = null
let auditProvider = null
let serviceCenterProvider = null
let indexedCache = null
// async function open(){
//   const table=[{
//     name: 'messageTB',
//     key: "id",
//     autoIncrement: false,
//     indexes: [
//       {keyPath: "sessionId", name: "sessionId", unique: false},
//       {keyPath: "isStar", name: "isStar", unique: false},
//     ]
//   }]
//   return await indexedCache.open(table)
// }
// 初始化提供者
async function initializeProviders() {
  // if(sessionManager||llmManager)return
  userInfo = await $account.getActiveIdentity()
  console.log('userinfo--->22', userInfo)
  const did = userInfo?.metadata?.did
  let blockAddress = null
  if (did) {
    blockAddress = await $account.getBlockAddress(did)
    console.log('blockAddress--->22', blockAddress)
  }
  // const blockAddress = getLocalStorage('blockAddress')
  if (!blockAddress) return
  // let proxy = getLocalStorage('proxy')||{}
  // let agent = null
  let warehouse = null
  let serviceProvider = null
  if (blockAddress) {
    serviceProvider = await $account.getServicesByCode(
      ServiceCodeEnum.SERVICE_CODE_NODE,
    )

    // agent = await $account.getServicesByCode(ServiceCodeEnum.SERVICE_CODE_AGENT)
    warehouse = await $account.getServicesByCode(
      ServiceCodeEnum.SERVICE_CODE_WAREHOUSE,
    )
  }
  const securityAlgorithm = userInfo?.securityConfig?.algorithm
  const serviceProviderOption = {
    proxy: serviceProvider && serviceProvider[1] && serviceProvider[1].proxy,
    blockAddress,
  }
  // const agentProviderOption = {
  //   proxy:agent&&agent[0]&&agent[0].proxy, blockAddress
  // }
  const warehouseProviderOption = {
    proxy: warehouse && warehouse[0] && warehouse[0].proxy,
    blockAddress,
  }
  // sessionManager = new SessionProvider(agentProviderOption)
  // llmManager = new LlmProvider(agentProviderOption)
  namespaceProvider = new NamespaceProvider(warehouseProviderOption)
  uploader = new Uploader(warehouseProviderOption, securityAlgorithm)
  // providerProvider = new ProviderProvider(agentProviderOption)
  // userProvider = new UserProvider(agentProviderOption)
  linkProvider = new LinkProvider(warehouseProviderOption)
  applicationProvider = new ApplicationProvider(serviceProviderOption)
  indexedCache = new IndexedCache('sessionDB', 2)
  await indexedCache.open(TEST_TABLES)
  // 验证表是否存在
  // const res = await indexedCache.insert(TEST_TABLES[0].name, {
  //   id: "12333455",
  //   description: "test",
  //   name: `alice`,
  // });
  // await indexedCache.cursor(TEST_TABLES[0].name, (r) => {
  //   console.log(`total record=${JSON.stringify(r)}`);
  // });

  auditProvider = new AuditProvider(serviceProviderOption)
  serviceCenterProvider = new ServiceProvider(serviceProviderOption)
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
  indexedCache,
}
// export {applicationProvider,namespaceProvider,llmManager,sessionManager,uploader,providerProvider,linkProvider,initializeProviders,indexedCache,userProvider}
