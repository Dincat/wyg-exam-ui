<template>
  <div class="content-container">
    <el-row>
      <el-col :span="20" :offset="2" style="margin-top:10px;" class="user-box">
        <el-form ref="form" :rules="rules" :label-position="labelPosition" :model="userInfo" label-width="100px"
                 class="proForm">
          <el-row>

            <el-col :span="12" class="user-info">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="账号：" prop="userName">
                    <el-input :disabled="disabled" v-model="userInfo.userName"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="姓名：" prop="nickName">
                    <el-input v-model="userInfo.nickName" placeholder="请输入姓名"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="userInfo.sex">
                      <el-radio :label="0">男</el-radio>
                      <el-radio :label="1">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="出生日期" prop="born">
                    <el-date-picker v-model="userInfo.born" format="yyyy 年 MM 月 dd 日" value-format="timestamp"
                                    placeholder="出生日期"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="电话号码" prop="phonenumber">
                    <el-input v-model="userInfo.phonenumber" placeholder="电话号码"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userInfo.email" placeholder="邮箱"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="10" :offset="2" class="user-avatar">
              <el-row>
                <el-col :span="12" :offset="6" style="text-align: center" class="avatar-box">
                  <imageUpload :limit="1" v-model="userInfo.avatar"/>

                </el-col>
              </el-row>

            </el-col>

          </el-row>
          <el-row>
            <el-col :span="8" :offset="8" class="btnSubmit">
              <el-form-item>
                <el-button type="primary" @click="update">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {updateUserProfile} from '@/api/admin/user'
  import OFooter from '../common/footer'
  import {getToken} from '@/utils/auth'
  import {mapState} from 'vuex'
  import {isNotEmpty, notifySuccess, notifyFail} from '@/utils/util'
  import store from '@/store'

  export default {
    data() {
      return {
        labelPosition: 'right',
        disabled: true,
        rules: {
          nickName: [{required: true, message: '请输入姓名', trigger: 'change'}],
          email: [
            {required: true, message: "邮箱地址不能为空", trigger: "blur"},
            {
              type: "email",
              message: "'请输入正确的邮箱地址",
              trigger: ["blur", "change"]
            }
          ],
          phonenumber: [
            {required: true, message: "手机号码不能为空", trigger: "blur"},
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: "请输入正确的手机号码",
              trigger: "blur"
            }
          ]
        },
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        params: {
          busiType: '1'
        }
      }
    },
    components: {
      OFooter
    },
    created() {
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    methods: {
      update() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            updateUserProfile(this.userInfo).then(response => {
              notifySuccess(this, '修改成功')
              // 重新拉取用户信息
              store.dispatch('GetUserInfo').then(res => {
                console.log('重新获取用户信息成功.')
              }).catch((err) => {
                console.error(err)
              })
            }).catch(() => {
              notifyFail(this, '修改失败')
            })
          }
        })
      },

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .message {
    margin-bottom: 20px;
  }

  .proForm{
    width: 90%;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  @media(max-width: 1160px) {

    .proForm{
      width: 100%;
    }

    .user-box{
      width: 96% !important;
      margin-left: 0 !important;
    }

    .content-container{
      margin-top: 1rem !important;
    }

    .user-info{
      width: 100%;
      margin-top: 220px;
    }

    .user-avatar {
      width: 100%;
      position: absolute;
      top: 0;
      margin-left: 0 !important;
    }

    .avatar-box{
      width: 100% !important;
      margin-left: 5%;
    }

    .btnSubmit{
      margin-left: 0 !important;
    }

  }

</style>
