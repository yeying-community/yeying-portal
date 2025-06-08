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
            :placeholder="$t('common.pleaseSearch')"
            @keyup.enter="search"
          >
            <template #suffix>
              <el-icon class="el-input__icon search-icon" @click="search">
                <Search />
              </el-icon>
            </template>
          </el-input>
          <el-button type="primary" size="large">创建应用</el-button>
      </div>
    </div>
    <div>
      <el-tabs v-model="activeService" class="demo-tabs" @tab-click="handleClick">
        <template v-for="item in tabs" :key="item.name">
          <el-tab-pane :label="item.title" :name="item.name">
            <div>
              {{item.title}}
            </div>
          </el-tab-pane>
        </template>
        <!-- <el-tab-pane label="应用市场" name="first">
          <div style="background:gray;">
            应用市场
          </div>
        </el-tab-pane>
        <el-tab-pane label="我创建的" name="second">我创建的</el-tab-pane>
        <el-tab-pane label="我申请的" name="third">我申请的</el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import $application from '@/plugins/application'
const searchVal = ref()
const activeService = ref('first')
const tabs = [
  {
    name: 'first',
    title: '应用市场',
  },
  {
    name: 'second',
    title: '我创建的',
  },
  {
    name: 'third',
    title: '我申请的',
  },
]
const handleClick = (tab, event) => {
  console.log(tab, event)
}
const search = async () => {
  const rst = await $application.search(1,20)
  console.log('rst---->',rst)
}
onMounted(() => {
  search()
})
</script>
<style scoped lang="less">
:deep(.el-tabs__nav-scroll){
  background: white;
  padding-left: 12px;
}
.apply{
  margin: 20px;
  .top-group{
    background: white;
    margin-top: 20px;
    padding:12px;
    .search{
      width: 50%;
      display: flex;
      gap:20px;
    }
    @media (max-width: 768px) {
      .search{
        width:100%;
      }
    }
  }
}
</style>