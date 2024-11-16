<template>
    <header class="inset-x-0 top-0 z-50 flex justify-center">
      <nav class="flex items-center justify-between py-4 w-full px-2 xl:w-9/12	" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5 text-sm font-extrabold">
            <span >YeYing Community</span>
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12 font-normal text-base">
          <RouterLink :class="item.name==selectName?'text-blue-600':''" v-for="item in navigation" :key="item.title" :to="item.to">{{ item.title }}</RouterLink>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <button type="button" class="rounded-full bg-white px-8 py-2.5 text-xl font-semibold text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-50">Register</button>
            <button type="button" class="mx-2.5 rounded-full bg-blue-600 px-8 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Apply</button>
        </div>
      </nav>
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="size-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <a v-for="item in navigation" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
              </div>
              <div class="py-6">
                <button type="button" class="rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Register</button>
                <button type="button" class="mx-2.5 rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Apply</button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
</template>
<script setup>
import { ref,watch } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { RouterLink,useRoute } from 'vue-router'
const route = useRoute();
const selectName = ref("home")
// 监听路由变化
    watch(
      () => route,
      (newRoute, oldRoute) => {
        if(newRoute?.name){
            selectName.value = newRoute.name
        }
      },{deep:true}
    );
const navigation = [
  { title: '应用商店', to: '/', name:"home" },
  { title: '解决方案', to: '/solution', name:"solution" },
  { title: '文档', to: '#' },
  { title: '博客', to: '#' },
  { title: '关于我们', to: '#' },
]
const mobileMenuOpen = ref(false)
</script>