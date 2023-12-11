import request from '@/plugins/axios'
import {
  UserLoginRequestParmeter,
  LoginResponseData,
  UserInfoResponseData,
  LogoutResponseData,
} from './type'

enum RequestUrl {
  LOGIN = '/admin/acl/index/login',
  USER_INFO = '/admin/acl/index/info',
  LOGOUT = '/admin/acl/index/logout',
}

/*  <any, LoginResponseData> 泛型函数，不写也行
 写了就告诉axios请求参数为any，响应参数为 LoginResponseData
*/

/**
 * @desc 登录接口
 * @param { UserLoginRequestParmeter } data 请求参数
 *
 * @return { Promise } 请求结果
 */
export const reqUserLogin = (data: UserLoginRequestParmeter): Promise<any> =>
  request.post<any, LoginResponseData>(RequestUrl.LOGIN, data)

/**
 * @desc 请求用户信息
 *
 * @return { Promise } 请求结果
 */
export const reqUserInfo = (): Promise<any> =>
  request.get<any, UserInfoResponseData>(RequestUrl.USER_INFO)

export const reqLogout = (): Promise<any> =>
  request.post<any, LogoutResponseData>(RequestUrl.LOGOUT)
