<template>
  <el-tooltip
    v-model:visible="visible"
    content="删除SPU"
    virtual-triggering
    :virtual-ref="triggerRef"
  ></el-tooltip>
</template>
<script lang="ts" setup>
/**
 * @desc elementPlus tooltip 虚拟触发
 */
import { onMounted, onUnmounted, ref, computed } from 'vue'

interface Props {
  visible: boolean
}
interface Emits {
  (e: 'update:visible', v: boolean): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const visible = computed({
  get() {
    return props.visible
  },
  set(v) {
    emits('update:visible', v)
  },
})
const triggerRef = ref({
  getBoundingClientRect() {
    return position.value
  },
})

const position = ref({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
})

const mousemoveHandler = (e: MouseEvent) => {
  position.value = DOMRect.fromRect({
    width: 0,
    height: 0,
    x: e.clientX,
    y: e.clientY,
  })
}
onMounted(() => {
  document.addEventListener('mousemove', mousemoveHandler)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', mousemoveHandler)
})
</script>
<style scoped lang="scss"></style>
