<template>
  <div class="my-content-container exam-record">

    <div class="record-list" v-if="isPhone">
      <div class="sidebar-widget" v-for="(record,index) in examRecodeList">
        <h4>{{ record.examinationName }}</h4>
        <ul class="features-list">
          <li>
            <h6><i class="el-icon-files"></i>考试类型：</h6>
            <h6>{{ record.examType | examTypeFilter }}</h6>
          </li>

          <li>
            <h6><i class="el-icon-alarm-clock"></i>考试时间</h6>
            <h6>{{ record.startTime | fmtDate('yyyy-MM-dd hh:mm:ss') }}</h6>
          </li>
          <li>
            <h6><i class="el-icon-bell"></i>状态</h6>
            <h6>
              <el-tag :type="record.submitStatus | simpleTagStatusFilter(3)">{{ record.submitStatus | submitStatusFilter }}</el-tag>
            </h6>
          </li>

          <li>
            <h6><i class="el-icon-s-flag"></i>成绩</h6>
            <h6>{{ record.score }}</h6>
          </li>

          <li>
            <h6><i class="el-icon-setting"></i>操作</h6>
            <h6>
              <el-button type="warning" size="mini" @click="startExam(record)" v-if="record.submitStatus ==0 ">
                继续考试
              </el-button>
                <el-button type="success" size="mini" @click="handleDetail(record)" v-if="record.submitStatus >0">
                  成绩详情
                </el-button>
            </h6>
          </li>



        </ul>
      </div>
    </div>


    <el-row  v-if="!isPhone">
      <el-col :span="tableSpan" :offset="tableOffset">
        <el-table
          v-loading="listLoading"
          :key="tableKey"
          :data="examRecodeList"
          :default-sort="{ prop: 'id', order: 'descending' }"
          @cell-dblclick="handleDetail"
          highlight-current-row
          style="width: 100%;">
          <el-table-column label="考试名称" align="left">
            <template slot-scope="scope">
              <span :title="scope.row.examinationName">{{ scope.row.examinationName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="考试类型" width="180" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.examType | examTypeFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="考试时间" sortable prop="start_time" width="220" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.startTime | fmtDate('yyyy-MM-dd hh:mm:ss') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="160" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.submitStatus | simpleTagStatusFilter(3)">{{ scope.row.submitStatus |
                submitStatusFilter }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="成绩" sortable prop="score" align="center" width="160px">
            <template slot-scope="scope">
              <span>{{ scope.row.score }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="190">
            <template slot-scope="scope">
              <el-button type="warning" size="mini" @click="startExam(scope.row)" v-if="scope.row.submitStatus ==0 ">
                继续考试
              </el-button>
              <el-button type="success" size="mini" @click="handleDetail(scope.row)" v-if="scope.row.submitStatus >0">
                成绩详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row style="text-align: center; margin-bottom: 50px;" v-if="!isLastPage">
          <el-col :span="24">
            <el-button type="default" @click="scrollList" :loading="listLoading"
                       style="margin-top:20px; margin-bottom: 100px;">加载更多
            </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  const {body} = document;
  const WIDTH = 1060; // refer to Bootstrap's responsive design

  import {mapState} from 'vuex'
  import {fetchList} from '@/api/exam/examRecord'
  import {getObj} from '@/api/exam/exam'
  import {getCurrentTime} from '@/api/admin/sys'
  import store from '@/store'
  import {messageWarn} from '@/utils/util'
  import moment from "moment";

  export default {
    data() {
      return {
        isPhone:false,
        tableSpan:20,
        tableOffset:2,
        examRecodeList: [],
        isLastPage: false,
        total: 0,
        listLoading: true,
        tableKey: 0,
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          courseId: '',
          orderByColumn: 'id',
          isAsc: 'desc',
        },
        tempScore: {
          score: '',
          correctNumber: '',
          inCorrectNumber: ''
        },
        tempExamRecord: {}
      }
    },
    computed: {
      // 获取用户信息
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    created() {
      this.resizeHandler()
      //this.listQuery.userId = this.userInfo.userId
      this.getList()
    },
    beforeMount() {
      window.addEventListener('resize', this.resizeHandler)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeHandler)
    },
    methods: {
      // 开始考试
      startExam(examRecord) {

        getCurrentTime().then(response => {


          getObj(examRecord.examinationId, {}).then(resp => {

            if (resp.data == null) {
              messageWarn(this, '获取考试信息失败');
              return;
            }

            var exam = resp.data;

            // 校验考试时间
            const currentTime = moment(response.msg);

            if(exam.type==0) {
              // 校验结束时间
              if (currentTime.isAfter(exam.endTime)) {
                messageWarn(this, '考试已结束');
                return;
              } else if (currentTime.isBefore(exam.startTime)) {
                // 考试未开始
                messageWarn(this, '考试未开始')
                return;
              }
            }

            this.$confirm('确定要开始吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // 开始考试
              store.dispatch('StartExam', examRecord).then(() => {
                this.$router.push({path: `/start/${exam.id}-${examRecord.id}-0-0`})
              }).catch(() => {
                messageWarn(this, '开始考试失败')
              })

            }).catch(() => {
              console.log('取消考试')
            })


          });


        }).catch(() => {
          messageFail(this, '开始考试失败！')
        })
      },
      // 加载考试记录
      getList() {
        fetchList(this.listQuery).then(response => {
          const {total, rows} = response
          this.updateList(rows)
          this.total = total
          this.isLastPage = total < (this.listQuery.pageNum * this.listQuery.pageSize)
          this.listLoading = false
        }).catch(() => {
          messageWarn(this, '暂无更多数据！')
          this.listLoading = false
        })
      },
      scrollList() {
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
          }).catch(() => {
            messageWarn(this, '加载数据失败！')
            this.listLoading = false
          })
        }, 1000)
      },
      updateList(list) {
        if (list === undefined || list.length === 0) {
          return list
        }
        if (this.examRecodeList.length === 0) {
          this.examRecodeList = list
          return
        }
        list.forEach(item => {
          let exist = false
          for (let i = 0; i < this.examRecodeList.length; i++) {
            if (this.examRecodeList[i].id === item.id) {
              exist = true
            }
          }
          if (!exist) {
            this.examRecodeList.push(item)
          }
        })
      },
      // 查看成绩详情
      handleDetail(row) {
        store.dispatch('SetIncorrectRecord', {id: row.id}).then(() => {
          this.$router.push({name: 'incorrect'})
        }).catch((error) => {
          console.error(error)
        })
      },

      isMobile(){
        const rect = body.getBoundingClientRect();
        var isMobile= rect.width - 1 < WIDTH;
        this.isPhone=isMobile;

        return isMobile;
      },
      resizeHandler() {
        if (document.hidden) {
          return;
        }

        const isMobile = this.isMobile();

        if(isMobile){
          this.tableSpan=24;
          this.tableOffset=0;
        }else{
          this.tableSpan=20;
          this.tableOffset=2;
        }


      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  @import '../../assets/css/theme_color';

  .my-content-container {
    margin-top: 2rem;
    margin-left: 20px;
    margin-right: 20px;
    min-height: 60vh;
  }

  .incorrect-answer-gray-box {
    margin-top: 50px;
    margin-bottom: 50px;
    min-height: 200px;
  }

  .incorrect-answer-gray-box-title {
    text-align: center;
  }

  /* 题目 */
  .subject-title {
    color: #333333;
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 10px;
    padding-left: 20px;
    position: relative;

    .subject-title-number {
      position: absolute;
      left: -25px;
      top: 0;
      display: inline-block;
      width: 40px;
      line-height: 22px;
      text-align: right;
    }
  }

  /* 题目选项 */
  .subject-option {
    padding-bottom: 10px;
    padding-left: 10px;
  }

  .score {
    margin: 20px;
  }

  .subject-content {
    background: #F6F7FA;
    border-radius: 4px;
    margin-bottom: 21px;
    padding: 12px 0 12px 22px;
    position: relative;
    min-height: 240px;
    color: #666666;
    text-align: left;
  }

  .correct {
    color: #F56C6C;
  }

  .right {
    color: #67C23A;
  }

  .score-gray-box {
    margin-top: 50px;
  }

  .score-gray-box-title {
    text-align: center;
  }


  @media(max-width: 1160px) {
    .record-list .sidebar-widget{
      margin-bottom: 1rem !important;
      border-bottom: 1px solid $border-color !important;
      padding: 1rem !important;
    }

    .record-list .sidebar-widget h4{
      font-size: 1.1rem !important;
    }

    .record-list .features-list li h6{
      line-height: 1.8rem !important;
    }

    .record-list .features-list li .buttons{
      margin: 0 auto;
      text-align: center;
    }
  }

</style>
