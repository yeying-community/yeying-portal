<template>
    <el-dialog
        v-model="props.applroveShow"
        :title="props.title || '审批'"
        width="430px"
        :close-on-click-modal="false"
        @close="props.closeClick()"
    >
        <el-form label-position="top" :model="form" :rules="rules" ref="formRef" label-width="100px">
            <el-form-item label="审批结果" prop="result">
                <el-radio-group v-model="form.result" class="ml-4">
                    <el-radio label="passed" size="large">通过</el-radio>
                    <el-radio label="reject" size="large">驳回</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="审批意见" prop="opinion">
                <el-input
                    type="textarea"
                    style="width: 400px"
                    v-model="form.opinion"
                    placeholder="请填写申请原因，以便所有者知悉增加通过概率"
                ></el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="props.closeClick()">取消</el-button>
                <el-button type="primary" @click="submitForm"> 确定 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { userInfo } from '@/plugins/account'
import $audit, { AuditCommentMetadata, AuditCommentStatusEnum } from '@/plugins/audit'
import { generateUuid, getCurrentUtcString } from '@/utils/common';
import { ElForm } from 'element-plus';
import { ElMessage } from 'element-plus';
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import $application, { ApplicationMetadata } from '@/plugins/application'

const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const form = reactive({
    result: 'passed',
    opinion: ''
})
const router = useRouter()

const emits = defineEmits(['update:applroveShow'])

const rules = reactive({
    result: [{ required: true, message: '请选择审批结果', trigger: 'blur' }]
})
const props = defineProps({
    applroveShow: Boolean,
    afterSubmit: Function,
    uid: String,
    closeClick: Function
})

/**
 * 表单提交
 */
const submitForm = () => {
    if (formRef.value === undefined || formRef.value === null) {
        ElMessage.error('请先选择审批结果')
        return false
    }
    formRef.value.validate(async (valid: boolean) => {
        if (valid) {
            const applyResult = form.result
            const applyOpinion = form.opinion
            console.log(`applyResult=${applyResult}`)
            console.log(`applyOpinion=${applyOpinion}`)
 
            if (applyResult === 'passed') {
                try {
                    const param = {
                        uid: generateUuid(),
                        auditId: props.uid,
                        text: applyOpinion,
                        status: AuditCommentStatusEnum.COMMENTSTATUSAGREE,
                        createdAt: getCurrentUtcString(),
                        updatedAt: getCurrentUtcString(),
                        signature: ''
                    }
                    console.log(`param=${JSON.stringify(param)}`)
                    const r: AuditCommentMetadata = await $audit.passed(param)
                    console.log(`r=${JSON.stringify(r)}`)
                    // 创建上线记录
                    const rs = await $audit.detail(props.uid as string)
                    const app = await $application.online(JSON.parse(rs.meta.appOrServiceMetadata))
                    console.log(`app=${app}`)
                } catch (e) {
                    console.log(e)
                }
            } else if (applyResult === 'reject') {
                try {
                    const param = {
                        uid: generateUuid(),
                        auditId: props.uid,
                        text: applyOpinion,
                        status: AuditCommentStatusEnum.COMMENTSTATUSREJECT,
                        createdAt: getCurrentUtcString(),
                        updatedAt: getCurrentUtcString(),
                        signature: ''
                    }
                    console.log(`param=${JSON.stringify(param)}`)
                    const r: AuditCommentMetadata = await $audit.reject(param)
                    console.log(`r=${JSON.stringify(r)}`)
                } catch (e) {
                    console.log(e)
                }
            }
            props.closeClick()
        } else {
            ElMessage.error('请先选择审批结果')
        }
    })
}
</script>
