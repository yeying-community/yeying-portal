export interface AuditAuditMetadata {
    uid?: string;
    appOrServiceMetadata?: string;
    applicant?: string;
    approver?: string;
    reason?: string;
    createdAt?: string;
    updatedAt?: string;
    signature?: string;
}

const endpoint = import.meta.env.VITE_API_ENDPOINT

class $audit {

    async create(meta: AuditAuditMetadata) {
        const header = {
            "did": "xxxx"
        }
        const body = {
            "header": header,
            "body": {
                "meta": meta
            }
        }
        console.log(`body=${JSON.stringify(body)}`)
        console.log(`endpoint=${endpoint}`)
        const response = await fetch(endpoint + '/api/v1/audit/create', {
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
}

export default new $audit()
