<template>
  <div class="tab">
    <div class="top">
      <div class="top-left">
        <el-avatar shape="square" size="50" :src="detail.avatar" />
      </div>
      <div class="top-right">
        <div class="name">{{ detail.name }}</div>
        <div class="title">
          <span v-if="detail.owner"> 所有者: {{ detail.owner }} </span>
          <span v-else>
            <el-tag type="primary">官方</el-tag>
          </span>
          <span>上架于 {{ dayjs(detail.createdAt).format("YYYY-MM-DD") }}</span>
        </div>
        <div class="desc">
          {{ detail.description }}
        </div>
      </div>
    </div>
    <div v-if="isOwner" class="bottom owner">
      <div @click="toDetail" class="cursor">详情</div>
      <el-divider direction="vertical" />
      <div @click="handleOffline" class="cursor">下架应用</div>
      <el-divider direction="vertical" />
      <div class="bottom-more">
        <el-dropdown placement="top-start">
          <div>更多</div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toDelete">删除</el-dropdown-item>
              <el-dropdown-item @click="toEdit">编辑</el-dropdown-item>
              <el-dropdown-item @click="exportIdentity"
                >导出身份</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div v-else class="bottom">
      <div class="bottom-left" @click="toDetail">详情</div>
      <div class="bottom-right" @click="dialogVisible = true">申请使用</div>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="申请使用" width="430px">
    <!-- <template #content> -->
    <el-form
      label-position="top"
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="100px"
    >
      <el-space direction="vertical" alignment="flex-start">
        <div>申请应用：{{ detail?.name }}</div>
        <div>应用创建人：{{ detail?.owner }}</div>
        <el-form-item label="申请原因" prop="reason">
          <el-input
            type="textarea"
            style="width: 400px"
            v-model="form.reason"
            placeholder="请填写申请原因，以便所有者知悉增加通过概率"
          ></el-input>
        </el-form-item>
      </el-space>
    </el-form>
    <!-- </template> -->

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, getCurrentInstance, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import $application from "@/plugins/application";
import $auditProvider from "@/plugins/auditProvider";

import dayjs from "dayjs";

const dialogVisible = ref(false);
const formRef = ref(null);
const form = reactive({
  reason: "",
});

const rules = reactive({
  reason: [{ required: true, message: "请输入申请原因", trigger: "blur" }],
});

const router = useRouter();
const props = defineProps({
  detail: Object,
  selectId: Number,
  refreshCardList: Function,
  userDid: String,
});

const isOwner = props.userDid === props.detail?.did;

const toDelete = () => {};
const toEdit = () => {
  router.push({
    path: "/market/apply-edit",
    query: {
      did: props.detail.did,
      version: props.detail.version,
    },
  });
};
const exportIdentity = () => {};
const toDetail = () => {
  router.push({
    path: "/market/apply-detail",
    query: {
      did: props.detail.did,
      version: props.detail.version,
    },
  });
};
const handleOffline = async () => {
  const offlinelRst = await $application.offline(
    props.detail.did,
    props.detail.version
  );
  console.log(offlinelRst, "-offlinelRst");
  const { status } = offlinelRst.body;

  if (status?.message === "success") {
    ElMessage({
      message: "已下架",
      type: "success",
    });
    props.refreshCardList();
  }
};

/**
 * 表单提交
 */
const submitForm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      const applyReason = form.reason;
      console.log(props.userDid, "--props.userDid,-");
      const params = {
        // sourceDid: props.userDid,
        reason: applyReason,
      };
      try {
        const auditCreate = await $auditProvider.create(params);
        console.log(auditCreate, "--auditCreate-");
      } catch (e) {
        console.log(e, "-eee-");
      }
    } else {
      ElMessage.error("请先填写申请原因");
      return false;
    }
  });
};

// const emit = defineEmits(['change']);
</script>
<style scoped lang="less">
.tab {
  background-color: #fff;
  border-radius: 6px;
  padding: 24px;
  .cursor {
    cursor: pointer;
  }
  .top {
    display: flex;
    gap: 16px;
    .top-left {
    }
    .top-right {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .name {
        font-size: 20px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
      }
      .title {
        display: flex;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        font-weight: 400;
        gap: 4px;
      }
      .desc {
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        font-weight: 400;
        height: 44px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* 限制显示的行数 */
        overflow: hidden;
        text-overflow: ellipsis; /* 文本溢出时显示省略号 */
      }
    }
  }
  .bottom {
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    margin-top: 12px;
    display: flex;
    font-size: 14px;
    color: rgba(22, 119, 255, 1);
    .bottom-left {
      width: 50%;
      text-align: center;
      border-right: 1px solid rgba(0, 0, 0, 0.06);
      cursor: pointer;
    }
    .bottom-right {
      width: 50%;
      text-align: center;
      cursor: pointer;
    }
    .bottom-more {
      display: flex;
      align-items: center;
    }
  }
  .owner {
    justify-content: space-around;
  }
  .el-dropdown {
    font-size: 14px;
    color: rgba(22, 119, 255, 1);
  }
}
</style>
