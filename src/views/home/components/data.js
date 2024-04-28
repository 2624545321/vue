import { bigNumberTransform } from '@/utils/filter'

export const importantMediaTableColumns = () => {
  return [
    {
      type: 'index',
      width: '80',
      label: '排名',
      align: 'center',
    },
    {
      prop: 'mediaName',
      label: '媒体名称',
      width: 'auto',
      align: 'left',
    },
    {
      prop: 'mediaLevel',
      label: '媒体等级',
      width: 'auto',
      align: 'center',
    },
    {
      prop: 'count',
      label: '转载数',
      width: 'auto',
      align: 'center',
      formatter: row => bigNumberTransform(row.count),
    },
    // {
    //   prop: 'coreHeadline',
    //   label: '核心头条',
    //   width: 'auto',
    //   align: 'center',
    // },
  ]
}
