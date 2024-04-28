<template>
  <div>
    <button
      v-popover="customColumnPopover"
      class="mode-btn__common pointer fs-14"
    >
      列
    </button>
    <!-- 自定义列 -->
    <el-popover
      ref="customColumnPopover"
      popper-class="custom-popover"
      placement="left"
      title="自定义列"
      width="auto"
      trigger="click"
      @show="handleShow"
      @hide="handleHide"
    >
      <div class="custom-popover__content">
        <el-checkbox-group v-model="check_list" class="custom-column__checkbox">
          <el-checkbox
            v-for="(box, i) of data"
            :key="i"
            :label="box.label"
            :checked="box.checked"
          ></el-checkbox>
        </el-checkbox-group>

        <div class="custom-popover__btn">
          <custom-button-vue
            @click.native="handleCancel"
            :btn-data="btnList[0]"
          ></custom-button-vue>
          <custom-button-vue
            @click.native="handleConfirm"
            :btn-data="btnList[1]"
          ></custom-button-vue>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'BtnCustomColumns',
  mode: {
    prop: 'checkList',
    event: 'change',
  },
  props: {
    // 选中的数据
    checkList: {
      type: Array,
      default: () => [],
    },
    // 自定义列数据
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      customColumnPopover: 'customColumnPopover',
      check_list: [],
      btnList: [{ label: '取消', value: 0 }, { label: '确定', value: 1 }],
      clickTarget: '', // 点击的哪个按钮，不是确定按钮的话需要让checkbox的状态恢复
      currentCheckList: [], // 每次打开 popover 时，保存 check_list 的状态
    }
  },
  methods: {
    handleShow() {
      this.currentCheckList = [...this.check_list]
    },
    handleHide() {
      if (this.clickTarget === 'confirm') return (this.clickTarget = '')
      this.check_list = this.currentCheckList
    },
    closePopover() {
      this.$refs['customColumnPopover'].doClose()
    },
    handleCancel() {
      this.closePopover()
    },
    handleConfirm() {
      this.clickTarget = 'confirm'
      this.$emit('confirm', [...this.check_list])
      this.closePopover()
    },
  },
}
</script>

<style lang="scss" scoped>
.mode-btn__common {
  width: 0.525rem;
  height: 0.425rem;
  border: #e4e5e9 1px solid;
  background-size: 0.3rem 0.2rem;
  border-radius: var(--main-border-radius);
  background-color: #fff;
}
.custom-popover__content {
  padding-left: 12px;
}
.custom-popover__btn {
  margin-top: 0.3rem;
  ::v-deep {
    .tas-custom-btn {
      padding: 0.075rem 0.15rem;
    }
  }
}
.custom-column__checkbox {
  margin-top: 0.3rem;
  ::v-deep {
    .el-checkbox {
      display: block;
      margin-top: 0.2rem;
    }
  }
}
</style>
