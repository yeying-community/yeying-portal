<template>
  <div @click="openContact" class="blue-color cursor-pointer bg-white px-3 py-5 frame fixed right-1.5 sm:right-12 top-1/4">
    <span class="iconfont icon-phone"/>
    <span class="mt-2 text-base font-puhuiRegular">{{$t("common.contactUs")}}</span>
    <Contact :isOpen="open" ref="RefContact"/>
    <auto-login ref="RefLogin"/>
  </div>
</template>

<script setup>
import {ref,getCurrentInstance} from 'vue'
import Contact from '@/components/contact/Modal.vue'
import $account from '@/plugins/account.js'
import AutoLogin from '@/components/common/AutoLogin.vue'
import { useRouter } from 'vue-router'

const open = ref(false)
const RefLogin = ref()
const RefContact = ref()
const { proxy } = getCurrentInstance();
const {$t}=proxy
const router = useRouter();


/**
 * 校验是否有登录信息,未登录弹框选择登录方式
 * */
const changeLogin = async () => {
  const info = await $account.getActiveIdentity()
  // const did = info && info.metadata && info.metadata.did
  const did = $account.getActiveDid()
  let isLogin = false
  if(did){
    try{
      // await $account.login(did)
      isLogin = $account.isLogin(did)
    }catch(e){
      console.error('login failed:',e)
    }
  }
  if(isLogin){
    return true
  }else{
    router.push("/toLogin")
    // RefLogin.value.openModal()
  }
  return false
}
const openContact = async () => {
  const isLogin = await changeLogin()
  if(!isLogin){
    return
  }
  open.value = true
  RefContact.value.openModal()
}
const close = () => {
    open.value = false
}
</script>
<style scoped>
.frame{
  writing-mode: vertical-lr;
  box-shadow: 0px 0px 8px -2px;
}
</style>