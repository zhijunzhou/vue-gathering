<template>
  <div class="weixin-public-area">
    <div class="weixin-public-info text-center">
      <img src="../asset/materials/gzh.png" />
      <div class="wx-public-name">{{publicName}}</div>
      <div class="wx-public-intro">{{publicIntro}}</div>
      <div class="text-center">
        <div class="wx-care-btn">关注</div>
      </div>
    </div>
    <div class="weixin-articels">
      <div class="related-articels">相关文章</div>
      <div class="articel-item" v-for="(at, index) in articels" :key="index">
        <div class="articel-left">
          <div class="articel-title">{{at.title}}</div>
          <div class="articel-created">{{at.created}}</div>
        </div>
        <div class="articel-img-container">
          <div class="articel-img">&nbsp;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      publicName: '公众号名字',
      publicIntro: '这个时代一定会犒赏默默努力的人，即使他出生卑微、贫贱...',
      articels: [
        {
          title: '越来越固话的社会阶层，你该如何向上打破？',
          created: '2018年4月20日'
        },
        {
          title: '越来越固话的社会阶层，你该如何向上打破？',
          created: '2018年4月20日'
        },
        {
          title: '越来越固话的社会阶层，你该如何向上打破？',
          created: '2018年4月20日'
        }
      ]
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
  padding-top: 30px;
  padding-bottom: 20px;
}
.weixin-public-info {
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
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
  border: 1px solid #eee;
  border-radius: 5px;
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
