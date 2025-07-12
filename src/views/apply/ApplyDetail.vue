<template>
  <div class="detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/market/' }"
        >应用中心</el-breadcrumb-item
      >
      <el-breadcrumb-item>应用详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="header">
      <el-button plain>导出身份</el-button>
      <el-button type="danger" plain>下架服务</el-button>
    </div>
    <div class="part">
      <div class="title">基本信息</div>
      <el-row class="part-row">
        <el-col :span="8" :xs="24">应用名称: {{ detailInfo.name }}</el-col>
        <el-col :span="8" :xs="24">创建人: {{ detailInfo.owner }}</el-col>
        <el-col :span="8" :xs="24">应用状态:{{ "-" }}</el-col>
      </el-row>
      <el-row class="part-row">
        <el-col :span="24">应用名称: {{ detailInfo.createdAt }}</el-col>
      </el-row>
      <el-row class="part-row">
        <el-col :span="24">应用描述: {{ detailInfo.description }}</el-col>
      </el-row>
      <!-- <div>
        <div>
          <div>应用名称:{{detailInfo.name}}</div>
          <div>创建人:</div>
        </div>
        <div></div>
        <div></div>
      </div> -->
    </div>
    <div class="part">
      <div class="title">应用信息</div>
      <el-row class="part-row">
        <el-col :span="8" :xs="24">应用代号: {{ detailInfo.code }}</el-col>
        <el-col :span="8" :xs="24"
          >绑定服务代号:
          {{
            detailInfo.serviceCodes && detailInfo.serviceCodes.join(",")
          }}</el-col
        >
        <el-col :span="8" :xs="24"
          >访问地址(URL): {{ detailInfo.location }}</el-col
        >
      </el-row>
      <el-row class="part-row">
        <el-col :span="24"
          >代码包:
          <a
            class="link-url"
            href="{{detailInfo.codePackagePath}}"
            style="color: rgba(22, 119, 255, 1)"
          >
            <el-link type="primary" :icon="Link">{{ detailInfo.code }}</el-link>
          </a>
        </el-col>
      </el-row>
      <el-row class="part-row">
        <el-col :span="24">代码包Hash: {{ detailInfo.hash }}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import $application from "@/plugins/application";
import { Link } from "@element-plus/icons-vue";
const route = useRoute();
const urlQuery = ref({});
const detailInfo = ref({
  // name: "aaa",
  // description: "bbb",
  // location: "ccc",
  // hash: "ddd",
  // code: "eee",
  // owner: "1221",
  // serviceCodes: [],
  // avatar: "",
  // codeaaa: "https://element-plus.org/zh-CN/component/layout.html",
  // createdAt: "2022-03-01",
});

const detail = async () => {
  const { did = "", version = "" } = route.query || {};
  const detailRst = await $application.detail(did, version);
  const { application, page } = detailRst.body || {};
  console.log(application, "-detailRst--");
  detailInfo.value = application || {};
};

onMounted(() => {
  urlQuery.value = route.query;
  detail();
});
</script>

<style scoped lang="less">
.detail {
  margin: 20px;
  .header {
    text-align: right;
    margin-top: 10px;
  }
  .part {
    margin-top: 10px;
    background: #fff;
    padding: 20px;
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
