import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'
import Home from '../views/home/Home'

export const constantRouterMap = [{
  path: '/',
  name: '/',
  component: Layout,
  redirect: '/home',
  children: [{
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '咨询卡'
    }
  }]
}]

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
