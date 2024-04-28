<template>
  <div class="spread-title fs-18">
    <div v-if="!hideVerticalLine" class="st-line"></div>
    <span class="st-text">{{ title }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SpreadTitle',
  props: {
    title: {
      type: String,
      default: '',
    },
    hideVerticalLine: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style lang="scss" scoped>
.spread-title {
  position: relative;
  display: flex;
  height: 56px;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid #f9eeed;
  // background: linear-gradient(rgba(206, 62, 49, 0.05), rgba(255, 255, 255, 0));
  .st-line {
    width: 4px;
    height: 16px;
    // color: #CA2C25;
    background-color: var(--main-color);
  }
  .st-text {
    margin-left: 14px;
    color: #000;
    font-weight: 700;
  }
}
</style>
