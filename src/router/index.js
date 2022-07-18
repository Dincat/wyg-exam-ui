import Vue from 'vue'
import Router from 'vue-router'


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/home')
      },
      {
        path: '/contactUs',
        name: 'contactUs',
        component: () => import('@/views/us/us')
      },

      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/login/login')
      },
      {
        path: '/practices',
        name: 'practices',
        component: () => import('@/views/exam/practices')
      },
      {
        path: '/exams',
        name: 'exams',
        component: () => import('@/views/exam/exams')
      },

      {
        path: '/exam-details',
        name: 'exam-details',
        component: () => import('@/views/exam/examDetails')
      },



      {
        path: '/start/:id',
        name: 'start',
        component: () => import('@/views/exam/startExam')
      },
      {
        path: '/exam-record',
        name: 'exam-record',
        component: () => import('@/views/exam/examRecords')
      },
      {
        path: '/knowledge',
        name: 'knowledge',
        component: () => import('@/views/exam/knowledge')
      },

      {
        path: '/courses',
        name: 'courses',
        component: () => import('@/views/exam/courses')
      },
      {
        path: '/course-details',
        name: 'course-details',
        component: () => import('@/views/exam/courseDetails')
      },
      {
        path: '/account',
        name: 'account',
        component: () => import('@/views/personal/account')
      },
      {
        path: '/password',
        name: 'password',
        component: () => import('@/views/personal/password')
      },
      {
        path: '/incorrect',
        name: 'incorrect',
        component: () => import('@/views/exam/incorrect')
      },
      {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import('@/views/personal/resetPassword')
      },

    ]
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/wxLogin',
    name: 'wxLogin',
    component: () => import('@/views/login/wxLogin')
  },

  {
    path: '*',
    redirect: '/home'
  }
]
export default new Router({
  mode: 'history', // 去掉url中的#
  routes: constantRouterMap
})
