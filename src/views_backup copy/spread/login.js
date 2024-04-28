var loginCode
$.ajaxSetup({
  headers: {
    'X-Access-Token': window.localStorage.getItem('token') ? window.localStorage.getItem('token') : ''
  }
})

// 判断是pc端还是移动端
// function isMobile() {
//   let type = navigator.userAgent.match(
//     /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
//     );
//   return type;
// }

// 第一次进入页面时调用
if (location.href.indexOf('code') == -1) {
  window.localStorage.setItem('token', '')
  window.localStorage.setItem('username', '')
  window.localStorage.setItem('workNo', '')
  window.localStorage.setItem('userId', '')
  window.localStorage.setItem('realname', '')
  window.localStorage.setItem('email', '')
  window.localStorage.setItem('avatar', '')
  getloginUrl()
}
if (location.href.indexOf('code') != -1) {
  loginCode = getStrParam('code')
  getloginCode()
}

function getStrParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

function getloginUrl() {
  $.ajax({
    url: '/jeecg-boot/sdic/getLoginUrl',
    type: 'get', // 请求⽅式get / post
    contentType: 'application/x-www-form-urlencoded',
    dataType: 'json',
    async: false,
    data: {
      redirectUrl: encodeURIComponent(window.location.href)
    },
    // 成功回调
    success: function(res) {
      window.location.href = res.result.redirectUrl
    },
    // 失败回调
    error: function() {
      console.log('连接失败！')
    }
  })
}

function getloginCode() {
  $.ajax({
    url: '/jeecg-boot/sdic/login',
    type: 'post', // 请求⽅式get / post
    contentType: 'application/x-www-form-urlencoded',
    dataType: 'json',
    async: false,
    data: {
      code: loginCode
    },
    // 成功回调
    success: function(res) {
      console.log('用户信息', res)
      window.localStorage.setItem('token', res.result.token)
      window.localStorage.setItem('username', res.result.userInfo.username)
      window.localStorage.setItem('workNo', res.result.userInfo.workNo)
      window.localStorage.setItem('userId', res.result.userInfo.id)
      window.localStorage.setItem('realname', res.result.userInfo.realname)
      window.localStorage.setItem('email', res.result.userInfo.email)
      window.localStorage.setItem('avatar', res.result.userInfo.avatar)
      // window.location.reload(); // 刷新当前页面
    },
    // 失败回调
    error: function() {
      console.log('连接失败！')
    }
  })
}
