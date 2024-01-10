<template>
  <el-dialog
    v-model="dialogVisible"
    :before-close="handleClose"
    :title="props.title"
    width="40%"
  >
    <el-form
      ref="formRef"
      :model="comFromData"
      @submit.prevent="handleFormSubmit"
      :rules="formRules"
      label-position="left"
      label-width="100"
    >
      <el-form-item label="品牌名称" prop="tmName">
        <el-input v-model="comFromData.tmName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="品牌 logo" prop="logoUrl">
        <!-- <el-upload
          class="avatar-uploader"
          action="api/admin/product/fileUpload"
          :show-file-list="true"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload"
        >
          <img
            v-if="comFromData.logoUrl"
            :src="comFromData.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload> -->
        <custom-upload
          v-model="comFromData.logoUrl"
          action="api/admin/product/fileUpload"
          :show-file-list="true"
        ></custom-upload>
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
import { computed, nextTick, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { DialogStatus } from '@/types/module/productManagement/brandManagement'
import CustomUpload from '@/components/customUpload/CustomUpload.vue'
import useVModel from '@/utils/useVModel'

// props formData 无默认值，为必填项
const props = withDefaults(defineProps<DialogStatus>(), {
  visible: true,
  title: '',
})
// emits
interface Emits {
  (e: 'update:visible', value: boolean): void
  (e: 'update:formData', value: any): void
  (e: 'form-submit'): void
}
const emits = defineEmits<Emits>()
// form
const formRef = ref<FormInstance>()
// const formParameter = ref<BaseTrademarkItem>({
//   tmName: '',
//   logoUrl: '',
// })

const validLogoUrl = (rule: any, value: any, callback: any) => {
  if (value.trim() === '') {
    callback(new Error(rule.message))
  } else {
    callback()
  }
}

const formRules = ref<FormRules<typeof props.formData>>({
  tmName: [{ required: true, trigger: 'blur', message: '该项目为必填' }],
  logoUrl: [
    { required: true, message: '该项目为必填', validator: validLogoUrl },
  ],
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
    fix: 执行两次，异步清楚即可解决问题！
  */
  formRef.value?.resetFields()
  // setTimeout(() => formRef.value?.resetFields())
  nextTick(() => formRef.value?.resetFields())
  // delete formParameter.value.id
  // formParameter.value.tmName = ''
  // formParameter.value.logoUrl = ''
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

/* 监听 formData 实现组件自定义 v-model */
// watch(
//   () => props.formData,
//   (v) => {
//     // console.log('props.formData', v)
//     if (!v) return
//     // Object.assign(formParameter.value, v)
//     formParameter.value.id = v.id
//     formParameter.value.tmName = v.tmName
//     formParameter.value.logoUrl = v.logoUrl
//   },
// )
/* optimize: 使用计算属性 */
const comFromData = useVModel(props, 'formData', emits)

watch(
  () => comFromData.value.logoUrl,
  (v) => {
    console.log(v)
    if (!v) return
    formRef.value!.clearValidate('logoUrl')
  },
)

const handleFormSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      // console.log('res', res)
      emits('form-submit')
      handleClose()
    })
    .catch((err) => {
      console.log('err', err)
    })
}
</script>
