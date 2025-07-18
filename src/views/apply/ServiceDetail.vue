<template>
    <div class="detail">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/market/' }">应用中心</el-breadcrumb-item>
            <el-breadcrumb-item>应用详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="header">
            <div class="left-header">
                <BreadcrumbHeader :pageName="detailInfo.name" />
                <ApplyStatus status="applying" v-if="urlQuery.pageFrom === 'myApply'" />
            </div>

            <!-- 应用中心-我的创建的详情 -->
            <div v-if="urlQuery.pageFrom === 'myCreate'">
                <div v-if="isOnline">
                    <el-button plain>导出身份</el-button>
                    <el-button type="danger" plain>下架应用</el-button>
                </div>
                <div v-else>
                    <el-popconfirm
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        :icon="WarningFilled"
                        icon-color="#FB9A0E"
                        title="您确定要删除该应用吗？"
                        width="220px"
                        @confirm="toDelete"
                    >
                        <template #reference> <el-button plain>删除</el-button> </template>
                    </el-popconfirm>

                    <el-button plain>导出身份</el-button>
                    <el-button plain>编辑</el-button>
                    <el-button type="danger" plain>上架应用</el-button>
                </div>
            </div>
            <!-- 应用中心-我的申请的详情 -->
            <div v-if="urlQuery.pageFrom === 'myApply'">
                <div>
                    <el-button type="danger">解绑应用</el-button>
                    <el-button plain>配置服务</el-button>
                </div>
            </div>
        </div>
        <div class="part">
            <div class="title">基本信息</div>
            <el-row class="part-row">
                <el-col :span="8" :xs="24">服务名称: {{ detailInfo.name }}</el-col>
                <el-col :span="8" :xs="24">创建人: {{ detailInfo.owner }}</el-col>
                <el-col :span="8" :xs="24">服务状态:{{ '-' }}</el-col>
            </el-row>
            <el-row class="part-row">
                <el-col :span="24">创建时间: {{ detailInfo.createTime }}</el-col>
            </el-row>
            <el-row class="part-row">
                <el-col :span="24">应用描述: {{ detailInfo.description }}</el-col>
            </el-row>
        </div>
        <div class="part">
            <div class="title">服务信息</div>
            <el-row class="part-row">
                <el-col :span="8" :xs="24">服务代码: {{ detailInfo.code }}</el-col>
                <el-col :span="8" :xs="24"
                    >接口代码:
                    {{ detailInfo.serviceCodes && detailInfo.serviceCodes.join(',') }}
                </el-col>
                <el-col :span="8" :xs="24">代理地址: {{ detailInfo.location }} </el-col>
            </el-row>
            <el-row class="part-row">
                <el-col :span="8" :xs="24">服务地址:{{ detail.serviceIP }} </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import BreadcrumbHeader from '@/views/components/BreadcrumbHeader.vue'
import ApplyStatus from '@/views/components/ApplyStatus.vue'
import { WarningFilled } from '@element-plus/icons-vue'

import { useRoute } from 'vue-router'
import $application from '@/plugins/application'
import { Link } from '@element-plus/icons-vue'
const route = useRoute()
const urlQuery = ref({})
const detailInfo = ref({})
const { did = '', version = '', pageFrom = '' } = route.query || {}
/**
 * 应用是否上架
 */
const isOnline = ref(false) // 是否已经上架

/**
 * 申请应用的状态
 */
const mockApplyStatus = 'success'

const detail = async () => {
    if (pageFrom !== 'myCreate') {
        const detailRst = await $application.detail(did, version)
        const { application } = detailRst.body || {}
        console.log(application, '-detailRst--')
        detailInfo.value = application || {}
    } else {
        const detailRst = await $application.myApplyDetail(did, version)
    }
}

onMounted(() => {
    urlQuery.value = route.query
    detail()
})
</script>

<style scoped lang="less">
.detail {
    margin: 20px;
    .header {
        // text-align: right;
        display: flex;
        justify-content: space-between;
        // margin-top: 10px;
    }
    .left-header {
        display: flex;
        gap: 64px;
        align-items: center;
        .el-tag {
            margin-top: -15px;
        }
    }
    .part {
        background: #fff;
        padding: 20px;
        border-radius: 6px;
        margin-bottom: 18px;
        box-shadow:
            0px 0px 1px 0px #00000014,
            0px 1px 2px 0px #190f0f12,
            0px 2px 4px 0px #0000000d;
        .title {
            font-size: 16px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
        }
        .part-row {
            font-size: 14px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.85);
            margin-top: 16px;
        }
    }
    .link-url {
        vertical-align: middle;
    }
    .link-icon {
        color: rgba(22, 119, 255, 1);
    }
}
</style>
