const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  authorization: state => !!state.user.userId && !!state.user.token ? state.user.userId + '_' + state.user.token : '',
  channelSpread_channel: state => state.globalParameter.channelSpread_channel,
  mediaProdDetailParameter: state => state.globalParameter.mediaProdDetailParameter
}
export default getters
