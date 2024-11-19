<script setup>
import {ref,getCurrentInstance} from 'vue'
import { useSolutionStore } from '@/stores/index'
const { proxy } = getCurrentInstance();
const {$t}=proxy
const solutionStore = useSolutionStore()

const searchVal = ref()
const search = () => {
    solutionStore.getSolutionList(searchVal.value)
}
</script>

<template>
    <div class="my-12 center flex justify-center">
        <div class="w-4/5 flex lg:w-1/2">
            <input type="text" 
                v-model="searchVal"
                class="block w-full rounded-none rounded-l-md border-0 py-3 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm/6" 
                :placeholder="$t['ph_search']" />
            <button type="button" 
                @click="search"
                class="w-20 mx-2.5 -ml-px inline-flex justiry-center items-center rounded-r-md text-base font-semibold text-white ring-1 ring-inset ring-blue-300 bg-blue-600 hover:bg-blue-500">
                <div class="w-full">{{$t["btn_search"]}}</div>
            </button>
        </div>
    </div>
</template>
