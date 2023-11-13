const session = window.sessionStorage
const local = window.localStorage

export const sessionGet = (key: string): string => session.getItem(key) || ''
export const sessionSet = (key: string, value: string): void =>
  session.setItem(key, value)

export const localGet = (key: string): string => local.getItem(key) || ''
export const localSet = (key: string, value: string): void =>
  local.setItem(key, value)
