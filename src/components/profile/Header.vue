<template>
    <div class="header h-14 p-4 border-b flex justify-between">
        <div class="flex">
            <img class="w-24 h-6 pr-4 border-r" src="../../assets/img/logo.svg"/>
            <span class="text-base opacity-85 font-medium pl-4">My Profile</span>
        </div>
        <div>
            <Language/>
            <UserMenu/>
        </div>
    </div>
</template>
<script setup>
import Language from '@/components/common/Language.vue'
import UserMenu from '@/components/common/UserMenu.vue'
</script>
<style scoped>
</style>