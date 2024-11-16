<template>
    <div class="mx-auto max-w-5xl pt-4 lg:pt-80">
        <div class="text-center text-3xl font-black	 tracking-tight text-black-900 sm:text-3xl">Our advantage</div>
        <dl class="grid px-2 mt-11 grid-cols-1 gap-x-6 gap-y-6 lg:max-w-none lg:grid-cols-2">
            <div v-for="feature in itemList" :key="feature.title" class="flex flex-col rounded-[calc(theme(borderRadius.xl)+theme(spacing.2))] shadow-sm ring-1 ring-black/5 p-6">
                <dt class="flex items-center gap-x-3 font-semibold text-gray-900">
                    <component :is="feature.icon" class="size-14 flex-none text-indigo-600" aria-hidden="true" />
                </dt>
                <dd class="mt-5 flex flex-auto flex-col text-2xl font-medium">
                    {{ feature.title }}
                </dd>
                <dd class="mt-3.5 flex flex-auto flex-col text-base font-normal	">
                    {{ feature.desc }}
                </dd>
            </div>
        </dl>
    </div>
</template>
<script setup>
import { WrenchIcon, AdjustmentsVerticalIcon,ShieldCheckIcon } from '@heroicons/vue/24/outline'

const itemList = [
    { 
        title: "Self-Controllable", 
        desc: "The user's own number is the sum of the numbers and the amount is completely controlled and owned.",
        icon: WrenchIcon
    },
    { 
        title: "Privacy Protection", 
        desc: "In order to protect the number of exchanges, it is necessary to maintain public safety and to protect the private security of non-public numbers.",
        icon: WrenchIcon
    },
    { 
        title: "individual", 
        desc: "You can use it based on your own academic needs, work methods, and lifestyle preferences.",
        icon: WrenchIcon
    },
    { 
        title: "Productivity Tools", 
        desc: "Established personal knowledge, used AI technology, constructed numbers worldwide, high production, work efficiency.",
        icon: WrenchIcon
    },
]
</script>