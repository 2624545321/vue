<template>
  <div class="ml-abstract relative">
    <div class="abstract-wrap">
      <ul>
        <li v-for="(item, i) of renderData" :key="i" class="abstract-item">
          <div class="ml-serial" :class="'ml-serial-0' + (i + 1)">
            {{ i + 1 }}
          </div>
          <div v-if="revealImage" ref="figure" class="figure">
            <image-preview-vue :src="item.pictures" @error="handleImageError(i)"></image-preview-vue>
          </div>

          <div class="abstract-item__desc">
            <p class="aid-title fs-16">
              {{ item.title | strEscapeTags | strRemoveHtmlEntity }}

              <span class="aib-pub-time fs-14">
                {{ item.pubTime | timeFormat(true, 'YYYY年MM月DD日 hh:mm:ss') }}
              </span>
            </p>
            <!-- <el-tooltip popper-class="tooltip-abstract" :content="item.content | strRemoveHtmlTag"> -->
            <p class="fs-14 f-oh3" desc>
              {{ item.content | strRemoveHtmlTag }}
            </p>
            <!-- </el-tooltip> -->
            <p class="abstract-item__info fs-14 text-right">
              <span v-for="(it, i) of infoList" :key="i" class="text-left">
                {{ it.zh }}：{{ item[it.k] || '-' }}
              </span>
            </p>
          </div>

          <!--    <div class="abstract-item__info fs-14">
            <p style="visibility: hidden" class="aid-title fs-16">
              占位
            </p>
            <p>
              {{ item.pubTime | timeFormat(true, 'YYYY年MM月DD日 hh:mm:ss') }}
            </p>
            <p v-if="item.source">来源：{{ item.source }}</p>
          </div> -->
        </li>
      </ul>
    </div>

    <!-- <custom-pagination-vue
      class="custom-pagination"
      :page-no="page.pageIndex"
      :page-size="page.pageSize"
      :total="page.total"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></custom-pagination-vue> -->
  </div>
</template>

<script>
import ImagePreviewVue from '@/components/public/imagePreview/Index.vue'
import { abstractListFieldMap } from './data'
import { cloneDeep } from '@/plugins/utils'
// import { timeFormat } from '@/utils/timeFormat'
export default {
  name: 'ManuscriptListAbstract',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    revealImage: {
      type: Boolean,
      default: true,
    },
    // pagination: {
    //   type: Object,
    //   default: () => {},
    // },
  },
  components: { ImagePreviewVue },
  computed: {
    channel() {
      return this.$route.query.channel
    },
    infoList() {
      return abstractListFieldMap[this.channel] || []
    },
    renderData() {
      if (!Array.isArray(this.data) || !this.data.length) return []
      const arr = cloneDeep(this.data)
      /* 排序，最新日期在前面。相同日期位置不变 */
      const a = arr.sort((a, b) => {
        if (this.$moment(a.pubTime).isAfter(b.pubTime)) {
          return -1
        } else if (this.$moment(a.pubTime).isSame(b.pubTime)) {
          return -1
        } else {
          return 1
        }
      })
      return a
    },
  },
  // data() {
  //   return {
  //     page: {
  //       pageIndex: 1,
  //       pageSize: 10,
  //       total: 0,
  //     },
  //   }
  // },
  // watch: {
  //   pagination: {
  //     handler(v) {
  //       // console.log('pagination', v)
  //       if (typeof v !== 'object' && v != null) {
  //         return
  //       }
  //       this.page.pageIndex = v.pageNo
  //       this.page.pageSize = v.pageSize
  //       this.page.total = v.total
  //     },
  //     deep: true,
  //   },
  // },
  methods: {
    // handleCurrentChange(page) {
    //   this.$emit('manuscriptAbstract_currentChange', page)
    // },
    // handleSizeChange(size) {
    //   this.$emit('manuscriptAbstract_sizeChange', size)
    // },
    handleImageError(i) {
      // console.log('i', i, this.$refs['figure'])
      this.$refs['figure'][i].remove()
    }
  },
}
</script>

<style lang="scss" scoped>
.ml-abstract {
  padding-bottom: 0.5rem;
}
.abstract-wrap {
  padding: 0.125rem 0.25rem 0.25rem 0;
}

.abstract-item {
  display: flex;
  padding: 0.25rem 0;
  border-bottom: 1px dashed #e5e5e5;

  .ml-serial {
    flex-shrink: 0;
  }

  .figure {
    flex-shrink: 0;
    width: 2.125rem;
    height: 1.375rem;
    margin-left: 0.3rem;
    border-radius: var(--main-border-radius);
    overflow: hidden;
  }

  .abstract-item__desc {
    flex-shrink: 1;
    flex-grow: 1;
    margin-left: 0.3rem;
    color: #707070;

    p[desc] {
      line-height: 0.3rem;
    }
  }
  .aid-title {
    color: #1b1b1b;
    font-weight: 700;
    margin-bottom: 0.2rem;
    line-height: 0.25rem;

    .aib-pub-time {
      float: right;
      // color: #9e783f;
      color: #707070;
      font-weight: 400;
    }
  }

  .abstract-item__info {
    // margin-left: 8%;
    // float: right;
    margin-left: 10px;
    color: #9e783f;
    white-space: nowrap;
    line-height: 0.3rem;
    span {
      display: inline-block;
      // width: 100px;
      margin-top: 10px;
      margin-left: 60px;
    }
  }
}
.abstract-item:nth-of-type(n + 4) .ml-serial {
  color: #7e6b5a;
  background-color: rgba(0, 0, 0, 0);
}
</style>
