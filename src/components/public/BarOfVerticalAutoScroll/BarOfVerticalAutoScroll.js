/**
 * @desc 自动滚动的垂直柱形图
 */
import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
  name: 'BarOfVerticalAutoScroll',

  components: { vueSeamlessScroll },

  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
    // 如果为 false，将不会无缝滚动
    seamless: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    /* 数据项用的字段 */
    fields: {
      type: Object,
      default: () => ({ value: 'value', label: 'label' }),
    },
    showCount: {
      default: 6,
    },
  },

  computed: {
    colorList() {
      return [
        'rgba(146,204,119,1)',
        'rgba(250,200,89,1)',
        'rgba(238,102,102,1)',
        'rgba(115,192,222,1)',
        'rgba(59,163,114,1)',
        'rgba(252,132,82,1)',
        'rgba(154,96,180,1)',
      ]
    },

    optionSingleHeightTime() {
      return {
        singleHeight: 0,
        waitTime: 8000,
        limitMoveNum: this.showCount + 1,
        openWatch: true,
      }
    },

    maxValue() {
      if (!Array.isArray(this.list) || !this.list.length) return 0
      return Math.max(...this.list.map(v => v[this.fields.value]))
    },
  },

  render(h) {
    if (!this.isShow) {
      return <custom-no-data-vue />
    }

    const slot_label = this.$scopedSlots.label

    const a = (
      <vue-seamless-scroll
        class={['seamless-warp', !this.seamless && 'no-seamless']}
        data={this.list}
        class-option={this.optionSingleHeightTime}
        propsOnScrollEnd={this.scrollEnd}
      >
        <ul>
          {this.list.map((l, i) => (
            <li key={i} class="verticalbar-item">
              <span class="verticalbar-label">
                {slot_label ? slot_label({ l, i }) : l[this.fields.label]}
              </span>
              <div class="verticalbar-bar">
                <div
                  style={{
                    width:
                      (l[this.fields.value] / this.maxValue).toFixed(2) * 100 +
                      '%',
                    'background-color': this.colorList[i % this.showCount],
                  }}
                  class="bar-inner"
                />
              </div>
              <span class="verticalbar-count">{l[this.fields.value]}</span>
            </li>
          ))}
        </ul>
      </vue-seamless-scroll>
    )
    return a
  },

  methods: {
    scrollEnd: function() {
      console.log('ScrollEnd')
    },
  },
}
