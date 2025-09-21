import { ElNotification } from 'element-plus'

export const notifyError = (msg: string) => {
    ElNotification({
        title: '错误',
        message: msg,
        type: 'error',
        position: 'top-right'
    })
}
