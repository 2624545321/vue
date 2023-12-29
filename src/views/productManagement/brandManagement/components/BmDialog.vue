<template>
  <el-dialog
    v-model="dialogVisible"
    :before-close="handleClose"
    :title="props.title"
    width="40%"
  >
    <el-form
      ref="formRef"
      :model="formParameter"
      label-position="left"
      @submit.prevent="handleFormSubmit"
      label-width="80"
    >
      <el-form-item label="品牌名称" prop="tmName">
        <el-input v-model="formParameter.tmName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="品牌 logo" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="api/admin/product/fileUpload"
          :show-file-list="true"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload"
        >
          <img
            v-if="formParameter.logoUrl"
            :src="formParameter.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleFormSubmit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps, FormInstance } from 'element-plus'
import type { ResponseData } from '@/types/config/request'
import type { BaseTrademarkItem } from '@/api/productManagement/brand/type'
import type { DialogStatus } from '@/types/module/productManagement/brandManagement'

// props
const props = withDefaults(defineProps<DialogStatus>(), {
  visible: true,
  title: '',
  // formData: null
})
// emits
interface Emits {
  (e: 'update:visible', value: boolean): void
  (e: 'form-submit', value: BaseTrademarkItem): void
}
const emits = defineEmits<Emits>()
// form
const formRef = ref<FormInstance>()
const formParameter = ref<BaseTrademarkItem>({
  tmName: '',
  logoUrl: '',
})

/**
 * @desc 关闭弹窗，同时清除表单数据
 */
const handleClose = () => {
  dialogVisible.value = false
  formClear()
}

const formClear = () => {
  /* 
    el-form会记录第一次打开的值当做表单的默认值 ，
    在后续调用resetFields会将当前绑定的数据对象设置为el-form的默认值
    解决：手动清除表单数据
  */
  formRef.value?.resetFields()
  delete formParameter.value.id
  formParameter.value.tmName = ''
  formParameter.value.logoUrl = ''
  // Object.keys(formParameter.value).forEach((key) => {
  //   if (key === 'id') {
  //     formParameter.value.id = undefined
  //   } else {
  //     formParameter.value[key] = ''
  //   }
  // })
}

const dialogVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emits('update:visible', val)
  },
})

watch(
  () => props.formData,
  (v) => {
    // console.log('props.formData', v)
    if (!v) return
    // Object.assign(formParameter.value, v)
    formParameter.value.id = v.id
    formParameter.value.tmName = v.tmName
    formParameter.value.logoUrl = v.logoUrl
    // console.log('formParameter.value', formParameter.value)
  },
)

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log('rawFile', rawFile)
  const type: string[] = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (type.indexOf(rawFile.type) === -1) {
    ElMessage.error('picture must be image format!')
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
  // formParameter.value.logoUrl = URL.createObjectURL(uploadFile.raw!)
  if (!response.data) return ElMessage.error('unknow error!')
  formParameter.value.logoUrl = response.data || ''
}

const handleFormSubmit = () => {
  // console.log('submit', formParameter.value)
  emits('form-submit', formParameter.value)
  handleClose()
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
  img {
    max-height: 200px;
    object-fit: scale-down;
  }
}
</style>
