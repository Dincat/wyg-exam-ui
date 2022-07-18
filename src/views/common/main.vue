<template>
  <section class="main">
    <div class="main-wrapper">
      <div class="main-content">
        <transition name="el-fade-in">
          <router-view :key="key"/>
        </transition>
      </div>

      <div style="clear: both"></div>
    </div>

  </section>
</template>

<script>

  import OFooter from '../common/footer'
  import CountTo from "vue-count-to";

  export default {
    name: 'Main',
    computed: {
      key() {
        return this.$route.fullPath
      }
    },
    components: {
      OFooter,
    },
    methods: {
      // TODO 提交考试
      handleSubmitExam() {
        console.log('handleSubmitExam')
      }
    }
  }
</script>
