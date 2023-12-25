<template>
  <el-dialog
    :modelValue="visible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleClose">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
// interface Props {
//   visible: boolean
//   title?: string
// }
// const props = withDefaults(defineProps<Props>(), {
//   visible: false,
//   title: '',
// })

defineProps(['title', 'visible'])
const $emits = defineEmits(['update:visible'])

interface Emits {
  (e: 'update:visible', value: boolean): void
}
// const emits = defineEmits<Emits>()

setTimeout(() => {
  $emits('update:visible', false)
  console.log('emits', $emits)
}, 2000)

const handleClose = (done: () => void) => {
  $emits('update:visible', false)
  // dialogVisible.value = false
  // console.log('dialogVisible', dialogVisible)
}

const dialogVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emits('update: visible', false)
  },
})
</script>
<style scoped lang="scss"></style>
