<template>
    <form
        class="form w-4/5"
        @submit.prevent="handleSubmit"
        >
        <div class="text-center text-3xl font-semibold opacity-85">Apply a New Account</div>
        <div class="mt-1 text-center font-normal text-base mt-2 opacity-85">
        Already a member? <span class="blue-color cursor-pointer" @click="changeRouter('/login')">Register</span>
        </div>
       
        <div class="mt-4 block sm:flex items-center gap-1" v-if="isContinue">
            <label for="phone" class="block text-width text-sm font-normal text-gray-900"><span class="text-red-500 mr-1">*</span>Telephone</label>
            <div class="mt-2 flex-1">
                <input v-model="form.phone"
                    type="phone" name="phone"  required="" :placeholder="$t('common.pleaseInput')"
                    class="pl-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div class="mt-3 sm:flex items-center gap-1" v-if="isContinue">
            <label for="email" class="block text-width text-sm font-normal text-gray-900"><span class="text-red-500 mr-1">*</span>Email</label>
            <div class="mt-2 relative flex-1">
                <input v-model="form.email"
                    type="email" name="email"  required="" :placeholder="$t('common.pleaseInput')"
                    class="pl-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                <span @click="getMsCode" class="cursor-pointer text-sm font-normal blue-color absolute right-1 top-2">获取验证码</span>
            </div>
        </div>
        <div class="mt-3 sm:flex items-center gap-1" v-if="isContinue">
            <label for="mscode" class="block text-width text-sm font-normal text-gray-900"><span class="text-red-500 mr-1">*</span>验证码</label>
            <div class="mt-2 flex-1">
                <input v-model="form.mscode"
                    type="text" name="mscode"  required="" :placeholder="$t('common.pleaseInput')"
                    class="pl-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div class="mt-3 sm:flex items-center gap-1" v-if="isContinue">
            <label for="password" class="block text-width text-sm font-normal text-gray-900"><span class="text-red-500 mr-1">*</span>Password</label>
            <div class="mt-2 flex-1">
                <input v-model="form.password"
                    type="password" name="password"  required="" :placeholder="$t('common.pleaseInput')"
                    class="pl-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div class="mt-3 sm:flex items-center gap-1" v-if="isContinue">
            <label for="confirm_pwd" class="block text-width text-sm font-normal text-gray-900"><span class="text-red-500 mr-1">*</span>Confirm Password</label>
            <div class="mt-2 flex-1">
                <input v-model="form.confirm_pwd"
                    type="password" name="confirm_pwd"  required="" :placeholder="$t('common.pleaseInput')"
                    class="pl-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div class="mt-3 sm:flex items-center gap-1" v-if="isContinue">
            <label for="accode" class="block text-width text-sm font-normal text-gray-900"><span class="text-red-500 mr-1">*</span>Account Code</label>
            <div class="mt-2 flex-1">
                <input v-model="form.accode"
                    type="text" name="accode"  required="" :placeholder="$t('common.pleaseInput')"
                    class="pl-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div class="mt-3 sm:flex items-center gap-1" v-if="isContinue">
            <label for="displayName" class="block text-width text-sm font-normal text-gray-900"><span class="text-red-500 mr-1">*</span>Display Name</label>
            <div class="mt-2 flex-1">
                <input v-model="form.displayName"
                    type="text" name="displayName"  required="" :placeholder="$t('common.pleaseInput')"
                    class="pl-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div class="mt-3 sm:flex items-center gap-1" v-if="!isContinue">
            <label for="bc_network" class="block text-width text-sm font-normal text-gray-900"><span class="text-red-500 mr-1">*</span>Blockchain Network</label>
            <div class="mt-2">
                <input v-model="form.bc_network"
                    type="text" name="bc_network"  required="" :placeholder="$t('common.pleaseInput')"
                    class="pl-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        
        <div class="flex items-center mt-3" v-if="!isContinue">
            <input id="remember-me" name="remember-me" type="checkbox" class="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            <label for="remember-me" class="ml-3 block text-sm/6 text-gray-700">我同意 用户协议 & 政策</label>
        </div>
        <!-- <div class="mt-3" v-if="isContinue">
            <button type="button" @click="handleContinue" class="rounded-md bg-blue-600 w-full py-1 text-sm text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Continue
            </button>
        </div> -->
        <div class="mt-3">
            <button type="submit" class="h-10 text-base font-normal rounded-md bg-blue-600 w-full py-1 text-sm text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                {{isContinue?'Continue':'Completed'}}
            </button>
        </div>
        
    </form>
</template>
<script setup>
    import { ref,getCurrentInstance } from 'vue'
    import Uploader from '@/components/common/Uploader.vue'
    import Captcha from '@/components/common/Captcha.vue'
    import { useLoginStore } from '@/stores/index'
    import { useRouter } from 'vue-router'
    const loginStore = useLoginStore()
    const { proxy } = getCurrentInstance();
    const isContinue = ref(true)
    const {$t, $identity, $account}=proxy
    const router = useRouter();
    const form = ref({
        phone: "",
        email: "",
        password: "",
        confirm_pwd: "",
        mscode: "", //验证码
        accode: "", //Account code
        displayName: "", //Display name
        bc_network: "",//Bloack chain network
    })
    const handleSubmit = () => {
        $identity.createPersonal("", form.displayName, "", "", form.password, {email: form.email, telephone: form.phone}).then(
            (identity) => {
              console.log(`${JSON.stringify(identity)}`)
            }
        ).catch(err => console.error(err));

        if(isContinue.value){
            isContinue.value = false
        }else{
            loginStore.login(form.value)
        }
    }
    const getMsCode = () => {
        alert(1)
    }
    const changeRouter = (url) => {
        router.push(url)
    }
</script>
<style scoped>
.text-width{
    width:8rem;
}
</style>