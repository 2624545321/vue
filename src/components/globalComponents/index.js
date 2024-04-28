import SpreadTitleVue from '@/components/globalComponents/SpreadTitle/SpreadTitle.vue'
import CustomPaginationVue from '@/components/globalComponents/CustomPagination/CustomPagination.vue'
import CustomButtonVue from '@/components/globalComponents/CustomButton/CustomButton.vue'
import CustomNoDataVue from '@/components/globalComponents/CustomNoData/CustomNoData.vue'
import CustomManuscriptTitleVue from '@/components/globalComponents/CustomManuscriptTitle/CustomManuscriptTitle.vue'
import CustomTabsVue from '@/components/globalComponents/CustomTabs/CustomTabs.vue'
import CustomChartVue from '@/components/globalComponents/CustomChart/CustomChart.vue'

const globalComponents = {
  SpreadTitleVue,
  CustomPaginationVue,
  CustomButtonVue,
  CustomNoDataVue,
  CustomManuscriptTitleVue,
  CustomTabsVue,
  CustomChartVue,
}

export default {
  install(Vue) {
    // console.log('ins', Vue)
    Object.entries(globalComponents).forEach(([k, v]) => {
      // console.log(k, v)
      Vue.component(k, v)
    })
  },
}
