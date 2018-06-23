<template>
  <div class="personal-info-area">
    <div class="middle-cup-container text-center">
      <img class="middle-cup" src="../asset/materials/报名成功.png" />
    </div>
    <div class="student-info text-center">
      <span class="student-name">周智君</span>
      <span class="student-chengwei">同学</span>
      <div class="guliyu">
        人生没有失败，自信创造精彩。
      </div>
    </div>
    <div class="zixun-info">
      <div class="zixun-item">
        <div class="float-left">
          <span class="zixun-item-label">到访分校</span>
          <span class="zixun-item-content">尚德国贸分校</span>
        </div>
        <div class="float-right">
          <i class="fas fa-phone fa-sm zixun-icon-phone"></i>
        </div>
      </div>
      <div class="zixun-item">
        <span class="zixun-item-label">咨询课顾</span>
        <span class="zixun-item-content">赵悦</span>
      </div>
      <div class="zixun-item">
        <span class="zixun-item-label">到访时间</span>
        <span class="zixun-item-content">2018-06-22 16:30</span>
      </div>
    </div>
    <div class="class-recommand">
      <div class="float-left">
        <div class="class-top">面试精英班（全国19年）</div>
        <div class="class-item">全真模拟面试</div>
        <div class="class-item">班主任跟踪服务</div>
      </div>
      <div class="float-right text-center qrcode">
        <img width="62" height="62" src="../asset/materials/二维码.jpg" />
      </div>
    </div>
  </div>
</template>

<style>
.personal-info-area {
  position: relative;
  min-height: 400px;
  width: 100%;
  border: 1px solid #eee;
  background: #fff;
  border-radius: 8px;
}
.middle-cup-container {
  text-align: center;
}
.middle-cup {
  margin-top: -30px;
}
.student-info {
  padding-bottom: 20px;
  border-bottom: 3px dotted #eee;
}
.student-name {
  font-size: 16px;
  color: #333;
  margin-right: 8px;
}
.student-chengwei {
  font-size: 14px;
  color: #888;
}
.guliyu {
  margin-top: 10px;
  font-size: 12px;
  color: #aaa;
}
.zixun-info,
.class-recommand {
  padding: 20px 20px;
}
.zixun-item {
  display: block;
  clear: both;
  height: 36px;
  line-height: 36px;
}
.zixun-item-label {
  width: 80px;
  color: #aaa;
  font-size: 12px;
}
.zixun-item-content {
  color: #333;
  font-size: 14px;
  padding-left: 12px;
}
.zixun-icon-phone {
  transform: scaleX(-1);
}
.class-top,
.class-item {
  height: 20px;
  line-height: 20px;
}
.class-top {
  font-size: 14px;
  color: #333;
}
.class-item {
  font-size: 12px;
  color: #888;
}
.qrcode {
  width: 100px;
  padding-left: 20px;
  border-left: 2px dotted #eee;
}
</style>

