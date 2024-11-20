<template>
  <div class="layout_bg">
    <Header/>
    <RouterView />
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/layout/Header.vue'
const imgs = ref([new URL("../../assets/img/bg.png", import.meta.url).href,]);


// 顶部导航背景图片配置
const  background = {
    // 背景图片地址
    backgroundImage: 'url(/assets/img/bg.png',
    // 背景图片是否重复
    backgroundRepeat: 'no-repeat',
}
</script>
<style scoped>
.layout_bg{
  background:url('../../assets/img/bg.jpg') white 0px 0px / 100% 100% no-repeat;
  background-size:100% 50%; 
}
</style>