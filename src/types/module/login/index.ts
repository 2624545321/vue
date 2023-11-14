import type { LoginResponseData } from '@/api/user/type'
/**
 * @desc 点击登录后的回调函数
 * 
 * @param { result } LoginResponseData 响应结果
 * @return void
 */
export type loginSubmitOfCallback = (result: LoginResponseData) => void
