import { deepFreeze } from '@/plugins/utils'

const title_width = 200

/**
 * @desc 报纸榜单 -> 报纸 自定义列
 */
export const newspaperTableColumns = deepFreeze([
  {
    slot: 'index',
    label: '排名',
    minWidth: '60',
    align: 'center',
  },
  {
    label: '报纸',
    // minWidth: '60',
    align: 'center',
    slot: 'siteName',
  },
  {
    prop: 'mediaUnitName',
    label: '所属单位',
    // minWidth: '60',
    align: 'center',
  },
  {
    prop: 'reportNum',
    label: '发稿数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'originalNum',
    label: '原创数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'listCeiIndex',
    label: '传播力指数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'reprintNum',
    label: '转载数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'mediaCount',
    label: '转载媒体数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'coreCount',
    label: '核心媒体转载',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'topCount',
    label: '核心媒体头条',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
])
/**
 * @desc 报纸榜单 -> 文章 自定义列(多个渠道通用)
 */
export const newspaperAacticleTableColumns = deepFreeze([
  {
    slot: 'index',
    label: '排名',
    minWidth: '60',
    align: 'center',
  },
  {
    prop: 'title',
    label: '文章标题',
    minWidth: title_width,
    // align: 'left',
    headerAlign: 'center',
    slot: 'title',
  },
  {
    prop: 'siteName',
    label: '发布媒体',
    // minWidth: '60',
    align: 'center',
  },
  {
    prop: 'docChannel',
    label: '版面',
    // minWidth: '60',
    align: 'center',
    // sortable: true,
  },
  {
    prop: 'pubTime',
    label: '发布时间',
    // width: '100px',
    align: 'center',
    slot: 'pubTime',
    sortable: true,
  },
  {
    prop: 'forward',
    label: '转载数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'mediaCount',
    label: '转载媒体数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'coreCount',
    label: '核心媒体转载',
    // minWidth: '100',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'topCount',
    label: '核心媒体头条',
    // minWidth: '100',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'listCeiIndex',
    label: '传播力指数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
])

/**
 * @desc 网站榜单 -> 网站 自定义列
 */
export const websiteTableColumns = deepFreeze([
  {
    slot: 'index',
    label: '排名',
    minWidth: '60',
    align: 'center',
  },
  {
    slot: 'siteName',
    label: '网站',
    // minWidth: '60',
    align: 'center',
  },
  {
    prop: 'mediaUnitName',
    label: '所属单位',
    // minWidth: '60',
    align: 'center',
  },
  {
    prop: 'reportNum',
    label: '发稿数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'originalNum',
    label: '原创数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'listCeiIndex',
    label: '传播力指数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'reprintNum',
    label: '转载数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'mediaCount',
    label: '转载媒体数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'coreCount',
    label: '核心媒体转载',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'topCount',
    label: '核心媒体头条',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
])

/**
 * @desc 客户端榜单 -> 客户端 自定义列
 */
export const clientTableColumns = deepFreeze([
  {
    slot: 'index',
    label: '排名',
    minWidth: '60',
    align: 'center',
  },
  {
    slot: 'siteName',
    label: 'APP',
    // minWidth: '60',
    align: 'center',
  },
  {
    prop: 'reportNum',
    label: '发稿数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'originalNum',
    label: '原创数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'listCeiIndex',
    label: '传播力指数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'reading',
    label: '阅读数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'maxReading',
    label: '最高阅读数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'avgReading',
    label: '平均阅读数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },

  {
    prop: 'comments',
    label: '评论数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'praise',
    label: '点赞数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'reprintNum',
    label: '转载数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
])

/**
 * @desc 微信榜单 -> 微信公众号 自定义列
 */
export const weixinTableColumns = deepFreeze([
  {
    slot: 'index',
    label: '排名',
    minWidth: '60',
    align: 'center',
  },
  {
    slot: 'siteName',
    label: '微信号',
    // minWidth: '60',
    align: 'center',
  },
  {
    prop: 'reportNum',
    label: '发稿数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'originalNum',
    label: '原创数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'listCeiIndex',
    label: '传播力指数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'reading',
    label: '阅读数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'maxReading',
    label: '最高阅读数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'avgReading',
    label: '平均阅读数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'headlineReading',
    label: '头条阅读数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'praise',
    label: '点赞数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'comments',
    label: '在看数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
])
/**
 * @desc 微信榜单 -> 文章 自定义列
 */
export const weixinAacticleTableColumns = deepFreeze([
  {
    slot: 'index',
    label: '排名',
    minWidth: '60',
    align: 'center',
  },
  {
    prop: 'title',
    label: '标题',
    minWidth: title_width,
    // align: 'center',
    slot: 'title',
    headerAlign: 'center',
  },
  {
    prop: 'siteName',
    label: '公众号',
    // minWidth: '60',
    align: 'center',
  },
  {
    prop: 'pubTime',
    label: '发布时间',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'reading',
    label: '阅读数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'comments',
    label: '评论数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'praise',
    label: '点赞数',
    // minWidth: '100',
    align: 'center',
    sortable: true,
  },
])

/**
 * @desc 微博榜单 -> 微博 自定义列
 */
export const weiboTableColumns = deepFreeze([
  {
    slot: 'index',
    label: '排名',
    minWidth: '60',
    align: 'center',
  },
  {
    slot: 'siteName',
    label: '微博号',
    // minWidth: '60',
    align: 'center',
  },
  {
    prop: 'fans',
    label: '粉丝数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'listCeiIndex',
    label: '传播力指数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'reportNum',
    label: '发文数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'originalNum',
    label: '原发数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'forward',
    label: '转发数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'comments',
    label: '评论数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'praise',
    label: '点赞数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
])
/**
 * @desc 微博榜单 -> 文章 自定义列
 */
export const weiboAacticleTableColumns = deepFreeze([
  {
    slot: 'index',
    label: '排名',
    minWidth: '60',
    align: 'center',
  },
  {
    prop: 'title',
    label: '标题',
    minWidth: title_width,
    // align: 'center',
    slot: 'title',
    headerAlign: 'center',
  },
  {
    prop: 'siteName',
    label: '微博号',
    // minWidth: '60',
    align: 'center',
  },
  {
    prop: 'pubTime',
    label: '发布时间',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'comments',
    label: '评论数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'forward',
    label: '转发数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'praise',
    label: '点赞数',
    // minWidth: '100',
    align: 'center',
    sortable: true,
  },
])

/**
 * @desc 订阅号 -> 媒体产品 自定义列
 */
export const dingyuehaoTableColumns = deepFreeze({
  qiangGuoHao: [
    {
      slot: 'index',
      label: '排名',
      minWidth: '60',
      align: 'center',
    },
    {
      slot: 'siteName',
      label: '订阅号',
      // minWidth: '60',
      align: 'center',
    },
    {
      prop: 'mediaUnitName',
      label: '所属单位',
      // minWidth: '60',
      align: 'center',
    },
    {
      prop: 'reportNum',
      label: '发稿数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'listCeiIndex',
      label: '传播力指数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
  ],
  touTiaoHao: [
    {
      slot: 'index',
      label: '排名',
      minWidth: '60',
      align: 'center',
    },
    {
      slot: 'siteName',
      label: '订阅号',
      // minWidth: '60',
      align: 'center',
    },
    {
      prop: 'mediaUnitName',
      label: '所属单位',
      // minWidth: '60',
      align: 'center',
    },
    {
      prop: 'fans',
      label: '粉丝数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'listCeiIndex',
      label: '传播力指数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'reportNum',
      label: '发稿数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'headlineReading',
      label: '阅读数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'comments',
      label: '评论数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
  ],
  baiJiaHao: [
    {
      slot: 'index',
      label: '排名',
      minWidth: '60',
      align: 'center',
    },
    {
      slot: 'siteName',
      label: '订阅号',
      // minWidth: '60',
      align: 'center',
    },
    {
      prop: 'mediaUnitName',
      label: '所属单位',
      // minWidth: '60',
      align: 'center',
    },
    {
      prop: 'fans',
      label: '粉丝数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'listCeiIndex',
      label: '传播力指数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'reportNum',
      label: '发稿数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'praise',
      label: '点赞数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
  ],
})
/**
 * @desc 订阅号 -> 文章 自定义列
 */
export const dingyuehaoAacticleTableColumns = deepFreeze([
  {
    slot: 'index',
    label: '排名',
    minWidth: '60',
    align: 'center',
  },
  {
    prop: 'title',
    label: '标题',
    minWidth: title_width,
    // align: 'center',
    slot: 'title',
    headerAlign: 'center',
  },
  {
    prop: 'siteName',
    label: '发布账号',
    // minWidth: '60',
    align: 'center',
  },
  {
    prop: 'channel',
    label: '发布平台',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'pubTime',
    label: '发布时间',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'reading',
    label: '阅读数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'comments',
    label: '评论数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'listCeiIndex',
    label: '传播力指数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
])

/**
 * @desc 订阅号 -> 媒体产品 自定义列
 */
export const tiktokTableColumns = deepFreeze({
  tiktok: [
    {
      slot: 'index',
      label: '排名',
      minWidth: '60',
      align: 'center',
    },
    {
      slot: 'siteName',
      label: '发布账号',
      // minWidth: '60',
      align: 'center',
    },
    {
      prop: 'mediaUnitName',
      label: '所属单位',
      // minWidth: '60',
      align: 'center',
    },
    {
      prop: 'fans',
      label: '粉丝数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'listCeiIndex',
      label: '传播力指数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'reportNum',
      label: '作品数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'forward',
      label: '分享数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'comments',
      label: '评论数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'praise',
      label: '点赞数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
  ],
  kuaiShou: [
    {
      slot: 'index',
      label: '排名',
      minWidth: '60',
      align: 'center',
    },
    {
      slot: 'siteName',
      label: '发布账号',
      // minWidth: '60',
      align: 'center',
    },
    {
      prop: 'mediaUnitName',
      label: '所属单位',
      // minWidth: '60',
      align: 'center',
    },
    {
      prop: 'fans',
      label: '粉丝数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'listCeiIndex',
      label: '传播力指数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'reportNum',
      label: '作品数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'play',
      label: '播放数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'comments',
      label: '评论数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'praise',
      label: '点赞数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
  ],
  biliBili: [
    {
      slot: 'index',
      label: '排名',
      minWidth: '60',
      align: 'center',
    },
    {
      slot: 'siteName',
      label: '发布账号',
      // minWidth: '60',
      align: 'center',
    },
    {
      prop: 'mediaUnitName',
      label: '所属单位',
      // minWidth: '60',
      align: 'center',
    },
    {
      prop: 'fans',
      label: '粉丝数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'listCeiIndex',
      label: '传播力指数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'reportNum',
      label: '作品数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'play',
      label: '播放数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'comments',
      label: '评论数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
    {
      prop: 'praise',
      label: '点赞数',
      // minWidth: '60',
      align: 'center',
      sortable: true,
    },
  ],
})
/**
 * @desc 订阅号 -> 文章 自定义列
 */
export const tiktokAacticleTableColumns = deepFreeze([
  {
    slot: 'index',
    label: '排名',
    minWidth: '60',
    align: 'center',
  },
  {
    prop: 'title',
    label: '视频标题',
    minWidth: '200',
    // align: 'center',
    slot: 'title',
    headerAlign: 'center',
  },
  {
    prop: 'siteName',
    label: '发布账号',
    // minWidth: '60',
    align: 'center',
  },
  {
    prop: 'channel',
    label: '发布平台',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'pubTime',
    label: '发布时间',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'comments',
    label: '评论数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'praise',
    label: '点赞数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'listCeiIndex',
    label: '传播力指数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
])

/**
 * @desc 海外媒体 -> 报纸 自定义列
 */
export const haiwaimeitiTableColumns = deepFreeze([
  {
    slot: 'index',
    label: '排名',
    minWidth: '60',
    align: 'center',
  },
  {
    slot: 'siteName',
    label: '海外媒体',
    // minWidth: '60',
    align: 'center',
  },
  {
    prop: 'mediaUnitName',
    label: '所属单位',
    // minWidth: '60',
    align: 'center',
  },
  {
    prop: 'fans',
    label: '粉丝数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'originalNum',
    label: '作品数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'listCeiIndex',
    label: '传播力指数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'reading',
    label: '浏览量',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'comments',
    label: '评论数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'praise',
    label: '点赞数',
    // minWidth: '100',
    align: 'center',
    sortable: true,
  },
])
/**
 * @desc 海外媒体 -> 文章 自定义列
 */
export const haiwaimeitiAacticleTableColumns = deepFreeze([
  {
    slot: 'index',
    label: '排名',
    minWidth: '60',
    align: 'center',
  },
  {
    prop: 'title',
    label: '标题',
    minWidth: title_width,
    // align: 'center',
    slot: 'title',
    headerAlign: 'center',
  },
  {
    prop: 'siteName',
    label: '发布海外账号',
    // minWidth: '60',
    align: 'center',
  },
  {
    prop: 'pubTime',
    label: '发布时间',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'reading',
    label: '浏览量',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'comments',
    label: '评论数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'praise',
    label: '点赞数',
    // minWidth: '100',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'listCeiIndex',
    label: '传播力指数',
    // minWidth: '60',
    align: 'center',
    sortable: true,
  },
])

/**
 * @desc 渠道对应的表格字段
 * newspaper website client 
  weixin weibo tiktok dingyuehao 
  haiwaimeiti
 */
export const columnMap = Object.freeze(
  new Map([
    [
      'newspaper',
      {
        mediaProd: newspaperTableColumns,
        article: newspaperAacticleTableColumns,
      },
    ],
    [
      'haiwaimeiti',
      {
        mediaProd: haiwaimeitiTableColumns,
        article: haiwaimeitiAacticleTableColumns,
      },
    ],
    [
      'website',
      {
        mediaProd: websiteTableColumns,
        article: newspaperAacticleTableColumns,
      },
    ],
    [
      'client',
      {
        mediaProd: clientTableColumns,
        article: newspaperAacticleTableColumns,
      },
    ],
    [
      'weixin',
      {
        mediaProd: weixinTableColumns,
        article: weixinAacticleTableColumns,
      },
    ],
    [
      'weibo',
      {
        mediaProd: weiboTableColumns,
        article: weiboAacticleTableColumns,
      },
    ],
    [
      'dingyuehao',
      {
        mediaProd: dingyuehaoTableColumns,
        article: dingyuehaoAacticleTableColumns,
      },
    ],
    [
      'tiktok',
      {
        mediaProd: tiktokTableColumns,
        article: tiktokAacticleTableColumns,
      },
    ],
  ]),
)
