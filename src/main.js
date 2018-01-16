// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入jQ
import 'jquery'
// 引入swiper

// 自适应js
import './config/rem'
// 注册全局组件
import Nav from './components/common/nav'
Vue.component('navHeader',Nav)
import shopList from './components/common/shoplist'
Vue.component('shopList',shopList)
import ratingStar from './components/common/ratingStar'
Vue.component('ratingStar',ratingStar)
import footer from './components/common/footer'
Vue.component('footerBar',footer)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
