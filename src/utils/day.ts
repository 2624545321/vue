import { dayjs } from 'element-plus'

/**
 * @desc 当前小时转为文字显示
 * 
 * @return  void
 */
export const currentHourToText = () => {
  const nowHour = dayjs().hour()
  let text = ''
  if (nowHour < 6) {
    text = '夜猫子好'
  } else if (nowHour < 9) {
    text = '早上好'
  } else if (nowHour < 12) {
    text = '上午好'
  } else if (nowHour < 14) {
    text = '中午好'
  } else if (nowHour < 18) {
    text = '下午好'
  } else if (nowHour < 24) {
    text = '晚上好'
  }
  return text
}
