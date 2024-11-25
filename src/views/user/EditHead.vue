<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="closeModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div 
          style="min-height:60%"
          class="flex items-end justify-center text-center sm:items-center">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:mt-8 sm:w-full sm:max-w-lg ">
                <div class="w-80 sm:w-96 text-base opacity-85 font-medium h-10 leading-10 pl-4">修改头像</div>
                <hr class="my-1">
                <div class="p-6">
                  <div class="flex">
                    <div class="w-2/3 pr-4 border-r">
                      <div class="text-base opacity-85 font-normal">
                        本地上传
                        <span class="text-sm opacity-50">(支持图片类型:png,jpg,gif)</span>
                      </div>
                      <div class="mt-2"><Uploader/></div>
                      <div class="mt-6 sm:mt-14 text-sm font-normal opacity-85">热门推荐</div>
                      <div class="mt-2 grid grid-cols-1 gap-2 lg:gap-6 h-48 overflow-y-auto grid-cols-2 lg:grid-cols-4">
                        <img v-for="item in imgList" 
                          class="w-20 h-20 rounded-lg "
                          :key="item" :src="item"/>
                      </div>
                    </div>
                    <div class="pl-4 flex-1">
                      <div>头像预览</div>
                      <div class="mt-6">
                        <img class="w-40 h-40 rounded-full" :src="curImg">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-right pr-4 border-t py-2">
                    <Button class="mr-2"
                        @click="closeModal"
                        >{{$t["btn_cancel"]}}</button>
                    <Button type="primary" >
                      {{$t["btn_ok"]}}
                    </button>
                </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref,reactive, onMounted,getCurrentInstance } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import Uploader from '@/components/common/Uploader.vue'
import {Button} from 'ant-design-vue'
const { proxy } = getCurrentInstance();
const {$t}=proxy
const props = defineProps( ["isOpen"]);
const emit = defineEmits(['close']);
const open = ref(false)
const curImg = ref()
const imgList = ref([
  "a.gif",
  "a.png",
  "a.jpg",
  "a.jpg",
  "a.jpg",
  "a.jpg",
  "a.jpg",
  "a.jpg",
])
const closeModal = () => {
    open.value = false
    emit("close")
}
const openModal = (img) => {
    open.value = true
    curImg.value = img
}
onMounted(()=> {
    open.value = props.isOpen;
})
defineExpose({
  openModal
});
</script>
<style scoped>
.border{
  border-left:1px solid #7f7f7f;
}
</style>