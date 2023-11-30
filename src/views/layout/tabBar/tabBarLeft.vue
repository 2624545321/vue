<template>
  <div @click="handleMenuFold" class="icon-menu-collapse cursor-pointer">
    <TransitionGroup name="slide-fade">
      <ele-icon
        v-show="!menuFold"
        class="block"
        icon="Fold"
        key="Fold"
      ></ele-icon>
      <ele-icon
        v-show="menuFold"
        class="block"
        icon="Expand"
        key="Expand"
      ></ele-icon>
    </TransitionGroup>
  </div>
  <div class="breadcurmb">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-show="r.meta?.menuTitle"
        v-for="(r, i) of matchedRouteList"
        :key="i"
        :to="{ name: r.name }"
      >
        {{ r.meta?.menuTitle }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteList } from '@/types/config'
import useConfigStore from '@/store/modules/config'

const route = useRoute()
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

const matchedRouteList = computed((): RouteList => route.matched)
</script>
<style scoped lang="scss">
.icon-menu-collapse {
  width: 40px;
  // height: 20px;
  height: 100%;
  line-height: 55px;
}
</style>
