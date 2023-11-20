<template>
  <div style="color: #fff">{{ props.menuList }}</div>
</template>
<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router'
interface MenuProps {
  menuList: RouteRecordRaw[]
}
const props = withDefaults(defineProps<MenuProps>(), {
  menuList: [],
})
console.log(props)
</script>
<style scoped lang="scss"></style>
