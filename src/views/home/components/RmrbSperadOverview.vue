<template>
  <div class="rmrb-spread-overview spread-shadow">
    <spread-title-vue title="《人民日报》传播概览">
      <span class="reveal-time">{{ currentDate }}</span>

      <!-- <el-popover
        title="传播力指数"
        width="400"
        trigger="hover"
        content="由阅读指标、互动指标和转载指标三个维度构成：
          阅读指标代表文章在集团内部所有媒体中的总阅读量；
          互动指标代表文章在内部所有媒体中的互动情况；
          转载指标代表文章在全国互联网上的转载情况。
          通过对各级指标分层加权计算汇总即可得到
          AICEI（Article Internet communication evaluation index 单篇文章互联网传播评价值）指数。
        "
      >
        <div slot="reference" class="st-right">
          传播力指数
          <i class="el-icon-question"></i>
        </div>
      </el-popover> -->
    </spread-title-vue>

    <div class="spread-cover">
      <div
        v-for="sc of spreadCoverList"
        :key="sc.logo"
        :class="'sc-' + sc.logo"
        class="spread-cover-item"
      >
        <router-link :to="sc.link || 'home'" :target="sc.link && '_blank'">
          <div class="sc-logo">
            <img
              :src="
                require(`@/assets/imgs/spreadOverview/rmrbSpreadOverview/${
                  sc.logo
                }-logo.png`)
              "
              :alt="sc.logo"
            />
            <div v-if="sc.logoDesc.length" class="desc fs-16">
              <p v-for="d of sc.logoDesc" :key="d">{{ d }}</p>
            </div>
          </div>
          <div class="sc-info fs-14">
            <div class="p1">
              <div class="sc-icon">
                <img
                  :src="
                    require(`@/assets/imgs/spreadOverview/rmrbSpreadOverview/${
                      sc.logo
                    }.png`)
                  "
                  :alt="sc.logo"
                />
              </div>
              <span class="sc-label">
                传播力：{{ (sc.ceiindexSum || 0) | bigNumberTransform }}
              </span>
            </div>
            <p class="p2">
              <span class="sc-label">
                发稿数：{{ (sc.reportSum || 0) | bigNumberTransform }}
              </span>
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpreadOverview',
  props: {
    currentDate: {
      type: String,
      default: '',
    },
    spreadOverviewData: { required: true },
  },
  data() {
    return {
      spreadCoverList: [
        {
          logo: 'newspaper',
          logoDesc: [],
          ceiindexSum: 0,
          reportSum: 0,
          mediaType: '电子报',
          link: {
            name: 'mediaProdDetail',
            query: { channel: 'newspaper', title: '人民日报' },
          },
        },
        {
          logo: 'website',
          logoDesc: ['权威 实力 源自人民'],
          ceiindexSum: 0,
          reportSum: 0,
          mediaType: '网站',
          link: {
            name: 'mediaProdDetail',
            query: { channel: 'website', title: '人民网' },
          },
        },
        {
          logo: 'client',
          logoDesc: ['有品质的新闻'],
          ceiindexSum: 0,
          reportSum: 0,
          mediaType: 'APP',
          link: {
            name: 'mediaProdDetail',
            query: { channel: 'client', title: '人民日报客户端' },
          },
        },
        {
          logo: 'weixin',
          logoDesc: ['参与 沟通 记录时代'],
          ceiindexSum: 0,
          reportSum: 0,
          mediaType: '微信',
          link: {
            name: 'mediaProdDetail',
            query: { channel: 'weixin', title: '人民日报' },
          },
        },
        {
          logo: 'weibo',
          logoDesc: ['参与 沟通 记录时代'],
          ceiindexSum: 0,
          reportSum: 0,
          mediaType: '微博',
          link: {
            name: 'mediaProdDetail',
            query: { channel: 'weibo', title: '人民日报' },
          },
        },
        {
          logo: 'tiktok',
          logoDesc: ['参与 沟通 记录时代'],
          ceiindexSum: 0,
          reportSum: 0,
          mediaType: '短视频',
        },
        {
          logo: 'dingyuehao',
          logoDesc: ['参与 沟通 记录时代'],
          ceiindexSum: 0,
          reportSum: 0,
          mediaType: '第三方',
        },
      ],
    }
  },
  watch: {
    spreadOverviewData(v) {
      /*  {
          dispatchCount: 0,
          ceiIndex: 4558.93,
          mediaType: '微信',
        },
        {
          dispatchCount: 0,
          ceiIndex: 161254.07,
          mediaType: '电子报', 
        },
        {
          dispatchCount: 0,
          ceiIndex: 360447.63,
          mediaType: '网站',
        },
        {
          dispatchCount: 0,
          ceiIndex: 17755.46,
          mediaType: 'APP',
        }, */
      if (!Array.isArray(v) || !v.length) {
        this.setSpreadCoverList([])
        return
      }
      this.setSpreadCoverList(v)
    },
  },
  methods: {
    setSpreadCoverList(data) {
      // console.log('setSpreadCoverList', data)
      /* 为了在没数据时重置为 0， 所以用自定义的数据 */
      this.spreadCoverList.forEach(sc => {
        const findval = data.find(d => d.mediaType === sc.mediaType)
        if (findval) {
          sc.reportSum = findval.reportSum
          sc.ceiindexSum = findval.ceiindexSum
        } else {
          sc.reportSum = 0
          sc.ceiindexSum = 0
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.rmrb-spread-overview {
  margin-top: 0.25rem;
}
.spread-title {
  display: flex;
  height: 56px;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid #f9eeed;

  .st-line {
    width: 4px;
    height: 16px;
    // color: #CA2C25;
    background-color: var(--main-color);
  }
  .st-text {
    margin-left: 0.175rem;
    font-size: 0.2rem;
    color: #000;
    font-weight: 700;
  }

  .st-right {
    position: absolute;
    top: 0;
    right: 130px;
    height: 100%;
    line-height: 56px;
    cursor: help;
  }
}

.spread-cover {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  .spread-cover-item {
    // width: 180px;
    width: 13%;
    height: 3.375rem;
    padding: 2px 4px;
    // display: flex;
    // flex-direction: column;
    border: 2px solid #f4f4f4;

    .sc-logo {
      height: 70%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;

      img {
        max-width: 90%;
        object-fit: scale-down;
        margin: 0 auto 0.125rem;
      }
      .desc {
        color: #231916;
        text-align: center;
        line-height: 0.25rem;
      }
    }
    &.sc-client,
    &.sc-weibo,
    &.sc-weixin {
      .sc-logo {
        img {
          max-width: 50%;
        }
      }
    }

    .sc-info {
      height: 30%;
      padding-bottom: 0.125rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      color: #1b1b1b;
      .sc-icon {
        width: 0.375rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        img {
          max-width: 100%;
          object-fit: scale-down;
        }
      }
      // .sc-label {
      //   width: 1rem;
      // display: inline-block;
      //   text-align: justify;
      //   text-align-last: justify;
      // }
      .p2,
      .p1 {
        display: flex;
        align-items: center;
      }
      .p2 {
        margin-top: 0.1rem;
        padding-left: 0.375rem;
      }
    }
  }
}
</style>
