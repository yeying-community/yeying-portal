<!-- todo 学虎，这个是服务编辑页面，里面的接口应该跟应用类似 -->

<template>
    <div class="edit">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/market/service' }">服务中心</el-breadcrumb-item>
            <el-breadcrumb-item>{{ isEdit ? '编辑' : '创建' }}服务身份</el-breadcrumb-item>
        </el-breadcrumb>
        <BreadcrumbHeader :pageName="isEdit ? '编辑服务身份' : '创建服务身份'" />
        <el-form label-position="top" label-width="auto" :model="detailInfo" :rules="rules" ref="ruleFormRef">
            <el-row class="content">
                <el-col :span="19" :xs="24">
                    <div class="left" ref="containerRef">
                        <div id="servicePart1">
                            <div class="title">基本信息</div>
                            <el-divider />
                            <div class="form">
                                <el-form-item label="服务名称" prop="name">
                                    <el-input v-model="detailInfo.name" class="input-style" placeholder="请输入" />
                                </el-form-item>
                                <el-form-item label="服务描述" prop="description">
                                    <el-input
                                        v-model="detailInfo.description"
                                        class="input-style"
                                        placeholder="请输入"
                                        type="textarea"
                                    />
                                </el-form-item>
                                <el-form-item label="服务图标" prop="avatar">
                                    <el-radio-group v-model="avatarChk">
                                        <el-radio value="1">默认提供</el-radio>
                                        <el-radio value="2">上传图标</el-radio>
                                    </el-radio-group>
                                    <!-- <el-input v-model="detailInfo.name" class="input-style" placeholder="请输入"/> -->
                                </el-form-item>
                                <div v-if="avatarChk == '2'" class="wrap-cols">
                                    <Uploader @change="changeFileAvatar" v-model="avatarList" accept=".png,jpg">
                                        <el-button :icon="Upload">上传文件</el-button>
                                    </Uploader>
                                    <div class="upload-text">支持图片类型：png, jpg,gif,图标大小30*30</div>
                                </div>
                                <div v-else>
                                    <img
                                        class="mr-1 w-7 h-7"
                                        src="../../assets/img/apply_default.png"
                                        style="border-radius: 8px"
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="servicePart2">
                            <div class="title">服务信息</div>
                            <el-divider />
                            <div class="form">
                                <el-form-item label="服务代码" prop="code">
                                    <el-select v-model="detailInfo.code" placeholder="请选择" class="input-style">
                                        <el-option
                                            v-for="(key, value) in codeMap"
                                            :key="key + value"
                                            :label="key"
                                            :value="value"
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="接口代码" prop="serviceCodes">
                                    <el-select
                                        v-model="detailInfo.serviceCodes"
                                        placeholder="请选择"
                                        class="input-style"
                                        multiple
                                    >
                                        <el-option
                                            v-for="(key, value) in serviceCodeMap"
                                            :key="key + value"
                                            :label="key"
                                            :value="value"
                                        />
                                    </el-select>
                                    <!-- <el-input v-model="detailInfo.serviceCodes" class="input-style" placeholder="请输入应用访问地址"/> -->
                                </el-form-item>

                                <el-form-item label="代理地址" prop="location">
                                    <el-input
                                        v-model="detailInfo.location"
                                        class="input-style"
                                        placeholder="请输入服务代理地址"
                                    />
                                </el-form-item>
                                <el-form-item label="服务地址" prop="hash">
                                    <el-input
                                        v-model="detailInfo.hash"
                                        class="input-style"
                                        placeholder="请输入输入服务IP：端口（如：192.168.1.1:8080）"
                                    />
                                </el-form-item>
                            </div>
                        </div>
                        <div class="footer">
                            <el-button type="default" @click="cancelForm">取消</el-button>
                            <el-button :type="isEdit ? 'default' : 'primary'" @click="submitForm(ruleFormRef)"
                                >保存
                            </el-button>
                            <el-button v-if="isEdit" type="primary" @click="submitFormAndOnline(ruleFormRef)"
                                >保存并上架
                            </el-button>
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
                        <el-anchor-link href="#servicePart1" title="基本信息" />
                        <el-anchor-link href="#servicePart2" title="服务信息" />
                    </el-anchor>
                </el-col>
            </el-row>
        </el-form>
    </div>

    <ResultChooseModal
        v-model="innerVisible"
        title=""
        :closeIconHidden="true"
        mainDesc="服务创建成功"
        subDesc="可返回列表或继续上架当前服务"
        leftBtnText="上架服务"
        rightBtnText="返回列表"
        :leftBtnClick="toOnlineApply"
        :rightBtnClick="toList"
    >
        <template #icon>
            <el-icon :size="70"><SuccessFilled color="#30A46C" /></el-icon>
        </template>
    </ResultChooseModal>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import $application, { codeMap, codeMapTrans, serviceCodeMap, serviceCodeMapTrans } from '@/plugins/application'
import Uploader from '@/components/common/Uploader.vue'
import { Upload } from '@element-plus/icons-vue'
import { $account } from '@yeying-community/yeying-wallet'
import { useRoute, useRouter } from 'vue-router'
import BreadcrumbHeader from '@/views/components/BreadcrumbHeader.vue'
import { ElMessageBox } from 'element-plus'
import { h } from 'vue'
import { SuccessFilled } from '@element-plus/icons-vue'
import ResultChooseModal from '@/views/components/ResultChooseModal.vue'
const route = useRoute()
const router = useRouter()

const goBack = () => {
    router.back()
}
const toList = () => {
    router.push({
        path: '/market/service'
    })
}

const toOnlineApply = () => {
    ElMessageBox.confirm('', {
        message: h('p', null, [
            h('div', { style: 'font-size:18px;color:rgba(0,0,0,0.85)' }, '确定要上架当前服务吗？'),
            h('div', { style: 'font-size:14px;font-weight:400;color:rgba(0,0,0,0.85)' }, '上架当前服务信息将不可再编辑')
        ]),
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        customClass: 'messageBox-wrap'
    })
        .then(() => {
            /**
             * todo 学虎 上架服务接口
             *
             */
        })
        .catch(() => {})
}

const cancelForm = () => {
    ElMessageBox.confirm('', {
        message: h('p', null, [
            h('div', { style: 'font-size:18px;color:rgba(0,0,0,0.85)' }, '确定要取消创建应用吗？'),
            h('div', { style: 'font-size:14px;font-weight:400;color:rgba(0,0,0,0.85)' }, '取消后当前应用信息将不会保存')
        ]),
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        customClass: 'messageBox-wrap'
    })
        .then(() => {
            goBack()
        })
        .catch(() => {})
}

const isEdit = ref(false)
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
    owner: ''
})

const innerVisible = ref(false)
const userMeta = ref({})
const handleClick = (e) => {
    e.preventDefault()
}
const rules = reactive({
    name: [{ required: true, message: '请输入', trigger: 'blur' }],
    location: [{ required: true, message: '请输入', trigger: 'blur' }],
    avatar: [{ required: true, message: '请选择', trigger: 'blur' }],
    code: [{ required: true, message: '请选择', trigger: 'blur' }],
    serviceCodes: [{ required: true, message: '请选择', trigger: 'blur' }],
    codePackagePath: [{ required: true, message: '请上传代码包', trigger: 'blur' }]
})
const getDetailInfo = async () => {
    const { did, version } = route.query

    if (did) {
        isEdit.value = true
        /**
         *todo 学虎 服务详情接口，编辑页面进来的时候需要回填
         */
        const res = await $application.detail(did, version)
        console.log(res, '-detailRes-')
        if (res) {
            detailInfo.value = res.body.application
            detailInfo.value.code = String(res.body.application.code)
            detailInfo.value.serviceCodes = res.body.application.serviceCodes.map((v) => String(v))
        }
    } else {
        /**
         * 新建页面的时候需要拿到did，下面这个接口是不对的，需要改成创建did的接口
         */
        await getUserInfo()
        detailInfo.value.did = userMeta.value.did
        detailInfo.value.owner = userMeta.value.parent
        detailInfo.value.address = userMeta.value.address
        detailInfo.value.network = userMeta.value.network + ''
        detailInfo.value.version = userMeta.value.version
    }
}

const submitForm = async (formEl) => {
    if (!formEl) return
    if (avatarChk.value == '1') {
        detailInfo.value.avatar = '1'
    }
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const params = JSON.parse(JSON.stringify(detailInfo.value))
            delete params.$typeName
            params.code = codeMapTrans[params.code]
            params.serviceCodes = params.serviceCodes.map((item) => serviceCodeMapTrans[item])

            /**
             * todo 学虎 服务新建接口
             * 这里需要加判断，是新建还是编辑，需要在参数上区分
             */
            const rst = await $application.create(params)
            console.log('submit!', params, rst)
            innerVisible.value = true
        } else {
            console.log('error submit!', fields)
        }
    })
}
/**
 * todo 学虎，保存并上架服务
 * 保存接口调用submitForm可以实现
 * 上架接口需要补充在这里
 *
 */
const submitFormAndOnline = (formEl) => {
    submitForm(formEl)
}
const changeFileAvatar = (uploadFile) => {
    changeFile(1, uploadFile)
}
const changeFileCode = (uploadFile) => {
    changeFile(2, uploadFile)
}
const handleAvatarUpdate = (newFiles) => {
    avatarList.value = newFiles
}
const changeFile = async (fileType, uploadFile) => {
    const namespaceId = await $application.getNameSpaceId()

    // curImg.value.name = uploadFile.name;
    // curImg.value.size = (uploadFile.size / 1024).toFixed(1) + "M";

    if (namespaceId && uploadFile) {
        console.log(uploadFile, '--uploader-')
        try {
            const uploader = await $application.uploads(uploadFile.raw, namespaceId)

            const params = {
                namespaceId,
                hash: uploader.hash,
                type: 1,
                duration: 3600,
                name: uploader.name
            }

            const linkInfo = await $application.createLink(params)
            const url = linkInfo && linkInfo.url && linkInfo.url.url
            if (fileType == 1) {
                detailInfo.value.avatar = url
            } else {
                detailInfo.value.codePackagePath = url
                detailInfo.value.hash = uploader.hash
            }
        } catch (error) {
            console.log(error)
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
    .el-divider--horizontal {
        margin: 16px 0 24px !important;
    }
    .content {
        margin-top: 24px;
        .left {
            height: 82vh;
            overflow-y: auto;
            padding-right: 20px;

            .input-style {
                width: 473px;
            }
            .upload-text {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.85);
                font-weight: 400;
            }
            @media (max-width: 768px) {
                .input-style {
                    width: 240px;
                }
            }
            .title {
                font-size: 16px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.85);
                padding: 0 20px;
            }
            #part1,
            #part2 {
                background: #fff;
                padding: 20px 0;
                border-radius: 6px;
                margin-bottom: 18px;
                box-shadow:
                    0px 0px 1px 0px #00000014,
                    0px 1px 2px 0px #190f0f12,
                    0px 2px 4px 0px #0000000d;
                .form {
                    padding: 0 20px;
                }
            }
        }
        .right {
            margin-left: 20px;
            font-size: 14px;

            .el-anchor {
                --el-anchor-bg-color: transparent !important;
                .el-anchor__marker {
                    width: 2px !important;
                    height: 18px !important;
                }
            }

            .el-anchor__link.is-active {
                color: #1677ff !important;
            }
        }
    }
    .footer {
        margin-top: 20px;
        text-align: right;
        padding: 0 0px 20px 0;
    }
}
.status-desc {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
}
.waring-text {
    font-size: 18px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
}
</style>
