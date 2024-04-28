<template>
  <div class="custom-tabs">
    <div
      v-for="(tab, i) of tabs"
      :key="i"
      @click="handleTabClick(tab)"
      :class="tab.value === tabActive && 'active'"
      class="custom-tabs-item fs-16 pointer"
    >
      {{ tab.label || tab.value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomTabsVue',
  model: {
    prop: 'tabActive',
    event: 'change',
  },
  props: {
    tabs: {
      required: true,
    },
    tabActive: {
      required: true,
    },
  },
  methods: {
    handleTabClick(tab) {
      if (this.tabActive === tab.value) return
      this.$emit('change', tab.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.custom-tabs {
  display: flex;
  padding-top: 20px;
  border-bottom: 1px solid var(--main-border-color);
  .custom-tabs-item {
    margin: 0 0.05rem;
    padding: 0 0.3rem 4px;
    // background-color: red;
    border-bottom: 4px solid transparent;
    &:first-of-type {
      margin-left: 0;
    }
  }
  .custom-tabs-item.active {
    color: var(--main-color);
    border-bottom: 2px solid var(--main-color);
  }
}
</style>
