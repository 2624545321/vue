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
    <el-avatar :size="32" :src="userStore.avatar" alt="avatar" />
  </div>
  <div class="setting line-height-0">
    <el-dropdown @command="handleDropdown">
      <span class="el-dropdown-link">
        {{ userStore.userName }}
        <ele-icon icon="ArrowDown" style="vertical-align: bottom"></ele-icon>
      </span>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="center">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">
            <el-popconfirm
              width="220"
              confirm-button-text="OK"
              cancel-button-text="No, Thanks"
              title="Are you sure to logout?"
              @confirm="confirmEvent"
              @cancel="cancelEvent"
            >
              <template #reference>退出登录</template>
            </el-popconfirm>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useConfigStore from '@/store/modules/config'
import useUserStore from '@/store/modules/user'
const configStore = useConfigStore()
const userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()

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

const handleDropdown = (a: string) => {
  // console.log(a)
  switch (a) {
    case 'logout':
      // logout()
      break
    default:
      break
  }
}
const confirmEvent = () => {
  // console.log('confirm!')
  logout()
}
const cancelEvent = () => {
  console.log('cancel!')
}

/**
 * @desc 退出登录
 * 1. 向服务器发送请求，退出登录，再次请求数据时需要携带新的 token
 * 2. 清空存储的用户信息，清空token
 * 3. 跳转到登录页面
 *
 * @return void
 */
const logout = async () => {
  const msg = await userStore.logout()
  if (msg !== 'ok') return
  $router.replace({
    name: 'login',
    query: { redirectedFrom: $route.name as string },
  })
}
</script>
<style scoped lang="scss"></style>
