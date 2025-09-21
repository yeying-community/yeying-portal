import { IndexedCache } from '@yeying-community/yeying-next'

import {
    NamespaceProvider,
    Uploader,
    LinkProvider,
    ApplicationProvider,
    AuditProvider,
    ServiceProvider
} from '@yeying-community/yeying-client-ts'

import { $account } from '@yeying-community/yeying-wallet'
import $service from "@/plugins/service";
import { Identity, SecurityAlgorithm } from '@yeying-community/yeying-web3';

let namespaceProvider = null
let uploader = null
let linkProvider = null
let applicationProvider = null
let userInfo: Identity | null | undefined = null
let auditProvider = null
let serviceCenterProvider = null
let indexedCache: IndexedCache = new IndexedCache('yeying-protal', 1)

// 初始化提供者
async function initializeProviders() {
    userInfo = await $account.getActiveIdentity()
    const did = userInfo?.metadata?.did
    let blockAddress = null
    if (did) {
        blockAddress = await $account.getBlockAddress(did)
    }
    if (!blockAddress) return
    let warehouse = null
    let serviceProvider = null
    if (blockAddress) {
        serviceProvider = await $service.search(1, 10, {"code": "SERVICE_CODE_NODE"})
        warehouse = await $service.search(1, 10, {"code": "SERVICE_CODE_WAREHOUSE"})
    }
    const securityAlgorithm = userInfo?.securityConfig?.algorithm as SecurityAlgorithm
    const serviceProviderOption = {
        proxy: serviceProvider && serviceProvider[1] && serviceProvider[1].proxy,
        blockAddress
    }
    const warehouseProviderOption = {
        proxy: warehouse && warehouse[0] && warehouse[0].proxy,
        blockAddress
    }
    namespaceProvider = new NamespaceProvider(warehouseProviderOption)
    uploader = new Uploader(warehouseProviderOption, securityAlgorithm)
    linkProvider = new LinkProvider(warehouseProviderOption)
    applicationProvider = new ApplicationProvider(serviceProviderOption)
    
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
        },
        {
            // 表名
            name: 'applications_apply', 
            // 主键字段
            key: 'uid', 
            // 主键是否自增，走采用 uuid 作为主键
            autoIncrement: false, 
            // 索引：keyPath 表示列名； name 表示索引名； unique 表示字段值是否唯一
            indexes: [{ keyPath: 'applyOwner', name: 'applyOwner', unique: false }]
        },
        {
            name: 'services_apply',
            key: 'uid',
            autoIncrement: false,
            indexes: [{ keyPath: 'applyOwner', name: 'applyOwner', unique: false }]
        }
    ])

    auditProvider = new AuditProvider(serviceProviderOption)
    serviceCenterProvider = new ServiceProvider(serviceProviderOption)
}

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
