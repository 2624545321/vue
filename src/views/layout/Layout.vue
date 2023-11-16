<template>
  <div class="index-layout flex">
    <div class="layout-left">
      <logo></logo>
      left
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
