<template>
  <div class="detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/market/' }"
        >应用中心</el-breadcrumb-item
      >
      <el-breadcrumb-item>应用详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="header">
      <div class="left-header">
        <BreadcrumbHeader :pageName="detailInfo.name" />
        <ApplyStatus status="applying" />
      </div>

      <div v-if="urlQuery.pageFrom === 'myCreate'">
        <div v-if="isonline">
          <el-button plain>导出身份</el-button>
          <el-button type="danger" plain>下架服务</el-button>
        </div>
        <div v-else>
          <el-button plain>删除</el-button>
          <el-button plain>导出身份</el-button>
          <el-button plain>编辑</el-button>
          <el-button type="danger" plain>上架应用</el-button>
        </div>
      </div>
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
        <el-col :span="8" :xs="24">应用名称: {{ detailInfo.name }}</el-col>
        <el-col :span="8" :xs="24">创建人: {{ detailInfo.owner }}</el-col>
        <el-col :span="8" :xs="24">应用状态:{{ '-' }}</el-col>
      </el-row>
      <el-row class="part-row">
        <el-col :span="24">应用名称: {{ detailInfo.createdAt }}</el-col>
      </el-row>
      <el-row class="part-row">
        <el-col :span="24">应用描述: {{ detailInfo.description }}</el-col>
      </el-row>
    </div>
    <div class="part">
      <div class="title">应用信息</div>
      <el-row class="part-row">
        <el-col :span="8" :xs="24">应用代号: {{ detailInfo.code }}</el-col>
        <el-col :span="8" :xs="24"
          >绑定服务代号:
          {{ detailInfo.serviceCodes && detailInfo.serviceCodes.join(',') }}
        </el-col>
        <el-col :span="8" :xs="24"
          >访问地址(URL): {{ detailInfo.location }}
        </el-col>
      </el-row>
      <el-row class="part-row">
        <el-col :span="8" :xs="24"
          >代码包:
          <a
            class="link-url"
            href="{{detailInfo.codePackagePath}}"
            style="color: rgba(22, 119, 255, 1)"
          >
            <el-link type="primary" :icon="Link">{{ detailInfo.code }}</el-link>
          </a>
        </el-col>
        <el-col :span="8" :xs="24">代码包Hash: {{ detailInfo.hash }}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import BreadcrumbHeader from '@/views/components/BreadcrumbHeader.vue'
import ApplyStatus from '@/views/components/ApplyStatus.vue'

import { useRoute } from 'vue-router'
import $application from '@/plugins/application'
import { Link } from '@element-plus/icons-vue'
const route = useRoute()
const urlQuery = ref({})
const detailInfo = ref({})
const isonline = ref(false) // 是否已经上架
const detail = async () => {
  const { did = '', version = '', pageFrom = '' } = route.query || {}
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
    box-shadow: 0px 0px 1px 0px #00000014, 0px 1px 2px 0px #190f0f12,
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
