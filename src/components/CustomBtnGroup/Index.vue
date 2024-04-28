<template>
  <div class="tsa-date-group">
    <div v-for="(btn, i) of btnList" :key="i" class="tsa-date-btn-item">
      <!-- <button @click="handleClick(btn, i)">
        <template v-if="btn.icon">
          <div
            class="icon"
            :style="{ 'background-image': `url(${btn.icon})` }"
          ></div>
          <div
            class="icon-active"
            :style="{ 'background-image': `url(${btn.activeIcon})` }"
          ></div>
        </template>
        <span>{{ btn.label }}</span>
      </button> -->
      <custom-button-vue
        :btn-data="btn"
        @click.native="handleClick(btn, i)"
        :class="selectedBtnValue === btn && 'active'"
      ></custom-button-vue>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomBtnGroup',
  model: {
    prop: 'selectedBtnValue',
    event: 'selected',
  },
  props: {
    /* 选中的值 */
    selectedBtnValue: {
      type: [Object, String],
    },
    /* 按钮列表 */
    list: {
      type: Array,
    },
    /* 初始化时默认值索引，可选的，不传不设置默认值 */
    defaultActiveIndex: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      btnList: [
        { label: '最近7天', value: 'pastWeek' },
        { label: '最近30天', value: 'pastMonth' },
        { label: '上周', value: 'lastWeek' },
        { label: '上月', value: 'lastMonth' },
      ],
      activeBtnIndex: -1,
    }
  },
  mounted() {
    const list = this.list
    list && list.length && (this.btnList = list)
    // this.$emit('change', this.btnList[this.activeBtnIndex])
    this.setDefaultActivetBtn()
  },
  watch: {
    defaultActiveIndex() {
      this.setDefaultActivetBtn()
    }
  },
  methods: {
    handleClick(btn, i) {
      if (this.activeBtnIndex === i) return
      this.activeBtnIndex = i
      this.$emit('selected', this.btnList[i])
      this.$emit('change', this.btnList[i], i)
    },
    setDefaultActivetBtn() {
      const index = this.defaultActiveIndex
      if (index == undefined || typeof index !== 'number') return
      this.activeBtnIndex = index
      this.$emit('selected', this.btnList[index])
    },
  },
}
</script>

<style lang="scss" scoped>
.tsa-date-group {
  display: flex;
}
.tsa-date-btn-item {
  // button {
  //   display: flex;
  //   align-items: center;
  //   padding: 0.1rem 0.225rem;
  //   font-size: 0.2rem;
  //   white-space: nowrap;
  //   background-color: #fff;
  //   border: 1px solid #e5e6ea;
  //   border-radius: 0.05rem;
  //   cursor: pointer;

  //   .icon,
  //   .icon-active {
  //     width: 0.25rem;
  //     height: 0.25rem;
  //     margin-right: 0.05rem;
  //     background-repeat: no-repeat;
  //     background-size: contain;
  //     background-position: center;
  //   }

  //   .icon {
  //     display: block;
  //   }
  //   .icon-active {
  //     display: none;
  //   }
  // }

  // button:hover {
  //   color: #fff;
  //   border-color: currentColor;
  //   background-color: var(--main-color);
  //   .icon {
  //     display: none;
  //   }
  //   .icon-active {
  //     display: block;
  //   }
  // }
  // button:active {
  //   opacity: 0.8;
  // }
}
// .tsa-date-btn-item.active {
//   button {
//     color: #fff;
//     border-color: currentColor;
//     background-color: var(--main-color);
//     .icon {
//       display: none;
//     }
//     .icon-active {
//       display: block;
//     }
//   }
// }
.tsa-date-btn-item + .tsa-date-btn-item {
  margin-left: 0.2rem;
}

@media screen and (max-width: 1440px) {
  .tsa-date-btn-item + .tsa-date-btn-item {
    margin-left: 0.125rem;
  }
}
</style>
