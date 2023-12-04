<template>
  <div class="tbb-btn-group flex">
    <div class="tbb-btn-item mr-4">
      <el-button
        icon="Refresh"
        circle
        :loading="isLoading"
        @click="handleRefresh"
      />
    </div>
    <div class="tbb-btn-item mr-4">
      <el-button icon="FullScreen" circle @click="handleFullScreen" />
    </div>
    <div class="tbb-btn-item mr-4">
      <el-button icon="Setting" circle />
    </div>
  </div>
  <div class="avatar mr-4 line-height-0">
    <el-avatar
      :size="32"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      alt="avatar"
    />
  </div>
  <div class="setting line-height-0">
    <el-dropdown>
      <span class="el-dropdown-link">
        ammin
        <ele-icon icon="ArrowDown" style="vertical-align: bottom"></ele-icon>
      </span>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import useConfigStore from '@/store/modules/config'
import { ref } from 'vue'
const configStore = useConfigStore()

const isLoading = ref(false)
const handleRefresh = () => {
  isLoading.value = true
  configStore.refresh = !configStore.refresh
  // nextTick(() => isLoading.value = false)
  setTimeout(() => (isLoading.value = false), 500)
}

const handleFullScreen = () => {
  const fullScreen = document.fullscreenElement
  if (fullScreen) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}
</script>
<style scoped lang="scss"></style>
