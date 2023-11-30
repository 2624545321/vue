<template>
  <div class="tabbar-box flex justify-between items-center pl-4 pr-4 h-full">
    <div class="tbb-left h-full flex items-center">
      <tab-bar-left></tab-bar-left>
    </div>
    <div class="tbb-right h-full flex items-center">
      <tab-bar-right></tab-bar-right>
    </div>
  </div>
</template>
<script lang="ts" setup>
import tabBarLeft from './tabBarLeft.vue'
import tabBarRight from './tabBarRight.vue'
</script>
<style scoped lang="scss">
.tabbar-box {
  border-bottom: 1px solid var(--border-color);
}
</style>
