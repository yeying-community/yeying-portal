<template>
  <div class="tab">
    <div class="top">
      <div class="top-left">
        <el-avatar shape="square" size="50" :src="detail.avatar" />
      </div>
      <div class="top-right">
        <div class="name">{{detail.name}}</div>
        <div class="title">
          <span v-if="detail.owner">
            所有者: {{detail.owner}}
          </span>
          <span v-else>
            <el-tag type="primary">官方</el-tag>
          </span>
          <span>上架于 {{detail.createdAt}}</span>
        </div>
        <div class="desc">
          {{ detail.description  }}
        </div>
      </div>
    </div>
    <div class="bottom owner">
      <div @click="toDetail">
        详情
      </div>
      <el-divider direction="vertical" />
      <div @click="handleOffline">
        下架应用
      </div>
      <el-divider direction="vertical" />
      <div class="bottom-more">
        <el-dropdown placement="top-start">
          <div> 更多 </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toDelete">删除</el-dropdown-item>
              <el-dropdown-item @click="toEdit">编辑</el-dropdown-item>
              <el-dropdown-item @click="exportIdentity">导出身份</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
     
    </div>
    <!-- <div class="bottom">
      <div class="bottom-left"  @click="toDetail">
        详情
      </div>
      <div class="bottom-right" @click="handleApply">
        申请使用
      </div>
    </div> -->
  </div>
</template>
<script setup>
import { ref, getCurrentInstance, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  detail: Object,
  selectId: Number,
});
const toDelete = () => {
  
}
const toEdit = () => {

}
const exportIdentity = () => {

}
const toDetail = () => {
  router.push({
    path: '/market/apply-detail',
    query: {
      did: props.detail.did,
      version: props.detail.version
    }
  })
}
const handleOffline = () => {

}
const handleApply = () => {

}

// const emit = defineEmits(['change']);
</script>
<style scoped lang="less">
.tab {
  background-color: #fff;
  border-radius: 6px;
  padding: 24px;
  .top{
    display: flex;
    gap:16px;
    .top-left{
      
    }
    .top-right{
      display: flex;
      flex-direction: column;
      gap: 8px;
      .name{
        font-size: 20px;
        font-weight: 500;
        color:rgba(0, 0, 0, 0.85);
      }
      .title{
        display: flex;
        color:rgba(0, 0, 0, 0.45);
        font-size:14px;
        font-weight: 400;
        gap: 4px;
      }
      .desc{
        color:rgba(0, 0, 0, 0.45);
        font-size:16px;
        font-weight: 400;
        height:44px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* 限制显示的行数 */
        overflow: hidden;
        text-overflow: ellipsis; /* 文本溢出时显示省略号 */
      }
    }
  }
  .bottom{
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    margin-top: 12px;
    display: flex;
    font-size: 14px;
    color: rgba(22, 119, 255, 1);
    .bottom-left{
      width: 50%;
      text-align: center;
      border-right: 1px solid rgba(0, 0, 0, 0.06);
    }
    .bottom-right{
      width: 50%;
      text-align: center;
    }
    .bottom-more{
      display: flex;
      align-items: center;
    }
  }
  .owner{
    justify-content: space-around;
  }
  .el-dropdown{
    font-size: 14px;
    color: rgba(22, 119, 255, 1);
  }
}
</style>