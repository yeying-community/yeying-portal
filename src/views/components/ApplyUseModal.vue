<template>
  <el-dialog
    v-model="props.dialogVisible"
    :title="props.title || '申请使用'"
    width="430px"
    :close-on-click-modal="false"
    @close="props.closeClick()"
  >
    <el-form
      label-position="top"
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="100px"
    >
      <el-space direction="vertical" alignment="flex-start">
        <div>申请应用：{{ detail?.name }}</div>
        <div>应用创建人：{{ detail?.owner }}</div>
        <el-form-item label="申请原因" prop="reason">
          <el-input
            type="textarea"
            style="width: 400px"
            v-model="form.reason"
            placeholder="请填写申请原因，以便所有者知悉增加通过概率"
          ></el-input>
        </el-form-item>
      </el-space>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>

  <ResultChooseModal
    v-model="innerVisible"
    title="申请使用"
    mainDesc="应用申请中"
    subDesc="正在等待服务所有人审批，请耐心等待"
    leftBtnText="查看详情"
    rightBtnText="返回列表"
    :leftBtnClick="toDetail"
    :rightBtnClick="toList"
    :closeClick="toList"
  >
    <template #icon>
      <el-icon :size="70"><SuccessFilled color="#30A46C" /></el-icon>
    </template>
  </ResultChooseModal>
</template>

<script lang="ts" setup>
import { userInfo } from '@/plugins/account'
import $auditProvider from '@/plugins/audit'
import ResultChooseModal from './ResultChooseModal.vue'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { SuccessFilled } from '@element-plus/icons-vue'
const innerVisible = ref(false)
const formRef = ref(null)
const form = reactive({
  reason: '',
})
const router = useRouter()

const emits = defineEmits(['update:dialogVisible'])

const rules = reactive({
  reason: [{ required: true, message: '请输入申请原因', trigger: 'blur' }],
})
const props = defineProps({
  dialogVisible: Boolean,
  afterSubmit: Function,
  detail: Object,
  title: String,
  closeClick: Function,
})

/**
 * 表单提交
 */
const submitForm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      const applyReason = form.reason
      const params = {
        sourceDid: userInfo?.metadata?.did,
        reason: applyReason,
      }
      // todo 调用接口成功后的操作
      innerVisible.value = true
      // props.afterSubmit();
      try {
        const auditCreate = await $auditProvider.create(params)
        console.log(auditCreate, '--auditCreate-')
      } catch (e) {
        console.log(e, '-eee-')
      }
    } else {
      ElMessage.error('请先填写申请原因')
      return false
    }
  })
}

const toDetail = () => {
  router.push({
    path: '/market/apply-detail',
    query: {
      did: props.detail.did,
      version: props.detail.version,
    },
  })
}

const toList = () => {
  innerVisible.value = false
}
</script>
