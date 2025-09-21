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

const endpoint = import.meta.env.VITE_API_ENDPOINT
class $service {
    async search(page: number, pageSize: number, condition: ServiceSearchCondition) {
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
}
export default new $service()
