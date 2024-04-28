import moment from 'moment'

export function timeFormat(time, flag, type) {
  type = type || 'YYYY-MM-DD'
  var date = new Date(time)
  var dataStr = moment(time).format(type)
  if (!flag) {
    dataStr = dataStr.replace(/-/g, '')
  }
  return dataStr
}

/**
 * 获取日期范围
 */
export function getDateRang(val) {
  const now = new Date() // 当前日期
  const nowDayOfWeek = now.getDay() // 今天本周的第几天
  const nowDay = now.getDate() // 当前日
  const nowMonth = now.getMonth() // 当前月
  const nowYear = now.getFullYear() // 当前年
  const jd = Math.ceil((nowMonth + 1) / 3)
  let startTime
  let endTime
  let customTime = []
  switch (val) {
    case 'currentDay': // 昨日
      startTime = new Date(nowYear, nowMonth, nowDay)
      endTime = new Date(nowYear, nowMonth, nowDay)
      break
    case 'yesterday': // 昨日
      startTime = new Date(nowYear, nowMonth, nowDay - 1)
      endTime = new Date(nowYear, nowMonth, nowDay - 1)
      break
    case 'week': // 本周
      startTime = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek)
      endTime = new Date(nowYear, nowMonth, nowDay + 6 - nowDayOfWeek)
      break
    case 'lastWeek': // 上周
      startTime = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7)
      endTime = new Date(nowYear, nowMonth, nowDay + 6 - nowDayOfWeek - 7)
      break
    case 'pastWeek': // 近 7 日
      startTime = new Date(nowYear, nowMonth, nowDay - 6)
      endTime = new Date(nowYear, nowMonth, nowDay)
      break
    case 'month': // 本月
      startTime = new Date(nowYear, nowMonth, 1)
      endTime = new Date(nowYear, nowMonth + 1, 0)
      break
    case 'lastMonth': // 上月
      startTime = new Date(nowYear, nowMonth - 1, 1)
      endTime = new Date(nowYear, nowMonth, 0)
      break
    case 'pastMonth': // 近 31 日
      startTime = new Date(nowYear, nowMonth, nowDay - 30)
      endTime = new Date(nowYear, nowMonth, nowDay)
      break
    case 'quarter': // 本季度
      startTime = new Date(nowYear, (jd - 1) * 3, 1)
      endTime = new Date(nowYear, jd * 3, 0)
      break
    case 'year': // 今年
      startTime = new Date(nowYear, 0, 1)
      endTime = new Date(nowYear, 11, 31)
      break
    default:
      // 自定义时间
      customTime = val.split(' - ')
      break
  }
  return customTime.length
    ? customTime
    : [formatDate(startTime), formatDate(endTime)]
}

function formatDate(date) {
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? `0${m}` : m
  let d = date.getDate()
  d = d < 10 ? `0${d}` : d
  return `${y}-${m}-${d}`
}
