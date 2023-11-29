<template>
  <div class="icon-menu-collapse cursor-pointer line-height-0">
    <!-- <Transition> -->
    <ele-icon
      v-show="!menuFold"
      @click="handleMenuFold"
      class="block"
      icon="Fold"
    ></ele-icon>
    <ele-icon
      v-show="menuFold"
      @click="handleMenuFold"
      class="block"
      icon="Expand"
    ></ele-icon>
    <!-- </Transition> -->
  </div>
  <div class="breadcurmb ml-4">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>promotion management</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import useConfigStore from '@/store/modules/config'
const configStore = useConfigStore()

let menuFold = computed({
  get() {
    return configStore.menuFold
  },
  set(v) {
    configStore.setMenuFold(v)
  },
})
const handleMenuFold = (): void => {
  menuFold.value = !menuFold.value
}
</script>
<style scoped lang="scss"></style>
