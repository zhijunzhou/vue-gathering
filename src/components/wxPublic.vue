<template>
  <div class="weixin-public-area">
    <div class="weixin-public-info text-center">
      <img src="../asset/materials/sunlands-app.png" @click="toUrl(publicHistoryLink)" class="weixin-public-icon" />
      <div class="wx-public-name"  @click="toUrl(publicHistoryLink)">{{publicName}}</div>
      <div class="wx-public-intro">{{publicIntro}}</div>
      <div class="text-center">
        <a :href="publicHistoryLink" class="wx-public-link"><div class="wx-care-btn">关注</div></a>
      </div>
    </div>
    <div class="weixin-articels">
      <div class="related-articels">相关文章</div>
      <div class="articel-item" v-for="(at, index) in articels" :key="index" @click="toUrl(publicHistoryLink)">
        <div class="articel-left">
          <div class="articel-title">{{at.title}}</div>
          <div class="articel-created">{{at.created}}</div>
        </div>
        <div class="articel-img-container">
          <div class="articel-img"><img :src="'static/img/' + at.img" /></div>
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
      publicName: '尚德自考直通车',
      publicIntro: '2018年最新政策，招生简章等一手信息发布平台',
      publicHistoryLink: 'https://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MzUxNzU1ODM2MQ==#wechat_webview_type=1&wechat_redirect',
      articels: [
        {
          title: '成考和自考哪个好？他们有什么区别？',
          created: '原创',
          img: 'article1.png'
        },
        {
          title: '我已经在很努力的加班了，为什么被提拔的总不是我？',
          created: '原创',
          img: 'article2.png'
        },
        {
          title: '听说你想辞职，做一个自由工作者？',
          created: '原创',
          img: 'article3.png'
        }
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
.weixin-public-area {
  background: #fff;
  border-radius: 8px;
  min-height: 50px;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 20px;
}
.weixin-public-info {
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}
.weixin-public-icon {
  width: 80px;
}
.wx-public-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  height: 30px;
}
.wx-public-intro {
  font-size: 14px;
  color: #888;
  min-height: 30px;
  padding: 0 30px;
  line-height: 2;
}
.wx-care-btn {
  width: 100px;
  height: 32px;
  line-height: 30px;
  text-align: center;
  color: #67C23A;
  border-radius: 3px;
  border: 1px solid #67C23A;
  margin: 10px auto;
  cursor: pointer;
}
.wx-public-link {
  text-decoration: none;
}
.weixin-articels {
  padding: 20px;
}
.articel-item {
  height: 75px;
  display: flex;
  justify-content: flex-start;
}
.related-articels {
  font-size: 15px;
  color: #888;
  font-weight: bold;
}
.articel-img-container {
  flex: 1;
}
.articel-img {
  float: right;
  height: 70px;
  width: 100px;
}
.articel-img img {
  height: 70px;
  width: 100px;
}
.articel-title {
  font-size: 13px;
  color: #333;
  padding-bottom: 10px;
}
.articel-created {
  font-size: 12px;
  color: #888;
}
.articel-left {
  padding: 10px 0;
}
</style>
