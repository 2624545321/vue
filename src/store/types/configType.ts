import { Ref } from 'vue'
export type ConfigStoreType = {
  menuFold: Ref<boolean>
  setMenuFold: (val: boolean) => void
}
