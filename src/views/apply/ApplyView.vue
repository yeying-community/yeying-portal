<template>
  <div class="apply">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>应用中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="top-group">
      <div class="search">
        <el-input
          v-model="searchVal"
          size="large"
          placeholder="支持输入服务名称/服务所有者名称搜索"
          @keyup.enter="search"
        >
          <template #suffix>
            <el-icon class="el-input__icon search-icon" @click="search">
              <Search />
            </el-icon>
          </template>
        </el-input>
        <el-button
          type="primary"
          size="large"
          @click="changeRouter('/market/apply-edit')"
          >创建应用</el-button
        >
      </div>
    </div>
    <div>
      <el-tabs
        v-model="activeService"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <template v-for="item in tabs" :key="item.name">
          <el-tab-pane :label="item.title" :name="item.name">
            <div class="item-group">
              <template
                v-for="(app, index) in applicationList"
                :key="index + app.name"
              >
                <MarketBlock :detail="app" />
              </template>
            </div>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import $application from "@/plugins/application";
import MarketBlock from "@/views/components/MarketBlock.vue";
import { useRouter } from "vue-router";

const searchVal = ref();
const activeService = ref("1");
const applicationList = ref([]);
const router = useRouter();
const tabs = [
  {
    name: "1",
    title: "应用市场",
  },
  {
    name: "2",
    title: "我创建的",
  },
  {
    name: "3",
    title: "我申请的",
  },
];
const handleClick = (tab, event) => {
  console.log(tab, event);
};
const search = async (e) => {
  const inputValue = e?.target?.value || null;
  const rst = await $application.search(1, 20, { keyword: inputValue });
  const { applications, page } = rst.body || {};
  applicationList.value = applications || [];
  console.log(rst, "---rst-");
};
const changeRouter = (url) => {
  router.push(url);
};
onMounted(() => {
  search();
});
</script>
<style scoped lang="less">
:deep(.el-tabs__nav-scroll) {
  background: white;
  padding-left: 12px;
}
.apply {
  margin: 20px;

  .top-group {
    background: white;
    margin-top: 20px;
    padding: 12px;
    .search {
      width: 50%;
      display: flex;
      gap: 20px;
    }
    @media (max-width: 768px) {
      .search {
        width: 100%;
      }
    }
  }
  .item-group {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
}
</style>
