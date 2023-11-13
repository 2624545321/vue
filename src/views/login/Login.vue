<template>
  <div class="login-container">
    <el-row class="login-row" align="middle">
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="10" :xs="24" justify="center">
        <div class="login-from">
          <div>
            <el-space direction="vertical" :size="20">
              <h1>hello world</h1>
            </el-space>
          </div>
          <div>
            <el-space direction="vertical" :size="20">
              <h2>欢迎来到尚硅谷</h2>
            </el-space>
          </div>
          <el-form :model="formOfLogin" @submit.prevent="onSubmit">
            <el-form-item>
              <el-input v-model="formOfLogin.username">
                <template #prefix>
                  <el-icon>
                    <User />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                type="password"
                v-model="formOfLogin.password"
                show-password
              >
                <template #prefix>
                  <el-icon>
                    <Lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                native-type="submit"
                class="login-submit"
                :loading="loading"
              >
                login
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
import useUserStore from '@/store/modules/user'
import type { LoginResponseData } from '@/api/user/type'
import '@/utils/day'

const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)
const formOfLogin = ref({
  username: 'admin',
  password: '111111',
})
const onSubmit = () => {
  loading.value = true
  userStore.userLogin(formOfLogin.value, (res: LoginResponseData) => {
    // console.log(res)
    if (res.code === 200) {
      ElNotification({
        message: 'sign in success!',
        type: 'success',
      })
      router.push({ name: 'home' })
    } else {
      ElMessage({
        message: res.data.message,
        type: 'error',
      })
    }
    loading.value = false
  })
}
</script>
<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: url('@/assets/images/login-bacc.jpg') no-repeat center/cover;
  .login-row {
    height: 100%;
  }
  .login-from {
    // display: inline;
    h1 {
      font-size: 40px;
    }
    h2 {
      font-size: 30px;
    }
    padding: 40px;
    background: url('@/assets/images/login_form-bacc.png') no-repeat
      center/cover;
    .login-submit {
      width: 100%;
      font-size: 16px;
    }
  }
}
</style>
