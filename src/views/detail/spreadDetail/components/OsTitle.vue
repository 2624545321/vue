<template>
  <div class="os-title fs-20">
    <h3 class="fs-30">
      <!-- 全文来了！习近平在第三届“一带一路”国际合作高峰论坛开幕式上的主旨演讲 -->
      {{ detail.title || '' }}
    </h3>
    <div class="os-title-info fs-14">
      <span>发布时间：{{ detail.pubTime | timeFormat(true) }}</span>
      <span>发布渠道：{{ detail.docChannel || '' }}</span>
      <span>作者：{{ detail.author || '' }}</span>
      <!-- <span>首发时间：2023-04-25</span> -->
      <!-- <span class="os-view">
        <i class="el-icon-search"></i>
        查看正文
      </span> -->

      <!-- <custom-btn-group
        class="os-btn-group"
        v-model="btnVal"
        :list="btnList"
        :default-active-index="0"
      ></custom-btn-group> -->
    </div>
    <div class="os-operation">
      <custom-button-vue
        :btn-data="{ label: '导出传播报告' }"
        @click.native="handleExport"
      ></custom-button-vue>
    </div>
  </div>
</template>

<script>
import CustomBtnGroup from '@/components/CustomBtnGroup/Index.vue'
import { timeFormat } from '@/utils/timeFormat'
export default {
  name: 'OsTitle',
  components: { CustomBtnGroup },
  props: { detail: { required: true } },
  data() {
    return {
      btnVal: '',
      btnList: [
        { label: '当日', value: '0' },
        { label: '发布周', value: '10' },
      ],
    }
  },
  watch: {
    btnVal(v) {
      const a = timeFormat(new Date(), true)
      // console.log('v', v, a)
    },
    // detail(v) {
    // console.log('detail', v)
    // }
  },
}
</script>

<style lang="scss" scoped>
.os-title {
  position: relative;
  margin-top: 20px;
  color: #1b1b1b;
}

.os-title-info {
  margin-top: 0.125rem;
  color: #626262;
  overflow: hidden;
  span + span {
    // margin-left: 0.25rem;
    margin-left: 2rem;
  }
  .os-view {
    color: var(--main-color);
    cursor: pointer;
  }
  .os-btn-group {
    float: right;
    ::v-deep .tsa-date-btn-item button {
      padding-top: 0.075rem;
      padding-bottom: 0.075rem;
    }
  }
}

.os-operation {
  position: absolute;
  right: 20px;
  top: 10px;
}
</style>
