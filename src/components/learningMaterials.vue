<template>
  <div class="learning-materials">
    <div class="common-title">学习资料</div>
    <div class="materials-container">
      <div class="material-item" v-for="(mt, index) in materials" :key="index" @click="toUrl(mt.url)">
        <div class="float-left">
          <div class="float-left material-img">&nbsp;</div>
          <div class="float-right">
            <span class="material-title">{{mt.title}}</span><br />
            <span class="material-description">{{mt.description}}</span>
          </div>
        </div>
        <div class="find-material float-right">
          <a :href="mt.url"><i class="fas fa-chevron-right fa-sm"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOS } from '@/utils/weixin'

export default {
  data() {
    return {
      materials: [
        {
          title: '尚德机构',
          description: '尚德课程学习APP下载',
          url: getOS() === 'iOS'
            ? 'https://itunes.apple.com/cn/app/%E5%B0%9A%E5%BE%B7%E6%9C%BA%E6%9E%84/id1056448970?mt=8'
            : 'http://www.wandoujia.com/apps-com.sunland.app'
        },
        {
          title: '东直门分校',
          description: '尚德课程学习APP下载',
          url: 'https://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MzIzNzExOTU1Ng==#wechat_webview_type=1&wechat_redirect'
        }
        // {
        //   title: '中关村分校',
        //   description: '尚德课程学习APP下载'
        // }
      ]
    }
  },
  methods: {
    toUrl(url) {
      console.log(url)
      if (getOS() === 'iOS') {
        window.location = url
      } else {
        window.location.href = url
      }
    }
  }
}
</script>


<style>
.learning-materials {
  padding-bottom: 20px;
}
.materials-container {
  background: #fff;
  border-radius: 8px;
  min-height: 50px;
  height: 100%;
}
.materials-container > .material-item {
  border-bottom: 1px solid #eee;
}
.material-item {
  height: 88px;
  padding: 20px 15px;
}
.find-material {
  line-height: 50px;
}
.find-material a {
  color: #888;
  text-decoration: none;
}
.material-img {
  height: 55px;
  width: 80px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-right: 10px;
}
.material-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}
.material-description {
  font-size: 13px;
  color: #888;
}
</style>
