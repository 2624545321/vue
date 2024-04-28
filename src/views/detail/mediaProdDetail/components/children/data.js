import { deepFreeze } from '@/plugins/utils'
import { timeFormat } from '@/utils/timeFormat'
/* 
海外媒体 
序号、标题、发布媒体、浏览数、点赞数、评论数、发布时间、是否原创
序号、标题、图片、阅读数、评论数、点赞数、发布时间；支持稿件内容的展开和收起

短视频
序号、标题、发布媒体、点赞数、评论数、转发数、收藏数、发布时间
标题、短视频封面图、点赞数、评论数、转发数、收藏数、发布时间

订阅号
序号、标题、发布媒体、稿件来源、阅读数、点赞数、评论数、发布时间、是否原创
序号、标题、图片、摘要、阅读量、评论数、点赞数、发布时间、稿件来源

微博
序号、标题、发布媒体、稿件来源、转发数、评论数、点赞数、发布时间、是否原创
序号、标题、图片、转发数、评论数、点赞数、发布时间；支持稿件内容的展开和收起

微信
序号、标题、发布媒体产品（若是头条，需标注出来）、传播力指数、阅读数、点赞数、在看数
序号、标题、图片、摘要、阅读量、点赞量、在看量、发布时间、稿件来源和发布版面/栏目

客户端
序号、标题、作者、发布媒体、频道/栏目、稿件来源、发布时间、是否原创
序号、标题、图片、摘要、发布时间、稿件来源和发布版面/栏目

网站
字段序号、标题、作者、发布媒体、频道/栏目、稿件来源、发布时间、是否原创
序号、标题、图片、摘要、发布时间、稿件来源和发布版面/栏目

报纸
字段序号、标题、作者、发布媒体、频道/栏目、稿件来源、发布时间、是否原创
序号、标题、图片、摘要、发布时间、稿件来源和发布版面/栏目；

*/

/* 
todo 
  表格字段待添加
*/

const formatterPubday = row => {
  return timeFormat(row.pubTime, true, 'YYYY-MM-DD hh:mm:ss')
}
const formatterAuthors = row => {
  const a = (row.authors || '').toLowerCase()
  return a === 'null' ? '' : a
}

/* 报纸、网站、客户端 公用 */
const newspaperColumns = deepFreeze([
  {
    type: 'index',
    label: '序号',
    width: '100',
    align: 'center',
  },
  {
    label: '标题',
    align: 'left',
    slot: 'title',
    minWidth: '200',
  },
  {
    label: '作者',
    align: 'center',
    prop: 'authors',
    formatter: formatterAuthors,
  },
  {
    label: '发布媒体',
    align: 'center',
    prop: 'mediaName',
  },
  {
    label: '频道/栏目',
    align: 'center',
    // prop: 'docChannel',
    slot: 'docChannel'
  },
  {
    label: '稿件来源',
    align: 'center',
    prop: 'source',
  },
  {
    label: '发布时间',
    align: 'center',
    prop: 'pubTime',
    formatter: formatterPubday,
  },
  {
    label: '是否原创',
    align: 'center',
    prop: 'original',
  },
])

const weixinColumns = deepFreeze([
  {
    type: 'index',
    label: '排名',
    width: '100',
    align: 'center',
  },
  {
    label: '文章标题',
    headerAlign: 'center',
    align: 'left',
    slot: 'title',
    minWidth: '200',
  },
  {
    label: '发布时间',
    align: 'center',
    prop: 'pubTime',
    formatter: formatterPubday,
    sortable: true,
  },
  /*   {
    label: '发布媒体产品',
    align: 'center',
    prop: 'mediaName',
  }, */
  // {
  //   label: '传播力指数',
  //   align: 'center',
  //   prop: '',
  // },
  {
    label: '阅读数',
    align: 'center',
    prop: 'reading',
    sortable: true,
  },
  {
    label: '在看数',
    align: 'center',
    prop: 'comments',
    sortable: true,
  },
  {
    label: '点赞数',
    align: 'center',
    prop: 'praise',
    sortable: true,
  },
  {
    label: '查看',
    align: 'center',
    slot: 'view',
  },
])

const weiboColumns = deepFreeze([
  {
    type: 'index',
    label: '序号',
    width: '100',
    align: 'center',
  },
  {
    label: '标题',
    align: 'left',
    slot: 'title',
    minWidth: '200',
  },
  {
    label: '发布媒体',
    align: 'center',
    prop: 'mediaName',
  },
  {
    label: '稿件来源',
    align: 'center',
    prop: 'source',
  },
  {
    label: '转发数',
    align: 'center',
    prop: '',
  },
  {
    label: '点赞数',
    align: 'center',
    prop: '',
  },
  {
    label: '评论数',
    align: 'center',
    prop: '',
  },
  {
    label: '发布时间',
    align: 'center',
    prop: 'pubTime',
    formatter: formatterPubday,
  },
  {
    label: '是否原创',
    align: 'center',
    prop: 'original',
  },
])

const dingyuehaoColumns = deepFreeze([
  {
    type: 'index',
    label: '序号',
    width: '100',
    align: 'center',
  },
  {
    label: '标题',
    align: 'left',
    slot: 'title',
    minWidth: '200',
  },
  {
    label: '发布媒体',
    align: 'center',
    prop: 'mediaName',
  },
  {
    label: '稿件来源',
    align: 'center',
    prop: 'source',
  },
  {
    label: '阅读数',
    align: 'center',
    prop: '',
  },
  {
    label: '点赞数',
    align: 'center',
    prop: '',
  },
  {
    label: '评论数',
    align: 'center',
    prop: '',
  },
  {
    label: '发布时间',
    align: 'center',
    prop: 'pubTime',
    formatter: formatterPubday,
  },
  {
    label: '是否原创',
    align: 'center',
    prop: 'original',
  },
])

const tiktokColumns = deepFreeze([
  {
    type: 'index',
    label: '序号',
    width: '100',
    align: 'center',
  },
  {
    label: '标题',
    align: 'left',
    slot: 'title',
    minWidth: '200',
  },
  {
    label: '发布媒体',
    align: 'center',
    prop: 'mediaName',
  },
  {
    label: '点赞数',
    align: 'center',
    prop: '',
  },
  {
    label: '评论数',
    align: 'center',
    prop: '',
  },
  {
    label: '转发数',
    align: 'center',
    prop: '',
  },
  {
    label: '收藏数',
    align: 'center',
    prop: '',
  },
  {
    label: '发布时间',
    align: 'center',
    prop: 'pubTime',
    formatter: formatterPubday,
  },
])

const haiwaimeitiColumns = deepFreeze([
  {
    type: 'index',
    label: '序号',
    width: '100',
    align: 'center',
  },
  {
    label: '标题',
    align: 'left',
    slot: 'title',
    minWidth: '200',
  },
  {
    label: '发布媒体',
    align: 'center',
    prop: 'mediaName',
  },
  {
    label: '浏览数',
    align: 'center',
    prop: '',
  },
  {
    label: '点赞数',
    align: 'center',
    prop: '',
  },
  {
    label: '评论数',
    align: 'center',
    prop: '',
  },
  {
    label: '发布时间',
    align: 'center',
    prop: 'pubTime',
    formatter: formatterPubday,
  },
  {
    label: '是否原创',
    align: 'center',
    prop: 'original',
  },
])

export const tableCustomColumnMap = deepFreeze({
  newspaper: newspaperColumns,
  website: newspaperColumns,
  client: newspaperColumns,
  weixin: weixinColumns,
  weibo: weiboColumns,
  dingyuehao: dingyuehaoColumns,
  tiktok: tiktokColumns,
  haiwaimeiti: haiwaimeitiColumns,
})


const nwc_fields = [
  { zh: '频道/栏目', k: 'docChannel' },
  { zh: '稿件来源', k: 'source' },
  // { zh: '发布时间', k: 'pubTime' },
]
export const abstractListFieldMap = deepFreeze({
  newspaper: nwc_fields,
  website: nwc_fields,
  client: nwc_fields,
  weixin: [
    { zh: '阅读数', k: 'reading' },
    { zh: '在看数', k: 'comments' },
    { zh: '点赞数', k: 'praise' },
  ],
  weibo: [
    { zh: '转发数', k: 'forward' },
    { zh: '评论数', k: 'comments' },
    { zh: '点赞数', k: 'praise' },
  ],
  dingyuehao: [],
  tiktok: [],
  haiwaimeiti: [],
})
