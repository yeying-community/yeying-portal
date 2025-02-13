<template>
  <div class="flex justify-center pt-32 bg">
    <div class="w-96 bg-white	h-52 pt-8 text-center rounded-md	">
        <!-- <DialogTitle as="h3" class="text-base font-semibold text-gray-900">登录</DialogTitle> -->
        <div class="flex flex-col items-center">
          <img class="w-24 h-6" src="../assets/img/logo.svg"/>
          <p class="text-lg mt-3">欢迎来到 YeYing!</p>
          <div class="text-xs mt-1">去中心化、加密的聊天与协作,由<span class="text-lg "> 夜莺社区 </span>驱动</div>
        </div>
        <div class="mt-8 text-center flex gap-2 justify-center">
          <!-- <button type="button" @click="changeRouter('/reg')" class="blue-color ml-2.5 font-puhuiRegular rounded-full bg-white px-8 py-2.5 text-xl shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-50">{{$t("common.register")}}</button>
          <button type="button" @click="changeRouter('/login')" class="font-puhuiRegular mx-2.5 rounded-full bg-blue-600 px-8 py-2.5 text-xl text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            {{$t("common.apply")}}
          </button> -->
          <button type="button" @click="go('/login')" class="w-2/5 h-8 font-puhuiRegular mx-2.5 rounded-md bg-blue-600 px-4 py-1 text-sm text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-0 focus-visible:outline-blue-600">
            已有身份
          </button>
          <button type="button" @click="go('/reg')" class="w-2/5 h-8 font-puhuiRegular mx-2.5 rounded-md bg-lime-600 px-4 py-1 text-sm text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-0 focus-lime:outline-indigo-600">
            新建身份
          </button>
          <!-- <button type="button" class="inline-flex w-20 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline-indigo-600 hover:bg-indigo-400" @click="login">登录</button>
          <button type="button" class="inline-flex w-20 justify-center rounded-md  px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50" @click="login">取消</button> -->
        </div>
      </div>
    <!-- <button type="button" class="-m-2.5 p-2.5 text-gray-700" @click="go('/login')">
        登录
    </button>
    <button type="button" class="-m-2.5 p-2.5 text-gray-700" @click="go('/reg')">
        注册
    </button> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Login from '@/views/login/Index.vue'
import { useRouter } from 'vue-router'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
const router = useRouter();
const sidebarOpen = ref(false)
const go = (url) => {
  router.push(url)
}
</script>
<style scoped>
.bg{
  width: 100vw;
  height: 100vh;
  background: linear-gradient(111deg, #C268DF 1%, #6C8AED 44.4%, #8CCFFA 98.52%);
}
</style>