<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  $textColor:#606266;
  .cursorPointer{
    cursor: pointer;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .mt10{
    margin-top: 10px;
  }
  .mt20{
    margin-top: 20px;
  }
  .mb10{
    margin-bottom: 10px;
  }
  .mb20{
    margin-bottom: 20px;
  }
  .overflow-hidden{
    overflow: hidden;
  }
  .textCenter{
    text-align: center
  }
  .textLeft{
    text-align: left
  }
  .textColor{
    color:$textColor;
    &:hover{
      color: $textColor;
    }
  }
  .el-dialog{
    border-radius: 4px;
    // margin-top: 10vh !important;
    .el-table {
      height: 400px;
      overflow-y: auto;
      td {
        padding: 9px 0;
      }
    }
    .el-table::before {
      background-color: unset;
    }
    // height: 578px;
  }
  ul li{
    list-style: none;
    padding: 0px;
    margin: 0px;
  }
  // 检索框 start
  .search-box{
    .search-item{
      width: 25%;
      margin-bottom: 20px;

      .search-tab{
        display: inline-block;
        width: 29%;
        line-height: 40px;
        color: #606266;
        font-size: 14px;
      }
      .search-item-input {
        width: 65%
      }
    }
  }
  // 检索框 end
  .el-form-item.is-success .el-input__inner,
  .el-form-item.is-success .el-textarea__inner {
    border-color: #DCDFE6 !important;
  }
  .el-message{
    top:90px;
  }
  // .el-table thead th{
  //   text-align: center !important;
  // }
  .el-dialog__body {
    padding-top: 10px !important;
  }
  .el-loading-mask {
    z-index: 999;
  }
  .titleNowrap {
        .cell {
            max-width: 100%;
            white-space: nowrap;
            min-width: 50px;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
</style>
