// recycle 回收站  区块提供者类，用于与区块链交互，提供数据的获取和存储功能。

// import { ProviderCodeEnum } from '@yeying-community/yeying-client-ts';
// import { ProviderCodeEnum } from '@yeying-community/yeying-web3'
import { applicationProvider, uploader, namespaceProvider, linkProvider, indexedCache } from './account'
import { setLocalStorage, getLocalStorage } from '@/utils/common'
import { createIdentity } from '@yeying-community/yeying-web3'

export interface ApplicationDetail {
    name: string
    description: string
    location: string
    hash: string
    code: string
    serviceCodes: string[]
    avatar: string
    owner: string
}

// 应用编码
export const codeMapTrans = {
    0: 'APPLICATION_CODE_UNKNOWN',
    1: 'APPLICATION_CODE_MARKET',
    2: 'APPLICATION_CODE_ASSET',
    3: 'APPLICATION_CODE_KNOWLEDGE',
    4: 'APPLICATION_CODE_KEEPER',
    5: 'APPLICATION_CODE_SOCIAL',
    6: 'APPLICATION_CODE_WORKBENCH'
}
// 应用依赖的服务编码
export const serviceCodeMapTrans = {
    0: 'SERVICE_CODE_UNKNOWN',
    1: 'SERVICE_CODE_NODE',
    2: 'SERVICE_CODE_WAREHOUSE',
    3: 'SERVICE_CODE_AGENT',
    4: 'SERVICE_CODE_MCP'
}
// // 应用编码
export const codeMap = {
    APPLICATION_CODE_UNKNOWN: '未知',
    APPLICATION_CODE_MARKET: '社区集市',
    APPLICATION_CODE_ASSET: '资产应用',
    APPLICATION_CODE_KNOWLEDGE: '知识库应用',
    APPLICATION_CODE_KEEPER: '智能管家应用',
    APPLICATION_CODE_SOCIAL: '社交应用',
    APPLICATION_CODE_WORKBENCH: '工作台应用'
}
// 应用依赖的服务编码
export const serviceCodeMap = {
    SERVICE_CODE_UNKNOWN: '未知',
    SERVICE_CODE_NODE: '网络节点供应商',
    SERVICE_CODE_WAREHOUSE: '仓储服务供应商',
    SERVICE_CODE_AGENT: '智能体供应商',
    SERVICE_CODE_MCP: '模型上下文供应商'
}
export interface ApplicationMetadata {
    owner?: string;
    network?: string;
    address?: string;
    did?: string;
    version?: number;
    hash?: string;
    name?: string;
    code?: string;
    description?: string;
    location?: string;
    serviceCodes?: string[];
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
    signature?: string;
    codePackagePath?: string;
}
export interface ApplicationSearchCondition {
    code?: string;
    status?: string;
    owner?: string;
    name?: string;
    keyword?: string;
}

const endpoint = import.meta.env.VITE_API_ENDPOINT

class $application {

    /**
     * 应用中心 -> 创建应用
     * @param {*} params 
     */
    async create(params: ApplicationMetadata) {
        await indexedCache.insert('applications', params)
    }
    /**
     * 应用中心 -> 我创建的列表展示接口
     * @param {*} did 
     * @returns 
     */
    async myCreateList(did: string) {
        console.log(`request did=${JSON.stringify(did)}`)
        const res = await indexedCache.indexAll('applications', 'did', did)
        console.log(`response=${JSON.stringify(res)}`)
        return res
    }

    async myCreateDelete(uid: string) {
        console.log(`request did=${JSON.stringify(uid)}`)
        const res = await indexedCache.deleteByKey('applications', uid)
        console.log(`response=${JSON.stringify(res)}`)
        return res
    }

    async myCreateUpdate(params) {
        return await indexedCache.updateByKey("applications", {
            uid: params.uid,
            ...params
        })
    }
    /**
     * 应用中心 -> 我创建的应用详情接口
     * @param {*} uid 
     * @returns 
     */
    async myCreateDetailByUid(uid: string) {
        console.log(`uid=${uid}`)
        const res = await indexedCache.getByKey('applications', uid)
        console.log(`res=${JSON.stringify(res)}`)
        return res
    }

    /**
     * 应用中心 -> 我创建的应用详情接口
     * @param {*} uid 
     * @returns 
     */
    async myCreateDeleteByUid(uid: string) {
        console.log(`uid=${uid}`)
        const res = await indexedCache.deleteByKey('applications', uid)
        console.log(`res=${JSON.stringify(res)}`)
        return res
    }

    async search(condition: ApplicationSearchCondition, page?: number, pageSize?: number) {
        let params: { page?: number; pageSize?: number; condition?: Record<string, any> } = {}
        params.page = page || 1
        params.pageSize = pageSize || 10
        params.condition = condition || {}
        const header = {
            "did": "xxxx"
        }
        const body = {
            "header": header,
            "body": {
                "condition": {
                    "code": condition.code,
                    "owner": condition.owner,
                    "name": condition.name,
                    "keyword": condition.keyword,
                    "status": condition.status
                },
                "page": {
                    "page": page || 1,
                    "pageSize": pageSize || 10
                }
            }
        }
        console.log(`body=${JSON.stringify(body)}`)
        console.log(`endpoint=${endpoint}`)
        const response = await fetch(endpoint + '/api/v1/application/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(body),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to create post: ${response.status}`);
        }

        const r =  await response.json();
        console.log(`r=${JSON.stringify(r)}`)
        return r.body.applications
    }

    async myApplyList(applyOwner: string) {
        console.log(`request applyOwner=${JSON.stringify(applyOwner)}`)
        const res = await indexedCache.indexAll('applications_apply', 'applyOwner', applyOwner)
        console.log(`response=${JSON.stringify(res)}`)
        return res
    }

    async myApplyCreate(params: ApplicationMetadata) {
        await indexedCache.insert('applications_apply', params)
    }

    async myApplyDelete(uid: string) {
        return await indexedCache.deleteByKey("applications_apply", uid)
    }

    async update(params) {
        // return await applicationProvider.create(params);
        // return new Promise((resolve, reject) => {
        //   resolve(params)
        // })
        return await indexedCache.updateByKey("applications", {
            id: params.did,
            ...params
        })
    }

    async myApplyDetail(did, version) {
        return await indexedCache.getByKey("applications", did)
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

    /**
     * 已上线的应用详情
     * @param did 
     * @param version 
     */
    async detail(did: string, version: number) {
        const header = {
            "did": "xxxx"
        }
        const body = {
            "header": header,
            "body": {
                "did": did,
                "version": version
            }
        }
        console.log(`body=${JSON.stringify(body)}`)
        console.log(`endpoint=${endpoint}`)
        const response = await fetch(endpoint + '/api/v1/application/detail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(body),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to create post: ${response.status}`);
        }

        const r =  await response.json();
        console.log(`r=${JSON.stringify(r)}`)
        return r.body.application
    }

    async offline(did, version) {
        return await applicationProvider.offline(did, version)
    }

    async online(application: ApplicationMetadata) {
        const header = {
            "did": "xxxx"
        }
        const body = {
            "header": header,
            "body": {
                "application": application
            }
        }
        console.log(`body=${JSON.stringify(body)}`)
        console.log(`endpoint=${endpoint}`)
        const response = await fetch(endpoint + '/api/v1/application/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(body),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to create post: ${response.status}`);
        }

        const r =  await response.json();
        console.log(`r=${JSON.stringify(r)}`)
        return r.body.application
    }
    async audit(did, version, passed, signature, auditor, comment) {
        return await applicationProvider.audit(did, version, passed, signature, auditor, comment)
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
        const { namespaceId, name, hash, duration, type, visitors = [], description = '' } = data
        const info = await linkProvider.create(namespaceId, name, hash, duration, type, visitors, description)
        return info
    }
}

export default new $application()
