<template>
  <el-table
    class="customStyle-ele__table customStyle-ele__table-list no-border"
    stripe
    style="width: 100%"
    height="100%"
    :data="tableData"
    :default-sort="{ prop: 'sumCount', order: 'descending' }"
  >
    <el-table-column
      type="index"
      label="排序"
      min-width="60"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      class-name="el-table__title"
      min-width="420"
    >
      <template slot-scope="scope">
        <custom-manuscript-title-vue
          :title="scope.row.title"
          :query-param="{ zbGuid: scope.row.zbgUid, mc: scope.row.mediaName }"
        ></custom-manuscript-title-vue>
      </template>
    </el-table-column>
    <el-table-column
      prop="mediaName"
      label="发布媒体"
      align="center"
      show-overflow-tooltip
      :min-width="tableMinwdith"
    ></el-table-column>
    <el-table-column
      prop="docChannel"
      label="频道/栏目"
      align="center"
      show-overflow-tooltip
      :min-width="tableMinwdith"
    ></el-table-column>
    <el-table-column
      prop="pubday"
      label="发布时间"
      :formatter="formatterPubday"
      min-width="100"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="pareCount"
      label="报纸"
      align="center"
      sortable
      :min-width="tableMinwdith"
    ></el-table-column>
    <el-table-column
      prop="webCount"
      label="网站"
      align="center"
      sortable
      :min-width="tableMinwdith"
    ></el-table-column>
    <el-table-column
      prop="appCount"
      label="APP"
      align="center"
      sortable
      :min-width="tableMinwdith"
    ></el-table-column>
    <el-table-column
      prop="wxCount"
      label="微信"
      align="center"
      sortable
      :min-width="tableMinwdith"
    ></el-table-column>
    <el-table-column
      prop="microblogCount"
      label="微博"
      align="center"
      sortable
      :min-width="tableMinwdith"
    ></el-table-column>
    <el-table-column
      prop="thirdpartyCount"
      label="订阅号"
      align="center"
      sortable
      :min-width="tableMinwdith"
    ></el-table-column>
    <el-table-column
      prop="coreCount"
      label="核心头条"
      align="center"
      sortable
      :min-width="tableMinwdith + 10"
    ></el-table-column>
    <el-table-column
      prop="sumCount"
      label="总转载"
      align="center"
      sortable
      :min-width="tableMinwdith"
    ></el-table-column>
    <el-table-column
      prop="ceiIndex"
      label="影响力指数"
      align="center"
      sortable
      :min-width="tableMinwdith + 20"
    ></el-table-column>
  </el-table>
</template>

<script>
import { timeFormat } from '@/utils/timeFormat'
export default {
  name: 'msCustomTable',
  props: {
    receiveData: { required: true },
  },
  data() {
    return {
      tableMinwdith: 65,
      //   table: {
      //     minWdith: ''
      //   },
      // mockTableData: [],
      tableData: [],
    }
  },
  watch: {
    receiveData(d) {
      if (!Array.isArray(d) || !d.length) return (this.tableData = [])
      this.tableData = d
    },
  },
  methods: {
    // mockData() {
    //   const n = 10
    //   while (this.mockTableData.length < n) {
    //     this.mockTableData.push({
    //       title: '我国正式邀请',
    //       publishMedia: '人民日报',
    //       channel: '要闻',
    //       publishDate: '2023-11-12',
    //       newsPaper: parseInt(Math.random() * 100 + 500),
    //       webSite: parseInt(Math.random() * 100 + 500),
    //       APP: parseInt(Math.random() * 100 + 500),
    //       weiXin: parseInt(Math.random() * 100 + 500),
    //       weiBo: parseInt(Math.random() * 100 + 500),
    //       dingyuehao: parseInt(Math.random() * 100 + 500),
    //       coreHeadline: parseInt(Math.random() * 100 + 500),
    //       reprintCount: parseInt(Math.random() * 100 + 500), // 总转载
    //       influence: parseInt(Math.random() * 100 + 500), // 影响力指数
    //     })
    //   }
    //   this.mockTableData = this.mockTableData.slice(0, n)
    // },
    formatterPubday(row) {
      // console.log('row, column, cellValue, index', row, column, cellValue, index)
      return timeFormat(row.pubday, 'yy-mm-dd')
    },
  },
  // mounted() {
  //   this.mockData()
  // },
}
</script>

<style></style>
