<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="40%"
    :before-close="handleClose"
  >
    <el-form>
      <el-form-item label="品牌名称" label-width="80">
        <el-input placeholder="请输入" />
      </el-form-item>
      <el-form-item label="品牌 logo" label-width="80">
        <el-upload
          class="avatar-uploader"
          action="api/admin/product/fileUpload"
          :show-file-list="true"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleClose">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
interface Props {
  visible: boolean
  title?: string
}
const props = withDefaults(defineProps<Props>(), {
  visible: true,
  title: '添加品牌',
})

interface Emits {
  (e: 'update:visible', value: boolean): void
}
const emits = defineEmits<Emits>()

const handleClose = () => {
  dialogVisible.value = false
}

const dialogVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emits('update:visible', val)
  },
})

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // console.log('rawFile', rawFile)
  const type: string[] = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (type.indexOf(rawFile.type) === -1) {
    ElMessage.error('picture must be image format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('picture size can not exceed 4MB!')
    return false
  }
  const url = URL.createObjectURL(rawFile)
  console.log(url)
  return true
}

const handleUploadSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  console.log('response', response)
  console.log('uploadFile', uploadFile)
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}
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
}
</style>
