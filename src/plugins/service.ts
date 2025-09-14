// recycle 回收站  区块提供者类，用于与区块链交互，提供数据的获取和存储功能。

// import { ProviderCodeEnum } from '@yeying-community/yeying-client-ts';
// import { ProviderCodeEnum } from '@yeying-community/yeying-web3'
import { serviceCenterProvider } from './account'
export const ApplyStatusMap = {
    1: '申请中',
    2: '已取消',
    3: '申请通过',
    4: '申请驳回'
}
class $service {
    async search(page, pageSize, condition) {
        const header = {
            "did": "xxxx"
        }
        const body = {
            "header": header,
            "body": {
                "condition": {
                    "code": condition.code || "SERVICE_CODE_NODE"
                },
                "page": {
                    "page": page || 1,
                    "pageSize": pageSize || 10
                }
            }
        }
        console.log(`body=${JSON.stringify(body)}`)
        const endpoint = import.meta.env.VITE_API_ENDPOINT
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
        //return await serviceCenterProvider.search(params.page, params.pageSize, params.condition)
        // return new Promise((resolve, reject) => {
        //   const rst = [
        //     {
        //       address: "1",
        //       avatar:
        //         "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        //       code: "3",
        //       createdAt: "2022-01-01",
        //       description: "管理系统仓库应用程序。",
        //       did: "5",
        //       hash: "6",
        //       location: "7",
        //       name: "应用名称",
        //       network: "9",
        //       owner: "李湘",
        //       serviceCodes: [],
        //       signature: "11",
        //       updatedAt: "2025-01-01",
        //       version: 1,
        //     },
        //     {
        //       address: "1",
        //       avatar:
        //         "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        //       code: "3",
        //       createdAt: "2022-01-01",
        //       description:
        //         "管理系统仓库应用程序。这是一段介绍这是一段介绍这是一段介绍放假啊舒服了卡死发生到了附近卡死了快递发送到发旅客是的发送大家疯狂拉升大幅拉升的减肥了;撒娇大方开朗大方啦睡觉",
        //       did: "5",
        //       hash: "6",
        //       location: "7",
        //       name: "应用名称",
        //       network: "9",
        //       owner: "",
        //       serviceCodes: [],
        //       signature: "11",
        //       updatedAt: "2025-01-01",
        //       version: 1,
        //     },
        //     {
        //       address: "1",
        //       avatar:
        //         "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        //       code: "3",
        //       createdAt: "2022-01-01",
        //       description:
        //         "管理系统仓库应用程序。这是一段介绍这是一段介绍这是一段介绍放假啊舒服了卡死发生到了附近卡死了快递发送到发旅客是的发送大家疯狂拉升大幅拉升的减肥了;撒娇大方开朗大方啦睡觉",
        //       did: "5",
        //       hash: "6",
        //       location: "7",
        //       name: "应用名称",
        //       network: "9",
        //       owner: "",
        //       serviceCodes: [],
        //       signature: "11",
        //       updatedAt: "2025-01-01",
        //       version: 1,
        //     },
        //     {
        //       address: "1",
        //       avatar: "2",
        //       code: "3",
        //       createdAt: "2022-01-01",
        //       description:
        //         "管理系统仓库应用程序。这是一段介绍这是一段介绍这是一段介绍放假啊舒服了卡死发生到了附近卡死了快递发送到发旅客是的发送大家疯狂拉升大幅拉升的减肥了;撒娇大方开朗大方啦睡觉",
        //       did: "5",
        //       hash: "6",
        //       location: "7",
        //       name: "应用名称",
        //       network: "9",
        //       owner: "",
        //       serviceCodes: [],
        //       signature: "11",
        //       updatedAt: "2025-01-01",
        //       version: 1,
        //     },
        //   ];
        //   resolve(rst);
        // });
    }
}
export default new $service()
