<template>
  <ul class="oo-card-wrapper mt-20">
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
        <p class="fs-16">{{ card.label }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { cardListMap } from '../data'
export default {
  name: 'MediaProdCard',
  props: {
    cardData: {
      // required: true,
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      mapFiled: {},
      cardList: [],
    }
  },
  computed: {
    channel() {
      return this.$route.query.channel
    },
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
    channel: {
      handler(v) {
        if (!v) {
          return (this.cardList = [])
        }
        return (this.cardList = cardListMap.get(v) || [])
      },
      immediate: true,
    },
    cardList: {
      handler(v) {
        if (!Array.isArray(v) || !v.length) {
          return
        }
        v.forEach(it => {
          // console.log(it)
          this.mapFiled[it.field] = 0
        })
      },
      immediate: true,
    },
  },
  methods: {
    setCardList(map) {
      this.cardList.forEach(it => {
        if (Object.hasOwn(map, it.field)) {
          this.$set(it, 'num', map[it.field])
        }
      })
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.oo-card-wrapper {
  justify-content: flex-start;
  .oo-card-item {
    margin-right: 0.25rem;
  }
}
</style>
