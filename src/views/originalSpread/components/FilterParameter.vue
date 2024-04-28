<template>
  <div>
    <el-form
      class="customStyle-ele__from"
      size="small"
      :inline="true"
      :model="form"
      @submit.native.prevent="onSubmit()"
    >
      <el-form-item>
        <el-input
          v-model="form.title"
          class="fs-14"
          placeholder="稿件标题检索"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.author"
          class="fs-14"
          placeholder="作者"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.channel"
          class="fs-14"
          placeholder="频道"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="form.mediaType"
          @change="handleMediaTypeChange"
          placeholder="发布渠道"
          clearable
          class="fs-14"
        >
          <el-option
            v-for="(type, i) of mediaTypeOptions"
            :key="i"
            :label="type.label"
            :value="type.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item ref="ref_mediaName" prop="mediaName">
        <el-select
          v-model="form.mediaName"
          placeholder="发布媒体"
          clearable
          class="fs-14"
        >
          <el-option
            v-for="(prod, i) of mediaProdOptions"
            :key="i"
            :label="prod.label"
            :value="prod.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          placeholder="发布时间"
          v-model="form.publishDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          class="fs-14"
          range-separator="至"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <!-- <el-button class="fs-14" type="primary" native-type="submit">
          检索
        </el-button> -->
        <custom-button-vue
          :btn-data="{ label: '检索' }"
          native-type="submit"
          class="active"
        ></custom-button-vue>

        <custom-button-vue
          :btn-data="{ label: '重置' }"
          @click.native="resetForm"
        ></custom-button-vue>

        <el-tooltip effect="dark" content="最多导出10000条数据">
          <custom-button-vue
            :btn-data="{ label: '导出' }"
            @click.native="handleExport"
          ></custom-button-vue>
        </el-tooltip>
      </el-form-item>
      <!-- <el-form-item>
        <el-tooltip effect="dark" content="最多导出10000条数据">
          <el-button @click="handleExport" class="fs-14">导出</el-button>
        </el-tooltip>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import {
  getAllMediaList,
  exportArticle,
} from '@/api/manuscriptStatistics/index'
import { timeFormat } from '@/utils/timeFormat'
import { exportToExcel } from '@/utils/index'
export default {
  name: 'msFilterParameter',
  data() {
    return {
      form: {},
      mediaTypeOptions: [
        // 发布渠道
        { label: '全部渠道', value: '' },
        { label: '报纸', value: '电子报' },
        { label: '网站', value: '网站' },
        { label: '客户端', value: 'APP' },
        { label: '微信', value: '微信' },
        // { label: '微博', value: '微博' },
        // { label: '订阅号', value: '第三方公众平台' },
      ],
      mediaProdOptions: [], // 全媒体产品选项
    }
  },
  methods: {
    createForm() {
      return {
        title: '',
        author: '', // 作者
        docChannel: '', // 频道
        // channel: '', // 频道
        mediaType: '', // 发布渠道
        mediaName: '', // 全媒体产品
        publishDate: [
          // 发布时间
          timeFormat(new Date().getTime() - 6 * 24 * 60 * 60 * 1000, true),
          timeFormat(new Date(), true),
        ],
      }
    },

    resetForm() {
      this.form = this.createForm()
      this.setMediaProdOptionsDefault()
      this.onSubmit()
    },

    onSubmit() {
      // console.log('submit', this.form)
      this.$emit('formSearch', this.listRequestParams(this.form))
      return false
    },
    setMediaProdOptionsDefault() {
      // this.mediaProdOptions = [{ label: '全部', value: '' }]
      this.mediaProdOptions = []
    },
    // 发布渠道
    handleMediaTypeChange(v) {
      this.form.mediaName = ''
      this.setMediaProdOptionsDefault()
      // console.log(this.$refs['ref_mediaName'])
      // this.$refs['ref_mediaName'].resetField()
      if (!v) {
        return
      }
      const p = {
        params: {
          mediaType: v,
        },
      }
      this.getAllMediaList(p)
    },
    /**
     * @desc 处理列表请求参数
     * @param { object } params 表单参数
     *
     * @return { object } 请求参数
     */
    listRequestParams(p) {
      const dateArr = p.publishDate || []
      const startDate = (dateArr[0] && dateArr[0].replace(/-/g, '')) || ''
      const endDate = (dateArr[1] && dateArr[1].replace(/-/g, '')) || ''
      const _p = JSON.parse(JSON.stringify(p))
      delete _p.publishDate
      return {
        params: _p,
        startDate,
        endDate,
      }
    },
    /**
     * @desc 全媒体产品下拉列表
     * @param { object } params 请求参数
     *
     */
    async getAllMediaList(params) {
      const res = await getAllMediaList(params)
      if (res.Result !== 'OK') return this.setMediaProdOptionsDefault()
      const records = res.Records || []
      this.mediaProdOptions = records.map(r => ({
        label: r.mediaName,
        value: r.mediaName,
      }))
      this.mediaProdOptions.unshift({ label: '全部媒体', value: '' })
    },
    /**
     * @desc 列表导出
     * @param { object } params 请求参数
     *
     */
    async handleExport() {
      // const params = {
      //   params: this.listRequestParams(this.form),
      // }
      const params = this.listRequestParams(this.form)
      const res = await exportArticle(params)
      exportToExcel(res)
    },
  },
  mounted() {
    this.resetForm()
  },
}
</script>

<style></style>
