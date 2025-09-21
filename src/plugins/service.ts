import { indexedCache } from './account'

export const ApplyStatusMap = {
    1: '申请中',
    2: '已取消',
    3: '申请通过',
    4: '申请驳回'
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
    network?: string;
    address?: string;
    did?: string;
    version?: number;
    name?: string;
    description?: string;
    code?: CommonServiceCodeEnum;
    apiCodes?: CommonApiCodeEnum[];
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
}
export default new $service()
