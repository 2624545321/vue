import type { UserInfo } from '@/api/user/type'

export interface userState {
  token: string
  userInfo: UserInfo | null
}
