export interface RequestConfig {
  baseURL: string
  timeout: number
}
export interface ResponseData {
  code: number
  data: any
  message: string
  ok: boolean
}
