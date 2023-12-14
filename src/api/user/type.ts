import type { ResponseData } from '@/types/config/request'

export interface UserLoginRequestParmeter {
  username: string
  password: string
}

export interface LoginResponseData extends ResponseData {
  data: string
}

export interface UserInfo {
  avatar: string
  name: string
  // password: string
  roles: string[]
  buttons: string[]
  routes: Array<string>
}

export interface UserInfoResponseData extends ResponseData {
  data: UserInfo
}

export interface LogoutResponseData extends ResponseData {}
