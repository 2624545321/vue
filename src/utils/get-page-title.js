import defaultSettings from '@/settings'

const title = defaultSettings.title || '传播效果分析平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
