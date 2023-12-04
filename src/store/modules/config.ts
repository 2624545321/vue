// 全局配置项
import { defineStore } from 'pinia'
import type { ConfigStoreType } from '../types/configType'
import { ref } from 'vue'

const storeId = 'config'
const useConfigStore = defineStore(storeId, (): ConfigStoreType => {
  // 菜单是否折叠
  let menuFold = ref<boolean>(false)
  const setMenuFold = (val: boolean): void => {
    menuFold.value = val
  }
  // 是否刷新 <main> 中的数据
  const refresh = ref<boolean>(false)
  return { menuFold, setMenuFold, refresh }
})

export default useConfigStore
