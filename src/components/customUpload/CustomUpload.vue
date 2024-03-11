<template>
  <el-upload
    class="avatar-uploader"
    :list-type="listType"
    :action="props.action"
    v-model:file-list="props.customFileList"
    :show-file-list="props.showFileList"
    :on-success="handleUploadSuccess"
    :before-upload="beforeUpload"
  >
    <template v-if="listType !== 'picture-card'">
      <img v-if="value" :src="value" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </template>
    <template v-else>
      <el-icon><Plus /></el-icon>
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
import { computed, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import type { CustomUploadProps } from '@/types/components/customUpload'
import type { ResponseData } from '@/types/config/request'

const props = withDefaults(defineProps<CustomUploadProps>(), {
  action: '',
  showFileList: false,
  modelValue: '',
  listType: 'text',
  customFileList: () => []
})

interface Emits<T> {
  (e: 'update:modelValue', value: T): () => void
  (e: 'update:customFileList', value: T): () => void
}
const emits = defineEmits<Emits<any>>()
// const emitFileList = useVModel(props, 'fileList', emits)
// emitFileList

const value = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  },
})

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const type: string[] = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (type.indexOf(rawFile.type) === -1) {
    ElMessage.error('must be image format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('picture size can not exceed 4MB!')
    return false
  }
  // const url = URL.createObjectURL(rawFile)
  // console.log(url)
  return true
}

const handleUploadSuccess: UploadProps['onSuccess'] = (
  response: ResponseData,
  uploadFile,
) => {
  // console.log('response', response)
  console.log('uploadFile', uploadFile)
  if (!response.data) return ElMessage.error('unknow error!')
  switch (props.listType) {
    case 'text':
      emits('update:modelValue', response.data || '')
      break
    case 'picture-card':
      console.log('customFileList')
      const l = props.customFileList || []
      l.push(response.data || '')
      emits('update:customFileList', l)
      break
    case 'picture':
      break
    default:
      console.warn('an unexpected mistake')
  }
}

onUnmounted(() => {
  console.log('onUnmounted')
})
</script>
<style scoped lang="scss">
.avatar-uploader {
  ::v-deep() .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  ::v-deep() .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  ::v-deep() .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
  img {
    max-height: 200px;
    object-fit: scale-down;
  }
}
</style>
