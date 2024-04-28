export const mockImportantRankData = [
  {
    name: '核心头条',
    value: '',
    active: false,
    channel: [
      { value: 20, name: '报纸' },
      { value: 40, name: '网站' },
      { value: 30, name: '客户端' },

      { value: 35, name: '微信' },
      { value: 24, name: '微博' },
      { value: 34, name: '短视频' },

      { value: 51, name: '订阅号' },
      { value: 20, name: '海外媒体' },
    ],
  },
  {
    name: '核心媒体',
    value: '',
    active: false,
    channel: [
      { value: 60, name: '报纸' },
      { value: 20, name: '网站' },
      { value: 10, name: '客户端' },

      { value: 35, name: '微信' },
      { value: 34, name: '微博' },
      { value: 64, name: '短视频' },

      { value: 57, name: '订阅号' },
      { value: 20, name: '海外媒体' },
    ],
  },
  {
    name: '一级媒体',
    value: '',
    active: false,
    channel: [
      { value: 30, name: '报纸' },
      { value: 10, name: '网站' },
      { value: 30, name: '客户端' },

      { value: 35, name: '微信' },
      { value: 24, name: '微博' },
      { value: 34, name: '短视频' },

      { value: 21, name: '订阅号' },
      { value: 10, name: '海外媒体' },
    ],
  },
  {
    name: '二级媒体',
    value: '',
    active: false,
    channel: [
      { value: 20, name: '报纸' },
      { value: 40, name: '网站' },
      { value: 30, name: '客户端' },

      { value: 35, name: '微信' },
      { value: 24, name: '微博' },
      { value: 34, name: '短视频' },

      //   { value: 51, name: '订阅号' },
      //   { value: 20, name: '海外媒体' },
    ],
  },
]

const calcluteTotalVaL = arr => {
  if (!Array.isArray(arr))
    return console.warn('calcluteTotalVaL parameter err!')
  const res = arr.reduce(
    (prev, curr) => {
      return {
        value: Number(prev.value) + Number(curr.value),
      }
    },
    { value: 0 },
  )
  return res.value
}

/* 计算每个来源的总数 */
mockImportantRankData.forEach(item => {
  item.value = calcluteTotalVaL(item.channel)
})

// 稿件传播排行
export const mockManuSpreadData = {
  Records: [
    {
      author: '',
      ceiIndex: 1621.04,
      channel: '',
      comments: 0,
      mediaCount: 528,
      mediaName: 'e公司',
      paraise: 0,
      pubTime: '2024/04/17 22:28:00',
      reading: 0,
      reprintCount: 1007,
      title: '商务部新闻发言人就美对华发起301调查发表谈话',
      zbGuid: '16806054527611419337',
    },
    {
      author: '',
      ceiIndex: 1643.27,
      channel: '',
      comments: 0,
      mediaCount: 1047,
      mediaName: '人民网',
      paraise: 0,
      pubTime: '2024/04/19 23:09:00',
      reading: 0,
      reprintCount: 1505,
      title: '重庆燃气集团被查出六大问题 多收取的燃气费将全额退款',
      zbGuid: '16863941862140646688',
    },
    {
      author: '',
      ceiIndex: 1902.74,
      channel: '',
      comments: 0,
      mediaCount: 379,
      mediaName: 'e公司',
      paraise: 0,
      pubTime: '2024/04/18 19:18:00',
      reading: 0,
      reprintCount: 801,
      title:
        '美宣布对中国钢铝产品限制措施 中国商务部：中方将采取一切必要措施，捍卫自身权益',
      zbGuid: '10915210128093381380',
    },
    {
      author: '',
      ceiIndex: 1841.99,
      channel: '',
      comments: 0,
      mediaCount: 789,
      mediaName: '人民网',
      paraise: 0,
      pubTime: '2024/04/16 08:39:00',
      reading: 0,
      reprintCount: 1120,
      title: '跟着总书记看中国 | 交通强国',
      zbGuid: '6341522776746558692',
    },
    {
      author: '',
      ceiIndex: 1807.95,
      channel: '',
      comments: 0,
      mediaCount: 371,
      mediaName: '人民网',
      paraise: 0,
      pubTime: '2024/04/18 10:07:00',
      reading: 0,
      reprintCount: 623,
      title: '一季度我国出入境人次同比上升117.8%',
      zbGuid: '7346232056324067112',
    },
    {
      author: '',
      ceiIndex: 1795.87,
      channel: '',
      comments: 0,
      mediaCount: 403,
      mediaName: '证券时报网',
      paraise: 0,
      pubTime: '2024/04/19 14:35:00',
      reading: 0,
      reprintCount: 716,
      title: '水利部针对5省区启动水旱灾害防御Ⅳ级应急响应',
      zbGuid: '13593988314888068840',
    },
    {
      author: '',
      ceiIndex: 1793.46,
      channel: '',
      comments: 0,
      mediaCount: 354,
      mediaName: '海外网',
      paraise: 0,
      pubTime: '2024/04/18 10:42:23',
      reading: 0,
      reprintCount: 578,
      title: '一季度全国出入境人员超1.41亿人次 同比上升117.8%',
      zbGuid: '12517790354823984089',
    },
    {
      author: '',
      ceiIndex: 1787.03,
      channel: '',
      comments: 0,
      mediaCount: 1192,
      mediaName: '人民网',
      paraise: 0,
      pubTime: '2024/04/19 10:08:00',
      reading: 0,
      reprintCount: 1666,
      title: '罪犯温庆运被执行死刑',
      zbGuid: '17829768488316551064',
    },
    {
      author: '',
      ceiIndex: 1755.36,
      channel: '',
      comments: 0,
      mediaCount: 361,
      mediaName: '证券时报网',
      paraise: 0,
      pubTime: '2024/04/17 16:01:00',
      reading: 0,
      reprintCount: 560,
      title: '国家能源局：3月份全社会用电量7942亿千瓦时，同比增长7.4%',
      zbGuid: '17784446667188486494',
    },
    {
      author: '',
      ceiIndex: 1753.51,
      channel: '',
      comments: 0,
      mediaCount: 1023,
      mediaName: '人民网',
      paraise: 0,
      pubTime: '2024/04/16 10:05:00',
      reading: 0,
      reprintCount: 1308,
      title: '一季度国民经济实现良好开局 生产需求稳中有升',
      zbGuid: '7517009601617385210',
    },
  ],
  Result: 'OK',
  TotalRecordCount: 3529,
}
