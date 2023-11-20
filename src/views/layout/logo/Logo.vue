<template>
  <div v-if="logo.show" class="layout-logo flex justify-center items-center">
    <div class="layout-logo-icon mr-2">
      <img class="block" :src="logo.logo" />
    </div>
    <div class="layout-logo-title">{{ logo.title }}</div>
  </div>
</template>
<script lang="ts" setup>
import setting from '@/setting'
const logo = setting.logo
console.log(logo)
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
