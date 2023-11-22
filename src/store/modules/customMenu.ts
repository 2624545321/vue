import { ref } from 'vue'
import { defineStore } from 'pinia'
import { constantRouer } from '@/router/route'
import type { MenuState } from '../types/menu'
import type { RouteList } from '@/types/config'

const storeId = 'menu'
const useCustomMenuStore = defineStore(storeId, (): MenuState => {
  const menuRouterList = ref<RouteList>(constantRouer)

  return { menuRouterList }
})

export default useCustomMenuStore
