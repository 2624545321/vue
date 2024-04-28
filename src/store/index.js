import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import globalParameter from './modules/globalParameter'
import settings from './modules/settings'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    globalParameter
  },
  state: {
    user: {}
  },
  getters,
  mutations: {
    userinfo(state, info) {
      state.user = info
    }
  }
})

export default store
