<template>
  <div class="footer">
    <div class="container">

      <div class="site-info">
        <div class="footer-nav">
          <div class="left-item1 item-common" v-for="(item, index, key) in footerList" :key="index">
            <div class="ic-box">
              <span>{{item.name}}</span>
              <a :href="child.url" :target="child.target" v-for="(child,  key) in item.childer" :key="child.index">{{child.name}}</a>
            </div>
          </div>
        </div>


        <div class="footer-icon">
          <div class="we-chat">
            <img src="../../../static/img/core-img/qq.png"/>
          </div>
          <div class="we-chat-new">
            <img src="../../../static/img/core-img/qq_new.png"/>
          </div>
        </div>
        <div style="clear:both;"></div>

      </div>

      <div class="line"></div>

      <div class="copyright">
        <h4 class="content-c2" style="text-align: center;">Copyright ©2022</h4>
        <ul class="privacy">
          <li class="content-c1"><a class="content-c0" @click="openLayer">法律声明</a></li>
          <li class="content-c1"><a class="content-c0" @click="openPrivacy">隐私条款</a></li>
        </ul>
      </div>



      <div class="company">
        <a class="content-c3" :href="webAddress" target="_blank">
          <span class="content-c3">技术支持：{{companyName}}</span>
        </a>

        <a class="content-c3" href="https://beian.miit.gov.cn" target="_blank">
          <span class="content-c3">© IPC备案号：{{icpNumber}}</span>
        </a>
      </div>




    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        icpNumber: '',
        companyName: '',
        webAddress: '',
        footerList: [
          {
            id: '001',
            name: '练习',
            url: '',
            target: '',
            childer:
              [
                {
                  id: '01',
                  name: '试卷',
                  target: '',
                  url: '/exams'
                },
              ]

          },
          {
            id: '002',
            name: '记录',
            target: '',
            url: '',
            childer:
              [
                {
                  id: '01',
                  name: '错题本',
                  url: '/exam-record',
                  target: '_self'
                },
                {
                  id: '02',
                  name: '考试记录',
                  url: '/exam-record',
                  target: '_self'
                },

              ]

          },
          {
            id: '003',
            name: '资讯中心',
            target: '',
            url: '',
            childer: [],

          },

          {
            id: '005',
            name: '关于我们',
            target: '',
            url: '',
            childer: [
              {
                id: '01',
                name: '联系我们',
                url: '/contactUs',
                target: '_self'
              },
              {
                id: '02',
                name: '意见反馈',
                url: '/feedback',
                target: '_self'
              },
            ]
          }
        ],
      }
    },
    methods: {
      openLayer() {
        this.$notify.info({
          title: '法律声明',
          message: '本网站仅为推广、学习手语，网站资料、素材均来源于网络收集，如有侵权请联系删除。',
          offset: 70
        })
      },
      openPrivacy() {
        this.$notify.info({
          title: '隐私条款',
          message: '本网站将会严格遵守有关法律法规和本隐私政策所载明的内容收集、使用您的信息',
          offset: 70
        })
      },
      getConfig(key, callback) {
        this.getConfigKey(key).then(response => {
          callback(response.msg);
        });
      },
      getWebConfig() {
        this.getConfig('web.icp.number', (val) => {
          this.icpNumber = val;
        });

        this.getConfig('sys.company.name', (val) => {
          this.companyName = val;
        });

        this.getConfig('sys.company.name', (val) => {
          this.webAddress = val;
        });

      },
      todo() {
        messageWarn(this, '功能正在开发中！')
      },
    },
    mounted() {
      this.getWebConfig();
    },
    components: {}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .footer {
    background-position: 50%;
    background-color: #252525;
    width: 100%;
    box-sizing: border-box;
  }

  .footer .container {
    width: 100%;
    margin: 0 auto;
    padding: 0;
    text-align: center;
    padding-bottom: 1rem;
  }

  .footer .container .site-info {
    margin: 0 auto;
    padding: 0;
    width: auto;
    display: inline-block;
    margin-top:2rem;
  }

  .footer-nav {
    float: left;
    width: 750px;
  }

  .footer-icon{
    float: left;
  }

  .we-chat {
    float: left;
  }

  .we-chat-new {
    float: right;
    margin-left: 1rem;
  }


  .item-common {
    float: left;
    width: 20%;
    text-align: left;
    transition: all linear .3s;
    -moz-transition: all linear .3s;
    -webkit-transition: all linear .3s;
    -o-transition: all linear .3s;
  }

  .item-common span {
    display: block;
    width: 70%;
    font-size: 1.2em;
    color: white;
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid #4f545c;
  }

  .item-common a {
    font-size: 1.1em;
    display: block;
    margin-bottom: 10px;
    color: #d0d0d0;
    word-break: break-all;
    width: 80%;
    transition: .2s all linear;
    -moz-transition: .2s all linear;
    -webkit-transition: .2s all linear;
    -o-transition: .2s all linear;
    padding-left: 15px;
  }

  .item-common a:hover {
    color: white;
  }

  .item-common a:before {
    content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    background: #0080cb;
    position: relative;
    top: -1px;
    margin-right: -6px;
    left: -15px;
    vertical-align: middle;
    border-radius: 0.3125rem;
  }


  .copyright {
    color: #434d55;
    font-size: 0.9rem;
    padding: 20px 0 0;
    display: inline-block;
    margin-bottom: 0.2rem;
  }

  .privacy {
    float: left;
    margin: 0 0 0 12px;
  }

  .content-c0 {
    color: #5079d9;
    cursor: pointer;
    text-decoration: none;
    font-size: 0.9rem;
    &:hover {
      color: #3A5FCD;
    }
  }

  .content-c1 {
    float: left;
    padding: 1px 10px 0;
    border-left: 1px solid #ccc;
    list-style: none;
    font-size: 0.9rem;
  }

  .content-c2 {
    float: left;
    color: #ffffffa6;
    font-size: 0.9rem;
    padding-top: 2px;
  }


  .footer .company {
    text-align: center;
  }

  .content-c3 {
    margin-right: 20px;
    color: #ffffffa6;
    line-height: 1.5rem;
    font-size: 0.9rem;
  }

  @media(max-width: 1160px) {
    .footer-nav{
      display: none;
    }

    .footer-icon {
       float: none;
      margin: 0 auto;
      padding: 0;
      text-align: center;
      width: 90%;
      display: inline-block;
    }

    .we-chat {
      max-width: 45%;
      float: left;
    }

    .we-chat-new {
      max-width: 45%;
      float: right;
      margin-left: 1rem;
    }

    .company a{
      display: block;
      width: 100%;
      margin-right: 0 !important;
    }


  }

</style>
