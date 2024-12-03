
<template>
  <div class="pr-10">
    <div class="flex py-4 mx-10 items-center">
        <div class="text-lg font-medium	">Account</div>
        <div class="text-sm font-normal	ml-4">注释、描述摘要等</div>
    </div>
    <div class="pl-10">
        <form
            class="form bg-white p-6 text-base font-normal"
            ref="formRef"
            @submit.prevent="handleSubmit"
            >
            <div class="opacity-85">头像</div>
            <div class="flex items-center mt-2">
                <img class="mr-4 w-20 h-20" src="../../assets/img/default.jpg">
                <Button v-if="isEdit" @click="openHead">
                    <span class="iconfont icon-upload"/>
                    更换头像
                </Button>
            </div>
            <div class="mt-3">Display Name:</div>
            <div class="mt-2">
            <span v-if="isEdit">
                <input type="text" required=""
                class="pl-1.5 block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                v-model="form.displayName">
            </span>
            <span v-else>{{form.displayName}}</span>
            </div>
            <div class="mt-3">Telephone:</div>
            <div class="mt-2"><span v-if="isEdit">
                <input type="phone" required=""
                class="pl-1.5 block  w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                v-model="form.phone">
            </span>
            <span v-else>{{form.phone}}</span>
            </div>
            <div class="mt-3">Email:</div>
            <div class="mt-2"><span v-if="isEdit">
                <input type="email" required=""
                class="pl-1.5 block  w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                v-model="form.email">
            </span>
            <span v-else>{{form.email}}</span></div>
            <div class="mt-3">Password:</div>
            <div class="mt-2"><span v-if="isEdit">
                <input type="passowrd" required=""
                class="pl-1.5 block  w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                v-model="form.password">
            </span>
            <span v-else>{{form.password}}</span></div>
            <div class="mt-4">
                <div v-if="isEdit">
                    <Button class="px-6 mr-2"  type="primary" @click="editUser">OK</Button>
                    <Button class="px-6" @click="cancel">Cancel</Button>
                </div>
                <Button class="px-6" v-else type="primary" @click="toEdit">Edit</Button>
            </div>
        </form>
    </div>
    <EditHead :isOpen="open" ref="RefContact"/>
  </div>
</template>
<script setup>
    import { ref,getCurrentInstance } from 'vue'
    import {Button} from 'ant-design-vue'
    import EditHead from '@/views/user/EditHead.vue'
    const open = ref(false)
    const RefContact = ref()
    const formRef = ref()
    const isEdit = ref(false)
    const form = ref({
            phone: "1",
            email: "1",
            password: "1",
            confirm_pwd: "",
            mscode: "1", //验证码
            accode: "1", //Account code
            displayName: "1", //Display name
            bc_network: "1",//Bloack chain network
            head_url:"../../assets/img/default.jpg"
        })
    const toEdit = () => {
        isEdit.value = true
    }
    const handleSubmit = () => {
        console.log(form)
    }
    const editUser = () => {
        formRef.value.submit()
        isEdit.value = false
    }
    const cancel = () => {
        isEdit.value = false
    }
    const openHead = () => {
        open.value = true
        RefContact.value.openModal()
    }
</script>
<style scoped>
.blue-btn{
    background: #1890FF;
}
</style>
