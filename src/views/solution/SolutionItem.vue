<template>
<div class="bg-white p-6 rounded-md">
    <div v-for="(item,index) in solutionList" :key="'solute:'+item.code">
        <hr v-if="index!=0" class="my-6">
        <div class="text-2xl font-medium">{{item.title}}</div>
        <div class="text-base font-normal text-blak-600 mt-3 opacity-65	">{{item.desc}}</div>
        <div class="flex items-center gap-6 isolate mx-auto mt-6 grid max-w-md grid-cols-1 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4 ">
            <div 
                v-for="fitem in item.list" 
                :key="'solute:'+fitem.code" 
                class="flex flex-col justify-between rounded-3xl bg-white p-5 ring-1 ring-gray-900/10 sm:p-6"
            >
                <div class="h-80">
                    <div class="text-xl	font-normal">{{ fitem.name }}</div>
                    <div class="text-5xl font-bold mt-3">{{ fitem.price }}</div>
                    <hr class="mt-5 mb-1"/>
                    <div class="flex text-base mt-4" v-for="(gitem,gindex) in fitem.items" :key="'solute:'+gitem.name+gindex">
                        <div class="text-gray-500 font-normal">{{gitem.name}}</div>
                        <div class="ml-1 font-medium">{{gitem.value}}</div>
                    </div>
                </div>
                <button type="button" 
                    @click="openContact"
                    class="rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-50">Contact Us</button>
            </div>
        </div>
    </div>
    <Contact :isOpen="open" ref="RefContact"/>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/20/solid'
import Contact from '@/components/Contact.vue'
const open = ref(false)
const RefContact = ref()
const openContact = () => {
    open.value = true
    RefContact.value.openModal()
}
const close = () => {
    open.value = false
}
const solutionList = [
  {
    code: "1",
    title:"Sliding puzzle solution",
    desc:"Smooth and high-quality user experience. You only need to slide the puzzle lightly to complete the security verification. It supports a variety of front-end and back-end integration solutions, including trigger, embedded, and pop-up. The delivery form can be private delivery or cloud service.",
    list:[{
        name: '云服务定制版本',
        code: 's1',
        price: '¥4800',
        items: [
            {name:"可用ID",value:"5个"},
            {name:"并发量",value:"100Q/s"},
            {name:"验证量",value:"3500次/小时"},
            {name:"底图",value:"无Logo"},
        ]
        },
        {
            name: '私有化定制版本',
            code: 's2',
            price: '¥9600',
            items: [
                {name:"可用ID",value:"5个"},
                {name:"并发量",value:"100Q/s"},
                {name:"验证量",value:"3500次/小时"},
                {name:"底图",value:"无Logo"},
                {name:"包含夜莺logo",value:""},
            ]
        },
        {
            name: '私有化定制版本',
            code: 's2',
            price: '¥9600',
            items: [
                {name:"可用ID",value:"5个"},
                {name:"并发量",value:"100Q/s"},
                {name:"验证量",value:"3500次/小时"},
                {name:"底图",value:"无Logo"},
            ]
        },
    ]
  },
  {
    code: "2",
    title:"2Sliding puzzle solution",
    desc:"2Smooth and high-quality user experience. You only need to slide the puzzle lightly to complete the security verification. It supports a variety of front-end and back-end integration solutions, including trigger, embedded, and pop-up. The delivery form can be private delivery or cloud service.",
    list:[{
        name: '云服务定制版本',
        code: 's1',
        price: '¥4800',
        items: [
            {name:"可用ID",value:"5个"},
            {name:"并发量",value:"100Q/s"},
            {name:"验证量",value:"3500次/小时"},
            {name:"底图",value:"无Logo"},
        ]
        },
        {
            name: '私有化定制版本',
            code: 's2',
            price: '¥9600',
            items: [
                {name:"可用ID",value:"5个"},
                {name:"并发量",value:"100Q/s"},
                {name:"验证量",value:"3500次/小时"},
                {name:"底图",value:"无Logo"},
            ]
        }
    ]
  },
]

</script>