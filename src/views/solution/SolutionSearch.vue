<script setup>
import {ref,getCurrentInstance} from 'vue'
import { useSolutionStore } from '@/stores/index'
import {InputSearch} from 'ant-design-vue'
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
            <input-search
                v-model="searchVal"
                :placeholder="$t.ph_search"
                :enter-button="$t.btn_search"
                size="large"
                @search="search"
            />
        </div>
    </div>
</template>
