// recycle 回收站  区块提供者类，用于与区块链交互，提供数据的获取和存储功能。

// import { ProviderCodeEnum } from '@yeying-community/yeying-client-ts';
// import { ProviderCodeEnum } from '@yeying-community/yeying-web3'
import {
  applicationProvider,
  uploader,
  namespaceProvider,
  linkProvider,
  TEST_TABLES,
  indexedCache,
} from './account'
import { setLocalStorage, getLocalStorage } from '@/utils/common'
import { createIdentity } from '@yeying-community/yeying-web3'

// 应用编码
export const codeMapTrans = {
  0: 'APPLICATION_CODE_UNKNOWN',
  1: 'APPLICATION_CODE_MARKET',
  2: 'APPLICATION_CODE_ASSET',
  3: 'APPLICATION_CODE_KNOWLEDGE',
  4: 'APPLICATION_CODE_KEEPER',
  5: 'APPLICATION_CODE_SOCIAL',
  6: 'APPLICATION_CODE_WORKBENCH',
}
// 应用依赖的服务编码
export const serviceCodeMapTrans = {
  0: 'SERVICE_CODE_UNKNOWN',
  1: 'SERVICE_CODE_NODE',
  2: 'SERVICE_CODE_WAREHOUSE',
  3: 'SERVICE_CODE_AGENT',
  4: 'SERVICE_CODE_MCP',
}
// // 应用编码
export const codeMap = {
  APPLICATION_CODE_UNKNOWN: '未知',
  APPLICATION_CODE_MARKET: '社区集市',
  APPLICATION_CODE_ASSET: '资产应用',
  APPLICATION_CODE_KNOWLEDGE: '知识库应用',
  APPLICATION_CODE_KEEPER: '智能管家应用',
  APPLICATION_CODE_SOCIAL: '社交应用',
  APPLICATION_CODE_WORKBENCH: '工作台应用',
}
// 应用依赖的服务编码
export const serviceCodeMap = {
  SERVICE_CODE_UNKNOWN: '未知',
  SERVICE_CODE_NODE: '网络节点供应商',
  SERVICE_CODE_WAREHOUSE: '仓储服务供应商',
  SERVICE_CODE_AGENT: '智能体供应商',
  SERVICE_CODE_MCP: '模型上下文供应商',
}
class $application {
  async search(page, pageSize, condition) {
    let params = {}
    params.page = page || 1
    params.pageSize = pageSize || 10
    params.condition = condition || {}
    return await applicationProvider.search(
      params.page,
      params.pageSize,
      params.condition,
    )
  }

  async myApplySearch() {
    let params = {}
    params.page = page || 1
    params.pageSize = pageSize || 10
    params.condition = condition || {}
    return await applicationProvider.search(
      params.page,
      params.pageSize,
      params.condition,
    )

    // await indexedCache.cursor(TEST_TABLES[0].name, (r) => {
    //   console.log(`total record=${JSON.stringify(r)}`);
    // });
  }

  async myApplyDelete(did) {
    return await indexedCache.deleteByKey(TEST_TABLES[1].name, did, (r) => {
      console.log(`total record=${JSON.stringify(r)}`)
    })
  }

  async create(params) {
    // return await applicationProvider.create(params);
    // return new Promise((resolve, reject) => {
    //   resolve(params)
    // })
    return await indexedCache.insert(TEST_TABLES[1].name, {
      id: params.did,
      ...params,
    })
  }

  async update(params) {
    // return await applicationProvider.create(params);
    // return new Promise((resolve, reject) => {
    //   resolve(params)
    // })
    return await indexedCache.updateByKey(TEST_TABLES[1].name, {
      id: params.did,
      ...params,
    })
  }

  async myApplyDetail(did, version) {
    return await indexedCache.getByKey(TEST_TABLES[1].name, did)
  }

  async createIdentity(template, password) {
    return await createIdentity(template, password)
  }

  async delete(did, version) {
    return await applicationProvider.delete(did, version)
    // return new Promise((resolve, reject) => {
    //   resolve('success')
    // })
  }
  async detail(did, version) {
    return await applicationProvider.detail(did, version)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     address: "1",
    //     avatar: "2",
    //     code: "3",})
    // })
  }
  async offline(did, version) {
    return await applicationProvider.offline(did, version)
  }
  async online(did, version) {
    return await applicationProvider.online(did, version)
    // return new Promise((resolve, reject) => {
    //   resolve('success')
    // })
  }
  async audit(did, version, passed, signature, auditor, comment) {
    return await applicationProvider.audit(
      did,
      version,
      passed,
      signature,
      auditor,
      comment,
    )
    // return new Promise((resolve, reject) => {
    //   resolve("success");
    // });
  }
  getNameSpaceId = async () => {
    let namespaceId = getLocalStorage('namespaceId')
    if (!namespaceId) {
      const nameSpace = await this.creatNameSpace('assistant')
      if (nameSpace.uid) {
        namespaceId = nameSpace.uid
        setLocalStorage('namespaceId', namespaceId)
      }
    }
    return namespaceId
  }
  // 创建默认命名空间
  async creatNameSpace(name) {
    const info = await namespaceProvider.create(name)
    return info
  }
  // 上传文件
  async uploads(file, namespaceId) {
    const asset = await uploader.createAssetMetadataJson(namespaceId, file)
    const info = await uploader.upload(file, asset, (r) => {
      console.log(JSON.stringify(r), '--tt-')
    })
    return info
  }
  // 创建连接
  async createLink(data) {
    const {
      namespaceId,
      name,
      hash,
      duration,
      type,
      visitors = [],
      description = '',
    } = data
    const info = await linkProvider.create(
      namespaceId,
      name,
      hash,
      duration,
      type,
      visitors,
      description,
    )
    return info
  }
}
export default new $application()
