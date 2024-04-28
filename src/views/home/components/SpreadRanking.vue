<template>
  <div class="spread-ranking">
    <!-- 有几条展示几条，没有的隐藏掉，产品过多区域内滚动展示 -->
    <div class="spread-ranking-left spread-shadow">
      <spread-title-vue title="媒体产品传播排行">
        <span class="reveal-time">{{ currentDate }}</span>
      </spread-title-vue>
      <div class="srl-wrapper">
        <ul v-show="show.mediaProduct" class="media-product">
          <li
            v-if="mp.list.length"
            v-for="(mp, i) of mediaProductRankingList"
            :key="i"
            class="mp-item"
          >
            <div class="mp-item-logo fs-16">
              <div class="logo-wrap">
                <img
                  :style="{ width: mp.logoWidth }"
                  :src="
                    require(`@/assets/imgs/spreadOverview/spreadRanking/${
                      mp.logo
                    }.png`)
                  "
                  :alt="mp.logo"
                />
              </div>
              <span>{{ mp.text }}</span>
            </div>

            <div class="mp-item-list fs-14">
              <div v-for="(prod, i) of mp.list" :key="i" class="ml-item">
                <i :class="'ml-serial-0' + (i + 1)" class="ml-serial">
                  {{ i + 1 }}
                </i>
                <span class="ml-name">{{ prod.prodName }}</span>
                <el-tooltip effect="dark" placement="top" content="传播力指数">
                  <div class="d-inline-block">
                    <img
                      src="@/assets/imgs/spreadOverview/spreadRanking/hot-light.png"
                      alt="热度"
                    />
                    <span class="ml-num">
                      {{ prod.hotNum | bigNumberTransform }}
                    </span>
                  </div>
                </el-tooltip>
              </div>
            </div>

            <div
              v-if="i !== mediaProductRankingList.length - 1"
              class="mp-dotted"
            ></div>
          </li>
        </ul>
        <custom-no-data-vue v-show="!show.mediaProduct"></custom-no-data-vue>
      </div>
    </div>

    <div class="spread-ranking-right spread-shadow">
      <spread-title-vue title="稿件传播排行">
        <span class="reveal-time">{{ currentDate }}</span>
      </spread-title-vue>
      <div class="manuscript-spread">
        <custom-btn-group
          v-model="manuscriptData.btnVal"
          :list="btnListOfManuScriptData"
          :default-active-index="0"
        ></custom-btn-group>
        <div class="manuscript-spread-list srl-wrapper">
          <manuscript-spread-list
            :list="listOfManuScriptData"
            :icon-list="manuscriptData.iconList"
            :channel="channel"
          ></manuscript-spread-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomBtnGroup from '@/components/CustomBtnGroup/Index.vue'
import ManuscriptSpreadList from '@/components/public/manuscriptSpreadList/Index'
/*
newspaper website client
weixin weibo tiktok dingyuehao
haiwaimeiti


*/
import { manuscriptRankingIconMap } from '@/assets/js/spreadOverviewService.js'
import { mediaTypeTextMap } from '@/assets/js/globalMap'

// mock
// import { mockManuSpreadData } from './mockData'

export default {
  name: 'SpreadRanking',
  components: { CustomBtnGroup, ManuscriptSpreadList },
  props: {
    currentDate: {
      type: String,
      default: '',
    },
    mediaProductRankingData: {
      type: Array,
      required: true,
    },
    manuscriptList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      init: false,
      mediaProductRankingList: [
        {
          logo: 'newspaper',
          logoWidth: '0.525rem',
          text: '报纸',
          // list: [{ prodName: '人民日报', hotNum: 511.88 }],
          list: [],
        },
        {
          logo: 'website',
          logoWidth: '0.475rem',
          text: '网站',
          list: [],
        },
        {
          logo: 'client',
          logoWidth: '0.3625rem',
          text: '客户端',
          alias: 'APP',
          list: [],
        },
        {
          logo: 'weixin',
          logoWidth: '0.5625rem',
          text: '微信',
          list: [],
        },
        {
          logo: 'weibo',
          logoWidth: '0.575rem',
          text: '微博',
          list: [],
        },
        {
          logo: 'tiktok',
          logoWidth: '0.425rem',
          text: '视频号',
          list: [],
        },
        {
          logo: 'dingyuehao',
          logoWidth: '0.475rem',
          text: '订阅号',
          list: [],
        },
        {
          logo: 'haiwaimeiti',
          logoWidth: '0.5375rem',
          text: '海外媒体',
          list: [],
        },
      ],
      // mockManuSpreadData: mockManuSpreadData.Records,
      manuscriptData: {
        btnVal: {},
        btnList: [
          { label: '报纸', value: '电子报', icon: 'newspaper' },
          { label: '网站', value: '网站', icon: 'website' },
          { label: '客户端', value: 'APP', icon: 'client' },
          { label: '微信', value: '微信', icon: 'weixin' },
          // { label: '微博', value: 'weibo', icon: 'weibo' },
          // { label: '短视频', value: 'tiktok', icon: 'tiktok' },
          // { label: '订阅号', value: 'dingyuehao', icon: 'dingyuehao' },
          // { label: '海外媒体', value: 'haiwaimeiti', icon: 'haiwaimeiti' },
        ],
        list: [
          // {
          //   title: '总书记引领我们谱写中华民族现代文明新华章',
          //   source: '人民日报',
          //   usageCount: [321, 231, 567],
          // },
        ],
        iconList: [],
      },
      show: {
        mediaProduct: true,
      },
    }
  },
  computed: {
    btnListOfManuScriptData() {
      this.manuscriptData.btnList.forEach(b => {
        const icon = b.icon
        b.icon = require(`@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/${icon}.png`)
        b.activeIcon = require(`@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/${icon}-active.png`)
      })
      return this.manuscriptData.btnList
    },
    listOfManuScriptData() {
      // const list = this.manuscriptData.list
      // while (list.length < 10) {
      //   list.push(...list)
      // }
      return this.manuscriptData.list
    },
    channel() {
      return mediaTypeTextMap.get(this.manuscriptData.btnVal.value)
    }
  },
  watch: {
    'manuscriptData.btnVal'(v) {
      // console.log(v)
      const m = manuscriptRankingIconMap.get(v.value)
      if (!m) return
      this.manuscriptData.iconList = m
      /* 触发事件，第一次不需要，初始化会发送请求 */
      if (!this.init) return
      this.$emit('btnToggle', v.value)
    },
    mediaProductRankingData(v) {
      /*
      [
        {
          "mediaType": "网站"
          mediaCeiindexVOs: [
          {
            ceiindex: 2.19,
            mediaName: '人民网',
          },
          {
            ceiindex: 0,
            mediaName: '中国城市网',
          },
        }
      ]
      */
      this.handlerMediaProdData(v)
      // console.log('mediaProductRankingData', v)
    },
    manuscriptList(d) {
      this.manuscriptData.list = d
    },
  },
  methods: {
    /**
     * @desc 处理媒体产品传播排行的数据，进行渲染
     * @param { Array } list 数据列表
     */
    handlerMediaProdData(list) {
      /* 有数据渲染，没数据重置列表 */
      const hasData = list.some(it => it.mediaCeiindexVOs.length > 1)
      if (hasData) {
        this.show.mediaProduct = true
        list.forEach(t => {
          /* 找到对应的类型 */
          const f = this.mediaProductRankingList.find(m => {
            const n = m.alias || m.text
            return n === t.mediaType
          })
          if (f) {
            f.list = t.mediaCeiindexVOs.map(it => ({
              prodName: it.mediaName,
              hotNum: it.ceiindex,
            }))
          }
        })
      } else {
        this.show.mediaProduct = false
        this.mediaProductRankingList.forEach(m => (m.list = []))
      }
      this.onResize()
    },
    async onResize() {
      await this.$nextTick()
      if (!this.show.mediaProduct) return
      const leftEle = document.querySelector('.srl-wrapper > .media-product')
      const rect = leftEle.getBoundingClientRect()
      // console.log('rect', rect)
      const rightEle = document.querySelector('.manuscript-spread-list')
      rightEle.style.height = rect.height - 62 + 'px'
    },
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.$nextTick(() => {
      this.init = true
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.spread-ranking {
  display: flex;
  margin-top: 0.25rem;
  justify-content: space-between;
}

.spread-ranking-left,
.spread-ranking-right {
  width: 49.4%;
  // height: 40vh;
  // height: 12.5rem;

  .srl-wrapper {
    // height: calc(100% - 56px);
    padding-bottom: 10px;
    overflow: auto;
    @include scrollBar;
  }
}

// .spread-ranking-left {
//   margin-right: 1%;
// }

.media-product {
  .mp-item {
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 0 0 0.3rem;
    padding: 0.375rem 0 0.25rem 0;
    // padding: 30px 0 20px 0;

    .mp-item-logo {
      width: 1.625rem;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      color: #c79e61;
      font-weight: 700;
      .logo-wrap {
        width: 0.625rem;
        height: 0.625rem;
        display: flex;
        margin-right: 0.05rem;
        img {
          display: block;
          max-width: 100%;
          margin: auto;
        }
      }
    }

    .mp-item-list {
      flex-grow: 1;
      display: flex;
      flex-wrap: wrap;
      // height: .875rem;
      margin-left: 0.2rem;

      .ml-item {
        // min-width: 33.33%;
        width: 50%;
        padding: 4px 0;
        min-height: 0.425rem;
        // padding-right: 0.5rem;
        // margin-right: .1rem;
        // margin-bottom: 0.175rem;
      }
      .ml-name {
        margin-right: 0.1rem;
        color: #1b1b1b;
      }
      img {
        width: 0.175rem;
        line-height: 0;
        vertical-align: -1px;
      }
      .ml-num {
        color: #f04142;
      }
    }

    .mp-dotted {
      // width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin-right: 0.3rem;
      border-bottom: 1px dashed #dcdcdc;
    }
  }
}

.manuscript-spread {
  // height: 775px;
  padding: 0.25rem;
  padding-right: 0;

  /* ::v-deep .tsa-date-btn-item {
    .tas-custom-btn {
      font-size: 16px;
    }
    button {
      padding: 0;
      padding-left: 0.1rem;
      padding-right: 0.1rem;
    }
  } */
  ::v-deep .tsa-date-btn-item + .tsa-date-btn-item {
    margin-left: 0.3rem;
  }
}

@media screen and (max-width: 1440px) {
  .manuscript-spread {
    height: 640px;
  }
}
</style>
