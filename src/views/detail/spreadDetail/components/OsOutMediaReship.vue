<template>
  <div class="out-media-reship mt-20 spread-shadow">
    <spread-title-vue title="外部媒体转载">
      <div class="omr-btn-group fs-14">
        <custom-btn-group
          v-model="btn.val"
          :list="btn.list"
          :default-active-index="0"
        ></custom-btn-group>
      </div>
      <div class="os-operation">
        <custom-button-vue
          :btn-data="{ label: '导出' }"
          @click.native="handleExport"
        ></custom-button-vue>
      </div>
    </spread-title-vue>

    <div
      v-if="comRenderList && comRenderList.length"
      class="category-list fs-16"
    >
      <div
        v-for="(item, i) of comRenderList"
        :key="i"
        :class="'omr-0' + (i + 1)"
        class="omr-cate-item omr-01"
      >
        <div class="oci-card" :style="ociCardStyle(i, item)">
          <div class="oci-logo">
            <img
              :src="
                require(`@/assets/imgs/originalSpread/outMediaReship/${
                  item.symbol
                }.png`)
              "
              :alt="item.zh"
            />
          </div>
          <span>{{ item.zh }}</span>
        </div>
        <div class="oci-list spread-shadow">
          <span class="fs-16 usage-num font-bold">
            共{{ calculateUsageCount(item) }}家媒体采用
          </span>
          <div @click="item.viewAll = !item.viewAll" class="view-all fs-14">
            {{ item.viewAll ? '收起' : '查看全部' }}
          </div>
          <div>
            <div
              v-if="l.data && l.data.length"
              v-for="(l, i) of item.list"
              :key="i"
              class="oci-list-item fs-16"
            >
              <i v-if="l.symbol" class="oci-icon">
                <img
                  :src="
                    require(`@/assets/imgs/originalSpread/outMediaReship/icon-${
                      l.symbol
                    }.png`)
                  "
                  :alt="l.zh"
                />
              </i>
              <span v-if="l.data && l.data.length" class="oci-name">
                {{ l.zh }}有
                <em>{{ l.data.length }}</em>
                家
              </span>
              <ul>
                <!-- :style="{
                  height: item.viewAll ? 'auto' : '0.375rem',
                  overflow: item.viewAll ? 'auto' : 'hidden',
                }" -->
                <li :class="item.viewAll ? '' : 'f-oh1'" class="">
                  <a
                    v-for="(d, i) of l.data"
                    :key="i"
                    :href="d.url"
                    class="company-item"
                    target="_blank"
                  >
                    {{ d.mediaName }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomBtnGroup from '@/components/CustomBtnGroup/Index.vue'
import { mockSourceData } from './mockData'
import { outsideMediaReshipData, cateMap } from './data'
import { timeFormat } from '@/utils/timeFormat'
import { exportToExcel } from '@/utils/export'
import { cloneDeep } from '@/plugins/utils'

export default {
  name: 'OsOutMediaReship',
  components: { CustomBtnGroup },
  props: {
    omData: { required: true },
  },
  data: () => ({
    btn: {
      val: {},
      list: [
        { label: '等级分类', value: 'level' },
        { label: '类型分类', value: 'type' },
      ],
    },
    exportDataList: [],
    mockSourceData: mockSourceData,
    outsideMediaReshipData,
  }),
  watch: {
    // 'btn.val'(v) {
    // console.log(v)
    // const m = cateMap.get(v.value)
    // console.log(m)
    // },
    omData(v) {
      // console.log('外部媒体转载', v)
      if (!v) return (this.outsideMediaReshipData = [])
      const OBJ = Object.entries(v)
      /* 先处理等级分类的数据  */
      for (let i = 0, len = OBJ.length; i < len; i++) {
        const [k, v] = OBJ[i]
        const levelVal = outsideMediaReshipData.find(o => o.field === k)
        if (!levelVal) continue
        const { dataMap } = levelVal
        for (let [mk, mv] of dataMap) {
          const data = v[mv.data]
          levelVal.usageTotal += v[mv.num]
          const c = {
            ...mv,
            data,
          }
          levelVal.list.push(cloneDeep(c))
        }
      }
      /* 处理类型分类的数据 */
      // console.log('outsideMediaReshipData', cloneDeep(outsideMediaReshipData))
      this.$nextTick(() => this.handleCateData())
    },
  },
  computed: {
    comRenderList() {
      const d = this.outsideMediaReshipData
      const m = cateMap.get(this.btn.val.value)
      // console.log(d, m)
      if (!m) return []
      const a = d.filter(e => m.includes(e.symbol))
      return a.filter(it => this.calculateUsageCount(it) > 0)
    },
  },
  methods: {
    handleExport() {
      // console.log('handleExport')
      // 所有核心媒体
      const hexinMedia = this.omData.hexinLev.hexinLev0.concat(
        this.omData.hexinLev.hexinLev1,
        this.omData.hexinLev.hexinLev2,
        this.omData.hexinLev.hexinLev3,
      )
      const yijiMedia = this.omData.yijiLev.yijiLev0.concat(
        this.omData.yijiLev.yijiLev1,
        this.omData.yijiLev.yijiLev2,
        this.omData.yijiLev.yijiLev3,
      )
      const erjiMedia = this.omData.erjiLev.erjiLev0.concat(
        this.omData.erjiLev.erjiLev1,
        this.omData.erjiLev.erjiLev2,
        this.omData.erjiLev.erjiLev3,
      )
      this.exportDataList = Object.freeze(
        hexinMedia.concat(yijiMedia, erjiMedia),
      )
      // console.log('this.exportDataList', this.exportDataList)
      // debugger
      // this.export()
      const thead = [
        '序号',
        '转载标题',
        '转载链接',
        '转载媒体',
        '转载级别',
        '转载时间',
      ]
      exportToExcel(this.exportDataList, {
        thead,
        customRow(row, i) {
          const template = `
              <td>${i + 1}\t</td>
              <td>${row.title || ''}\t</td>
              <td>${row.url || ''}\t</td>
              <td>${row.mediaName || ''}\t</td>
              <td>${row.mediaLevel || ''}媒体\t</td>
              <td>${timeFormat(row.pubTime, true) || ''}\t</td>
            `
          return template
        },
      })
    },
    handleCateData() {
      // console.log('comRenderList', this.comRenderList)
      const cl = this.comRenderList
      /* 全部数据 */
      this.outsideMediaReshipData.forEach(item => {
        /* cl => 默认展示的等级分类数据 */
        for (let i = 0, len = cl.length; i < len; i++) {
          const curr = cl[i]
          if (curr.list.length < 1) continue
          /* 等级数据的每一项 */
          curr.list.forEach(cItem => {
            /* 如果全部数据每一项的 zh 和展示的子项的 zh相同，把子项放入
            就是找到媒体分类的数据，放到网站、客户端这些类型分类中
            */
            if (item.zh === cItem.zh) {
              const exist = item.list.find(l => l.zh === curr.zh)
              if (exist) {
                exist.data.push(...cItem.data)
              } else {
                item.list.push({
                  zh: curr.zh,
                  symbol: curr.symbol,
                  data: cItem.data,
                })
              }
            }
          })
        }
      })
      // console.log('dddd', cloneDeep(this.outsideMediaReshipData))
    },
    calculateUsageCount(item) {
      if (!Array.isArray(item.list) || !item.list.length) return 0
      let usageTotal = 0
      item.list.forEach(it => {
        usageTotal += (it.data && it.data.length) || 0
      })
      return usageTotal
    },
    /* 设置左侧卡片的最大高度，使其在右侧内容展开时不会产生高度变化 */
    async ociCardStyle(index, item) {
      await this.$nextTick()
      if (item.viewAll) return
      const cardEl = document.querySelectorAll('.omr-cate-item > .oci-card')[
        index
      ]
      if (!cardEl) return
      if (cardEl.style.maxHeight) return
      // console.log('cardEl', item)
      const bound = cardEl.getBoundingClientRect()
      /* 使用了async，返回值没用，直接设置元素 */
      cardEl.style.maxHeight = bound.height.toFixed(2) + 'px'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.out-media-reship {
  padding-bottom: 0.375rem;
  .omr-btn-group {
    padding-left: 0.25rem;
    // margin: 0.375rem 0 0.375rem 0;
  }
  .category-list {
    padding-left: 0.25rem;
    padding-right: 0.2rem;
    margin: 0.375rem 0 0 0;
  }
  .os-operation {
    position: absolute;
    right: 0.25rem;
    line-height: 0;
  }
}

.omr-cate-item {
  display: flex;
  // align-items: stretch;

  .oci-card {
    position: relative;
    width: 200px;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // padding-top: .25rem;
    flex-shrink: 0;
    // padding-top: 0.2rem;
    color: #fff;
    text-align: center;
    // border-radius: var(--main-border-radius);
    border-top-left-radius: var(--main-border-radius);
    border-bottom-left-radius: var(--main-border-radius);
    &::after {
      position: absolute;
      right: 0;
      top: 10px;
      content: '';
      border-right: 20px solid #fff;
      border-top: 20px solid transparent;
      border-bottom: 0px solid transparent;
    }
    .oci-logo {
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 14px;
      // line-height: 0;
      img {
        max-height: 100%;
        object-fit: scale-down;
      }
    }
  }
  .oci-list {
    flex-grow: 1;
    flex-shrink: 1;
    padding: 20px 0 0 40px;
    border-top-right-radius: var(--main-border-radius);
    border-bottom-right-radius: var(--main-border-radius);
    overflow: auto;
    max-height: 100vh;
    @include scrollBar;
    .usage-num {
      // color: #f6b37f;
      display: inline-block;
      margin-bottom: 14px;
      color: currentColor;
    }
    .oci-list-item {
      display: flex;
      // margin-top: 0.175rem;
      color: #7d7d7d;
      .oci-icon {
        width: 20px;
        height: 14px;
        flex-shrink: 0;
        margin-right: 4px;
        text-align: center;
        img {
          vertical-align: 0px;
          max-height: 100%;
          object-fit: scale-down;
        }
      }
      .oci-name {
        width: 160px;
        flex-shrink: 0;
        em {
          color: var(--main-color);
        }
      }
      ul {
        flex-grow: 1;
        flex-shrink: 1;
        display: flex;
        flex-wrap: wrap;
        color: #313131;
        li {
          width: 98%;
          flex-shrink: 0;
          .company-item {
            display: inline-block;
            margin-right: 24px;
            margin-bottom: 10px;
          }
          // .company-item + .company-item {
          //   margin-left: 0.3rem;
          // }
        }
      }
    }
    .view-all {
      float: right;
      width: 1rem;
      color: #959595;
      // text-align: right;
      cursor: pointer;
      &:hover {
        color: var(--main-color);
      }
    }
  }
  &.omr-01 {
    color: rgba(207, 167, 105, 1);
    .oci-card {
      background-color: rgba(207, 167, 105, 1);
    }
  }
  &.omr-02 {
    color: rgba(241, 145, 73, 1);
    .oci-card {
      background-color: rgba(241, 145, 73, 1);
    }
  }
  &.omr-03 {
    color: rgba(246, 179, 127, 1);
    .oci-card {
      background-color: rgba(246, 179, 127, 1);
    }
  }
  &.omr-04 {
    color: rgba(250, 205, 137, 1);
    .oci-card {
      background-color: rgba(250, 205, 137, 1);
    }
  }
}
.omr-cate-item + .omr-cate-item {
  margin-top: 0.25rem;
}
</style>
