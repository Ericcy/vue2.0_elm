import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import city from '@/components/city'
import mysite from '@/components/mysite'
import shoplist from '@/components/shoplist'
import select from '@/components/common/select'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path:'/',
      redirect:{name:'Home'}
    },
    //当前选择城市页
    {
      path: '/city/:cityid',
      component: city
    },
    //主页
    {
      path: '/mysite',
      component: mysite
    },
     //商品列表页
     {
      path: '/shoplist/:modulename',
      component: shoplist
    },
      //测试三级联动
      {
        path: '/select',
        component: select
      }
  ]
})
