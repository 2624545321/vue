<template>
  <div class="app-container" >
    <!-- 嵌入传播榜单 -->
    <iframe  id="iframe" style="width:100%; height:100%;" class="iframe" :src="src" frameborder="0"></iframe>
  </div>
</template>
<script>
import md5 from "js-md5";
export default {
  components: {},
  data() {
    return {
      src: '/ranking/#/',
    };
  },
  async created() {
    /**
     * 1.调用传播力榜单系统登录接口：考虑在当前页调用还是在点击到本页按钮后调用
     * 2.iframe标签引入页面及页面调整
     */
    await this.login();//调用登录
    this.src = '/ranking/'
    // this.cblHide();//修改iframe样式
  },
 
    
 
  methods: {
    // 隐藏样式
    cblHide() {

      var intervalTime = window.setInterval(() => {
        var iframe = window.document.getElementById("iframe");
        let dome1 = iframe.contentWindow.document.getElementsByClassName(
          "header"
        )[0];
        let dome2 = iframe.contentWindow.document.getElementsByClassName(
          "list"
        )[0];
        let dome3 = iframe.contentWindow.document.getElementsByClassName(
          "home"
        )[0];
        if (dome2 != null && dome3 != null) {
          dome1.style.display = "none";
          dome2.style.display = "none";
          dome3.style.width = "100%";
          dome3.style.top = "0";
          clearInterval(intervalTime);
        }
      }, 100);
    
      iframe.onload = function() {
        var iframe = window.document.getElementById("iframe");
        let dome1 = iframe.contentWindow.document.getElementsByClassName(
          "header"
        )[0];
        let dome2 = iframe.contentWindow.document.getElementsByClassName(
          "list"
        )[0];
        let dome3 = iframe.contentWindow.document.getElementsByClassName(
          "home"
        )[0];
        dome1.style.display = "none";
        dome2.style.display = "none";
        dome3.style.width = "100%";
        dome3.style.top = "0";
      };
    },

    // 登录
     login() {
      var timestamp = new Date().getTime();
      let passWd = md5(md5("fTEJ1hYW") + timestamp);
      var postparams = {
        url: "/datas/api/ssoweblogin",
        method: "get",
        params: {
          username: "guotou",
          password: passWd,
          timestamp: timestamp
        }
      };
      this.$http(postparams)
        .then(function(res) {
          console.log(res, "成功了");
          
          
        })
        .catch(function(err) {
          console.log(err, "失败了");
        });

    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>