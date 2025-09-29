
const endpoint = import.meta.env.VITE_API_ENDPOINT

class $minio {

    async getUploadUrl(filename: string) {
        const header = {
            "did": "xxxx"
        }
        const body = {
            "header": header,
            "body": {
                "filename": filename
            }
        }
        console.log(`body=${JSON.stringify(body)}`)
        console.log(`endpoint=${endpoint}`)
        const response = await fetch(endpoint + '/api/v1/minio/presigned/upload/url', {
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
        return r.body.url
    }

}

export default new $minio()