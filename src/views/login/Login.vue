<template>
  <div class="login-container">
    <el-row class="login-row" align="middle">
      <el-col :span="12" :xs="6"></el-col>
      <el-col :span="8" :xs="12" justify="center">
        <div class="login-from">
          <div>
            <el-space direction="vertical" :size="20">
              <h1>hello world</h1>
            </el-space>
          </div>
          <div>
            <el-space direction="vertical" :size="20">
              <h2>wolcome to admin template</h2>
            </el-space>
          </div>
          <el-form
            ref="ruleFormRef"
            status-icon
            :model="formOfLogin"
            :rules="customFormFules"
            @submit.prevent="onSubmit(ruleFormRef as FormInstance)"
          >
            <el-form-item prop="username">
              <el-input v-model="formOfLogin.username">
                <template #prefix>
                  <el-icon>
                    <User />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
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
                sign in
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { ref, shallowRef } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { FormInstance } from 'element-plus'
import useUserStore from '@/store/modules/user'
import type {
  LoginResponseData,
  UserLoginRequestParmeter,
} from '@/api/user/type'
import { validateUserName, validatePassword } from '@/service/login'
import { currentHourToText } from '@/utils/day'
import { message, notification } from '@/utils/messageTip'
// store
const userStore = useUserStore()
// router
const router = useRouter()
const route = useRoute()
// status
const loading = ref(false)
// form 表单的引用
const ruleFormRef = ref<FormInstance>()
const formOfLogin = ref<UserLoginRequestParmeter>({
  // username: 'admin',
  password: '111111',
  username: 'admin',
  // password: 'atguigu123',
})
// 自定义验证规则
const customFormFules = shallowRef({
  username: [{ validator: validateUserName, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
})
/**
 * @desc 表单提交，登录逻辑
 * @param { FormInstance } formEl 表单元素
 *
 * @return void
 */
const onSubmit = async (formEl: FormInstance) => {
  loading.value = true

  let valid = false
  await formEl.validate((validRes: boolean) => (valid = validRes))
  if (!valid) return (loading.value = false)

  userStore.userLogin(formOfLogin.value, (res: LoginResponseData) => {
    if (res.code === 200) {
      notification('sign in success!', 'success', {
        title: currentHourToText(),
      })
      router.push({ name: (route.query.redirectedFrom as string) || 'index' })
    } else {
      message(res.data, 'error')
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
      color: $text-color-white;
    }
    h2 {
      font-size: 30px;
      color: $text-color-white;
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
