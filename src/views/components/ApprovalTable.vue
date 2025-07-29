<template>
    <el-table :data="tableData" style="width: 100%; display: flex">
        <el-table-column prop="name" label="应用/服务名称" width="400">
            <template #default="scope">
                <div class="name">{{ scope.row.name }}</div>
                <el-tooltip class="box-item" effect="dark" :content="scope.row.desc" placement="top-start">
                    <el-text class="w-400px mb-2" truncated>{{ scope.row.desc }}</el-text>
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column prop="serviceType" label="申请类型" width="100" />
        <el-table-column prop="applicantor" label="申请人" width="200" show-overflow-tooltip />
        <el-table-column prop="state" label="状态" width="200" show-overflow-tooltip>
            <template #default="scope">
                <el-badge is-dot :type="statusInfo[scope.row.state]" style="margin-top: 10px; margin-right: 8px" />{{
                    scope.row.state
                }}
                <el-tooltip class="box-item" effect="dark" :content="scope.row.msg" placement="top-start">
                    <el-icon v-if="pageTabFrom === 'finishApproval'" style="margin-top: 15px"><Warning /></el-icon>
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column prop="date" label="申请时间" width="200">
            <template #default="scope">
                {{ dayjs(scope.row.date).format('YYYY-MM-DD HH:mm:ss') }}
            </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100px">
            <template #default="scope">
                <el-button
                    v-if="pageTabFrom === 'waitApproval'"
                    link
                    type="primary"
                    size="small"
                    @click="handleClick(scope.row)"
                    >去审批</el-button
                >
                <div v-else>-</div>
            </template>
        </el-table-column>
    </el-table>

    <ApplRoveModal :applroveShow="applroveShow" :did="record.did" :closeClick="closeClick" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ApplRoveModal from './ApplRoveModal.vue'
import dayjs from 'dayjs'
import { Warning } from '@element-plus/icons-vue'
const applroveShow = ref(false)
const record = ref({
    did: ''
})

const statusInfo = {
    待审批: 'primary',
    审批通过: 'success',
    审批驳回: ''
}

const handleClick = (row: any) => {
    console.log(row, '-当前行数据-')
    record.value = row // 存储当前行数据
    applroveShow.value = true
}

const closeClick = () => {
    applroveShow.value = false
}

const props = defineProps({
    pageTabFrom: String // finishApproval审批完成 / waitApproval待我审批
})

const tableData = [
    {
        date: '2016-05-03',
        name: '这里是服务名称',
        desc: '这里是一段申请理由这里是一段申请理由这里是一段申请理由这里是一段',
        serviceType: '服务',
        state: '待审批',
        applicantor: 'Los Angeles',
        msg: ''
    },
    {
        date: '2016-05-02',
        name: '这里是服务名称',
        desc: '这里是一段申请理由这里是一段申请理由这里是一段申请理由这里是一段',
        serviceType: '应用',
        state: '审批通过',
        applicantor: 'Los Angeles',
        msg: '我是审批通过的理由'
    },
    {
        date: '2016-05-04',
        name: '这里是服务名称',
        desc: '这里是一段申请理由这里是一段申请理由这里是一段申请理由这里是一段',
        serviceType: '应用',
        state: '审批驳回',
        applicantor: 'Los Angeles',
        msg: '我是审批驳回的理由'
    },
    {
        date: '2016-05-01',
        name: '这里是服务名称',
        desc: '这里是一段申请理由这里是一段申请理由这里是一段申请理由这里是一段',
        serviceType: '应用',
        state: '待审批',
        applicantor: 'Los Angeles',
        msg: ''
    }
]
</script>

<style scoped lang="less">
:deep(.el-table__header th) {
    background-color: #fafafa !important;
    color: rgba(0, 0, 0, 0.88) !important;
}
.name {
    color: rgba(22, 119, 255, 1);
}

:deep(.el-badge__content.is-dot) {
    height: 10px;
    width: 10px;
}
</style>
