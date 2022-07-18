<template>
  <div>
    <el-row class="hero-area" type="flex" justify="center" align="middle">
      <el-col :span="24">
        <div class="hero-content">
          <h2>无忧果手语服务平台</h2>
          <h4>我们致力于手语推广</h4>
          <h4>提供手语培训、翻译、考试、练习等服务</h4>
          <router-link to="/courses" class="btn clever-btn">开始使用</router-link>
        </div>
      </el-col>
    </el-row>


    <div class="cool-facts-area padding-80-0">
      <el-row justify="center" class="facts-list">
        <el-col class="facts-item">
          <transition name="fade-transform" mode="out-in">
            <div class="single-cool-facts-area mb-80" v-show="showFacts" @click="toPage('exams')">
              <div class="icon">
                <img src="@/assets/img/core-img/paper.png" alt="">
              </div>
              <h2>
                <count-to :start-val="0" :end-val="dashboardInfo.examinationCount" :duration="2600" class="counter"/>
              </h2>
              <h5>练习试卷</h5>
            </div>
          </transition>
        </el-col>
        <el-col class="facts-item">
          <transition name="fade-transform" mode="out-in">
            <div class="single-cool-facts-area mb-80" v-show="showFacts" @click="toPage('ImageChoiceWord')">
              <div class="icon">
                <img src="@/assets/img/core-img/choice.png" alt="">
              </div>
              <h2>
                <count-to :start-val="0" :end-val="dashboardInfo.subjectCount" :duration="2600" class="counter"/>
              </h2>
              <h5>题目总数</h5>
            </div>
          </transition>
        </el-col>
        <el-col class="facts-item">
          <transition name="fade-transform" mode="out-in">
            <div class="single-cool-facts-area mb-80" v-show="showFacts" @click="toPage('ImageGuessWord')">
              <div class="icon">
                <img src="@/assets/img/core-img/guess.png" alt="">
              </div>
              <h2>
                <count-to :start-val="0" :end-val="dashboardInfo.examinationRecordCount" :duration="2600" class="counter"/>
              </h2>
              <h5>考试记录</h5>
            </div>
          </transition>
        </el-col>
        <el-col class="facts-item">
          <transition name="fade-transform" mode="out-in">
            <div class="single-cool-facts-area mb-80" v-show="showFacts" @click="toPage('courses')">
              <div class="icon">
                <img src="@/assets/img/core-img/courses.png" alt="">
              </div>
              <h2>
                <count-to :start-val="0" :end-val="dashboardInfo.courseCount" :duration="2600" class="counter"/>
              </h2>
              <h5>课程培训</h5>
            </div>
          </transition>
        </el-col>
      </el-row>
    </div>

    <div class="popular-courses-area">
      <el-row>
        <el-col :span="24">
          <div class="section-heading">
            <h3>热门课程</h3>
          </div>
        </el-col>
      </el-row>
      <el-row justify="center"  class="course-list-box" >

        <el-col class="course-item"  v-for="course in courseList" :key="course.id">
          <transition name="fade-transform" mode="out-in">
            <div class="single-popular-course" v-show="showCourses">
              <ImagePreview :src="course.cover" alt="" width="100%" :height="260"/>
              <div class="course-content">
                <h4>{{ course.courseName }}</h4>
                <div class="meta d-flex align-items-center">
                  <a href="#">{{ course.college }} & {{ course.major }}</a>
                  <span><i class="fa fa-circle" aria-hidden="true"></i></span>
                  <a href="#">{{ course.teacher }}</a>
                </div>
                <p>{{ course.courseDescription }}</p>
              </div>
              <div class="seat-rating-fee d-flex justify-content-between">
                <div class="seat-rating h-100 d-flex align-items-center">
                  <div class="seat">
                    <i class="el-icon-user-solid" aria-hidden="true"></i> {{ course.buyCount }}
                  </div>
                  <div class="rating">
                    <i class="el-icon-star-on" aria-hidden="true"></i> {{ course.rating }}
                  </div>
                </div>
                <div class="course-fee h-100">
                  <a href="#" @click="handleStartCourse(course)" class="free">免费</a>
                </div>
              </div>
            </div>
          </transition>
        </el-col>

      </el-row>
    </div>

    <div class="blog-area"  v-if="enableBlog">
      <el-row>
        <el-col :span="24">
          <div class="section-heading">
            <h3>博客分享</h3>
          </div>
        </el-col>
      </el-row>
      <el-row justify="center"  class="blog-list" >
        <el-col class="blog-item">
          <transition name="fade-transform" mode="out-in">
            <div class="single-blog-area" v-show="showBlog">
              <img src="@/assets/img/blog-img/1.jpg" alt="">
              <div class="blog-content">
                <a href="#" class="blog-headline">
                  <h4>英语语法师</h4>
                </a>
                <div class="meta d-flex align-items-center">
                  <a href="#">Tanma</a>
                  <span><i class="fa fa-circle" aria-hidden="true"></i></span>
                  <a href="#">艺术 &amp; 设计</a>
                </div>
                <p>7天搞定英语语法，一线名师带你突破英语基础语法困境，扎实提升。</p>
              </div>
            </div>
          </transition>
        </el-col>
        <el-col class="blog-item">
          <transition name="fade-transform" mode="out-in">
            <div class="single-blog-area" v-show="showBlog">
              <img src="@/assets/img/blog-img/2.jpg" alt="">
              <div class="blog-content">
                <a href="#" class="blog-headline">
                  <h4>英语语法师</h4>
                </a>
                <div class="meta d-flex align-items-center">
                  <a href="#">Tanma</a>
                  <span><i class="fa fa-circle" aria-hidden="true"></i></span>
                  <a href="#">艺术 &amp; 设计</a>
                </div>
                <p>7天搞定英语语法，一线名师带你突破英语基础语法困境，扎实提升。</p>
              </div>
            </div>
          </transition>
        </el-col>
      </el-row>
    </div>
    <div v-if="isActive" class="go-top-box" @click="goTop(step)">
      <i class="top-icon el-icon-caret-top"></i>
    </div>

  </div>
</template>

<script>
  import CountTo from 'vue-count-to'
  import {getDashboard} from '@/api/exam/examRecord'
  import { courseList } from '@/api/exam/course'
  import { wexinShare } from '@/utils/weixinSDK'

  import {isWeixin} from "@/utils/utils";

  const logoUrl = require("@/assets/img/logo.jpg");
  export default {
    props: {
      step: {
        type: Number,
        default: 50
      }
    },
    data() {
      return {
        isActive: false,
        showFacts: false,
        showCourses: false,
        showBlog: false,
        enableBlog:false,
        dashboardInfo: {
          examinationCount: 0,
          examUserCount: 0,
          examinationRecordCount: 0,
          subjectCount: 0,
          courseCount: 0
        },
        courseList: [],
        courseQuery: {
          orderByColumn: 'sequence',
          isAsc: ' asc',
          pageNum: 1,
          pageSize: 3,
          courseName: '',
          showIndex:'Y',
          status: 0
        },
        banner_bg:require("@/assets/img/bg-img/bg2.jpg")
      }
    },
    components: {
      CountTo
    },
    methods: {
      // 返回顶部
      goTop: function (i) {
        document.documentElement.scrollTop -= i
        if (document.documentElement.scrollTop > 0) {
          setTimeout(() => this.goTop(i), 16)
        }
      },
      getDashboard() {
        getDashboard().then(resp => {
          this.dashboardInfo=resp.data;
        });
      },
      // 加载课程列表
      getCourseList () {
        courseList(this.courseQuery).then(response => {
          this.courseList = response.rows;
        }).catch(() => {
        })
      },
      handleStartCourse (course) {
        // messageWarn(this, '功能正在开发中！')
        this.$router.push({name: 'course-details', query: {courseId: course.id}})
      },
      toPage(pageName){
        this.$router.push({name: pageName})
      },
      wxShareInit(){
        var origin = encodeURIComponent(window.location.origin);
        var imgUrl=origin+logoUrl;
        var shareUrl=window.location.href;

        var defaultImg = logoUrl;
        if (defaultImg.indexOf(window.location.origin) < 0) {
          defaultImg = window.location.origin + logoUrl;
        }

        var shareWebData= {
          title: '无忧果手语服务平台',
          imgUrl: defaultImg,
          description: '致力于手语推广，提供手语培训、翻译、考试、练习等服务。',
          url: shareUrl,
        };

        wexinShare(shareWebData);

      },
    },
    mounted() {
      if(isWeixin()){
        this.wxShareInit();
      }
    },
    created() {
      this.getDashboard();
      this.getCourseList ();
      let vm = this
      window.onscroll = function () {
        vm.isActive = document.documentElement.scrollTop > 60
        if (document.documentElement.scrollTop > 250) {
          setTimeout(() => {
            vm.showCourses = true
          }, 350)
        }

        if (document.documentElement.scrollTop > 650) {
          setTimeout(() => {
            vm.showBlog = true
          }, 350)
        }
      }
      setTimeout(() => {
        vm.showFacts = true
      }, 350);


    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .hero-area{
    background-image: url("../../assets/img/bg-img/bg1.jpg");
  }


  .facts-list{
    margin: 0 auto;
    text-align: center;
    width: 70%;
  }

  .facts-item{
    width: 260px;
    margin-right: 6%;
    &:last-child {
      margin-right: 0;
    }
  }


  .course-list-box{
    margin: 0 auto;
    text-align: center;
    width: 80%;
  }

  .course-item{
    width:30%;
    margin-right: 5%;
    &:last-child {
       margin-right: 0;
     }
  }

  .popular-courses-area {
    background-repeat: repeat;
    background-image: url(../../assets/img/core-img/texture.png);
    padding: 1.5rem 0;
  }


  .blog-area{
    margin-top: 3rem;
    margin-bottom: 5rem;
  }

  .blog-list{
    margin: 0 auto;
    text-align: center;

    width: 80%;
  }

  .blog-item{
    width:48%;
    margin-right: 4%;
    &:last-child {
      margin-right: 0;
    }
  }


  @media(max-width: 1380px){}

  @media(max-width: 1238px){}

  @media(max-width: 1060px){
    .hero-area{
      height:220px !important;
    }

    .single-cool-facts-area {
      padding: 10px !important;
    }

    .single-cool-facts-area img{
      width: 50% !important;
    }

  }

  @media(max-width: 983px){
    .facts-list{
      margin: 0 auto;
      text-align: center;
      width: 90%;
    }

    .facts-item{
      width: 48%;
      margin-right: 2%;
      &:nth-child(2n) {
        margin-right: 0;
      }
    }

  }

  @media(max-width: 900px){



    .course-list-box{
      width: 90%;
    }

    .course-item{
      width:100%;
      margin-right: 0%;
      margin-bottom: 2rem;
      &:last-child {
        margin-right: 0;
      }
    }


    .blog-list{
      width: 90%;
    }

    .blog-item{
      width:100%;
      margin-right: 0%;
      margin-bottom: 2rem;
      &:last-child {
        margin-right: 0;
      }
    }


  }

  @media(max-width: 768px){}

  @media(max-width: 760px){}

  @media(max-width: 620px){
    .facts-list{
      margin: 0 auto;
      text-align: center;
      width: 440px;
    }

    .facts-item{
      width: 200px;
      margin-right: 2rem;
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }

  @media(max-width: 500px){

    .facts-list{
      margin: 0 auto;
      text-align: center;
      width: 90%;
    }

    .facts-item{
      width: 48%;
      margin-right: 2%;
      &:nth-child(2n) {
        margin-right: 0;
      }
    }

  }

  @media(max-width: 330px){

  }


</style>
