const cardList_newspaper = () => {
  return [
    {
      icon: 'spread-number',
      label: '传播力指数',
      num: 0,
      // field: 'ceiIndex',
      field: 'listCeiIndex',
    },
    {
      icon: 'originality',
      label: '原创数',
      num: 0,
      // field: 'originalCount',
      field: 'originalNum',
    },
    {
      icon: 'publications-number',
      label: '发稿数',
      num: 0,
      // field: 'dispatchCount',
      field: 'reportNum',
    },
    {
      icon: 'reship-num',
      label: '总转载数',
      num: 0,
      // field: 'reprintCount',
      field: 'forward',
    },
    {
      icon: 'reship_media-num',
      label: '转载媒体数',
      num: 0,
      // field: 'reprintMediaCount',
      field: 'mediaCount',
    },
  ]
}

const cardList_weixin = () => {
  return [
    {
      icon: 'spread-number',
      label: '传播力指数',
      num: 0,
      field: 'listCeiIndex',
    },
    {
      icon: 'originality',
      label: '原创数',
      num: 0,
      field: 'originalNum',
    },
    {
      icon: 'publications-number',
      label: '发稿数',
      num: 0,
      field: 'reportNum',
    },
    {
      icon: 'reship-num',
      label: '阅读数',
      num: 0,
      field: 'reading',
    },
    {
      icon: 'reship_media-num',
      label: '点赞数',
      num: 0,
      field: 'praise',
    },
    {
      icon: 'reship_media-num',
      label: '在看数',
      num: 0,
      field: 'comments',
    },
  ]
}

const cardList_weibo = () => {
  return [
    {
      icon: 'spread-number',
      label: '传播力指数',
      num: 0,
      field: 'listCeiIndex',
    },
    {
      icon: 'originality',
      label: '原发数',
      num: 0,
      field: 'originalNum',
    },
    {
      icon: 'publications-number',
      label: '发稿数',
      num: 0,
      field: 'reportNum',
    },
    {
      icon: 'reship-num',
      label: '转发数',
      num: 0,
      field: 'forward',
    },
    {
      icon: 'reship_media-num',
      label: '评论数',
      num: 0,
      field: 'comments',
    },
    {
      icon: 'reship_media-num',
      label: '点赞数',
      num: 0,
      field: 'praise',
    },
  ]
}

const cardList_dingyuehao = () => {
  return [
    {
      icon: 'spread-number',
      label: '传播力指数',
      num: 0,
      field: 'listCeiIndex',
    },
    {
      icon: 'originality',
      label: '作品数',
      num: 0,
      field: 'originalNum',
    },
    {
      icon: 'publications-number',
      label: '阅读数',
      num: 0,
      field: 'reading',
    },
    {
      icon: 'publications-number',
      label: '点赞数',
      num: 0,
      field: 'praise',
    },
    {
      icon: 'reship_media-num',
      label: '评论数',
      num: 0,
      field: 'comments',
    },
  ]
}

const cardList_tiktok = () => {
  return [
    {
      icon: 'spread-number',
      label: '传播力指数',
      num: 0,
      field: 'listCeiIndex',
    },
    {
      icon: 'originality',
      label: '作品数',
      num: 0,
      field: 'originalNum',
    },
    {
      icon: 'publications-number',
      label: '转发数',
      num: 0,
      field: 'forward',
    },
    {
      icon: 'publications-number',
      label: '点赞数',
      num: 0,
      field: 'praise',
    },
    {
      icon: 'reship_media-num',
      label: '评论数',
      num: 0,
      field: 'comments',
    },
  ]
}

const cardList_haiwaimeiti = () => {
  return [
    {
      icon: 'spread-number',
      label: '传播力指数',
      num: 0,
      field: 'listCeiIndex',
    },
    {
      icon: 'originality',
      label: '作品数',
      num: 0,
      field: 'originalNum',
    },
    {
      icon: 'publications-number',
      label: '阅读数',
      num: 0,
      field: 'reading',
    },
    {
      icon: 'publications-number',
      label: '点赞数',
      num: 0,
      field: 'praise',
    },
    {
      icon: 'reship_media-num',
      label: '评论数',
      num: 0,
      field: 'comments',
    },
  ]
}

/**
 * @desc 卡片映射：渠道对应的卡片列表
 */
export const cardListMap = Object.freeze(
  new Map([
    ['newspaper', cardList_newspaper()],
    ['website', cardList_newspaper()],
    ['client', cardList_newspaper()],
    ['weixin', cardList_weixin()],
    ['weibo', cardList_weibo()],
    ['dingyuehao', cardList_dingyuehao()],
    ['tiktok', cardList_tiktok()],
    ['haiwaimeiti', cardList_haiwaimeiti()],
  ]),
)
