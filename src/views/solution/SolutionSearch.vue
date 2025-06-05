<script setup>
import {getCurrentInstance, ref} from 'vue'
import {useSolutionStore} from '@/stores/index'
// import {InputSearch} from 'ant-design-vue'
import { Search } from '@element-plus/icons-vue'

const {proxy} = getCurrentInstance()
const {$t} = proxy
const solutionStore = useSolutionStore()

const searchVal = ref()
const search = () => {
  console.log(111)
  solutionStore.getSolutionList(searchVal.value)
}
</script>

<template>
  <div class="my-12 center flex justify-center">
    <div class="w-4/5 flex lg:w-1/2">
      <!-- <input-search
          v-model="searchVal"
          :placeholder="$t('common.pleaseSearch')"
          :enter-button="$t('common.search')"
          size="large"
          @search="search"
      /> -->
      <el-input
        v-model="searchVal"
        size="large"
        :placeholder="$t('common.pleaseSearch')"
        @keyup.enter="search"
      >
        <template #suffix>
          <el-icon class="el-input__icon search-icon" @click="search">
            <Search />
          </el-icon>
        </template>
      </el-input>
    </div>
  </div>
</template>
