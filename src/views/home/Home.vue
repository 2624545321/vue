<template>
  <div>
    <h1>home</h1>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()

onMounted(() => {
  initData()
})

const initData = () => {
  userStore.getUserInfo()
}
</script>
<style lang="scss" scoped></style>
