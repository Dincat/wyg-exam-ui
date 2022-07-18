// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import store from './store'
import './permission' // 权限控制
import 'element-ui/lib/theme-chalk/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import './icons' // icon
import * as filters from './filters' // global filters
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

// 图片上传组件
import ImageUpload from "@/components/ImageUpload"

// 图片预览组件
import ImagePreview from "@/components/ImagePreview"
import { getConfigKey } from "@/api/config";
Vue.prototype.getConfigKey = getConfigKey

import i18n from './lang' // Internationalization

Vue.config.productionTip = false


Vue.use(ElementUI)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.component('ImagePreview', ImagePreview)
Vue.component('ImageUpload', ImageUpload)

import ba from 'vue-ba'

Vue.use(ba, "f5199e08613d5c43fcf7b9309d246295");
Vue.use(ba, { siteId: "f5199e08613d5c43fcf7b9309d246295" });

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


Vue.use(ElementUI, {
  //size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
