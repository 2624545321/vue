<template>
  <div class="media-prod-info spread-shadow mt-20">
    <div class="mpi-left">
      <div class="mp-logo-wrap">
        <div class="mp-logo">
          <img
            src="~@/assets/imgs/detail/mediaProdDetail/peoples-daily.png"
            alt="人民日报logo"
          />
        </div>
        <div class="channel-logo">
          <img
            :src="
              require(`@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/${channel}-active.png`)
            "
            alt="报纸渠道"
          />
        </div>
      </div>

      <div class="d-inline-block mpi-introduce">
        <!-- <h3 class="fs-20">人民日报-{{ channelType[channel].label }}</h3> -->
        <h3 class="fs-20 d-inline-block">{{ title }}</h3>
        <p class="fs-14 d-inline-block">
          <!-- 介绍：参与、沟通、记录时代。累计发文原创/总数：14021/148031 -->
          累计发文原创/总数：{{
            (info.originalNum || 0) + '/' + (info.reportNum || 0)
          }}
        </p>
      </div>
    </div>
    <div class="mpi-right">
      <custom-btn-group
        v-model="btnVal"
        :list="btnList"
        :default-active-index="0"
        class="fs-14 mpd-btn-group"
      ></custom-btn-group>
    </div>
  </div>
</template>

<script>
import CustomBtnGroup from '@/components/CustomBtnGroup/Index.vue'
import { dateRank_timeRange } from '@/views/channelSpread/channelSpreadDetail/data.js'
// 工具函数
import { dateBtnValToTime } from '@/utils/shared'

export default {
  name: 'MediaProdInfo',
  components: { CustomBtnGroup },
  props: {
    cardData: {
      type: Array,
      default: () => [],
    },
    dateVal: {
      type: [Object, null],
      default: null,
    },
  },
  data() {
    const weekVal = dateRank_timeRange.week[0].label.split(' - ')
    const monthVal = dateRank_timeRange.month[0].label.split(' - ')

    return {
      btnList: [
        { label: '昨天', value: [1, 1], cycle: 'day' },
        {
          label: '上周',
          value: weekVal,
          cycle: 'week',
          omit: true
        },
        {
          label: '上月',
          value: monthVal,
          cycle: 'month',
          omit: true
        },
      ],
    }
  },
  computed: {
    channel() {
      return this.$route.query.channel
    },
    title() {
      return this.$route.query.title
    },
    info() {
      return (this.cardData && this.cardData[0]) || {}
    },
    btnVal: {
      get() {
        return this.dateVal
      },
      set(v) {
        this.$emit('update:dateVal', v)
      },
    },
  },
  // watch: {
  //   btnVal(v) {
  //     console.log('b', v)
  //   },
  // },
  mounted() {
    this.btnList.forEach(dateBtnValToTime)
  },
}
</script>

<style lang="scss" scoped>
.media-prod-info {
  display: flex;
  // align-items: center;
  justify-content: space-between;
  padding: 0.25rem;

  .mp-logo-wrap {
    position: relative;
    display: inline-block;
    margin-right: 0.2rem;
  }
  .mp-logo {
    display: flex;
    width: 1.35rem;
    height: 1.35rem;
    background-color: var(--main-color);
    border-radius: 50%;

    img {
      max-width: 88%;
      margin: auto;
      object-fit: scale-down;
    }
  }
  .channel-logo {
    position: absolute;
    bottom: 0;
    right: 0;
    // width: 0.4rem;
    // height: 0.4rem;
    padding: 0.05rem;
    background-color: #d8b784;
    border: 2px solid #fff;
    border-radius: 50%;
    z-index: 1;
    img {
      display: block;
      width: 0.25rem;
      height: 0.25rem;
      // margin: auto;
      // margin-top: .05rem;
      object-fit: contain;
    }
  }
  .mpi-introduce {
    vertical-align: 20px;
    p {
      margin-top: 16px;
      margin-left: 10px;
      color: #a36717;
    }
  }
}
</style>
