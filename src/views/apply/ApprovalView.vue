<template>
  <div class="approval">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>我的审批</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="header">
        <div :class="{active:tabIndex==0}" @click="changeTab(0)">待我审批</div>
        <div :class="{active:tabIndex==1}" @click="changeTab(1)">审批完成</div>
      </div>
      <el-divider />
      <div class="filter">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="名称">
            <el-input v-model="formInline.appName" placeholder="请输入应用名称/服务名称搜索" clearable />
          </el-form-item>
          <el-form-item label="申请类型">
            <el-select
              v-model="formInline.region"
              placeholder="请选择"
              clearable
            >
              <el-option label="服务" value="1" />
              <el-option label="应用" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="申请人">
            <el-input v-model="formInline.appName" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="申请状态">
            <el-select
              v-model="formInline.status"
              placeholder="请选择"
              class="input-style"
            >
              <el-option
                v-for="(key,value) in ApplyStatusMap"
                :key="key+value"
                :label="key"
                :value="value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="onReset">重置</el-button>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import $service, {ApplyStatusMap} from '@/plugins/service'

const tabIndex = ref(0)
const formInline = ref({
  appName: '',
  status: '',
  createdAt: '',
})
const changeTab = (index) => {
  tabIndex.value = index
}
const onReset = () => {

}
const onSubmit = () => {  

}
</script>
<style scoped lang="less">
.approval{
  margin: 20px;
  .content{
    margin-top: 16px;
    padding: 24px;
    background: #fff;
    border-radius: 6px;
    .header{
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.45);
      display: flex;
      gap:30px;
    }
    .active{
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
</style>