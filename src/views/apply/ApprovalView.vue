<template>
    <div class="approval">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>我的审批</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
            <div class="header">
                <div :class="{ active: tabIndex == 0 }" @click="changeTab(0)" style="cursor: pointer">待我审批</div>
                <div :class="{ active: tabIndex == 1 }" @click="changeTab(1)" style="cursor: pointer">审批完成</div>
            </div>
            <el-divider />

            <div class="filter">
                <el-form :inline="true" :model="formInline" ref="formRef" class="demo-form-inline">
                    <div v-if="tabIndex === 0">
                        <el-form-item label="名称：" prop="appName">
                            <el-input
                                v-model="formInline.appName"
                                placeholder="请输入应用名称/服务名称搜索"
                                clearable
                            />
                        </el-form-item>
                        <el-form-item label="申请类型：" prop="region">
                            <el-select v-model="formInline.region" placeholder="请选择" clearable>
                                <el-option label="服务" value="1" />
                                <el-option label="应用" value="2" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="申请人：" prop="people">
                            <el-input v-model="formInline.people" placeholder="请输入" clearable />
                        </el-form-item>
                        <el-form-item label="申请时间：" prop="time">
                            <el-date-picker
                                v-model="formInline.time"
                                type="daterange"
                                range-separator=" "
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                size="default"
                            />
                        </el-form-item>
                    </div>
                    <div v-else>
                        <el-form-item label="名称：" prop="appName">
                            <el-input
                                v-model="formInline.appName"
                                placeholder="请输入应用名称/服务名称搜索"
                                clearable
                            />
                        </el-form-item>
                        <el-form-item label="审批类型：" prop="region">
                            <el-select v-model="formInline.region" placeholder="请选择" clearable>
                                <el-option label="服务" value="1" />
                                <el-option label="应用" value="2" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="申请人：" prop="people">
                            <el-input v-model="formInline.people" placeholder="请输入" clearable />
                        </el-form-item>
                        <el-form-item label="审批状态：" prop="status">
                            <el-select v-model="formInline.status" placeholder="请选择" class="input-style">
                                <el-option
                                    v-for="(key, value) in ApplyStatusMap"
                                    :key="key + value"
                                    :label="key"
                                    :value="value"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="申请时间：" prop="time">
                            <el-date-picker
                                v-model="formInline.time"
                                type="daterange"
                                range-separator=" "
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                size="default"
                            />
                        </el-form-item>
                    </div>

                    <el-form-item>
                        <el-button @click="onReset(formRef)">重置</el-button>
                        <el-button type="primary" @click="onSubmit(formRef)">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div style="width: 100%">
                <ApprovalTable :pageTabFrom="tabIndex ? 'finishApproval' : 'waitApproval'" :tableData="JSON.stringify(tableData.values)" />
            </div>
        </div>
    </div>

    <div class="pagination-wrap">
        <el-pagination
            layout="prev, pager, next"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            :current-page="pagination.page"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue'
import ApprovalTable from '@/views/components/ApprovalTable.vue'
import { userInfo } from '@/plugins/account'
import $audit, { AuditAuditDetail, AuditCommentMetadata, AuditCommentStatusEnum } from '@/plugins/audit'
import { ApplicationMetadata } from '@/plugins/application'
import { AuditDetailBox, useDataStore } from '@/stores/audit'

const store = useDataStore()

const formRef = ref(null)
const tabIndex = ref(0)
const formInline = reactive({
    appName: '',
    status: '',
    createdAt: ''
})

const pagination = ref({
    pageSize: 10,
    page: 1,
    total: 30
})

const handleCurrentChange = (currentPage: number) => {
    pagination.value.page = currentPage
}

const handleSizeChange = (pageSize: number) => {
    pagination.value = {
        ...pagination.value,
        pageSize,
        page: 1 // 切换每页数量时重置页码
    }
}
const changeTab = (index: number) => {
    console.log(`changeTab=${index}`)
    tabIndex.value = index
    pagination.value.page = 1
    search()
}
const onReset = (formEl: any) => {
    formEl.resetFields()
    pagination.value.page = 1
}

function allEqualTo<T>(arr: T[], value: T): boolean {
  return arr.every(item => item === value);
}

function getState(metas?: AuditCommentMetadata[]) {
  let status: string = "待审批";
  if (metas === undefined || metas.length === 0) {
    return status;
  }

  // 过滤掉 status 为 undefined 的项
  const statusList: AuditCommentStatusEnum[] = metas
    .map(item => item.status)
    .filter((status): status is AuditCommentStatusEnum => status !== undefined);

  if (statusList.length === 0) {
    return status; // 如果没有有效状态，仍为“待审批”
  }

  if (statusList.includes(AuditCommentStatusEnum.COMMENTSTATUSREJECT)) {
    status = '审批驳回';
  } else if (allEqualTo(statusList, AuditCommentStatusEnum.COMMENTSTATUSAGREE)) {
    status = '审批通过';
  }

  return status;
}

function cvData(auditMyApply: AuditAuditDetail) {
    if (auditMyApply === undefined || auditMyApply.meta === undefined || auditMyApply.meta.appOrServiceMetadata === undefined || auditMyApply.meta.applicant === undefined) {
        return null
    }
    const rawData = JSON.parse(auditMyApply.meta.appOrServiceMetadata);
    const did = auditMyApply.meta.applicant.split('::')[0]

    const metadata: AuditDetailBox = {
        uid: auditMyApply.meta.uid,
        name: rawData.name,
        desc: rawData.description,
        serviceType: rawData.code,
        applicantor: did,
        state: getState(auditMyApply.commentMeta),
        date: auditMyApply.meta.createdAt
    };
    return metadata
 
}

function convertApplicationMetadata(auditMyApply: AuditAuditDetail[]) {
  return auditMyApply
    .map(cvData)
    .filter((item): item is AuditDetailBox => item !== null) // ✅ 过滤 null 并类型收窄
}

const tableData = ref<AuditDetailBox[]>([])

const search = async () => {
    const approver = `${userInfo?.metadata?.did}::${userInfo?.metadata?.did}`
    const auditMyApply: AuditAuditDetail[] = await $audit.search({approver: approver})

    let res: AuditDetailBox[] = convertApplicationMetadata(auditMyApply)
    console.log(`res=${JSON.stringify(res)}`)
    if (tabIndex.value === 1) {
        res = res.filter((s) => s.state === '审批通过' || s.state === '审批驳回')
    }
    if (tabIndex.value === 0) {
        res = res.filter((s) => s.state === '待审批')
    }
    if (Array.isArray(res)) {
        tableData.value = res
        store.setItems(tableData.value)
    } else {
        console.warn('Expected array, but got:', res)
        tableData.value = []
        store.setItems(tableData.value)
    }
}


/**
 * 我的审批页面，
 *
 */
const onSubmit = () => {
    search()
}

onMounted(() => {
    search()
})
</script>
<style scoped lang="less">
.approval {
    margin: 20px;
    .content {
        margin-top: 16px;
        padding: 24px;
        background: #fff;
        border-radius: 6px;
        .header {
            font-size: 16px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.45);
            display: flex;
            gap: 30px;
        }
        .active {
            color: rgba(0, 0, 0, 0.85);
        }
    }
    .demo-form-inline .el-input {
        --el-input-width: 220px;
    }

    .demo-form-inline .el-select {
        --el-select-width: 220px;
    }
}

.pagination-wrap {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;

    .el-pagination * {
        background-color: transparent;
    }
}
</style>
