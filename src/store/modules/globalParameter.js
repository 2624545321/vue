const sessionStorage = window.sessionStorage

export default {
  namespaced: true,
  state: {
    /* 渠道传播 进入榜单页面时，点击的哪个渠道 */
    channelSpread_channel: JSON.parse(
      sessionStorage.getItem('channelSpread_channel') || '{}',
    ),
    /* 榜单页面点击渠道进入详情携带的参数 */
    mediaProdDetailParameter: JSON.parse(
      sessionStorage.getItem('mediaProdDetailParameter') || '{}',
    ),
  },
  mutations: {
    SET_channelSpread_channel(state, v) {
      state.channelSpread_channel = v
      sessionStorage.setItem('channelSpread_channel', JSON.stringify(v))
    },
    SET_mediaProdParameter(state, v) {
      state.mediaProdParameter = v
      sessionStorage.setItem('mediaProdDetailParameter', JSON.stringify(v))
    },
  },
}
