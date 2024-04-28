<template>
  <div class="filter-params">
    <el-form
      @submit.native.prevent="handleFormSubmit"
      class="customStyle-ele__from"
      inline
      size="small"
    >
      <el-form-item>
        <el-date-picker
          v-if="!formData.cycle"
          v-model="formData.date"
          @change="handleDateRangeChange"
          placeholder="自定义时间区间"
          type="date"
          value-format="yyyy-MM-dd"
          class="fs-14"
          :clearable="false"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-select
          v-else
          v-model="formData.date"
          @change="handleDateRangeChange"
          placeholder="自定义时间区间"
          :clearable="false"
          class="fs-14"
          style="width: 240px"
        >
          <el-option
            v-for="(t, i) of comDateRankRange"
            :key="i"
            :label="t.label"
            :value="t.label"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <!-- <el-radio-group
          v-model="formData.cycle"
          @change="handleFormDateRankChange"
        >
          <el-radio-button v-for="(d, i) of dateRank" :key="i" :label="i">
            {{ d.label }}
          </el-radio-button>
        </el-radio-group> -->
        <custom-btn-group
          v-model="btnVal"
          :list="dateRank"
          :default-active-index="btnValDefaultActiveIndex"
          @change="handleBtnchange"
        ></custom-btn-group>
      </el-form-item>

      <el-form-item v-if="comShowPordType">
        <el-select
          v-model="formData.productType"
          @change="handleProductTypeChange"
          placeholder="请选择媒体产品分类"
          clearable
          class="fs-14"
        >
          <el-option
            v-for="(t, i) of productTypeOptions"
            :key="i"
            :label="t.name"
            :value="t.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input
          v-model="formData.searchWord"
          class="fs-14"
          placeholder="媒体产品名称检索"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <custom-button-vue
          class="active"
          :btn-data="{ label: '检索' }"
          native-type="submit"
        ></custom-button-vue>
        <el-tooltip effect="dark" content="最多导出10000条数据">
          <custom-button-vue
            :btn-data="{ label: '导出' }"
            @click.native="handleExport"
          ></custom-button-vue>
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
import { dateRank, dateRank_timeRange } from './../data'
import { getMediaProductTypeList } from '@/api/channelSpread/index'
import CustomBtnGroup from '@/components/CustomBtnGroup/Index.vue'
export default {
  name: 'CsdFilterParameter',
  components: { CustomBtnGroup },
  model: {
    prop: 'filterParams',
    event: 'change',
  },
  props: {
    filterParams: Object,
    channel: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dateRank,
      dateRank_timeRange,
      btnList: [
        { label: '今日', value: 0 },
        { label: '昨日', value: [1, 1] },
        { label: '近7日', value: 7 },
        { label: '近30日', value: 30 },
      ],
      btnVal: null,
      btnValDefaultActiveIndex: 0,
      formData: {
        cycle: 0, // 周期（day=按天排行，week=按周排行，month=按月排行，quarter=按季排行，year=按年排行）
        date: dateRank.at(0).value.at(0),
        productType: '', // 产品分类
        searchWord: '', // 媒体名称
      },
      productTypeOptions: [],
      pickerOptions: {
        disabledDate(date) {
          const d1 = moment(date).format('YYYY-MM-DD')
          const today = moment(new Date()).format('YYYY-MM-DD')
          return moment(d1).isAfter(today) || moment(d1).isSame(today)
        },
      },
    }
  },
  computed: {
    comDateRankRange() {
      const d = this.formData.cycle
      const m = {
        '1': 'week',
        '2': 'month',
        '3': 'quarter',
        '4': 'year',
      }
      const k = m[String(d)]
      return this.dateRank_timeRange[k]
    },
    /* 通用请求参数 */
    comParameter() {
      const date = this.formData.date
      const { startDate, endDate } = this.parameterForDateFormat(date)
      const cycleDate = this.dateRank.at(this.formData.cycle)
      const cycle = cycleDate ? cycleDate.field : ''
      return {
        startDate,
        endDate,
        productType: this.formData.productType || '',
        searchWord: this.formData.searchWord || '',
        cycle,
      }
    },
    /* 是否显示产品分类的筛选 */
    comShowPordType() {
      // return ['newspaper', 'website'].includes(this.channel)
      return false
    },
    storeParam() {
      return this.$store.getters.channelSpread_channel
    },
  },
  watch: {
    /* 渠道改变时，重新请求产品分类 */
    channel() {
      this.getMediaProductTypeList()
    },
  },
  methods: {
    init() {
      const m = {
        day: 0,
        week: 1,
        month: 2,
        quarter: 3,
        year: 4,
      }
      const cycle = m[this.storeParam.cycle || 'day']
      this.formData.cycle = cycle
      // console.log('this.formData', this.formData)
      this.setFilterParams()
      this.getMediaProductTypeList()
      this.handleFormDateRankChange(cycle, false)
      // 默认选中值改变时， handleBtnchange 请求了
      this.btnValDefaultActiveIndex = cycle
    },
    setFilterParams() {
      this.$emit('change', Object.assign({}, this.filterParams, this.formData))
    },
    /* 请求参数 - 日期 格式化 */
    parameterForDateFormat(date) {
      let startDate, endDate
      if (date == null) return { startDate: '', endDate: '' }
      const reg = /-|\//g
      if (Array.isArray(date)) {
        startDate = date.at(0).replace(reg, '')
        endDate = date.at(1).replace(reg, '')
      } else if (this.formData.cycle === 0) {
        // 日榜
        startDate = date.replaceAll(reg, '')
        endDate = date.replaceAll(reg, '')
      } else {
        const d = date.split(' - ')
        startDate = d.at(0).replaceAll(reg, '')
        endDate = d.at(1).replaceAll(reg, '')
      }

      // 年榜只传年份
      if (this.formData.cycle === 4) {
        // 年榜
        startDate = startDate.slice(0, 4)
        endDate = endDate.slice(0, 4)
      }
      return { startDate, endDate }
    },
    handleBtnchange(btn, i) {
      // console.log(btn, i)
      this.formData.cycle = i
      this.handleFormDateRankChange(i)
    },
    handleFormDateRankChange(v, noInvoke) {
      // console.log('handleFormDateRankChange', v)
      const date = this.dateRank.at(v).value
      /* 0 为日榜，日榜为天数选择器，其它为下拉框日期选择  */
      if (v === 0) {
        // this.formData.date = [date.at(0), date.at(1)]
        this.formData.date = date.at(0)
      } else {
        this.formData.date = this.comDateRankRange.at(0).label
      }
      !noInvoke && this.handleFormSubmit()
    },
    handleDateRangeChange() {
      this.handleFormSubmit()
    },
    handleProductTypeChange() {
      this.handleFormSubmit()
    },
    handleFormSubmit() {
      this.setFilterParams()
      const p = { ...this.comParameter }
      // console.log('handleFormSubmit', p, p === this.comParameter)
      this.$emit('form-submit', p)
    },

    handleExport() {
      this.$emit('request-table-export')
    },

    /* 媒体产品分类下拉 */
    async getMediaProductTypeList() {
      this.productTypeOptions = []
      if (!this.comShowPordType) return
      if (!this.channel) return
      const params = { channelCode: this.channelType[this.channel].key }
      const res = await getMediaProductTypeList({ params })
      // console.log('媒体产品分类', res)
      if (res.Result !== 'OK') return (this.productTypeOptions = [])
      const records = res.Records || []
      this.productTypeOptions = Object.freeze(records)
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style scoped>
.filter-params {
  flex-shrink: 0;
  padding: 0.3rem;
  line-height: 0;
  border-bottom: 1px solid var(--main-border-color);
  overflow: hidden;
}
</style>
