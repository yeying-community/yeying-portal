<template>
  <div class="layout_bg">
    <Header/>
    <RouterView />
    <ContactModal/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import ContactModal from '@/components/contact/Frame.vue'

</script> 
<style scoped>
.layout_bg{
  background:url('../../assets/img/bg.jpg') white 0px 0px / 100% 100% no-repeat;
  background-size:100% 50%; 
}
</style>