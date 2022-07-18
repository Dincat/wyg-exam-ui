<template>
  <div class="exam-detail">
    <transition name="fade-transform" mode="out-in">
      <div v-show="!loading">
        <div class="single-course-intro d-flex align-items-center justify-content-center"
             :style="'background-image: url(' + exam.logoUrl + ');'">
          <div class="single-course-intro-content text-center">

            <div class="rate">
              <el-rate v-model="rating"  text-color="#ff9900" score-template="{value}" :allow-half="true" @change="rateClick" title="作答后可进行评价">
              </el-rate>
            </div>

            <h3>{{ exam.examinationName }}</h3>
            <div class="meta d-flex align-items-center justify-content-center">
              <el-tag :type="exam.type | simpleTagStatusFilter(3)">{{ exam.type | PaperTypesFilter }}</el-tag>
            </div>

            <div class="meta d-flex align-items-center justify-content-center">
              <a href="#">考试时间：{{ exam.startTime }} — {{ exam.endTime }}</a>
            </div>
            <div class="price" v-if="exam.courseId>0" @click="showCourse(exam.course)">所属课程：{{exam.course.courseName}}
            </div>
          </div>
        </div>
        <div class="single-course-content padding-80">
          <el-row class="my-content-container ml-100 mr-100">

            <el-col :span="18" class="course-info" style="padding-right: 40px;">
              <el-tabs class="course-tab">

                <el-tab-pane class="course-tab-item">
                  <span slot="label">
                    <el-button type="default" class="course-content-btn">注意事项</el-button>
                  </span>

                  <div class="clever-description">
                    <div class="about-course mb-30">
                      <h4>考试注意事项</h4>
                      <p>{{ exam.attention }}</p>
                    </div>
                  </div>
                </el-tab-pane>

                <el-tab-pane>
                  <span slot="label">
                    <el-button type="default" class="course-content-btn">成绩排行</el-button>
                  </span>
                  <div class="about-members mb-30">
                    <h4>成绩排行榜</h4>
                    <div>

                      <div class="record-list" v-if="isPhone">
                        <div class="sidebar-widget" v-for="(record,index) in rankList">
                          <ul class="features-list">
                            <li>
                              <h6><i class="el-icon-files"></i>排名：</h6>
                              <h6>{{ record.rank}}</h6>
                            </li>

                            <li>
                              <h6><i class="el-icon-user"></i>昵称</h6>
                              <h6>{{ record.userName }}</h6>
                            </li>
                            <li>
                              <h6><i class="el-icon-check"></i>正确数</h6>
                              <h6>{{ record.correctNumber }}</h6>
                            </li>

                            <li>
                              <h6><i class="el-icon-close"></i>错题数</h6>
                              <h6>{{ record.incorrectNumber }}</h6>
                            </li>

                            <li>
                              <h6><i class="el-icon-timer"></i>用时</h6>
                              <h6>{{ record.elapsedTime }}</h6>
                            </li>

                            <li>
                              <h6><i class="el-icon-s-flag"></i>成绩</h6>
                              <h6>{{ record.score }}</h6>
                            </li>


                          </ul>
                        </div>
                      </div>

                      <el-row v-if="!isPhone">
                        <el-col :span="tableSpan" :offset="tableOffset">
                          <el-table
                            v-loading="listLoading"
                            :key="tableKey"
                            :data="rankList"
                            :default-sort="{ prop: 'score', order: 'descending' }"
                            highlight-current-row>
                            <el-table-column label="排名" align="center">
                              <template slot-scope="scope">
                                <span :title="scope.row.rank">{{ scope.row.rank }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column label="昵称" align="center">
                              <template slot-scope="scope">
                                <span :title="scope.row.userName">{{ scope.row.userName }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column label="正确数" align="center">
                              <template slot-scope="scope">
                                <span :title="scope.row.correctNumber">{{ scope.row.correctNumber }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column label="错题数" align="center">
                              <template slot-scope="scope">
                                <span :title="scope.row.incorrectNumber">{{ scope.row.incorrectNumber }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column label="用时" align="center">
                              <template slot-scope="scope">
                                <span :title="scope.row.elapsedTime">{{ scope.row.elapsedTime }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column label="成绩" align="center">
                              <template slot-scope="scope">
                                <span :title="scope.row.userName">{{ scope.row.score }}</span>
                              </template>
                            </el-table-column>

                          </el-table>

                        </el-col>
                      </el-row>


                    </div>

<!--                    <el-row style="text-align: center; margin-top: 50px;">-->
<!--                      <el-col :span="24">-->
<!--                        <el-button type="default" @click="scrollRankList" :loading="listLoading" style="margin-bottom: 50px;" v-if="!isLastPage">加载更多</el-button>-->
<!--                      </el-col>-->
<!--                    </el-row>-->

                  </div>
                </el-tab-pane>


                <el-tab-pane class="rate-tab">
                  <span slot="label">
                    <el-button type="default" class="course-content-btn">试卷评价</el-button>
                  </span>
                  <div class="rate-members mb-30">
                    <div class="rate-list-box">
                      <el-card class="box-card" v-for="(rate,index) in rateList">
                        <div slot="header" class="clearfix">
                          <div class="user-name">{{rate.userName}}</div>
                          <div class="user-rate">
                            <el-rate v-model="rate.rating" disabled  text-color="#ff9900" score-template="{value}" :allow-half="true" @change="rateClick" ></el-rate>
                          </div>
                          <div class="rate-time">{{rate.updateTime}}</div>
                        </div>
                        <div  class="text item">
                          {{rate.comment}}
                        </div>
                      </el-card>


                    </div>
                  </div>
                </el-tab-pane>


                <el-tab-pane>

                  <span slot="label">
                    <el-button type="default" class="course-content-btn">备注</el-button>
                  </span>
                  <div class="about-curriculum mb-30">
                    <h4>备注</h4>
                    <p>{{ exam.remark }}</p>
                  </div>
                </el-tab-pane>


              </el-tabs>
            </el-col>

            <el-col :span="6" class="course-special">
              <div class="course-sidebar">
                <el-button type="primary" class="clever-btn mb-30 w-100" @click="startExam(exam)">开始考试</el-button>

                <div class="sidebar-widget">
                  <h4>考试信息</h4>
                  <ul class="features-list">
                    <li>
                      <h6><i class="el-icon-files"></i>题目总数</h6>
                      <h6>{{exam.subjectCount}}</h6>
                    </li>
                    <li>
                      <h6><i class="el-icon-bell"></i>试卷总分</h6>
                      <h6>{{exam.totalScore}}</h6>
                    </li>
                    <li>
                      <h6><i class="el-icon-alarm-clock"></i>作答时长</h6>
                      <h6>{{exam.duration}} 分钟</h6>
                    </li>
                    <li>
                      <h6><i class="el-icon-arrow-up"></i>重复作答</h6>
                      <h6>
                        <span v-if="exam.canRepeat =='Y'">可重复做题</span>
                        <span v-if="exam.canRepeat !='Y'">不可重复做题</span>
                      </h6>
                    </li>
                  </ul>
                </div>

                <div class="sidebar-widget">
                  <h4>猜你喜欢</h4>
                  <div class="single--courses d-flex align-items-center" v-for="course in likes" :key="course.id">
                    <div class="thumb">
                      <img src="@/assets/img/bg-img/yml.jpg" alt="">
                    </div>
                    <div class="content">
                      <h5>{{ course.courseName }}</h5>
                      <h6>{{ course.price }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

    </transition>

    <el-dialog title="试卷评价" :visible.sync="showRater" width="60%" center>
      <div>
        <el-form label-position="top" label-width="80px" :model="rateForm" :rules="rules" ref="rateForm" >
          <el-row>
            <el-col :span="24">
              <el-form-item label="评分" prop="title">
                <el-rate v-model="rateForm.rating" text-color="#ff9900" score-template="{value}" :allow-half="true"></el-rate>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="评论" prop="title">
                <el-input type="textarea" placeholder="请输入内容" v-model="rateForm.comment"  maxlength="200" show-word-limit></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8" :offset="8">
              <el-button @click="submitRate" type="primary">提交</el-button>
            </el-col>
          </el-row>

        </el-form>

      </div>
    </el-dialog>

  </div>
</template>
<script>
  const {body} = document;
  const WIDTH = 1060; // refer to Bootstrap's responsive design

  import {getObj} from '@/api/exam/exam'
  import {getCurrentTime} from '@/api/admin/sys'
  import {fetchList} from '@/api/exam/examRank'
  import {userRate,getRateList} from '@/api/exam/examRate'

  import {isNotEmpty, messageFail, messageWarn, messageSuccess,getAttachmentPreviewUrl, formatDate} from '@/utils/util'
  import store from '@/store'
  import moment from "moment";
  import {mapGetters, mapState} from "vuex";
  import {wexinShare} from '@/utils/weixinSDK'

  export default {
    name:"examDetail",
    filters: {
      examTypeFilter(type) {
        const typeMap = {
          0: '正式考试',
          1: '模拟考试',
          2: '在线练习',
          3: '调查问卷'
        }
        return typeMap[type]
      },
      timeFilter(time) {
        return formatDate(new Date(time), 'yyyy-MM-dd hh:mm')
      }
    },
    data() {
      return {
        showRater:false,
        isPhone: false,
        loading: true,
        tableSpan: 24,
        tableOffset: 0,
        examId: '',
        exam: {
          rating:3.7
        },


        course: {},
        rankList: [],
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          paperId: 0,
          courseId: '',
          orderByColumn: 'score',
          isAsc: 'desc',
        },
        isLastPage: false,
        total: 0,
        listLoading: false,


        rateList:[],
        rateListQuery: {
          pageNum: 1,
          pageSize: 10,
          paperId: '',
          orderByColumn: 'update_time',
          isAsc: 'desc',
        },
        isRateLastPage:false,
        rateTotal:0,
        rateListLoading:false,


        tableKey: 0,
        rating: 3.7,
        likes: [{
          id: 1,
          courseName: '手语基础',
          price: '￥0.00'
        }],
        tempExamRecord: {
          id: null,
          userId: null,
          examinationId: null
        },
        shareExamData: {
          title: '',
          description: '',
          url: '',
          imgUrl: '',
        },
        rateForm:{
          paperId:null,
          rating:-1,
          comment:null,
        },

        // 表单校验
        rules: {
          rating: [
            {required: true, message: "请输入您的昵称", trigger: "blur"}
          ],
        }
      }
    },
    created() {
      this.resizeHandler();
      this.examId = this.$route.query.examId;
      this.listQuery.paperId = this.examId;
      this.rateForm.paperId=this.examId;
      this.rateListQuery.paperId=this.examId;
      this.getExamInfo();
      this.scrollRankList();
      this.scrollRateList();
    },
    computed: {
      // 获取用户信息
      ...mapState({
        userInfo: state => state.user.userInfo,
        sysConfig: state => state.sysConfig.sysConfig,
        examRecord: state => state.exam.examRecord
      }),
      ...mapGetters([
        'subject'
      ])
    },
    beforeMount() {
      window.addEventListener('resize', this.resizeHandler)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeHandler)
    },
    methods: {
      getExamInfo() {
        this.loading = true
        getObj(this.examId).then(response => {
          this.exam = response.data;
          this.rating=this.exam.rating;
          this.wxShareInit();
          setTimeout(() => {
            this.loading = false;
          }, 500)
        }).catch(error => {
          console.error(error)
        })
      },

      //加载评价记录
      scrollRateList() {
        if (this.isRateLastPage) {
          messageWarn(this, '暂无更多数据！')
          return
        }
        if (this.rateListLoading) {
          messageWarn(this, '正在拼命加载！')
          return
        }
        this.rateListLoading = true
        setTimeout(() => {
          this.rateListQuery.pageNum++
          getRateList(this.rateListQuery).then(response => {
            const {total, rows} = response
            this.updateRateList(rows)
            this.rateTotal = total
            this.isRateLastPage = total < (this.rateListQuery.pageNum * this.rateListQuery.pageSize)
            this.rateListLoading = false
          }).catch((err) => {
            messageWarn(this, '加载排行榜数据失败！');
            console.log(err);
            this.rateListLoading = false
          })
        }, 1000)
      },
      updateRateList(list) {
        if (list === undefined || list.length === 0) {
          return list
        }

        list.forEach(item => {
          let exist = false
          for (let i = 0; i < this.rateList.length; i++) {
            if (this.rateList[i].id === item.id) {
              exist = true
            }
          }
          if (!exist) {
            item.rank = this.rateList.length + 1;
            this.rateList.push(item)
          }
        })
      },


      // 加载成绩排行
      scrollRankList() {
        if (this.isLastPage) {
          messageWarn(this, '暂无更多数据！')
          return
        }
        if (this.listLoading) {
          messageWarn(this, '正在拼命加载！')
          return
        }
        this.listLoading = true
        setTimeout(() => {
          this.listQuery.pageNum++
          fetchList(this.listQuery).then(response => {
            const {total, rows} = response
            this.updateList(rows)
            this.total = total
            this.isLastPage = total < (this.listQuery.pageNum * this.listQuery.pageSize)
            this.listLoading = false
          }).catch((err) => {
            messageWarn(this, '加载排行榜数据失败！');
            console.log(err);
            this.listLoading = false
          })
        }, 1000)
      },
      updateList(list) {
        if (list === undefined || list.length === 0) {
          return list
        }

        list.forEach(item => {
          let exist = false
          for (let i = 0; i < this.rankList.length; i++) {
            if (this.rankList[i].id === item.id) {
              exist = true
            }
          }
          if (!exist) {
            //item.rank = this.rankList.length + 1;
            this.rankList.push(item)
          }
        })
      },
      // 开始考试
      startExam(exam) {
        this.tempExamRecord.examinationId = exam.id
        this.tempExamRecord.userId = this.userInfo.userId
        getCurrentTime().then(response => {

          // 校验考试时间
          const currentTime = moment(response.msg)

          if (exam.type == 0) {
            // 校验结束时间
            if (currentTime.isAfter(exam.endTime)) {
              messageWarn(this, '考试已结束');
              return;
            } else if (currentTime.isBefore(exam.startTime)) {
              // 考试未开始
              messageWarn(this, '考试未开始');
              return;
            }
          }


          this.$confirm('确定要开始吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 开始考试
            store.dispatch('StartExam', this.tempExamRecord).then(() => {
              if (this.examRecord === undefined || this.subject === undefined) {
                messageWarn(this, '开始考试失败')
                return
              }
              this.$router.push({path: `/start/${exam.id}-${this.examRecord.id}-${this.subject.id}-${this.subject.type}`})
            }).catch(() => {
              messageWarn(this, '开始考试失败')
            })
          }).catch(() => {
            console.log('取消考试')
          })


        }).catch(() => {
          messageFail(this, '开始考试失败！')
        })
      },
      wxShareInit() {
        var shareUrl = window.location.href;
        this.shareExamData.title = this.exam.examinationName;
        this.shareExamData.imgUrl = this.exam.logoUrl;
        this.shareExamData.url = shareUrl;
        this.shareExamData.description = this.exam.attention;

        wexinShare(this.shareExamData);

      },
      rateClick(val){
        this.rateForm.rating=val;
        this.showRater=true;
      },

      showCourse(course) {
        // messageWarn(this, '功能正在开发中！')
        this.$router.push({name: 'course-details', query: {courseId: course.id}})
      },
      buyCourse() {
        messageWarn(this, '报名尚未开始')
      },
      isMobile() {
        const rect = body.getBoundingClientRect();
        var isMobile = rect.width - 1 < WIDTH;
        this.isPhone = isMobile;

        return isMobile;
      },
      resizeHandler() {
        if (document.hidden) {
          return;
        }

        const isMobile = this.isMobile();

        if (isMobile) {
          this.tableSpan = 24;
          this.tableOffset = 0;
        } else {
          this.tableSpan = 20;
          this.tableOffset = 2;
        }


      },
      submitRate(){
        userRate(this.rateForm).then((resp)=>{
          this.rating=resp.rating;
          this.exam.rating=resp.rating;
          this.$refs.rateForm.resetFields();
          messageSuccess(this, '提交成功,感谢您的反馈！');
          this.showRater=false;

          this.isRateLastPage=false;d
          this.rateListQuery.pageNum=1;
          this.rateList=[];
          this.scrollRateList();
        }).catch((error)=>{
          this.rating=this.exam.rating;
        })
        this.rateForm.paperId=this.examId;
      },
    }
  }
</script>

<style>
  .el-tabs__item.is-active span button {
    color: #fff !important;
    background-color: #409eff !important;
    border-color: #409eff !important;
    box-shadow: -1px 0 0 0 #409eff !important;

  }

  .sidebar-widget .features-list li h6 {
    color: #444 !important;
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>

  .exam-detail {

    .rate {
      margin-bottom: 12px;
    }

    .course-content-btn {
      display: inline-block;
      height: 40px;
      background-color: transparent;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.25);
      border: 1px solid #ebebeb;
      border-radius: 6px;
      padding: 0 25px;
      line-height: 40px;
      -webkit-transition-duration: 800ms;
      transition-duration: 800ms;
      text-align: center;
      margin-right: 10px;
      margin-bottom: 10px;
    }

    .clever-btn {
      display: inline-block;
      min-width: 160px;
      height: 40px;
      background-color: #3762f0;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 14px;
      color: #ffffff;
      border: 1px solid transparent;
      border-radius: 6px;
      padding: 0 30px;
      line-height: 40px;
      text-align: center;
      -webkit-transition-duration: 300ms;
      transition-duration: 300ms;
    }

    .my-content-container {
      margin-top: 0;
    }


    .rate-list-box{

      .user-name{
        float: left;
      }

      .rate-time{
        float: right;
        padding: 3px 0;
      }

      .user-rate{
        float: left;
        margin-left: 1rem;
      }

      .text {
        font-size: 14px;
      }

      .item {
        margin-bottom: 18px;
      }

      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }
      .clearfix:after {
        clear: both
      }

      .box-card {
        width: 100%;
        margin-bottom: 1rem;
      }

    }


    @media(max-width: 1160px) {

     .exam-detail{
       .mb-30{
         padding: 1rem !important;
       }
     }

      .rate-tab{
        margin: 0 !important;
      }

      .rate-members{
        padding: 1rem !important;
        margin-bottom: 1rem !important;
      }

      .my-content-container {
        width: 96% !important;
        margin-left: 2% !important;
        margin-right: 2% !important;
      }


      .course-info {
        width: 100% !important;
        padding-right: 0rem !important;
      }

      .single-course-content {
        padding-top: 1rem !important;
      }


      .course-special {
        width: 100% !important;
      }

      .rate-time{
        margin-top: 0.5rem !important;
        padding: 0 !important;
      }

    }
  }
</style>
