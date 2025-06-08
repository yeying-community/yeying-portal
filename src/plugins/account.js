// import {
//   IndexedCache,
//   } 
// from '@yeying-community/yeying-next'
import {ServiceCodeEnum, 
  // ProviderCodeEnum,
  // SessionProvider, 
  // LlmProvider, 
  // NamespaceProvider, 
  // Uploader,
  // ProviderProvider,
  // UserProvider,
  // LinkProvider,
  // ApplicationProvider
} from '@yeying-community/yeying-client-ts'
// import {ApplicationProvider} from '@yeying-community/yeying-next'
// import {IdentityCodeEnum, NetworkTypeEnum} from '@yeying-community/yeying-web3'
// import {getLocalStorage} from '@/utils/common'
// import type {CacheTable} from './types'
import {$account} from '@yeying-community/yeying-wallet';

// let namespaceProvider = null;
// let llmManager = null;
// let sessionManager = null;
// let uploader = null;
// let providerProvider = null;
// let userProvider = null;
// let linkProvider = null;
// let indexedCache = null;
let applicationProvider = null;

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
  const userInfo = await $account.getActiveIdentity()
  console.log('userinfo--->22',userInfo)
  const did = userInfo?.metadata?.did
  let blockAddress = null
  if(did){
    blockAddress = await $account.getBlockAddress(did)
    console.log('blockAddress--->22',blockAddress)
  }
  // const blockAddress = getLocalStorage('blockAddress')
  if(!blockAddress)return
  // let proxy = getLocalStorage('proxy')||{}
  let agent = null
  let warehouse = null
  if(blockAddress){
    agent = await $account.getServicesByCode(ServiceCodeEnum.SERVICE_CODE_AGENT)
    warehouse = await $account.getServicesByCode(ServiceCodeEnum.SERVICE_CODE_WAREHOUSE)
  }

  const securityAlgorithm = userInfo?.securityConfig?.algorithm
  const agentProviderOption = {
    proxy:agent, blockAddress
  }
  const warehouseProviderOption = {
    proxy:warehouse, blockAddress
  }
  // sessionManager = new SessionProvider(agentProviderOption)
  // llmManager = new LlmProvider(agentProviderOption)
  // namespaceProvider = new NamespaceProvider(warehouseProviderOption)
  // uploader = new Uploader(warehouseProviderOption, securityAlgorithm);
  // providerProvider = new ProviderProvider(agentProviderOption)
  // userProvider = new UserProvider(agentProviderOption)
  // linkProvider = new LinkProvider(warehouseProviderOption);
  // applicationProvider = new ApplicationProvider(agentProviderOption);
  // indexedCache = new IndexedCache("sessionDB",1)
  // open()
}
// 页面加载时初始化提供者
// if (typeof window !== 'undefined') {
//   window.addEventListener('load', () => {
//     initializeProviders();
//   });
// }
export {applicationProvider,initializeProviders}
// export {applicationProvider,namespaceProvider,llmManager,sessionManager,uploader,providerProvider,linkProvider,initializeProviders,indexedCache,userProvider}
