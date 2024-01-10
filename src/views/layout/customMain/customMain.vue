<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import useConfigStore from '@/store/modules/config'
const configStore = useConfigStore()

const isRefresh = ref(true)
watch(
  () => configStore.refresh,
  () => {
    console.log('refresh')
    isRefresh.value = false
    nextTick(() => (isRefresh.value = true))
  },
)
</script>
