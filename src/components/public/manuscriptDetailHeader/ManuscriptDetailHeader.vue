<template>
  <div class="manuscript-detail__header">
    <span class="fs-22 mdh-text">
      <slot>稿件传播详情</slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ManuscriptDetailHeader',
}
</script>

<style lang="scss" scoped>
.manuscript-detail__header {
  background: url('~@/assets/imgs/detail/mediaProdDetail/header.png') no-repeat
    center/100% 100%;
  height: 60px;

  .mdh-text {
    margin-left: 16px;
    color: #fff;
    line-height: 60px;
  }
}
</style>
