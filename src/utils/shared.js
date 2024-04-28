import { timeFormat } from '@/utils/timeFormat'
/**
 * @desc 日期按钮的参数转化
 * @tip 该方法会直接改变源对象
 * @btn { object } 按钮数据
 *
 */
export const dateBtnValToTime = btn => {
  if (btn.omit) return btn
  let n1, n2
  if (Array.isArray(btn.value)) {
    n1 = btn.value[0]
    n2 = btn.value[1]
  } else {
    n1 = Number(btn.value)
    n2 = 0
  }
  const t1 = timeFormat(new Date().getTime() - n1 * 24 * 60 * 60 * 1000, true)
  const t2 = timeFormat(new Date().getTime() - n2 * 24 * 60 * 60 * 1000, true)
  btn.value = [t1, t2]
}
