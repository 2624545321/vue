import { ref } from 'vue'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { constantRouer } from '@/router/route'
import type { MenuState } from '../types/menu'

const storeId = 'menu'
const useCustomMenuStore = defineStore(storeId, (): MenuState => {
  const menuRouterList = ref<RouteRecordRaw[]>(constantRouer)

  return { menuRouterList }
})

export default useCustomMenuStore
