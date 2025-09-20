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

export interface AuditAuditSearchCondition {
    approver?: string;
    name?: string;
    'type'?: string;
    applicant?: string;
    startTime?: string;
    endTime?: string;
}

export enum AuditCommentStatusEnum {
    COMMENTSTATUSAGREE = 'COMMENT_STATUS_AGREE',
    COMMENTSTATUSREJECT = 'COMMENT_STATUS_REJECT'
}

export interface AuditCommentMetadata {
    uid?: string;
    auditId?: string;
    text?: string;
    status?: AuditCommentStatusEnum;
    createdAt?: string;
    updatedAt?: string;
    signature?: string;
}

export interface AuditAuditDetail {
    meta?: AuditAuditMetadata;
    commentMeta?: AuditCommentMetadata[];
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

    async search(condition: AuditAuditSearchCondition) {
        const header = {
            "did": "xxxx"
        }
        const body = {
            "header": header,
            "body": {
                "condition": condition
            }
        }
        console.log(`body=${JSON.stringify(body)}`)
        console.log(`endpoint=${endpoint}`)
        const response = await fetch(endpoint + '/api/v1/audit/search', {
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
        return r.body.detail
    }
}

export default new $audit()
