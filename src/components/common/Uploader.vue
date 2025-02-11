<template>
    <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :multiple="false"
        :before-upload="beforeUpload"
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
const emit = defineEmits(['change']);
const props = defineProps({
  desc: String
})
const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
        const info = e.target.result;
        emit("change",info)
    };
    
      // 阻止文件上传到服务器
    //   emit("change",info)
      return false;
}
</script>