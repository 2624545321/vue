<template>
  <div class="index-layout flex">
    <div class="layout-left flex flex-col">
      <logo></logo>
      <div class="menu-wrappe grow overflow-auto">
        <el-scrollbar>
          <el-menu text-color="#fff" background-color="#001529">
            <custom-menu :menu-list="menuStore.menuRouterList"></custom-menu>
            <!-- <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
              <template #title>Workspace</template>
              <el-menu-item index="2-1">item one</el-menu-item>
              <el-menu-item index="2-2">item two</el-menu-item>
              <el-menu-item index="2-3">item three</el-menu-item>
              <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="3" disabled>Info</el-menu-item>
            <el-menu-item index="4">Orders</el-menu-item> -->
          </el-menu>
        </el-scrollbar>
      </div>
    </div>
    <div class="layout-right grow flex flex-col">
      <div class="layout-tabbar">tabbar</div>
      <main class="layout-main grow overflow-auto">
        main
        <div class="test-div"></div>
      </main>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Logo from './logo/Logo.vue'
import customMenu from './customMenu/customMenu.vue'
import useMenuStore from '@/store/modules/customMenu'
const menuStore = useMenuStore()


</script>
<style scoped lang="scss">
.index-layout {
  height: 100vh;
}
.layout-left {
  width: $base-menu-width;
  height: 100%;
  background: $base-menu-background;
}
.layout-right {
  height: 100%;
  .layout-tabbar {
    height: $base-tabbar-height;
  }
  .layout-main {
    .test-div {
      height: 120vh;
    }
  }
}
</style>
