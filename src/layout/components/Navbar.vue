<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <!-- <div class="right-menu">
      <span @click="logout">
        <svg-icon icon-class="icon-logout" />
      </span>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import store from '../../store'
// import store from '@/store'
import { removeToken, getToken } from '@/utils/auth'
import { resetRouter } from '@/router'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'authorization'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      // removeToken()
      let that = this
      let authorization = this.$store.getters.authorization || getToken()
      var params = {
        authorization : authorization
      }
      this.$http({
        method: 'post',
        url: '/knowledge/checkout',
        data: params,
      }).then(function (res) {
        // éćŻtoken
        removeToken()
        resetRouter()

        that.$router.push(`/login?redirect=${that.$route.fullPath}`)
      }).catch(function (err) {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 20px;
    cursor: pointer;

    &:focus {
      outline: none;
    }
    svg{
      font-size: 22px;
    }
  }
}
</style>
