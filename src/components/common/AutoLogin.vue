<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="closeModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div 
          style="min-height:70%"
          class="flex items-end justify-center text-center sm:items-center">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm ">
               <div>
                
                <div class="mt-3 text-center sm:mt-5">
                  <!-- <DialogTitle as="h3" class="text-base font-semibold text-gray-900">登录</DialogTitle> -->
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">以游客身份去登录</p>

                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 text-center">
                <button type="button" class="inline-flex w-20 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline-indigo-600" @click="login">登录</button>
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
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
const open = ref(true)
const closeModal = () => {
  open.value = false
  emit("close")
}
const openModal = () => {
  open.value = true
}
const login = async () => {
  const info = await $account.createGuest?.()
  console.log('createGuest success:',info)
  closeModal()
}
defineExpose({
  openModal
});
</script>