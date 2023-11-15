// import type { UserLoginRequestParmeter } from '@/api/user/type'
// 验证规则
const formRules = {
  username: [
    {
      required: true,
      message: 'Please input Activity username',
      trigger: 'blur',
    },
    { min: 5, max: 12, message: 'Length should be 5 to 12', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: 'Please input Activity password',
      trigger: 'blur',
    },
    { min: 6, max: 14, message: 'Length should be 6 to 14', trigger: 'blur' },
  ],
}
formRules
// 自定义验证规则
export const validateUserName = (rule: any, value: any, callback: any) => {
  if (value.length < 5) {
    callback(new Error('Please input the username'))
  }
  callback()
}
export const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error('Please input the password'))
  }
  callback()
}
