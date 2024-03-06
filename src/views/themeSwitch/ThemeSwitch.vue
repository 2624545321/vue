<template>
  <div class="mt-4">
    主题切换
    <el-radio-group v-model="theme" class="ml-4">
      <el-radio-button label="light" value="light" />
      <el-radio-button label="dark" value="dark" />
      <el-radio-button label="follow os" value="os" />
    </el-radio-group>

    <ul>
      <li>
        这个宏可以用来声明一个双向绑定 prop，通过父组件的 v-model 来使用。组件
        v-model 指南中也讨论了示例用法。 在底层，这个宏声明了一个 model prop
        和一个相应的值更新事件。如果第一个参数是一个字符串字面量，它将被用作
        prop 名称；否则，prop 名称将默认为
        "modelValue"。在这两种情况下，你都可以再传递一个额外的对象，它可以包含
        prop 的选项和 model ref 的值转换选项。
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const cacheKey = 'gry_pageTheme'
type Theme = 'light' | 'dark' | 'os'
const theme = ref<Theme>(
  (window.localStorage.getItem(cacheKey) as Theme) || 'light',
)

const matchOs = window.matchMedia('(prefers-color-scheme: light)')

const followOs = () => {
  // 亮色
  if (matchOs.matches) {
    document.documentElement.dataset.theme = 'light'
  } else {
    document.documentElement.dataset.theme = 'dark'
  }
}

watchEffect(() => {
  if (theme.value === 'os') {
    followOs()
    matchOs.addEventListener('change', followOs)
  } else {
    document.documentElement.dataset.theme = theme.value
    matchOs.removeEventListener('change', followOs)
  }
  window.localStorage.setItem(cacheKey, theme.value)
})
</script>
<style scoped lang="scss">
ul {
  width: 500px;
  margin: auto;
  color: var(--text-color);
  background-color: var(--text-bg);
}
</style>
