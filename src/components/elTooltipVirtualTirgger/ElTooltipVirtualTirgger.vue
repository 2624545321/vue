<template>
  <el-tooltip
    v-model:visible="visible"
    :content="content"
    virtual-triggering
    :virtual-ref="triggerRef"
  ></el-tooltip>
</template>
<script lang="ts" setup>
/**
 * @desc elementPlus tooltip 虚拟触发
 */
import { ref, computed, watch, nextTick } from 'vue'
import { useEventListener } from '@/hooks/util/useEventListener'

interface Props {
  visible: boolean
  content?: string
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

// 是否设置了位置
const alreadySetPos = ref<boolean>(false)

watch(visible, (v) => {
  /* 关闭时取消位置设置 */
  if (!v) {
    nextTick(() => (alreadySetPos.value = false))
  }
})

const position = ref({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
})

const mousemoveHandler = (e: MouseEvent) => {
  if (!visible.value) return
  if (!e.target) return
  if (alreadySetPos.value) return
  alreadySetPos.value = true
  /* const style = window.getComputedStyle(e.target)
  const width = style.width
  const height = style.height */
  const rect = e.target.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.bottom
  position.value = DOMRect.fromRect({
    width: 0,
    height: 0,
    x,
    y,
  })
}

useEventListener(document, 'mousemove', mousemoveHandler)
</script>
<style scoped lang="scss"></style>
