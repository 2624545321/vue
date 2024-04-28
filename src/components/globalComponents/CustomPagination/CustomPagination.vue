<template>
  <div v-show="!(hideOnSinglePage && total <= pageSize)" class="page">
    <div>
      <span v-if="sizeType" class="f-ib total fs-14">
        共 {{ total }} 条结果
      </span>
      <span v-if="sizeType" class="f-ib fs-14">每页显示条数</span>
      <el-pagination
        v-if="sizeType"
        ref="pagination"
        class="f-ib"
        :page-sizes="[10, 20, 50]"
        layout="sizes"
        prev-text="上一页"
        next-text="下一页"
        :total="total"
        :page-size="pageSize"
        :current-page="pageNo"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
    <div>
      <!-- <button
        type="button"
        :class="{ disabled: total <= 0 || (pageNo === 1 && total > 0) }"
        class="flbtn f-ib fs-14"
        @click="jumpFirstPage"
      >
        首页
      </button> -->
      <el-pagination
        ref="pagination"
        class="f-ib"
        layout="prev, pager, next"
        :total="total"
        :pager-count="5"
        :page-size="pageSize"
        :current-page="pageNo"
        prev-text="上一页"
        next-text="下一页"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
      <!-- <button
        type="button"
        :class="{
          disabled:
            total <= 0 ||
            totalPageNum === 1 ||
            (pageNo > 1 && pageNo === totalPageNum),
        }"
        class="flbtn f-ib fs-14"
        @click="jumpLastPage"
      >
        末页
      </button> -->
    <el-pagination
      ref="jumper"
      class="f-ib jumper"
      background
      layout="jumper"
      prev-text="上一页"
      next-text="下一页"
      :total="total"
      :page-size="pageSize"
      :current-page="pageNo"
      @current-change="handleCurrentChange"
    ></el-pagination>
    </div>
    <!-- <div class="fs-14">
      共 {{ total / pageSize  }} 页
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'CustomPagination',
  props: {
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageNo: {
      type: Number,
      default: 1,
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false,
    },
    sizeType: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    totalPageNum() {
      return Math.ceil(this.total / this.pageSize)
    },
  },
  methods: {
    /**
     * 首页
     */
    jumpFirstPage() {
      if (this.total <= 0 || (this.pageNo === 1 && this.total > 0)) return
      this.$refs.pagination.handleCurrentChange(1)
      this.$refs.jumper.handleCurrentChange(1)
      this.$emit('handleCurrentChange', 1)
    },
    /**
     * 尾页
     */
    jumpLastPage() {
      if (
        this.total <= 0 ||
        this.totalPageNum === 1 ||
        (this.pageNo > 1 && this.pageNo === this.totalPageNum)
      )
        return
      this.$refs.pagination.handleCurrentChange(this.totalPageNum)
      this.$refs.jumper.handleCurrentChange(this.totalPageNum)
      this.$emit('handleCurrentChange', this.totalPageNum)
    },
    /**
     * page size变化
     * @param {number} size page size
     */
    handleSizeChange(size) {
      this.$emit('handleSizeChange', size)
    },
    /**
     * 翻页
     * @param {number} currentPage 当前页
     */
    handleCurrentChange(currentPage) {
      this.$emit('handleCurrentChange', currentPage)
    },
  },
}
</script>

<style scoped lang="scss">
.page > div,
.page {
  display: flex;
  align-items: center;
  line-height: 0;
}
.page {
  justify-content: space-between;
  padding: 0 20px;
  color: #7d7d7d;
  text-align: center;
  white-space: nowrap;
}
.f-ib {
  display: inline-block;
}
.total {
  margin-right: 0.125rem;
}
.flbtn {
  cursor: pointer;
}
.flbtn:focus {
  outline: unset;
}
.flbtn.disabled {
  color: #999;
  cursor: not-allowed;
}
.jumper {
  ::v-deep .el-pagination__jump {
    color: #333;
  }
}
.el-pagination.is-background ::v-deep.btn-prev,
.el-pagination.is-background ::v-deep.btn-next {
  padding: 0 6px;
}
</style>
