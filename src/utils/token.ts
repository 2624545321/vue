import { sessionGet, sessionSet } from '@/utils/storage'

const t = 'user_token'
export const GET_TOKEN = (): string => sessionGet(t)
export const SET_TOKEN = (token: string) => sessionSet(t, token)
