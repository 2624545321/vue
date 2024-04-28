<template>
  <div class="app-container channel-spread">
    <div class="result_search">
      <custom-btn-group
        v-model="filterCondition.btnVal"
        :list="filterCondition.btnList"
        :default-active-index="1"
      ></custom-btn-group>
    </div>
    <div class="channel-category">
      <div
        v-for="(cate, i) of categoryList"
        :key="i"
        @click="handleCategoryClick(cate)"
        :class="'cate-' + cate.symbol"
        class="channel-category-item spread-shadow pointer"
      >
        <div class="cci-left">
          <span class="cn-name fs-16 font-bold">{{ cate.zh }}</span>
          <div class="cn-logo">
            <img
              :src="
                require(`@/assets/imgs/channelSpread/home/logo-${
                  cate.symbol
                }.png`)
              "
              :alt="cate.zh"
            />
          </div>
        </div>
        <div class="cci-right">
          <div
            v-for="(idn, i) of cate.indexNum"
            :key="i"
            class="index-num-item"
          >
            <span class="in-num fs-26 font-bold">
              {{ idn.num | bigNumberTransform }}
            </span>
            <div class="in-tip">
              <img
                :src="
                  require(`@/assets/imgs/channelSpread/home/icon-${
                    idn.icon
                  }.png`)
                "
                :alt="idn.text"
              />
              <span class="fs-14">{{ idn.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getChannelPropagate } from '@/api/channelSpread/index.js'
import CustomBtnGroup from '@/components/CustomBtnGroup/Index.vue'
import { mediaTypeTextMap } from '@/assets/js/globalMap'
// const
import { homeList } from './data'
import { dateRank_timeRange } from '@/views/channelSpread/channelSpreadDetail/data.js'
// 工具函数
import { dateBtnValToTime } from '@/utils/shared'

export default {
  name: 'channelSpread',
  components: { CustomBtnGroup },
  data: () => {
    const weekVal = dateRank_timeRange.week[0].label.split(' - ')
    const monthVal = dateRank_timeRange.month[0].label.split(' - ')

    return {
      filterCondition: {
        btnList: [
          { label: '昨天', value: [1, 1], cycle: 'day' },
          {
            label: '上周',
            value: weekVal,
            cycle: 'week',
            omit: true,
          },
          {
            label: '上月',
            value: monthVal,
            cycle: 'month',
            omit: true,
          },
        ],
        btnVal: null,
      },
      categoryList: homeList,
      requestParams: {
        startDate: '',
        endDate: '',
        params: {
          cycle: '',
        },
      },
    }
  },
  watch: {
    'filterCondition.btnVal'(v) {
      // console.log('filterCondition.btnVal', v)
      const dateArr = v.value
      this.requestParams.startDate =
        (dateArr[0] && dateArr[0].replace(/-/g, '')) || ''
      this.requestParams.endDate =
        (dateArr[1] && dateArr[1].replace(/-/g, '')) || ''
      this.requestParams.params.cycle = v.cycle

      // 设置跳转时的日期 左侧菜单和列表点击都需要，所以只能在按钮切换时存储
      this.$store.commit('globalParameter/SET_channelSpread_channel', {
        cycle: this.filterCondition.btnVal.cycle,
      })
      this.requestInvoke()
    },
  },
  methods: {
    setData() {
      this.filterCondition.btnList.forEach(dateBtnValToTime)
    },
    handleCategoryClick(cate) {
      // console.log(cate)
      const { symbol } = cate
      // console.log(this.$store)
      this.$router.push({
        // name: 'channelSpreadDetail',
        name: `channelSpreadDetail_${symbol}`,
        query: { symbol },
      })
    },
    requestInvoke() {
      this.getChannelPropagate()
    },
    async getChannelPropagate() {
      const res = await getChannelPropagate(this.requestParams)
      console.log('res', res)
      /* 
      {
        "originalNum": 3220, 原创数
        "reprintNum": 436767, 转载数
        "ceiIndex": 603802.13, 传播力指数
        "mediaType": "电子报", 媒体类型
        "articleCount": 0, 发稿数
        "productCount": 0 发稿媒体产品数
      }
      */
      if (res.Result !== 'OK') return this.dealResponseData([])
      const records = res.Records || []
      this.dealResponseData(records)
    },
    dealResponseData(data) {
      if (!data || !Array.isArray(data)) {
        console.error('dealResponseData parameter err')
        return
      }

      for (let i = 0, len = this.categoryList.length; i < len; i++) {
        const curr = this.categoryList[i]
        const findVal = data.find(
          d => mediaTypeTextMap.get(d.mediaType) === curr.symbol,
        )
        if (findVal) {
          curr.indexNum.forEach(it => (it.num = findVal[it.field] || 0))
        } else {
          curr.indexNum.forEach(it => (it.num = 0))
        }
      }
    },
  },
  mounted() {
    this.setData()
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.app-container {
  padding-right: 0;
}
.channel-category {
  margin-top: 0.25rem;
  padding: 0 38px 10px 4px;
  @include scrollView;
}
.channel-category-item {
  display: flex;
  .cci-left {
    display: flex;
    flex-shrink: 0;
    // justify-content: center;
    width: 2.8rem;
    height: 1.45rem;
    padding-left: 0.35rem;
    background: url('~@/assets/imgs/channelSpread/home/title-bacc.png')
      no-repeat center/100% 100%;
    .cn-name {
      padding-top: 0.3rem;
      // margin-right: 0.425rem;
      width: 0.875rem;
      color: #fff;
    }
    .cn-logo {
      width: 0.625rem;
      display: flex;
      align-items: center;

      img {
        max-width: 100%;
        object-fit: scale-down;
      }
    }
  }
  .cci-right {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    // justify-content: center;
    padding-right: 15%;
    padding-left: 7%;
    .index-num-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      // flex: 1;
      width: 20%;
      height: 100%;
      color: #898989;
      .in-num {
        text-align: center;
        line-height: 0.45rem;
        color: #313131;
      }
      .in-tip {
        display: flex;
        justify-content: center;
        line-height: 0.45rem;
        img {
          object-fit: contain;
          margin-top: -2px;
          margin-right: 4px;
        }
      }
    }
  }
  & + & {
    margin-top: 0.25rem;
  }
}
.cate-client {
  .cci-left {
    .cn-logo {
      width: 0.475rem;
      img {
        max-width: 100%;
        object-fit: scale-down;
      }
    }
  }
}
</style>
