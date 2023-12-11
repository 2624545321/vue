interface ResponseData {
  code: number
  data: any
  message: string
  ok: boolean
}

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
