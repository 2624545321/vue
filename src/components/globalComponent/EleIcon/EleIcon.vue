<template>
  <template v-if="icon">
    <el-icon><component :is="icon" /></el-icon>
  </template>
</template>
<script lang="ts" setup>
/**
 * @desc elementPlus 的图标组件统一封装
 */
interface EleIconProps {
  icon: string
}
const props = defineProps<EleIconProps>()
</script>
<style scoped lang="scss"></style>
