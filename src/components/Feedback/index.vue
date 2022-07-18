<template>
  <div>
    <el-form label-position="right" label-width="80px" :model="feedback" :rules="rules" ref="fbForm" >

      <el-row>
        <el-col :span="24">
          <el-form-item label="标题" prop="title">
            <el-input v-model="feedback.title" placeholder="请输入标题"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="反馈类型" prop="feedbackType">
            <el-select v-model="feedback.feedbackType" placeholder="请选择反馈类型" clearable size="small">
              <el-option v-for="(dict,index) in feedbackTypes"
                         :key="dict.dictValue"
                         :label="dict.dictLabel"
                         :value="dict.dictValue"
              ></el-option>
            </el-select>


          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="昵称" prop="userName">
            <el-input v-model="feedback.userName" placeholder="请输入您的昵称"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="feedback.phone" placeholder="请输入联系电话"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="QQ/微信" prop="qq">
            <el-input v-model="feedback.qq" placeholder="请输入您的QQ号或微信号"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="feedback.email" placeholder="请输入您的邮箱"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="反馈内容" prop="content">
            <el-input :autosize="{ minRows: 4, maxRows: 6}" v-model="feedback.content" type="textarea"
                      placeholder="请输入反馈内容"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" :offset="8">
          <el-button @click="submit" type="primary">提交</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>

  import {getDictData} from "../../api/config";
  import {addFeedback} from "@/api/feedback/feedback";

  export default {
    name: "index",
    data() {
      return {
        feedback: {
          title: '',
          content: '',
          userName: '',
          qq: '',
          email: '',
          phone: '',
          images: '',
          feedbackType: '',
          clientType: 'SignLanguage',
          clientVersion: 'V 1.0',
          deviceInfo: '',
          osInfo: '',
        },
        feedbackTypes: [],
        // 表单校验
        rules: {
          userName: [
            {required: true, message: "请输入您的昵称", trigger: "blur"}
          ],
          content: [
            {required: true, message: "反馈内容不能为空", trigger: "blur"}
          ],
        }
      }
    },
    created() {
      this.getDictData();
    },
    methods: {
      getDictData() {
        getDictData('feedback_type').then(resp => {
          this.feedbackTypes = resp.data;
        });
      },
      submit() {
        addFeedback(this.feedback).then(response => {
          this.$notify.success({
            title: '成功',
            message: '提交成功，感谢您的反馈！'
          })
          this.$refs.fbForm.resetFields();
          this.$emit("submited");

        });
      }
    }

  }
</script>

<style scoped>

</style>
