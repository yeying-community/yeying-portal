<template>
    <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :multiple="false"
        :file-list="fileList"
        @change="handleChange"
        :max-count="1"
    >
        <Button class="text-sm">
            <span class="iconfont icon-upload"/>
            Upload
        </Button>
        <span>
            {{desc}}
        </span>
    </Upload>
</template>
<script setup>
import {Upload,Button} from 'ant-design-vue'
const props = defineProps({
  desc: String
})
</script>