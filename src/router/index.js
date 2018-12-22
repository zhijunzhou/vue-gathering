import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'
// import Home from '../views/home/Home'
// import Opinion from '../views/opinion/opinion'
import Letter from '../views/letter/letter'

export const constantRouterMap = [{
  path: '/',
  name: '/',
  component: Layout,
  redirect: '/letter',
  children: [
    {
      path: '/letter',
      name: 'Letter',
      component: Letter,
      meta: {
        title: '致尚德兄弟告白信'
      }
    }
  ]
}]

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
