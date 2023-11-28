<template>
  <div class="icon-menu-collapse cursor-pointer line-height-0">
    <ele-icon class="block" icon="Fold"></ele-icon>
  </div>
  <div class="breadcurmb ml-4">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>promotion management</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped lang="scss"></style>
