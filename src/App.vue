<template>
  <div>
    <div>
      <svg-icon icon="label" custom-style="width: 20px;"></svg-icon>
      <svg-icon icon="message"></svg-icon>
    </div>
    <div>
      <custom-pagination></custom-pagination>
    </div>
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import request from '@/plugins/axios'

onMounted(() => {
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '111111'
    }
  }).then(res => {
    console.log(res)
  })
})
</script>
<style lang="scss" scoped>
div {
  color: $themeColor;
}
</style>
