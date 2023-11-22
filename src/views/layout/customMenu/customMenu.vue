<template>
  <template v-if="menuList.length" v-for="menuItem of menuList">
    <!-- 没有子菜单，展示自己 -->
    <template v-if="!menuItem.children">
      <el-menu-item v-if="menuItem.meta?.show" :index="menuItem.path">
        <template #title>
          <ele-icon :icon="menuItem.meta?.menuIcon || ''"></ele-icon>
          <div>{{ menuItem.meta?.menuTitle }}</div>
        </template>
      </el-menu-item>
    </template>

    <!-- 只有一个子菜单，展示第一个子菜单 -->
    <template v-else-if="menuItem.children && menuItem.children.length === 1">
      <el-menu-item
        v-if="menuItem.children.at(0)?.meta?.show"
        :index="menuItem.path"
      >
        <ele-icon :icon="menuItem.meta?.menuIcon || ''"></ele-icon>
        <template #title>
          <div>{{ menuItem.children.at(0)?.meta?.menuTitle }}</div>
        </template>
      </el-menu-item>
    </template>

    <!-- 有多个子菜单，递归调用-->
    <template v-else-if="menuItem.children && menuItem.children.length > 1">
      <el-sub-menu v-if="menuItem.meta?.show" :index="menuItem.path">
        <template #title>
          <ele-icon :icon="menuItem.meta?.menuIcon || ''"></ele-icon>
          <div>{{ menuItem.meta?.menuTitle }}</div>
        </template>
        <custom-menu :menu-list="menuItem.children"></custom-menu>
      </el-sub-menu>
    </template>
  </template>
</template>
<script lang="ts" setup>
import type { RouteList } from '@/types/config'
interface MenuProps {
  menuList: RouteList
}
const props = withDefaults(defineProps<MenuProps>(), {
  menuList: () => [],
})
props
// console.log(props)
</script>
<style scoped lang="scss"></style>
