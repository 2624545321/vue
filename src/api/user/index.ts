import request from '@/plugins/axios'
import {
  UserLoginRequestParmeter,
  LoginResponseData,
  UserInfoResponseData,
} from './type'

enum RequestUrl {
  LOGIN = '/user/login',
  USER_INFO = '/user/info',
}

/*  <any, LoginResponseData> 泛型函数，不写也行
 写了就告诉axios请求参数为any，响应参数为 LoginResponseData
*/

/**
 * @desc 登录接口
 * @param { data } UserLoginRequestParmeter 请求参数
 *
 * @return { Promise } 请求结果
 */
export const reqUserLogin = (data: UserLoginRequestParmeter) =>
  request.post<any, LoginResponseData>(RequestUrl.LOGIN, data)

/**
 * @desc 请求用户信息
 *
 * @return { Promise } 请求结果
 */
export const reqUserInfo = () =>
  request.get<any, UserInfoResponseData>(RequestUrl.USER_INFO)
