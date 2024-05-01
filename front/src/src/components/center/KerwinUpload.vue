<!--
 * @作者: kerwin
-->
<template>
    <el-upload class="avatar-uploader" :show-file-list="false" :auto-upload="false" :on-change="handleChange">
        <img v-if="props.avatar" :src="avatarComputed" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import {computed} from 'vue'
const props = defineProps(["avatar"])
const emit = defineEmits(["change"])
const avatarComputed = computed(() =>
    props.avatar.includes("blob") ?
        props.avatar : 'http://localhost:5000' + props.avatar
)

const handleChange = (file)=>{
    emit("change",file)
}
</script>

<style scoped lang="scss">
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar{
    width: 178px;
  height: 178px;
}

</style>