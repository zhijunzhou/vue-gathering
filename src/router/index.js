import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'
// import Home from '../views/home/Home'
// import Opinion from '../views/opinion/opinion'
import Letter from '../views/letter/letter'
import Sign from '../views/sign/sign'
import Share from '../views/share/share'

export const constantRouterMap = [{
  path: '/',
  name: '/',
  component: Layout,
  redirect: '/letter',
  children: [
    {
      path: '/letter',
      name: 'Letter',
      component: Letter
    },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign
    },
    {
      path: '/share/:id',
      name: 'Share',
      component: Share
    }
  ]
}]

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
