// recycle 回收站  区块提供者类，用于与区块链交互，提供数据的获取和存储功能。

// import { ProviderCodeEnum } from '@yeying-community/yeying-client-ts';
// import { ProviderCodeEnum } from '@yeying-community/yeying-web3'
import {
  applicationProvider,
  uploader,
  namespaceProvider,
  linkProvider,
} from "./account";
import { setLocalStorage, getLocalStorage } from "@/utils/common";

// 应用编码
export const codeMapTrans = {
  0: "APPLICATION_CODE_UNKNOWN",
  1: "APPLICATION_CODE_MARKET",
  2: "APPLICATION_CODE_ASSET",
  3: "APPLICATION_CODE_KNOWLEDGE",
  4: "APPLICATION_CODE_KEEPER",
  5: "APPLICATION_CODE_SOCIAL",
  6: "APPLICATION_CODE_WORKBENCH",
};
// 应用依赖的服务编码
export const serviceCodeMapTrans = {
  0: "SERVICE_CODE_UNKNOWN",
  1: "SERVICE_CODE_NODE",
  2: "SERVICE_CODE_WAREHOUSE",
  3: "SERVICE_CODE_AGENT",
  4: "SERVICE_CODE_MCP",
};
// // 应用编码
export const codeMap = {
  1: "社区集市",
  2: "资产应用",
  3: "知识库应用",
  4: "智能管家应用",
  5: "社交应用",
  6: "工作台应用",
  0: "未知",
};
// 应用依赖的服务编码
export const serviceCodeMap = {
  1: "网络节点供应商",
  2: "仓储服务供应商",
  3: "智能体供应商",
  4: "模型上下文供应商",
  0: "未知",
};
class $application {
  async search(page, pageSize, condition) {
    let params = {};
    params.page = page || 1;
    params.pageSize = pageSize || 10;
    params.condition = condition || {};
    return await applicationProvider.search(
      params.page,
      params.pageSize,
      params.condition
    );
    // return new Promise((resolve, reject) => {
    //   const rst = [{
    //     address: "1",
    //     avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    //     code: "3",
    //     createdAt: "2022-01-01",
    //     description: "管理系统仓库应用程序。",
    //     did: "5",
    //     hash: "6",
    //     location: "7",
    //     name: "应用名称",
    //     network: "9",
    //     owner: "李湘",
    //     serviceCodes: [],
    //     signature: "11",
    //     updatedAt: "2025-01-01",
    //     version: 1,
    //   },{
    //     address: "1",
    //     avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    //     code: "3",
    //     createdAt: "2022-01-01",
    //     description: "管理系统仓库应用程序。这是一段介绍这是一段介绍这是一段介绍放假啊舒服了卡死发生到了附近卡死了快递发送到发旅客是的发送大家疯狂拉升大幅拉升的减肥了;撒娇大方开朗大方啦睡觉",
    //     did: "5",
    //     hash: "6",
    //     location: "7",
    //     name: "应用名称",
    //     network: "9",
    //     owner: "",
    //     serviceCodes: [],
    //     signature: "11",
    //     updatedAt: "2025-01-01",
    //     version: 1,
    //   },{
    //     address: "1",
    //     avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    //     code: "3",
    //     createdAt: "2022-01-01",
    //     description: "管理系统仓库应用程序。这是一段介绍这是一段介绍这是一段介绍放假啊舒服了卡死发生到了附近卡死了快递发送到发旅客是的发送大家疯狂拉升大幅拉升的减肥了;撒娇大方开朗大方啦睡觉",
    //     did: "5",
    //     hash: "6",
    //     location: "7",
    //     name: "应用名称",
    //     network: "9",
    //     owner: "",
    //     serviceCodes: [],
    //     signature: "11",
    //     updatedAt: "2025-01-01",
    //     version: 1,
    //   },{
    //     address: "1",
    //     avatar: "2",
    //     code: "3",
    //     createdAt: "2022-01-01",
    //     description: "管理系统仓库应用程序。这是一段介绍这是一段介绍这是一段介绍放假啊舒服了卡死发生到了附近卡死了快递发送到发旅客是的发送大家疯狂拉升大幅拉升的减肥了;撒娇大方开朗大方啦睡觉",
    //     did: "5",
    //     hash: "6",
    //     location: "7",
    //     name: "应用名称",
    //     network: "9",
    //     owner: "",
    //     serviceCodes: [],
    //     signature: "11",
    //     updatedAt: "2025-01-01",
    //     version: 1,
    //   }]
    //   resolve(rst)
    // })
  }
  async create(params) {
    return await applicationProvider.create(params);
    // return new Promise((resolve, reject) => {
    //   resolve(params)
    // })
  }
  async delete(did, version) {
    // return await applicationProvider.delete(did,version)
    return new Promise((resolve, reject) => {
      resolve("success");
    });
  }
  async detail(did, version) {
    return await applicationProvider.detail(did, version);
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     address: "1",
    //     avatar: "2",
    //     code: "3",})
    // })
  }
  async offline(did, version) {
    return await applicationProvider.offline(did, version);
  }
  async online(did, version) {
    // return await applicationProvider.online(did,version)
    return new Promise((resolve, reject) => {
      resolve("success");
    });
  }
  async audit(did, version, passed, signature, auditor, comment) {
    return await applicationProvider.audit(
      did,
      version,
      passed,
      signature,
      auditor,
      comment
    );
    // return new Promise((resolve, reject) => {
    //   resolve("success");
    // });
  }
  getNameSpaceId = async () => {
    let namespaceId = getLocalStorage("namespaceId");
    if (!namespaceId) {
      const nameSpace = await this.creatNameSpace("assistant");
      if (nameSpace.uid) {
        namespaceId = nameSpace.uid;
        setLocalStorage("namespaceId", namespaceId);
      }
    }
    return namespaceId;
  };
  // 创建默认命名空间
  async creatNameSpace(name) {
    const info = await namespaceProvider.create(name);
    return info;
  }
  // 上传文件
  async uploads(file, namespaceId) {
    const asset = await uploader.createAssetMetadataJson(namespaceId, file);
    const info = await uploader.upload(file, asset, (r) => {
      console.log(JSON.stringify(r), "--tt-");
    });
    return info;
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
      description = "",
    } = data;
    const info = await linkProvider.create(
      namespaceId,
      name,
      hash,
      duration,
      type,
      visitors,
      description
    );
    return info;
  }
}
export default new $application();
