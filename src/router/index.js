import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import cms from '@/components/cms'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/cms',
      name: 'cms',
      component: cms
    }
  ]
})
