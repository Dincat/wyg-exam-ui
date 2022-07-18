<template>
  <div class="wxLogin"
       v-loading="loading"
       element-loading-text="拼命加载中……"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.5)">

  </div>
</template>

<script>
  import {getWebAuthUrl, getOpenId, wxLogin, getWxUserInfo} from "@/api/wechat/wxLogin";
  import {getToken, getTenantCode} from '@/utils/auth'
  import {mapState, mapGetters} from "vuex";

  export default {
    name: "wxLogin",
    data() {
      return {
        loading: true,
        redirect: '',
        scope: 'snsapi_base',
        wxUserInfo: {
          openId: '',
        }
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          console.log('this.redirect');
          this.redirect = route.query && route.query.redirect;
          console.log(this.redirect);
        },
        immediate: true
      }
    },
    computed: {
      // 获取用户信息
      ...mapState(
        {
          userInfo: state => state.user.userInfo,
        }),
      ...mapGetters(["isLogin"]),

    },
    created() {

      if (this.isLogin) {
        this.$router.push({path: this.redirect || '/'})
        return;
      }
      this.redirect = this.$route.query && this.$route.query.redirect;

      var code = this.getUrlKey('code');
      var state = this.getUrlKey('state');
      console.log("code:" + code);
      console.log("state:" + state);

      if (code == undefined || code == null || code == '') {
        console.log("step 1");
        this.getWebAuthUrl();
      } else if (state.indexOf('userinfo') > -1) {  //非静态登录
        console.log("step 6");
        this.getWxUserInfo(code);
      } else {
        console.log("step 2");
        this.getOpenId(code);
      }

    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      getUrlKey(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
      getWebAuthUrl() {
        getWebAuthUrl(this.scope).then(res => {

          console.log(res);
          window.location.href = res.data;

        });
      },

      getOpenId(code) {
        getOpenId(code).then(resp => {
          var token = resp.data;
          console.log(token);
          this.wxLogin(token.openId);
        })
      },

      wxLogin(openId) {
        console.log("step 3");
        // 登录，获取token
        this.$store.dispatch('loginByWxOpenId', openId).then(() => {
          console.log("step 4 and finished");
          // 重定向到首页
          this.$router.push({path: this.redirect || '/'})
        }).catch(error => {
          console.log(error);
          console.log("step 5");
          this.scope = 'snsapi_userinfo';
          this.getWebAuthUrl();
        })

      },

      temp() {
        this.scope = 'snsapi_userinfo';
        this.getWebAuthUrl();
      },

      getWxUserInfo(code) {

        // 登录，获取token
        this.$store.dispatch('loginByWxCode', code).then(() => {
          console.log("step 7 and finished");
          // 重定向到首页
          this.$router.push({path: this.redirect || '/'})
        }).catch(error => {
          console.log(error);
          console.log("step 8 and login failed");
          //this.$router.push({path: this.redirect || '/'})
        })


      }

    }
  }
</script>

<style>

  .wxLogin {
    width: 100%;
    height: 100vh
  }

  .wxLogin .el-loading-spinner {
    font-size: 3rem !important;
    color: white !important;
  }

  .wxLogin .el-loading-spinner i {
    color: white !important;
  }

  .wxLogin .el-loading-spinner p {
    font-size: 1rem !important;
    color: white !important;
  }
</style>
