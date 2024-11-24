<template>
  <div @click="openContact" class="blue-color cursor-pointer bg-white px-3 py-5 frame fixed right-1.5 sm:right-12 top-1/4">
    <span class="iconfont icon-phone"/>
    <span class="mt-2 text-base font-puhuiRegular">{{$t["btn_contact"]}}</span>
    <Contact :isOpen="open" ref="RefContact"/>
  </div>
</template>

<script setup>
import {ref,getCurrentInstance} from 'vue'
import Contact from '@/components/contact/Modal.vue'
const open = ref(false)
const RefContact = ref()
const { proxy } = getCurrentInstance();
const {$t}=proxy
const openContact = () => {
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