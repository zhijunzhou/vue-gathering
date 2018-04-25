import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/Home'
import Draggable from '@/components/draggable/draggable'
import ArticleEditor from '@/views/articleEditor'
import Uploader from '@/components/fileUploader/fileUploader'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/editor',
      name: '/editor',
      component: HelloWorld
    },
    {
      path: '/draggable',
      name: 'draggable',
      component: Draggable
    },
    {
      path: '/article-edit',
      name: 'article-edit',
      component: ArticleEditor
    },
    {
      path: '/upload',
      name: 'upload',
      component: Uploader
    }
  ]
})
