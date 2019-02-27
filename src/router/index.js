import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import cms from '@/components/cms'
import details from '@/components/cms/details'
import addNew from '@/components/cms/addNew'
import gather from '@/components/gather'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home/:id',
      name: 'home',
      component: home,
      // redirect: '/home/lasted'
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
        }
      ]
    },
    {
      path: '/gather',
      name: 'gather',
      component: gather,
    },
  ]
})
