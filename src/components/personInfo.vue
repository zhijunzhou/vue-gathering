<template>
  <div class="personal-info-area">
    <div class="middle-cup-container text-center">
      <img class="middle-cup" v-if="student.result === 'signUp'" src="../asset/materials/success.png" />
      <img class="middle-cup" v-else src="../asset/materials/fail.png" />
    </div>
    <div class="student-info text-center">
      <span class="student-name">{{student.stu_name}}</span>
      <div class="guliyu">
        人生没有失败，自信创造精彩。
      </div>
    </div>
    <div class="dotted-spaced"></div>
    <div class="zixun-info">
      <div class="zixun-item">
        <div class="float-left">
          <span class="zixun-item-label">到访分校</span>
          <span class="zixun-item-content">{{student.orgName4}}</span>
        </div>
        <div class="float-right">
          <a v-if="student.phone" :href="'tel://' + student.phone" class="advisor-phone"><i class="fas fa-phone fa-sm zixun-icon-phone"></i></a>
        </div>
      </div>
      <div class="zixun-item">
        <span class="zixun-item-label">咨询课顾</span>
        <span class="zixun-item-content">{{student.name}}</span>
      </div>
      <div class="zixun-item">
        <span class="zixun-item-label">到访时间</span>
        <span class="zixun-item-content">{{getTime(student.start_time)}}</span>
      </div>
    </div>
    <div class="semi-circle">
      <div class="left-semi-circle"></div>
      <div class="right-semi-circle"></div>
    </div>
    <div class="class-special-area">
      <div class="left">
        <div class="class-top">{{student.select_class}}</div>
        <div class="class-item">{{student.special}}</div>
      </div>
      <div class="right">
        <img class="qrcode-img" src="../asset/materials/qrcode.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    student: {
      required: true
    }
  },
  methods: {
    getTime(date) {
      return moment(date).format('YYYY-MM-DD HH:mm')
    },
    specialList(special) {
      const regex = new RegExp(/(，)|(\,)/, 'g')
      special = special.replace(regex, '、')
      return special.split('、')
    }
  }
}
</script>

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
  height: 100px;
}
.student-info {
  padding-bottom: 20px;
}
.dotted-spaced {
  background: url('../asset/materials/dotted.png');
  height: 10px;  
  background-repeat: repeat-x;
  background-size: 80% 40%;
  background-position-x: center;
  /* padding: 1em;
  border-bottom: 1px dotted transparent;
  background: linear-gradient(white,white) padding-box,
  repeating-linear-gradient(-45deg,#ccc 0, #ccc 0.25em,white 0,white 0.75em); */
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
  padding: 10px 20px;
}
.class-special-area {
  padding: 10px 20px;
}
.qrcode-img {
  height: 62px;
}
.semi-circle {
  height: 10px;
  display: flex;
  justify-content: space-between;
}
.left-semi-circle, .right-semi-circle {
  width: 5px;
  background: #eee;
}
.left-semi-circle {
  border-radius: 0 10px 10px 0;
}
.right-semi-circle {
  border-radius: 10px 0 0 10px;
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
.advisor-phone {
  color: #888;
  text-decoration: none;
}
.class-special-area {
  display: flex;
}
.class-special-area .left {
  width: auto;
  flex-grow: 1;
  height: auto;
  padding-right: 5px;
}
.class-special-area .right {
  width: 80px;
  min-width: 80px;
  max-width: 80px;
  height: auto;
  flex-grow: 0;
  text-align: right;
  border-left: 2px dotted #eee;
}
</style>

