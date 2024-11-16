<script setup>
import Contact from '@/components/Contact.vue'
import { ref } from 'vue'
const open = ref(false)
const RefContact = ref()
const openContact = () => {
    open.value = true
    RefContact.value.openModal()
}
const close = () => {
    open.value = false
}
</script>

<template>
    <div class="mx-auto pt-10 sm:pt-18 lg:pt-40">
        <div class="text-center">
          <div class="text-balance max-w-4xl text-2xl font-semibold tracking-tight text-gray-900 sm:text-6xl">Build any smart web3 application freely</div>
          <div class="mt-10 text-lg font-normal opacity-65">It is a Web3 open source community driven by the community and independent developers, focusing on full-stack technologies related to Web3 and AI, used to build open infrastructure, and provide the ability to DIY various Web3 applications.</div>
          <div class="mt-14 flex items-center justify-center gap-x-6">
            <button 
                type="button" 
                @click="openContact"
                class="rounded-full bg-white px-3 sm:px-8 py-2.5 text-sm sm:text-xl font-semibold text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-50">
                Contact Us
            </button>
            <button type="button" class="mx-2.5 rounded-full bg-blue-600 px-3 sm:px-8 py-2.5 py-2.5 text-sm sm:text-xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Get Started for Free</button>
          </div>
        </div>
        <Contact :isOpen="open" ref="RefContact"/>
    </div>
</template>
