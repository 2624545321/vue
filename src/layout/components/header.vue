<template>
  <div class="header">
    <el-header>
      <el-row>
        <el-col>
          <span>传播效果分析平台</span>
          <!-- <span class="logout-icon" @click="logout">
            <svg-icon icon-class="log-out" />
          </span>-->
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>
<script>
export default {
  methods: {
    // logout() {
    // }
  }
}
</script>
<style lang="scss" scoped>
.header {
  height: 80px;
  .el-header {
    // background: rgb(48, 65, 86);
    background: #10142b;
    height: 80px !important;
    line-height: 80px;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 999;
    width: 100%;
    span {
      color: #fff;
      font-size: 18px;
      font-weight: 700;
    }
    .logout-icon {
      display: inline-block;
      float: right;
    }
  }
}
</style>
