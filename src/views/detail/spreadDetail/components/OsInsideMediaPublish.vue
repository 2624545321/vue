<template>
  <div
    ref="OsInsideMediaPublish"
    class="inside-media-publish mt-20 spread-shadow"
  >
    <spread-title-vue title="内部媒体刊发">
      <div class="os-operation">
        <custom-button-vue
          :btn-data="{ label: '导出' }"
          @click.native="handleExport"
        ></custom-button-vue>
      </div>
    </spread-title-vue>
    <div class="imp-table">
      <!-- :height="expand ? '100%' : 'auto'" -->
      <el-table
        style="width: 100%"
        class="customStyle-ele__table customStyle-ele__table-list"
        stripe
        :data="comTableData"
      >
        <el-table-column
          min-width="auto"
          label="媒体产品"
          prop="mediaName"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="docChannel"
          label="版面/栏目"
          min-width="auto"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pubTime"
          label="发稿时间"
          min-width="auto"
          align="center"
          :formatter="formatterPubtime"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="稿件标题"
          show-overflow-tooltip
          min-width="300"
          header-align="left"
        >
          <template slot-scope="{ row }">
            <a :href="row.url" target="_blank">{{ row.title }}</a>
          </template>
        </el-table-column>
      </el-table>

      <div v-if="tableData.length > 10" class="fs-14 imp-expand">
        <!-- <button class="font-bold" @click="handleExpand">
          {{ expand ? '收起' : '展开' }}
        </button> -->
        <custom-button-vue
          :btn-data="{ label: expand ? '收起' : '展开' }"
          @click.native="handleExpand"
        ></custom-button-vue>
      </div>
    </div>
  </div>
</template>

<script>
// import { mockTableData } from './mockData'
import { timeFormat } from '@/utils/timeFormat'
import { exportToExcel } from '@/utils/export'
export default {
  name: 'OsInsideMediaPublish',
  props: {
    imData: { required: true },
  },
  data() {
    return {
      tableData: [],
      // mockTableData: Object.freeze(mockTableData),
      expand: false,
    }
  },
  watch: {
    imData(v) {
      // console.log('imData', v)
      if (!Array.isArray(v) || !v.length) {
        this.tableData = []
        return
      }
      /* 
      [{
          "docChannel": "搜狐号",
          "id": 102440030,
          "mediaName": "证券时报",
          "pubTime": 1701255300000,
          "title": "逼近历史高点，国际金价连续上扬，黄金股或迎“戴维斯双击”（附名单）",
          "url": "https://www.sohu.com/a/740075045_115433"
      }]
      */
      this.tableData = v
    },
  },
  computed: {
    comTableData() {
      if (this.expand) {
        return this.tableData
      } else {
        return this.tableData.slice(0, 10)
      }
    },
  },
  methods: {
    formatterPubtime(_, __, cellValue) {
      // console.log('cellValue', cellValue)
      return timeFormat(cellValue, true, 'YYYY-MM-DD HH:mm:ss')
    },
    handleExpand() {
      this.expand = !this.expand
      this.$refs['OsInsideMediaPublish'].scrollIntoView({
        behavior: 'smooth',
      })
    },
    handleExport() {
      const thead = [
        '媒体产品',
        '版面/栏目',
        '发稿时间',
        '稿件标题',
      ]
      exportToExcel(this.imData, {
        thead,
        customRow(row) {
          const template = `
              <td>${row.mediaName || ''}\t</td>
              <td>${row.docChannel || ''}\t</td>
              <td>${timeFormat(row.pubTime, true) || ''}\t</td>
              <td>${row.title || ''}\t</td>
            `
          return template
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.os-operation {
  position: absolute;
  right: 0.25rem;
  line-height: 0;
}
.imp-table {
  padding: 0.25rem;
  padding-top: 0.1rem;
  max-height: calc(100vh - 0.7rem);
  overflow: scroll;
  @include scrollBar;
  .imp-expand {
    button {
      display: block;
      width: 4.625rem;
      // height: 0.325rem;
      margin: 0.25rem auto 0;
      // line-height: 0.325rem;
      // color: #959595;
      // background-color: #e5e5e5;
      // border: none;
      // cursor: pointer;
      // border-radius: var(--main-border-radius);
    }
    button:active {
      opacity: 0.8;
    }
  }
}
</style>
