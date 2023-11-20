<template>
  <!-- 使用是需要用 svg 标签进行包裹，作为容器，内部使用use标签 -->
  <svg :style="customStyle">
    <!-- xlink:href 用哪个图标，属性值必须以 #icon- 开头，后面为图标名称 -->
    <!-- fill 设置图标的颜色，支持十六进制 -->
    <use :xlink:href="perfix + icon" :fill="color"></use>
  </svg>
</template>
<script lang="ts" setup>
interface SvgIconProps {
  perfix?: string
  icon: string
  color?: string
  customStyle?: string | object
}

const props = withDefaults(defineProps<SvgIconProps>(), {
  perfix: '#icon-',
  color: '',
  customStyle: '',
})
props
</script>
