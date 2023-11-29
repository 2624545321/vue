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
  return { menuFold, setMenuFold }
})

export default useConfigStore
