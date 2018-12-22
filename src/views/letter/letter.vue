<template>
  <div class="table">
    <!-- 第一屏 -->
    <div class="box_nr1" style="">
      <div class="sk_box">
        <img src="../../asset/letter/up.png" alt="" width="100%" class="sk_top">
        <img src="../../asset/letter/down.png" alt="" width="100%" class="sk_bottom">
      </div>
      <a class="qifeng" @click="qifeng"><img src="../../asset/letter/qifeng_03.png" alt="" width="15%"></a>
    </div>

    <!-- 每一屏页面 -->
    <div class="container">
      <div class="page page0">
        <div class="page_box">
          <div class="foot foot0">
            <h2 class="tu1_vt">
              <img src="../../asset/letter/tu1_03.png" alt="" width="70%" />
            </h2>
            <p style="margin-top: 20px;">
              <img src="../../asset/letter/tu1_07.png" alt="" width="83%" style="" />
            </p>
          </div>
          <div class="top_img_box top_img_box0" style="margin-top: 20px;">
            <img src="../../asset/letter/tp1_07.png" alt="" class="tptx" />
          </div>
        </div>
      </div>
    </div>

    <!-- 音符位置 -->
    <a class="yinyue">
      <img src="../../asset/letter/yinfu.png" alt="" width="70%">
      <img src="../../asset/letter/open.png" alt="" class="open" width="100%">
      <img src="../../asset/letter/close.png" alt="" class="close" width="30%">
    </a>
  </div>
</template>

<script>
import $ from 'jquery'
import 'jquery-touchswipe'

export default {
  name: 'letter',
  created() {},
  data() {
    return {}
  },
  mounted() {
    console.log($)
  },
  methods: {
    qifeng() {
      $('.sk_bottom').addClass('sikai')
      $('.sk_top').addClass('sikai_top')
      $('.qifeng').css('display', 'none')
      $('.top_img_box0 img').addClass('tptx fangda')
      $('.foot0 p').addClass('wztx')
      $('.foot0 h2').addClass('bttx')
      setTimeout(function() {
        $('.box_nr1').css('display', 'none')
        $('.jiantou').css('display', 'block')
      }, 1000)
    }
  }
}
</script>

<style>
#app {
  background: #eee;
  background: url("../../asset/letter/bj1.png") no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}
html, body, #app {
  height: 100%;
}

</style>

