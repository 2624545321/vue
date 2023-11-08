interface ResponseData {
  code: number
  data: any
}

export interface UserLoginRequestParmeter {
  username: string
  password: string
}

export interface LoginResponseData extends ResponseData {
  code: number
  data: {
    token: string
  }
}

interface UserInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string
  buttons: string[]
  routes: Array<string>
  token: string
}

export interface UserInfoResponseData extends ResponseData {
  data: UserInfo
}
