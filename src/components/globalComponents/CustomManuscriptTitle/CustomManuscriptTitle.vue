<template>
  <el-tooltip
    effect="dark"
    popper-class="tooltip-abstract"
    :content="title"
    :disabled="disableTip"
    :open-delay="100"
  >
    <div
      @click="handleTitleClick"
      @mouseenter="handleMouseenter"
      ref="manuTitle"
      class="fs-16 manuscript-title"
    >
      {{ title }}
    </div>
  </el-tooltip>
</template>

<script>
export default {
  name: 'CustomManuscriptTitle',
  props: {
    title: {
      required: true,
      type: String,
    },
    queryParam: {
      default: () => {},
    },
    // 自定义跳转，传的话点击标题时调用
    customSkip: {
      type: Function,
    },
  },
  data() {
    return {
      disableTip: true,
    }
  },
  methods: {
    createRangeNode(node) {
      const range = document.createRange()
      // debugger
      range.setStart(node, 0)
      range.setEnd(node, node.childNodes.length)
      return range
    },
    setTootip(target) {
      const range = this.createRangeNode(target)
      const rangeWidth = range.getBoundingClientRect().width
      const rangeHeigth = range.getBoundingClientRect().height
      const offsetWidth = target.offsetWidth
      const offsetHeight = target.offsetHeight
      // console.log('range.getBoundingClientRect()', range.getBoundingClientRect())
      // console.log('clientWidth', offsetWidth)
      // console.log('rangeWidth', rangeWidth)
      // console.log('offsetHeight', offsetHeight)
      if (rangeWidth > offsetWidth || rangeHeigth > offsetHeight) {
        this.disableTip = false
      } else {
        this.disableTip = true
      }
    },
    handleMouseenter(e) {
      const target = e.target
      this.setTootip(target)
    },
    /**
     * @desc 稿件标题点击
     */
    handleTitleClick() {
      if (typeof this.customSkip === 'function') {
        this.customSkip(this.title, this.$attrs)
      } else {
        const pathInfo = this.$router.resolve({
          name: 'spreadDatail',
          query: this.queryParam,
        })
        const href = pathInfo.href
        window.open(href, '_blank')
      }

      // this.$router.push({ name: 'originalSpread', query: this.queryParam })
    },
  },
  mounted() {
    // this.setTootip()
  },
}
</script>

<style lang="scss" scoped>
.manuscript-title {
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  // line-height: 0.35rem;
  line-height: 28px;
  color: #313131;
  cursor: pointer;
  &:hover {
    color: var(--main-color);
  }
}
.manuscript-title.default {
  cursor: default;
  &:hover {
    color: #313131;
  }
}
</style>
