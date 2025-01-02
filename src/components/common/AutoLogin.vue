<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="closeModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div 
          style="min-height:40%"
          class="flex items-end justify-center text-center sm:items-center">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg p-5 bg-white pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm ">
               <div>
                
                <div class="mt-3 text-center sm:mt-5">
                  <!-- <DialogTitle as="h3" class="text-base font-semibold text-gray-900">登录</DialogTitle> -->
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">以游客身份去登录</p>

                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 text-center flex gap-2 justify-center py-3">
                <!-- <button type="button" @click="changeRouter('/reg')" class="blue-color ml-2.5 font-puhuiRegular rounded-full bg-white px-8 py-2.5 text-xl shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-50">{{$t("common.register")}}</button>
                <button type="button" @click="changeRouter('/login')" class="font-puhuiRegular mx-2.5 rounded-full bg-blue-600 px-8 py-2.5 text-xl text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  {{$t("common.apply")}}
                </button> -->
                <button type="button" @click="login()" class="font-puhuiRegular mx-2.5 rounded-md bg-indigo-600 px-4 py-1 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-0 focus-visible:outline-indigo-600">
                  登录
                </button>
                <button type="button" @click="closeModal()" class="font-puhuiRegular ml-2.5 rounded-md bg-white px-4 py-1 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-0 focus-visible:outline-gray-300">取消</button>
                <!-- <button type="button" class="inline-flex w-20 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline-indigo-600 hover:bg-indigo-400" @click="login">登录</button>
                <button type="button" class="inline-flex w-20 justify-center rounded-md  px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50" @click="login">取消</button> -->
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import $account from '@/plugins/account.js'
import { message } from 'ant-design-vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
const open = ref(false)
const closeModal = () => {
  open.value = false
  // emit("close")
}
const openModal = () => {
  open.value = true
}
const login = async () => {
  const info = await $account.createGuest?.()
  message.success('登录成功')
  // const did = info.metadata.did
  // localStorage.setItem("did", did)
  // console.log('createGuest success:',info)
  closeModal()
}
defineExpose({
  openModal
});
</script>