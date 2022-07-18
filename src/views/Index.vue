<template>
  <div>
    <fixed-header>
      <div class="header-area">
        <div class="clever-main-menu">
          <div class="classy-nav-container breakpoint-off">
            <nav class="classy-navbar justify-content-between" id="cleverNav">

              <!-- 移动端按钮 -->
              <div class="nav-bar" :class="{'selected':isShow}" @click="navSelected()">
                <i class="icon-cross"></i>
                <i class="icon-cross"></i>
                <i class="icon-cross"></i>
              </div>


              <a class="nav-brand hidden-sm-only web-logo" href="/"><img :src="logo"/></a>

              <div class="hidden-sm-only search-area">

                <el-input type="search" prefix-icon="el-icon-search" v-model="query" name="search"   placeholder="搜索" @keyup.enter="search()"/>

              </div>

              <div class="classy-menu" :class="{'show' : isShow}">
                <div class="classsy-bg" @click="closeMenu"></div>
                <div class="classynav">

                  <a class="nav-brand hidden-sm-only web-menu-logo" href="/"><img :src="logo"/></a>

                  <el-menu :default-active="activeIndex"
                           :mode="navMode"
                           text-color="rgba(0, 0, 0, 0.45)"
                           active-text-color="#232323"
                           :unique-opened=true class="el-menu"
                           @select="handleSelect">
                    <el-menu-item index="/index" @click="open('/home')">首页</el-menu-item>

                    <el-submenu index="/practice">
                      <template slot="title">练习</template>
                      <el-menu-item index="/exams" @click="open('/exams')">试卷</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/courses" @click="open('/courses')">课程</el-menu-item>

                    <el-submenu index="/other">
                      <template slot="title">记录</template>
                      <el-menu-item index="exam-record" @click="open('/exam-record')">考试记录</el-menu-item>
                      <el-menu-item index="incorrect" @click="todo">错题本</el-menu-item>
                    </el-submenu>
                    <el-submenu index="/u">
                      <template slot="title">关于我们</template>
                      <el-menu-item index="exam-record" @click="open('/contactUs')">联系我们</el-menu-item>
                      <el-menu-item index="exam-record" @click="showFeedback">意见反馈</el-menu-item>

                    </el-submenu>
                    <el-submenu v-if="login" index="/user-info">
                      <template slot="title">
                        <img :src="userInfo.avatar"
                             style="width:36px;height: 36px;border-radius: 50%;margin-right: 6px;"/>
                        {{userInfo.nickName}}
                      </template>
                      <el-menu-item index="account" @click="open('/account')">个人中心</el-menu-item>
                      <el-menu-item index="password" @click="open('/password')">修改密码</el-menu-item>
                      <el-menu-item index="logOut" @click="logOut">退出</el-menu-item>
                    </el-submenu>
                  </el-menu>

                  <div class="register-login-area" v-if="!login">
                    <a class="btn" target="_blank" @click="open('/register')">注册</a>
                    <a class="btn" target="_blank" @click="open('/login')" v-if="!isWeixin">登录</a>
                    <a class="btn" target="_blank" @click="open('/wxLogin')" v-if="isWeixin">登录</a>
                  </div>

                </div>
              </div>

              <div style="clear: both"></div>

            </nav>
          </div>
        </div>
      </div>
    </fixed-header>
    <o-main ref="mainRef"></o-main>
    <o-footer></o-footer>

    <el-dialog title="问题反馈" :visible.sync="isShowFeedback" width="80%" center>
      <Feedback @submited="feedbackHandler"/>
    </el-dialog>

  </div>
</template>

<script>
  import store from "../store";
  import {isWeixin} from "@/utils/utils";
  import OFooter from './common/footer'

  const {body} = document;
  const WIDTH = 1060; // refer to Bootstrap's responsive design

  import OMain from './common/main'
  import {mapGetters, mapState} from 'vuex'
  import {isNotEmpty, messageWarn} from '@/utils/util'
  import FixedHeader from 'vue-fixed-header'
  import Feedback from '@/components/Feedback'

  export default {
    components: {
      FixedHeader,
      OMain,
      Feedback,
      OFooter,
    },
    computed: {
      // 获取用户信息
      ...mapState({
        userInfo: state => state.user.userInfo,
        sysConfig: state => state.sysConfig.sysConfig,
      }),
      ...mapGetters(["isLogin", 'access_token']),
      canQuery:function () {
        if(this.userInfo==null || this.userInfo.userId<1 || this.userInfo.canQuery!='0') return false;

        return true;
      },
      login: {
        get() {
          if (this.userInfo != null && this.userInfo.userId !== undefined && this.userInfo.userId > 0) {
            return true;
          } else {


            if (isWeixin()) {
              this.wxLogin();
            }

            return false;

          }
        },
        set(val){

        }
      }
    },
    created() {
      this.isWeixin = isWeixin();

      this.checkLogin();
      this.getWebConfig();
      //this.checkSysConfig();

    },
    // 检测路由变化
    watch: {
      $route() {
        this.checkLogin()
      }
    },
    data() {
      return {
        isWeixin: false,
        activeIndex: '/index',
        input: '',
        query: '',
        webName: '',
        logo: '',
        navMode: 'horizontal',
        isSelected: false,
        isShow: false,
        isShowFeedback: false
      }
    },

    mounted() {
      this.resizeHandler()
    },
    beforeMount() {
      window.addEventListener('resize', this.resizeHandler)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeHandler)
    },
    methods: {

      closeMenu(){
        this.isShow=false;
      },

      isMobile() {
        const rect = body.getBoundingClientRect();
        var isMobile = rect.width - 1 < WIDTH;

        return isMobile;
      },
      resizeHandler() {
        if (document.hidden) {
          return;
        }

        const isMobile = this.isMobile()

        if (isMobile) {
          this.navMode = 'vertical';
        } else {
          this.navMode = 'horizontal';
        }

      },

      // 提交考试
      handleSubmitExam() {
        this.$refs.mainRef.handleSubmitExam()
      },

      navSelected: function () {

        // 取反
        this.isSelected = !this.isSelected;

        // 修改列表的显示与隐藏
        if (this.isSelected === true) {
          this.isShow = this.isShow === false;

        } else {
          this.isShow = this.isShow === false;
        }

      },

      // 导航栏切换
      open(path) {

        this.isShow = false;

        if (path.startsWith('http')) {
          window.open(path)
          return
        }
        if (path !== this.$route.fullPath) {
          if (this.$route.fullPath === '/start') {
            this.$confirm('是否要结束当前考试?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // TODO 提交当前考试
              this.$emit('handleSubmitExam')
              this.$router.push({
                path: path,
                query: {}
              })
            }).catch(() => {
            })
          } else {
            this.$router.push({
              path: path,
              query: {}
            })
          }
        }
      },
      // 选择事件
      handleSelect(item) {
        console.log(item);
        this.isShow = false;
      },
      // 注册
      handleRegister() {
        // 先退出
        // this.logOut()
        this.$router.push('/register')
      },
      // 登录
      handleLogin() {
        this.$router.push('/login')
      },
      // 登出
      logOut() {
        this.$store.dispatch('LogOut').then(() => {
          if (isWeixin()) {
            this.$router.push('/wxLogin')
          } else {
            this.$router.push('/home')
          }
        }).catch(() => {
          this.$router.push('/home')
        })
      },
      // 检测登录
      checkLogin() {
        if (this.userInfo != null && this.userInfo.userId !== undefined && this.userInfo.userId > 0) {
          this.login = true
        } else {
          this.login = false;

          if (isWeixin()) {
           this.wxLogin();
          }

        }
      },
      wordQuery() {
        console.log(this.query);
        if (isNotEmpty(this.query)) {
          this.$router.push({name: 'query', query: {query: this.query}})
        }
      },
      search () {
        if (isNotEmpty(this.query)) {
          this.$router.push({name: 'exams', query: {query: this.query}})
        }
      },
      todo() {
        messageWarn(this, '功能正在开发中！')
      },
      getConfig(key, callback) {
        this.getConfigKey(key).then(response => {
          callback(response.msg);
        });
      },
      getWebConfig() {
        this.getConfig('web.name', (val) => {
          this.webName = val;
        });
        this.getConfig('web.logo', (val) => {
          this.logo = val;
        });
      },

      wxLogin(){
        var url='/wxLogin?redirect='+this.$route.fullPath;
        this.$router.push(url);
      },
      showFeedback() {
        this.isShowFeedback = true;
      },
      feedbackHandler() {
        this.isShowFeedback = false;
      },

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/css/style.scss";

  .nav-bar {
    display: none
  }

  .web-menu-logo {
    display: none !important;
  }

  .icon-cross {
    width: 100%;
    height: 2px;
    border-radius: 5px;
    background: #222;
    position: absolute;
    left: 0;
    opacity: 1;
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    transition: .5s ease;
    -moz-transition: .5s ease;
    -webkit-transition: .5s ease;
    -o-transition: .5s ease;
  }

  .nav-bar {
    float: left;
    width: 20px;
    margin-top: 10px;
    cursor: pointer;
    z-index: 666;
    position: absolute;
    top: 1rem
  }

  .nav-bar i:nth-child(1) {
    top: 0
  }

  .nav-bar i:nth-child(2) {
    top: 7px
  }

  .nav-bar i:nth-child(3) {
    top: 14px
  }

  .nav-bar.selected i:nth-child(1) {
    top: 10px;
    -webkit-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
    transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -o-transform: rotate(135deg);
  }

  .nav-bar.selected i:nth-child(2) {
    opacity: 0;
    left: -30px;
  }

  .nav-bar.selected i:nth-child(3) {
    top: 10px;
    -webkit-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
  }


  .web-logo {
  }

  .web-logo img {
    height: 50px;
  }

  @media(max-width: 1380px) {
  }

  @media(max-width: 1280px) {
    .search-area {
      min-width: 260px !important;
    }
  }

  @media(max-width: 1160px) {

    .web-logo {
      display: none !important;
    }

    .web-menu-logo {
      display: block !important;
      margin: 1rem;
    }


    .search-area {
      position: relative !important;
      width: calc(100% - 200px) !important;
      min-width: 70% !important;
      height: 40px;
      position: absolute !important;
      right: 20px !important;
      top: 14px !important;
    }


    .classy-menu {
      position: absolute;
      left: 0;
      top: 0;

      visibility: hidden;
      opacity: 0;
      z-index: 999;
    }

    .classsy-bg{
      width: 100%;
      height: 100vh;
      position: absolute;
      z-index: 0;
      opacity: 0.5;
      background-color: #000000;
    }

    .classy-menu.show {
      width: 100%;
      /*max-width: 360px;*/
      visibility: visible;
      opacity: 1;
      -moz-transform: scale(1, 1);
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
      /*background: transparent;*/
      height: 100vh;
    }

    .classynav {
      display: block !important;
      width: 80%;
      max-width: 360px;
      height: 100vh;
      border: 1px solid #efefef;
      background: white;
      z-index: 9999;
      position: absolute;
    }

    .nav-bar {
      display: block
    }

    .header-area {
      padding: 0;
    }

    .web-logo {
      margin-left: 50px;
    }


  }

  @media(max-width: 983px) {

  }

  @media(max-width: 900px) {

  }

  @media(max-width: 768px) {
  }

  @media(max-width: 760px) {
  }

  @media(max-width: 620px) {
  }

  @media(max-width: 500px) {

  }

  @media(max-width: 330px) {

  }


</style>
