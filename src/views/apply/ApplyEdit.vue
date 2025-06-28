<template>
  <div class="edit">
    <!-- <el-page-header>
      <template #breadcrumb>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/market/' }">
            应用中心
          </el-breadcrumb-item>
          <el-breadcrumb-item>创建应用身份</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <template #content>
        <span class="text-large font-600 mr-3"> 创建应用身份 </span>
      </template>
    </el-page-header> -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/market/' }">应用中心</el-breadcrumb-item>
      <el-breadcrumb-item>创建应用身份</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      label-position="top"
      label-width="auto"
      :model="detailInfo"
      :rules="rules"
      ref="ruleFormRef"
    >
      <el-row class="content">
        <el-col :span="19" :xs="24">
          <div class="left" ref="containerRef">
            <div id="part1">
              <div class="title">
                应用身份信息
              </div>
              <el-divider />
              <div class="form">
                <el-form-item label="应用名称" prop="name">
                  <el-input v-model="detailInfo.name" class="input-style" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="应用描述" prop="description">
                  <el-input v-model="detailInfo.description" class="input-style" placeholder="请输入"
                    type="textarea"
                  />
                </el-form-item>
                <el-form-item label="应用图标" prop="avatar">
                  <el-radio-group v-model="avatarChk">
                    <el-radio value="1">默认提供</el-radio>
                    <el-radio value="2">上传图标</el-radio>
                  </el-radio-group>
                  <!-- <el-input v-model="detailInfo.name" class="input-style" placeholder="请输入"/> -->
                </el-form-item>
                <div v-if="avatarChk=='2'" class="wrap-cols">
                  <Uploader @change="changeFileAvatar" v-model="avatarList" accept=".png,jpg">
                    <el-button :icon="Upload">上传文件</el-button>
                  </Uploader>
                  <div class="upload-text">支持图片类型：png, jpg</div>
                </div>
                <div v-else>
                  <img class="mr-1 w-7 h-7 rounded-full" src="../../assets/img/apply_default.png">
                </div>
              </div>
            </div>
            <div id="part2">
              <div class="title">
                应用信息
              </div>
              <el-divider />
              <div class="form">
                <el-form-item label="应用代号" prop="code">
                  <el-select
                    v-model="detailInfo.code"
                    placeholder="请选择"
                    class="input-style"
                  >
                    <el-option
                      v-for="(key,value) in codeMap"
                      :key="key+value"
                      :label="key"
                      :value="value"
                    />
                  </el-select>
                  <!-- <el-input v-model="detailInfo.code" class="input-style" placeholder="请输入应用访问地址"/> -->
                </el-form-item>
                <el-form-item label="绑定服务代号" prop="serviceCodes">
                  <el-select
                    v-model="detailInfo.serviceCodes"
                    placeholder="请选择"
                    class="input-style"
                    multiple
                  >
                    <el-option
                      v-for="(key,value) in serviceCodeMap"
                      :key="key+value"
                      :label="key"
                      :value="value"
                    />
                  </el-select>
                  <!-- <el-input v-model="detailInfo.serviceCodes" class="input-style" placeholder="请输入应用访问地址"/> -->
                </el-form-item>
                <el-form-item label="代码包" prop="codePackagePath">
                  <el-radio-group v-model="codeChk">
                    <el-radio value="1" size="large">下载链接</el-radio>
                    <el-radio value="2" size="large">上传图标</el-radio>
                  </el-radio-group>
                </el-form-item>
                <div v-if="codeChk=='2'" class="wrap-cols">
                  <Uploader @change="changeFileCode" v-model="codeList" accept=".zip,.rar,.tar.gz">
                    <el-button :icon="Upload">上传文件</el-button>
                  </Uploader>
                  <div class="upload-text">支持文件类型：‌‌.zip ‌.rar  .tar.gz 限制文件数量：1</div>
                </div>
                <div v-else class="wrap-cols" style="margin-bottom: 18px;">
                  <el-input v-model="detailInfo.codePackagePath" class="input-style" placeholder="请输入下载链接"/>
                </div>
                <el-form-item label="访问地址(URL)" prop="location">
                  <el-input v-model="detailInfo.location" class="input-style" placeholder="请输入应用访问地址"/>
                </el-form-item>
                <el-form-item label="代码包Hash" prop="hash">
                  <el-input v-model="detailInfo.hash" class="input-style" placeholder="系统默认计算"/>
                </el-form-item>
              </div>
            </div>
            <div class="footer">
              <!-- <el-button @click="resetForm(ruleFormRef)"></el-button> -->
              <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="4" class="right" :xs="0">
          <el-anchor
            :container="containerRef"
            direction="vertical"
            type="default"
            :offset="30"
            @click="handleClick"
          >
            <el-anchor-link href="#part1" title="基本信息" />
            <el-anchor-link href="#part2" title="应用信息" />
          </el-anchor>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import $application,{codeMap,codeMapTrans,serviceCodeMap,serviceCodeMapTrans} from '@/plugins/application'
import Uploader from '@/components/common/Uploader.vue'
import { Upload } from '@element-plus/icons-vue'
import {$account} from '@yeying-community/yeying-wallet';
import { useRoute } from 'vue-router'

const route = useRoute()
const containerRef = ref(null)
const ruleFormRef = ref()
const avatarChk = ref('2')
const codeChk = ref('2')
const avatarList = ref([])
const codeList = ref([])
const detailInfo = ref({
  name: '',
  description: '',
  location: '',
  hash: '',
  code: '',
  serviceCodes: [],
  avatar: '',
  codeaaa: '',
  owner: '',
})
const userMeta = ref({})
const handleClick = (e) => {
  e.preventDefault()
}
const rules = reactive({
  name: [
    { required: true, message: '请输入', trigger: 'blur' },
  ],
  location: [
    { required: true, message: '请输入', trigger: 'blur' },
  ],
  avatar: [
    { required: true, message: '请选择', trigger: 'blur' },
  ],
  codeaaa: [
    { required: true, message: '请选择', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请选择', trigger: 'blur' },
  ],
  serviceCodes: [
    { required: true, message: '请选择', trigger: 'blur' },
  ],
})
const getDetailInfo = async () => {
  const {did,version} = route.query
  if(did){
    const res = await $application.detail(did,version);
    if(res){
      detailInfo.value = res.body.application;
    }
  }else{
    await getUserInfo()
    detailInfo.value.did = userMeta.value.did
    detailInfo.value.owner = userMeta.value.parent
    detailInfo.value.address = userMeta.value.address
    detailInfo.value.network = userMeta.value.network+""
    detailInfo.value.version = userMeta.value.version
  }
}
const submitForm = async (formEl) => {
  if (!formEl) return
  if(avatarChk.value=='1'){
    detailInfo.value.avatar = "1";
  }
  await formEl.validate(async(valid, fields) => {
    if (valid) {
      const params = JSON.parse(JSON.stringify(detailInfo.value))
      delete params.codeaaa
      params.code = codeMapTrans[params.code]
      params.serviceCodes = params.serviceCodes.map(item=>serviceCodeMapTrans[item])
      const rst = await $application.create(params)
      console.log('submit!',params,rst)
    } else {
      console.log('error submit!', fields)
    }
  })
}
const changeFileAvatar = (uploadFile) => {
  changeFile(1,uploadFile)
}
const changeFileCode = (uploadFile) => {
  changeFile(2,uploadFile)
}
const handleAvatarUpdate = (newFiles) => {
  avatarList.value = newFiles;
};
const changeFile = async (fileType,uploadFile) => {
  const namespaceId = await $application.getNameSpaceId();
  if (namespaceId && uploadFile) {
    // curImg.value.name = uploadFile.name;
    // curImg.value.size = (uploadFile.size / 1024).toFixed(1) + "M";
    const uploader = await $application.uploads(namespaceId, uploadFile.raw);
    const params = {
      namespaceId,
      hash: uploader.hash,
      type: 1,
      duration: 3600,
      name: uploader.name,
    };
   
    const linkInfo = await $application.createLink(params);
    const url = linkInfo && linkInfo.url && linkInfo.url.url;
    if(fileType==1){
      detailInfo.value.avatar = url;
    }else{
      detailInfo.value.codePackagePath = url;
      detailInfo.value.hash = uploader.hash;
    }
  }
}
const getUserInfo = async () => {
  const info = await $account.getActiveIdentity()
  userMeta.value = info.metadata || {}
}
onMounted(() => {
  getDetailInfo()
  // await getDetailInfo();
})
</script>
<style scoped lang="less">
.edit {
  margin: 20px;
  .content{
    margin-top: 24px;
    .left{
      height: 82vh;
      overflow-y: auto;
      padding-right: 20px;
      .input-style{
        width: 473px;
      }
      .upload-text{
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 400;
      }
      @media (max-width: 768px) {
        .input-style{
          width:240px;
        }
      }
      .title{
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
      }
      #part1 {
        background: #fff;
        padding: 20px;
      }
      #part2 {
        margin-top: 10px;
        background: #fff;
        padding: 20px;
      }
    }
    .right{
      margin-left: 20px;
      font-size: 14px;
    }
  }
  .footer{
    margin-top: 20px;
    text-align: right;
    padding: 0 20px 20px 0;
  }
}
</style>