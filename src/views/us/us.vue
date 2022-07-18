<template>
  <div class="contact-us">
    <div id="us">
      <el-row class="us-msg">
        <el-col :span="24" style="color: black;">
          <h1>联系我们</h1>
        </el-col>
      </el-row>
      <el-row class="contact-box">
        <p><span class="glyphicon glyphicon-map-marker"></span>地址：湖南省长沙市</p>
        <p><span class="glyphicon glyphicon-phone"></span>QQ群: 649716396 </p>
        <p><span class="glyphicon glyphicon-envelope"></span>邮箱: 21142500@qq.com</p>

      </el-row>

      <el-row class="feedback-box">
        <el-col :span="span">
          <h4>如果您有什么想跟我们说的，留下您的反馈意见吧！^_^</h4>
          <div class="feedback-content">
            <Feedback/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  const {body} = document;
  const WIDTH = 1060; // refer to Bootstrap's responsive design

  import OFooter from '../common/footer'
  import Feedback from '@/components/Feedback'

  export default {
    data() {
      return {
        isPhone:false,
        span:12
      }
    },
    components: {
      OFooter,
      Feedback
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


      isMobile(){
        const rect = body.getBoundingClientRect();
        var isMobile= rect.width - 1 < WIDTH;
        this.isPhone=isMobile;

        if(isMobile) this.span=24;
        else this.span=12;

        return isMobile;
      },
      resizeHandler() {
        if (document.hidden) {
          return;
        }

        const isMobile = this.isMobile()


      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>

  .contact-us{
    margin: 0 auto;
    text-align: center;
    height: 70vh;
  }

  #us {
    margin: 0 auto;
    padding: 0;
    width: 1280px;
    margin-bottom: 20px;
    margin-top: 2rem;
    margin-left: 5rem;
    display: inline-block;
    text-align: left;
  }

  .us-msg {
    margin-left: 5rem;
  }

  .contact-box {
    margin-top: 1rem;
    margin-left: 5rem;
  }

  .feedback-box {
    margin-top: 2rem;
  }

  .feedback-box h4 {
    margin-bottom: 1rem;
    padding-left: 80px;
  }

  @media(max-width: 1160px) {

    #us {
      margin-left: 0.5rem;
      width: 100%;
    }

    .us-msg {
      margin-left: 1rem;
    }

    .contact-box{
      margin-left: 1rem;
    }

    .feedback-box{

    }

    .feedback-box h4 {
      margin-bottom: 1rem;
      padding-left: 0rem;
    }

    .feedback-content{
      width: 90%;
    }

  }

</style>
