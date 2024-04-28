<template>
  <div class="overall-overview">
    <ul class="oo-card-wrapper">
      <li class="oo-card-item" v-for="card in cardList" :key="card.label">
        <div class="card-item-icon">
          <img
            :src="
              require(`@/assets/imgs/spreadOverview/overallOverview/${
                card.icon
              }.png`)
            "
            alt="图标"
          />
        </div>
        <div class="card-item-info">
          <span class="fs-20">{{ card.num | bigNumberTransform }}</span>

          <template v-if="!card.info">
            <p class="fs-16">{{ card.label }}</p>
          </template>
          <template v-else>
            <el-popover
              title="传播力指数"
              width="400"
              trigger="hover"
              :content="card.info"
            >
              <div slot="reference">
                <p class="fs-16 d-inline-block">{{ card.label }}</p>
                <i class="el-icon-question"></i>
              </div>
            </el-popover>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OverallOverview',
  props: {
    cardData: {
      required: true,
    },
  },
  data() {
    return {
      /* 
        ceiindexSum
        infoTypeCount
        mediaUnitCount
        originalSum
        reportSum
        siteNameCount
      */
      cardList: [
        {
          icon: 'personal',
          label: '发稿媒体单位',
          num: 0,
          field: 'mediaUnitCount',
        },
        {
          icon: 'channel',
          label: '发稿渠道',
          num: 0,
          field: 'infoTypeCount',
        },
        {
          icon: 'product',
          label: '发稿媒体产品',
          num: 0,
          field: 'siteNameCount',
        },
        {
          icon: 'publications-number',
          label: '发稿数',
          num: 0,
          field: 'reportSum',
        },
        {
          icon: 'originality',
          label: '原创数',
          num: 0,
          field: 'originalSum',
        },
        {
          icon: 'spread-number',
          label: '传播力指数',
          num: 0,
          field: 'ceiindexSum',
          info: `
            由阅读指标、互动指标和转载指标三个维度构成：
            阅读指标代表文章在集团内部所有媒体中的总阅读量；
            互动指标代表文章在内部所有媒体中的互动情况；
            转载指标代表文章在全国互联网上的转载情况。
            通过对各级指标分层加权计算汇总即可得到
            AICEI（Article Internet communication evaluation index 单篇文章互联网传播评价值）指数。
          `,
        },
      ],
      mapFiled: {
        ceiIndex: 0,
        channelCount: 0,
        dispatchCount: 0,
        originalCount: 0,
        productCount: 0,
        unitCount: 0,
      },
    }
  },
  watch: {
    cardData(v) {
      if (!Array.isArray(v) || !v.length) {
        this.setCardList(this.mapFiled)
        return
      }
      const obj = v.at(0) || {}
      this.setCardList(obj)
    },
  },
  methods: {
    setCardList(map) {
      this.cardList.forEach(it => {
        if (Object.hasOwn(map, it.field)) {
          it.num = map[it.field]
        }
      })
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.overall-overview {
  margin-top: 0.25rem;
}
</style>
