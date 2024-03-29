<template>
  <div class="content-container">
    <!-- 搜索框 -->
    <div class="search-form">
      <el-form ref="examForm" :inline="true" :model="query" label-width="80px" class="examForm">
        <el-form-item label="试卷名称" prop="examinationName">
          <el-input v-model="query.examinationName" autocomplete="off" placeholder="试卷名称" size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('examForm')"  size="small">搜索</el-button>
<!--          <el-button @click="resetForm('examForm')"  size="small">重置</el-button>-->
        </el-form-item>
      </el-form>
    </div>

    <!-- 分类 -->
    <div class="category-list">
      <ul>
        <li :class="activeTag === '1' ? 'active' : ''" @click="changeTag('1')">全部</li>
        <li :class="activeTag === '2' ? 'active' : ''" @click="changeTag('2')">最新发布</li>
        <li :class="activeTag === '3' ? 'active' : ''" @click="changeTag('3')">最多点击</li>
        <li :class="activeTag === '4' ? 'active' : ''" @click="changeTag('4')">参数人数</li>
      </ul>
    </div>
    <!-- 考试卡片列表 -->
    <div class="exam-card-list">
      <transition name="fade-transform" mode="out-in" v-for="exam in examList" :key="exam.id">
        <div class="card-item" v-show="exam.show">

          <div style="position: relative;float: right">
            <el-tag :type="exam.type | simpleTagStatusFilter(3)">{{ exam.type | PaperTypesFilter }}</el-tag>
          </div>

          <div>
            <a href="javascript: void(-1);" class="card-item-snapshoot"
               :style="'background-image: url(' + exam.logoUrl + ');'"
               @click="showDetail(exam)">
            </a>
          </div>

          <div class="card-item-detail">
            <div>
              <a href="javascript:void(-1);" @click="showDetail(exam)"></a>
              <h3>
                <div class="card-item-name mb-12">
                  {{ exam.examinationName | simpleStrFilter }}
                </div>
              </h3>
            </div>
            <div class="card-item-course" v-if="exam.course !== undefined && exam.course !== null">
              <div class="card-item-course-detail mb-12">
                <a href="#">所属课程：{{ exam.course.courseName }}</a>
              </div>
              <div class="card-item-course-detail mb-12">
                <span v-if="exam.type==0"><a href="#">{{ exam.startTime | timeFilter }}~{{ exam.endTime | timeFilter }}</a></span>
                <span><a href="javascript:void(0);">作答时长：{{ exam.duration }} 分钟</a></span>
              </div>
            </div>
          </div>

        </div>
      </transition>
      <!-- 对齐 -->
      <i v-if="examList !== undefined && examList.length > 0" v-for="count in (examList.length)" :key="count"></i>
    </div>
    <el-row style="text-align: center; margin-bottom: 50px;" v-if="!isLastPage">
      <el-col :span="24">
        <el-button type="default" @click="scrollList" :loading="loading" style="margin-bottom: 100px;">加载更多</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {mapGetters, mapState} from 'vuex'
  import {fetchList} from '@/api/exam/exam'
  import {getCurrentTime} from '@/api/admin/sys'
  import {isNotEmpty, messageFail, messageWarn, getAttachmentPreviewUrl, formatDate} from '@/utils/util'
  import store from '@/store'
  import moment from 'moment'
  import PanThumb from '@/components/PanThumb'

  export default {
    components: {PanThumb},
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
        total: 0,
        loading: true,
        examList: [],
        isLastPage: false,
        query: {
          orderByColumn: 'id',
          isAsc: ' asc',
          pageNum: 1,
          pageSize: 6,
          examinationName: '',
          status: 0,
          orderByColumn: 'create_date',
          isAsc: 'desc',
        },
        tempExamRecord: {
          id: null,
          userId: null,
          examinationId: null
        },
        // 默认全部
        activeTag: '1'
      }
    },
    computed: {
      // 获取用户信息
      ...mapState({
        userInfo: state => state.user.userInfo,
        course: state => state.course.course,
        sysConfig: state => state.sysConfig.sysConfig,
        examRecord: state => state.exam.examRecord
      }),
      ...mapGetters([
        'subject'
      ])
    },
    created() {
      if (isNotEmpty(this.course)) {
        this.query.courseId = this.course.id
      }
      if (this.$route.query.query !== '') {
        this.query.examinationName = this.$route.query.query
      }
      this.query.pageNum = 1
      // 加载考试列表
      this.getExamList()
    },
    methods: {
      // 加载考试列表
      getExamList() {
        this.loading = true
        fetchList(this.query).then(response => {
          const {total, rows} = response
          this.total = total;
          this.isLastPage = total < (this.query.pageNum * this.query.pageSize)
          this.updateExamList(rows);
          this.loading = false
        }).catch(() => {
          messageWarn(this, '加载考试失败！')
          this.loading = false
        })
      },
      // 列表滚动
      scrollList() {
        if (this.isLastPage) {
          messageWarn(this, '暂无更多数据！')
          return
        }
        if (this.loading) {
          messageWarn(this, '正在拼命加载！')
          return
        }
        this.loading = true
        setTimeout(() => {
          this.query.pageNum++
          fetchList(this.query).then(response => {
            const {total, rows} = response
            this.updateExamList(rows)
            this.total = total;
            this.isLastPage = total < (this.query.pageNum * this.query.pageSize);
            this.loading = false
          }).catch(() => {
            messageWarn(this, '加载考试失败！');
            this.loading = false
          })
        }, 1000)
      },
      showDetail (exam) {
        // messageWarn(this, '功能正在开发中！')
        this.$router.push({name: 'exam-details', query: {examId: exam.id}})
      },
      // 开始考试
      startExam(exam) {
        this.tempExamRecord.examinationId = exam.id
        this.tempExamRecord.userId = this.userInfo.userId
        getCurrentTime().then(response => {

          // 校验考试时间
          const currentTime = moment(response.msg)

          if(exam.type==0) {
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
      getAvatar(avatar) {
        return getAttachmentPreviewUrl(this.sysConfig, avatar)
      },
      submitForm() {
        this.query.pageNum = 1
        this.getExamList()
      },
      resetForm() {
        this.query.examinationName = ''
      },
      // 切换tag
      changeTag(tag) {
        this.activeTag = tag
        if (tag === '2') {
          this.query.orderByColumn = 'create_date'
        } else if (tag === '3') {
          this.query.orderByColumn = 'create_date'
        } else {
          this.query.orderByColumn = 'id'
        }
        this.getExamList()
      },
      handleSizeChange(val) {
        this.query.limit = val
        this.getExamList()
      },
      handleCurrentChange(val) {
        this.query.pageNum = val
        this.getExamList()
      },
      updateExamList(list) {
        if (list === undefined || list.length === 0) {
          return list
        }
        list.forEach(item => {
          item.show = false
        })
        if (this.examList.length === 0) {
          this.examList = list
        } else {
          list.forEach(item => {
            let exist = false
            for (let i = 0; i < this.examList.length; i++) {
              if (this.examList[i].id === item.id) {
                exist = true
              }
            }
            if (!exist) {
              this.examList.push(item)
            }
          })
        }
        for (let i = 0; i < list.length; i++) {
          setTimeout(() => {
            list[i].show = true
          }, 250 + (100 * i))
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .exam-empty {
    font-size: 13px;
    color: #999;
    text-align: center;
  }

  .category-list {
    margin: 0 auto 30px;
    padding: 15px 10px;
    width: calc(100% - 30px);
    box-shadow: 0 5px 15px 0 rgba(82, 94, 102, .1);
    border-radius: 4px;

    ul {
      margin: 0;
      overflow: hidden;
    }

    .active {
      color: #fff;
      background: #409eff;
    }

    li {
      list-style: none;
      display: block;
      float: left;
      margin: 10px;
      padding: 0 15px;
      height: 24px;
      line-height: 24px;
      color: #666;
      font-size: 13px;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .exam-card-list {
    width: 100%;
    height: auto;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: row;
    @media(max-width: 1060px) {
      width: 100%;
      margin: 0 auto;
    }

    .card-item {
      width: 30%;
      position: relative;
      margin-bottom: 100px;
      border-radius: 6px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
      @media(max-width: 1060px) {
        width: 100%;
        margin-bottom: 3rem;
      }

      .card-item-snapshoot {
        border: 1px solid rgba(0, 0, 0, .15);
        background-origin: border-box;
        background-size: cover;
        background-color: #f0f0f0;
        background-position: 49% 38%;
        height: 172px;
        display: block;
        border-radius: 6px 6px 0 0;
      }

      .card-item-detail {
        padding: 20px;

        .card-item-name {
          display: -webkit-box;
          overflow: hidden;
        }

        .card-item-course {
          --x-height-multiplier: 0.342;
          --baseline-multiplier: 0.22;
          font-weight: 300;
          font-style: normal;
          letter-spacing: 0;

          .card-item-course-detail {
            color: rgba(0, 0, 0, .54);
            fill: rgba(0, 0, 0, .54);

            a {
              color: rgba(0, 0, 0, 0.4);
              display: inline-block;
              font-size: 14px;
              font-weight: 400;
              margin-right: 10px;

              &:hover {
                color: #000;
              }
            }
          }
        }
      }
    }

    > i {
      width: 30%;
      padding-right: 12px;
    }
  }
</style>
