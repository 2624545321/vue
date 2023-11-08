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
export const reqUserLogin = (data: UserLoginRequestParmeter) =>
  request.post<any, LoginResponseData>(RequestUrl.LOGIN, data)

export const reqUserInfo = () =>
  request.get<any, UserInfoResponseData>(RequestUrl.USER_INFO)
