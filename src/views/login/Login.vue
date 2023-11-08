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
          <el-form>
            <el-form-item>
              <el-input v-model="account" :prefix-icon="User"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                type="password"
                v-model="password"
                :prefix-icon="Lock"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="login-submit" type="primary">login</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'

const account = ref('admin')
const password = ref('111111')
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
    }
  }
}
</style>
