import { indexedCache } from './account'
import { userInfo } from '@/plugins/account'

export const ApplyStatusMap = {
    1: '申请中',
    2: '已取消',
    3: '申请通过',
    4: '申请驳回'
}

// // 应用编码
export const codeMap = {
    SERVICE_CODE_UNKNOWN: '未知',
    SERVICE_CODE_NODE: '节点服务',
    SERVICE_CODE_WAREHOUSE: '资产服务',
    SERVICE_CODE_AGENT: '代理服务',
    SERVICE_CODE_MCP: 'MCP服务',
    SERVICE_CODE_RAG: '检索服务',
    SERVICE_CODE_CORRECTION: '修正服务'
}
// 应用依赖的服务编码
export const serviceCodeMap = {
    API_CODE_UNKNOWN: '未知编码',
    API_CODE_USER: '用户编码',
    API_CODE_IDENTITY: '身份编码',
    API_CODE_LLM_SERVICE: '大模型服务编码',
    API_CODE_LLM_PROVIDER: '供应商服务编码',
    API_CODE_ASSET_SERVICE: '资产服务编码',
    API_CODE_ASSET_BLOCK: '资产块编码',
    API_CODE_ASSET_LINK: '资产链接编码',
    API_CODE_ASSET_NAMESPACE: '资产工作空间编码',
    API_CODE_ASSET_RECYCLE: '资产回收站编码',
    API_CODE_CERTIFICATE: '认证编码',
    API_CODE_STORAGE: '存储编码',
    API_CODE_APPLICATION: '应用编码',
    API_CODE_EVENT: '事件编码',
    API_CODE_INVITATION: '邀请编码',
    API_CODE_SERVICE: '服务编码',
    API_CODE_RAG: '检索编码',
}

export interface ServiceSearchCondition {
    code?: string;
    owner?: string;
    name?: string;
    keyword?: string;
}

export enum CommonServiceCodeEnum {
    SERVICECODEUNKNOWN = 'SERVICE_CODE_UNKNOWN',
    SERVICECODENODE = 'SERVICE_CODE_NODE',
    SERVICECODEWAREHOUSE = 'SERVICE_CODE_WAREHOUSE',
    SERVICECODEAGENT = 'SERVICE_CODE_AGENT',
    SERVICECODEMCP = 'SERVICE_CODE_MCP',
    SERVICECODERAG = 'SERVICE_CODE_RAG',
    SERVICECODECORRECTION = 'SERVICE_CODE_CORRECTION'
}

export enum CommonApiCodeEnum {
    APICODEUNKNOWN = 'API_CODE_UNKNOWN',
    APICODEUSER = 'API_CODE_USER',
    APICODEIDENTITY = 'API_CODE_IDENTITY',
    APICODELLMSERVICE = 'API_CODE_LLM_SERVICE',
    APICODELLMPROVIDER = 'API_CODE_LLM_PROVIDER',
    APICODEASSETSERVICE = 'API_CODE_ASSET_SERVICE',
    APICODEASSETBLOCK = 'API_CODE_ASSET_BLOCK',
    APICODEASSETLINK = 'API_CODE_ASSET_LINK',
    APICODEASSETNAMESPACE = 'API_CODE_ASSET_NAMESPACE',
    APICODEASSETRECYCLE = 'API_CODE_ASSET_RECYCLE',
    APICODECERTIFICATE = 'API_CODE_CERTIFICATE',
    APICODESTORAGE = 'API_CODE_STORAGE',
    APICODEAPPLICATION = 'API_CODE_APPLICATION',
    APICODEEVENT = 'API_CODE_EVENT',
    APICODEINVITATION = 'API_CODE_INVITATION',
    APICODESERVICE = 'API_CODE_SERVICE',
    APICODERAG = 'API_CODE_RAG'
}

export interface ServiceMetadata {
    owner?: string;
    ownerName?: string
    network?: string;
    address?: string;
    did?: string;
    version?: number;
    name?: string;
    description?: string;
    code?: string;
    apiCodes?: string[];
    proxy?: string;
    grpc?: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
    signature?: string;
    codePackagePath?: string;
}


const endpoint = import.meta.env.VITE_API_ENDPOINT
class $service {
    async search(condition: ServiceSearchCondition, page?: number, pageSize?: number) {
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
                    "keyword": condition.keyword
                },
                "page": {
                    "page": page || 1,
                    "pageSize": pageSize || 10
                }
            }
        }
        console.log(`body=${JSON.stringify(body)}`)
        console.log(`endpoint=${endpoint}`)
        const response = await fetch(endpoint + '/api/v1/service/search', {
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
        return r.body.services
    }

    async create(params: ServiceMetadata) {
        params.ownerName = userInfo?.metadata?.name
        await indexedCache.insert('services', params)
    }

    async myCreateList(did: string) {
        console.log(`request did=${JSON.stringify(did)}`)
        const res = await indexedCache.indexAll('services', 'owner', did)
        console.log(`response=${JSON.stringify(res)}`)
        return res
    }

    async myApplyList(applyOwner: string) {
        console.log(`request applyOwner=${JSON.stringify(applyOwner)}`)
        const res = await indexedCache.indexAll('services_apply', 'applyOwner', applyOwner)
        console.log(`response=${JSON.stringify(res)}`)
        return res
    }

    async myCreateDetailByUid(uid: string) {
        console.log(`uid=${uid}`)
        const res = await indexedCache.getByKey('services', uid)
        console.log(`res=${JSON.stringify(res)}`)
        return res
    }

    async myCreateUpdate(params) {
        params.ownerName = userInfo?.metadata?.name
        return await indexedCache.updateByKey("services", {
            uid: params.uid,
            ...params
        })
    }

    async myCreateDelete(uid: string) {
        console.log(`request did=${JSON.stringify(uid)}`)
        const res = await indexedCache.deleteByKey('services', uid)
        console.log(`response=${JSON.stringify(res)}`)
        return res
    }

    async myApplyDelete(uid: string) {
        return await indexedCache.deleteByKey("services_apply", uid)
    }

    async online(service: ServiceMetadata) {
        const header = {
            "did": "xxxx"
        }
        const body = {
            "header": header,
            "body": {
                "service": service
            }
        }
        console.log(`body=${JSON.stringify(body)}`)
        console.log(`endpoint=${endpoint}`)
        const response = await fetch(endpoint + '/api/v1/service/create', {
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
        return r.body.service
    }

    /**
     * 已上线的服务详情
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
        const response = await fetch(endpoint + '/api/v1/service/detail', {
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
        return r.body.service
    }

    async myApplyCreate(params: ServiceMetadata) {
        params.ownerName = userInfo?.metadata?.name
        await indexedCache.insert('services_apply', params)
    }

    async offline(did: string, version: number) {
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
        const response = await fetch(endpoint + '/api/v1/service/delete', {
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
        return r.body.status
    }

    async unbind(uid: string) {
        await indexedCache.deleteByKey('services_apply', uid)
    }
}
export default new $service()
