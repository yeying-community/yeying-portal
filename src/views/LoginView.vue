<template>
  <div class="flex h-screen">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>
        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-95 flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="iconfont icon-close"/>
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 p-12">
                <div class=" cursor-pointer" @click="changeRouter('/')">
                  <img class="w-44 h-12" src="../assets/img/logo.svg"/>
                </div>
                phone left
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:inset-y-0 lg:z-50 lg:flex lg:w-3/6 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="left flex grow flex-col bg-indigo-600 p-12">
        <div class=" cursor-pointer" @click="changeRouter('/')">
          <img class="w-44 h-12" src="../assets/img/logo.svg"/>
        </div>
        <div>pc left</div>
      </div>
    </div>

    <div class="flex-1">
        <div class="lg:hidden sticky top-0 z-40 flex h-16 shrink-0 items-center bg-white px-4 lg:px-8">
            <button type="button" class="-m-2.5 p-2.5 text-gray-700" @click="sidebarOpen = true">
            <span class="iconfont icon-horizon scale-125"/>
            </button>
        </div>

        <div class="flex grow flex-col items-center pt-20">
            <Login/>
        </div>
    </div>
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
const changeRouter = (url) => {
  router.push(url)
  if(url && sidebarOpen.value){
    sidebarOpen.value = false
  }
}
</script>
<style scoped>
.left{
  background: linear-gradient(111deg, #C268DF 1%, #6C8AED 44.4%, #8CCFFA 98.52%);
}
</style>