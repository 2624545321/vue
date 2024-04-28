/**
 * @desc 外部媒体转载 => 列表 对应的数据
 */
export const outsideMediaReshipData = [
  {
    symbol: 'website',
    zh: '网站',
    usageTotal: 0,
    viewAll: false,
    list: [],
  },
  {
    symbol: 'client',
    zh: '客户端',
    usageTotal: 0,
    viewAll: false,
    list: [],
  },
  {
    symbol: 'weixin',
    field: '微信',
    zh: '微信',
    usageTotal: 0,
    viewAll: false,
    list: [],
  },
  {
    symbol: 'media',
    field: '第三方公众平台',
    zh: '订阅号',
    usageTotal: 0,
    viewAll: false,
    list: [],
  },
  {
    symbol: 'coreHeadline',
    zh: '核心头条',
    field: 'hexintou',
    dataMap: new Map([
      [
        'topLevMedia0',
        {
          zh: '网站',
          num: 'topLevNums0',
          data: 'topLev0',
          field: 'topLev0',
          symbol: 'website',
        },
      ],
      [
        'topLevMedia1',
        {
          zh: '微信',
          num: 'topLevNums1',
          data: 'topLev1',
          field: 'topLev1',
          symbol: 'weixin',
        },
      ],
      [
        'topLevMedia2',
        {
          zh: '客户端',
          num: 'topLevNums2',
          data: 'topLev2',
          field: 'topLev2',
          symbol: 'client',
        },
      ],
      [
        'topLevMedia3',
        {
          zh: '订阅号',
          num: 'topLevNums3',
          data: 'topLev3',
          field: 'topLev3',
          symbol: 'media',
        },
      ],
    ]),
    usageTotal: 0,
    viewAll: false,
    list: [],
  },
  {
    symbol: 'mediaCore',
    field: 'hexinLev',
    zh: '核心媒体',
    dataMap: new Map([
      [
        'hexinLevMedia0',
        {
          zh: '网站',
          num: 'hexinLevNums0',
          data: 'hexinLev0',
          field: 'hexinLev0',
          symbol: 'website',
        },
      ],
      [
        'hexinLevMedia1',
        {
          zh: '微信',
          num: 'hexinLevNums1',
          data: 'hexinLev1',
          field: 'hexinLev1',
          symbol: 'weixin',
        },
      ],
      [
        'hexinLevMedia2',
        {
          zh: '客户端',
          num: 'hexinLevNums2',
          data: 'hexinLev2',
          field: 'hexinLev2',
          symbol: 'client',
        },
      ],
      [
        'hexinLevMedia3',
        {
          zh: '订阅号',
          num: 'hexinLevNums3',
          data: 'hexinLev3',
          field: 'hexinLev3',
          symbol: 'media',
        },
      ],
    ]),
    usageTotal: 0,
    viewAll: false,
    list: [],
  },
  {
    symbol: 'firstLevelMedia',
    field: 'yijiLev',
    zh: '一级媒体',
    usageTotal: 0,
    viewAll: false,
    dataMap: new Map([
      [
        'yijiLevMedia0',
        {
          zh: '网站',
          num: 'yijiLevNums0',
          data: 'yijiLev0',
          field: 'yijiLev0',
          symbol: 'website',
        },
      ],
      [
        'yijiLevMedia1',
        {
          zh: '微信',
          num: 'yijiLevNums1',
          data: 'yijiLev1',
          field: 'yijiLev1',
          symbol: 'weixin',
        },
      ],
      [
        'yijiLevMedia2',
        {
          zh: '客户端',
          num: 'yijiLevNums2',
          data: 'yijiLev2',
          field: 'yijiLev2',
          symbol: 'client',
        },
      ],
      [
        'yijiLevMedia3',
        {
          zh: '订阅号',
          num: 'yijiLevNums3',
          data: 'yijiLev3',
          field: 'yijiLev3',
          symbol: 'media',
        },
      ],
    ]),
    list: [],
  },
  {
    symbol: 'secondLevelMedia',
    field: 'erjiLev',
    zh: '二级媒体',
    dataMap: new Map([
      [
        'erjiLevMedia0',
        {
          zh: '网站',
          num: 'erjiLevNums0',
          data: 'erjiLev0',
          field: 'erjiLev0',
          symbol: 'website',
        },
      ],
      [
        'erjiLevMedia1',
        {
          zh: '微信',
          num: 'erjiLevNums1',
          data: 'erjiLev1',
          field: 'erjiLev1',
          symbol: 'weixin',
        },
      ],
      [
        'erjiLevMedia2',
        {
          zh: '客户端',
          num: 'erjiLevNums2',
          data: 'erjiLev2',
          field: 'erjiLev2',
          symbol: 'client',
        },
      ],
      [
        'erjiLevMedia3',
        {
          zh: '订阅号',
          num: 'erjiLevNums3',
          data: 'erjiLev3',
          field: 'erjiLev3',
          symbol: 'media',
        },
      ],
    ]),
    usageTotal: 0,
    viewAll: false,
    list: [],
  },
]

/**
 * @desc 外部媒体转载 => 等级分类|类型分类 对应的数据
 */
export const cateMap = new Map([
  [
    'level',
    ['coreHeadline', 'mediaCore', 'firstLevelMedia', 'secondLevelMedia'],
  ],
  ['type', ['website', 'client', 'weixin', 'media']],
])

/**
 * @desc 关键指标 => 各个渠道 互动 量 对应的数据
 */
export const channelCommentsMap = new Map([
  [
    '微信',
    [
      { text: '互动量', num: '0', field: '' },
      { text: '阅读数', num: '0', field: 'reading' },
      { text: '在看数', num: '0', field: 'comments' },
      { text: '点赞数', num: '0', field: 'praise' },
    ],
  ],
  [
    '默认',
    [
      { text: '互动量', num: '0', field: 'interaction' },
      { text: '点赞量', num: '0', field: 'praise' },
      { text: '评论量', num: '0', field: 'comments' },
      { text: '转发量', num: '0', field: 'forward' },
    ],
  ],
])
