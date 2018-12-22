<template>
  <div class="table">
    <!-- 第一屏 -->
    <div class="box_nr1" style="">
      <div class="sk_box">
        <img src="../../asset/letter/up.png" alt="" width="100%" class="sk_top">
        <img src="../../asset/letter/down.png" alt="" width="100%" class="sk_bottom">
      </div>
      <a class="qifeng"><img src="../../asset/letter/qifeng_03.png" alt="" width="15%"></a>
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
  methods: {}
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

