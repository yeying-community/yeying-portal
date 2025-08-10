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
import $auditProvider from '@/plugins/auditProvider'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const formRef = ref(null)
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
    did: String,
    closeClick: Function
})

/**
 * 表单提交
 */
const submitForm = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            const applyResult = form.result
            const applyOpinion = form.applyOpinion

            const params = {
                uid: userInfo?.metadata?.did,
                status: applyResult,
                applyOpinion: applyOpinion
            }
            // todo 调用接口成功后的操作

            // props.afterSubmit();
            try {
                /**
                 *
                 * todo 学虎
                 * 审批确认弹窗调用的接口
                 */
                const auditCreate = await $auditProvider.audit(params)
                console.log(auditCreate, '--audit-')
            } catch (e) {
                console.log(e, '-eee-')
            }
        } else {
            ElMessage.error('请先选择审批结果')
            return false
        }
    })
}
</script>
