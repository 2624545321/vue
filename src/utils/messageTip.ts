/**
 * @desc elementUi 相关的提示信息进行统一封装
 */
import { ElMessage, ElNotification } from 'element-plus'

// enum MessageType {
//   'success', 'warning', 'info', 'error'
// }

interface MessageTipFn {
  (
    message: string,
    type: 'success' | 'warning' | 'info' | 'error',
    OtherOptions?: any,
  ): void
}

/**
 * @desc elementUi 的 ElNotification 组件
 * @param { string } message 提示信息
 * @param { string } type 类型
 * @param { object } OtherOptions 其他配置项
 *
 * @return void
 */
export const notification: MessageTipFn = (message, type, OtherOptions) => {
  if (typeof OtherOptions !== 'object')
    OtherOptions = { [OtherOptions]: OtherOptions }
  ElNotification({
    message,
    type,
    ...OtherOptions,
  })
}
/**
 * @desc elementUi 的 ElMessage 组件
 * @param { string } message 提示信息
 * @param { string } type 类型
 * @param { any } OtherOptions 其他配置项
 *
 * @return void
 */
export const message: MessageTipFn = (message, type, OtherOptions) => {
  if (typeof OtherOptions !== 'object')
    OtherOptions = { [OtherOptions]: OtherOptions }
  ElMessage({
    message: message,
    type,
    ...OtherOptions,
  })
}
