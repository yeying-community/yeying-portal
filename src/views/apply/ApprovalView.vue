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
                <ApprovalTable :pageTabFrom="tabIndex ? 'finishApproval' : 'waitApproval'" />
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

<script setup>
import { ref, reactive } from 'vue'
import $service, { ApplyStatusMap } from '@/plugins/service'
import ApprovalTable from '@/views/components/ApprovalTable.vue'

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

const handleCurrentChange = (currentPage) => {
    pagination.value.page = currentPage
}

const handleSizeChange = (pageSize) => {
    pagination.value = {
        ...pagination.value,
        pageSize,
        page: 1 // 切换每页数量时重置页码
    }
}
const changeTab = (index) => {
    tabIndex.value = index
    pagination.value.page = 1
}
const onReset = (formEl) => {
    formEl.resetFields()
    pagination.value.page = 1
}

/**
 * 我的审批页面，
 *
 */
const onSubmit = () => {
    if (pagination.value.page === 1) {
        /**
         * todo 学虎
         * 待我审批，查询接口
         * */
    } else {
        /**
         * todo 学虎
         * 审批完成 查询接口
         */
    }
}
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
