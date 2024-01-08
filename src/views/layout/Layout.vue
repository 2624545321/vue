<template>
  <div class="index-layout flex">
    <div
      :class="menuFold && 'layout-left-flod'"
      class="layout-left flex flex-col shrink-0"
    >
      <logo></logo>
      <div class="menu-wrappe grow overflow-auto">
        <el-scrollbar>
          <el-menu
            :default-active="routeName"
            :collapse="menuFold"
            text-color="#fff"
            background-color="#001529"
          >
            <custom-menu :menu-list="menuStore.menuRouterList"></custom-menu>
          </el-menu>
        </el-scrollbar>
      </div>
    </div>
    <div class="layout-right grow flex flex-col">
      <div class="layout-tabbar">
        <tab-bar></tab-bar>
      </div>
      <main class="layout-main grow overflow-auto m-4">
        <custom-main></custom-main>
      </main>
    </div>
  </div>
</template>
<script lang="ts" setup>
// vue plugin
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// 组件
import Logo from './logo/Logo.vue'
import CustomMenu from './customMenu/customMenu.vue'
import TabBar from './tabBar/tabBar.vue'
import CustomMain from './customMain/customMain.vue'
// store
import useMenuStore from '@/store/modules/customMenu'
import useConfigStore from '@/store/modules/config'
const menuStore = useMenuStore()
const configStore = useConfigStore()
// route
const $route = useRoute()
// console.log($route)
const routeName = computed(() => $route.name)
const menuFold = computed(() => configStore.menuFold)
// console.log(routePath.value)
</script>
<style scoped lang="scss">
.index-layout {
  height: 100vh;
}
.layout-left {
  width: $base-menu-width;
  height: 100%;
  background: $base-menu-background;
  .el-menu {
    border: none;
  }
}
.layout-left-flod {
  width: auto;
}
.layout-right {
  height: 100%;
  .layout-tabbar {
    height: $base-tabbar-height;
  }
  // .layout-main {
  // }
}
</style>
