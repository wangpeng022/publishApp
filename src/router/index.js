import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import cms from '@/components/cms'
import details from '@/components/cms/details'
import addNew from '@/components/cms/addNew'
import addProduct from '@/components/cms/addProduct'
import gather from '@/components/gather'
import mobile from '@/components/mobile'
import gather_mobile from '@/components/gather_mobile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
    },
    {
      path: '/cms',
      name: 'cms',
      component: cms,
      redirect: '/cms/details',
      children: [
        {
          path: 'details',
          component: details
        },
        {
          path: 'addNew',
          component: addNew
        },
        {
          path: 'addProduct',
          component: addProduct
        }
      ]
    },
    {
      path: '/gather',
      name: 'gather',
      component: gather,
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: mobile,
    },
    {
      path: '/gather_mobile',
      name: 'gather_mobile',
      component: gather_mobile,
    },
  ]
})
