<template>
  <div v-if="logo.show" class="layout-logo flex justify-center items-center">
    <div class="layout-logo-icon">
      <img class="block" :src="logo.logo" />
    </div>
    <div v-show="!configStore.menuFold" class="layout-logo-title ml-2">
      {{ logo.title }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import useConfigStore from '@/store/modules/config'
import setting from '@/setting'
const logo = setting.logo

const configStore = useConfigStore()
// console.log(logo)
// import { ref } from 'vue'
// console.log(setting)
// const s = ref(Object.freeze(setting))
// console.log(s)
</script>
<style scoped lang="scss">
.layout-logo {
  height: $base-menu-logo-height;
  img {
    width: 30px;
  }
}
.layout-logo-title {
  color: $menuColor;
  font-size: $base-logo-title-fontSize;
}
</style>
