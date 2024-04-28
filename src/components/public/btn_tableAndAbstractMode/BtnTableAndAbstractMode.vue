<template>
  <div class="mode-btn">
    <button
      @click="handleClick('table')"
      class="mode-btn__common mode-btn__table pointer"
      :class="[mode === 'table' && 'show']"
    ></button>
    <button
      @click="handleClick('abstract')"
      class="mode-btn__common mode-btn__abstract pointer"
      :class="[mode === 'abstract' && 'show']"
    ></button>
  </div>
</template>

<script>

export default {
  name: 'BtnTableAndAbstractMode',
  model: {
    prop: 'mode',
    event: 'chang',
  },
  props: {
    mode: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    handleClick(value) {
      if (value === this.mode) return
      this.$emit('chang', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.mode-btn {
  // line-height: 0;
  .mode-btn__common {
    // display: inline-flex;
    width: 0.525rem;
    height: 0.425rem;
    margin-right: .2rem;
    // line-height: 0;
    // color: #777;
    border: #e4e5e9 1px solid;
    border-radius: var(--main-border-radius);
    background-color: #fff;
  }
  .mode-btn__table {
    background: url('~@/assets/imgs/detail/mediaProdDetail/table.png') no-repeat
      center/0.3rem 0.2rem;
  }
  .mode-btn__table.show {
    background: url('~@/assets/imgs/detail/mediaProdDetail/table-show.png')
      no-repeat center/0.3rem 0.2rem;
    background-color: #ff8001;
    border: none;
  }
  .mode-btn__abstract {
    background: url('~@/assets/imgs/detail/mediaProdDetail/abstract.png')
      no-repeat center/0.3rem 0.2rem;
  }
  .mode-btn__abstract.show {
    background: url('~@/assets/imgs/detail/mediaProdDetail/abstract-show.png')
      no-repeat center/0.3rem 0.2rem;
    background-color: #ff8001;
    border: none;
  }
}


</style>
