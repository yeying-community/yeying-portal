<template>
    <form
        class="form"
        @submit.prevent="handleSubmit"
        >
        <div class="text-center text-3xl font-semibold opacity-85">Register to YeYing</div>
        <div class="mt-1 text-center font-normal text-base mt-2 opacity-85">Don't have an account? <span class="blue-color cursor-pointer" @click="changeRouter('/reg')">Apply For</span></div>
        <div class="mt-9" v-bind="!hasAccount">
            <label class="block text-sm font-normal text-gray-900">
                <span class="text-red-500 mr-1">*</span>
                身份文件
                <span class="text-xs opacity-50">(支持扩展名:.dll)</span>
            </label>
            <div class="mt-2">
                <Uploader @change="changeFile"/>
            </div>
        </div>
        <div class="mt-6">
            <label for="password" class="block text-sm font-normal text-gray-900"><span class="text-red-500 mr-1">*</span>Password</label>
            <div class="mt-2">
                <input v-model="form.password"
                    type="password" name="password"  required="" :placeholder="$t('common.pleaseInput')"
                    class="pl-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div class="flex items-center mt-6">
            <input v-model="form.isAgree" id="remember-me" name="remember-me" type="checkbox" class="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            <label for="remember-me" class="ml-3 block text-sm/6 text-gray-700">我同意 用户协议 & 政策</label>
        </div>
        <!-- <div class="mt-6">
            <Captcha/>
        </div> -->
        <div class="mt-6 h-10">
            <button type="submit" class="h-10 text-base font-normal	 rounded-md bg-blue-600 w-full py-1 text-sm text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                登录
            </button>
        </div>
        
    </form>
</template>
<script setup>
    import { ref,getCurrentInstance,onMounted } from 'vue'
    import Uploader from '@/components/common/Uploader.vue'
    import Captcha from '@/components/common/Captcha.vue'
    import { useLoginStore } from '@/stores/index'
    import { useRouter } from 'vue-router'
    import $account from '@/plugins/account.js'
    import { message } from 'ant-design-vue';

    const router = useRouter();
    // const loginStore = useLoginStore()
    const { proxy } = getCurrentInstance();
    const {$t}=proxy
    const hasAccount = ref(false)
    const form = ref({
        password: "",
        did: "",
        desc: "",
        isAgree: false,
    })
    const handleSubmit = async () => {
        const {did, password, isAgree} = form.value || {}
        if(!isAgree){
            message.warning('请勾选我同意用户协议&政策')
            return
        }
        try{
            // router.push("/")
            const info = await $account.login(did, password)
            console.log("登录:", info,form.value)
            router.push("/")
        }catch(e){
            message.warning('请检查登录信息')
        }
        // loginStore.login(form.value)
    }
    const changeRouter = (url) => {
        router.push(url)
    }
    const getActiveIdentity = () => {
        const info = $account.getActiveIdentity()
        if(info){ // 有身份信息,帐号过期,只用输入密码
            hasAccount.value = true
        }
        return info
    }
    const changeFile = async (content) => {
        const info = await $account.importIdentity(content)
        const did = info && info.metadata && info.metadata.did
        if(did){
            form.value.did = did
            console.log('importIdentity Identity:',info,content)
        }else{
            message.warning('请检查文件信息')
        }
    }
    onMounted(()=>{
        getActiveIdentity()
    })
</script>
<style scoped>
.form{
    width: 300px;
}
</style>