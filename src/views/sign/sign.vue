<template>
  <div class="box">
    <div class="box_nr">
      <div class="sr_top">
        <img src="../../asset/letter/your2019.png" alt="" width="65%" />
      </div>
      <div class="sctx">
        <div class="sbct_bt">
          <img src="../../asset/letter/tu7_07.png" alt="" width="30%" />
        </div>
        <section class="logo-license">
          <div class="half">
            <div class="logo_box">
              <img
                src="../../asset/letter/double7_07.png"
              />
            </div>
            <a><img class="red-btn upload-avatar" height="40" src="../../asset/letter/upload-avatar.png" alt="" /></a>
          </div>
          <div class="clear"></div>
        </section>
      </div>
      <div class="canvasDiv">
        <div class="qianm_bt">
          <img src="../../asset/letter/tu7_14.png" alt="" width="60%" />
        </div>
        <div id="editing_area">
          <canvas id="canvasEdit"></canvas>
        </div>
      </div>

      <div class="imgDiv"><span id="sign_show"></span></div>

      <div class="btnDiv">
        <div id="sign_clear" class="qingchu">
          <img src="../../asset/letter/tu7_18.png" alt="" width="60%" />
        </div>
        <div id="sign_ok" class="tijiao">
          <img class="red-btn" src="../../asset/letter/complete-upload.png" height="40" alt="" />
        </div>
      </div>
    </div>
    <a onclick="swap_music()" class="yinyue">
      <img src="../../asset/letter/yinfu.png" alt="" width="70%" />
      <img src="../../asset/letter/open.png" alt="" class="open" width="100%" />
      <img src="../../asset/letter/close.png" alt="" class="close" width="30%" />
    </a>
    <audio
      id="myaudio"
      controls="controls"
      height="100"
      width="100"
      hidden="hidden"
      autoplay="autoplay"
      loop="loop"
    >
      <source src="../../asset/letter/2.mp3" type="audio/mp3" />
      <embed height="100" width="100" src="../../asset/letter/2.mp3" />
    </audio>
  </div>
</template>

<script>
import $ from 'jquery'
import '@/utils/esign'
import '@/utils/hammer'
import '@/utils/iscroll-zoom'
import '@/utils/do-in'

export default {
  data() {
    return {}
  },
  mounted() {
    // const that = this
    $(function() {
      $().esign('canvasEdit', 'sign_show', 'sign_clear', 'sign_ok')
    })
  }
}
</script>

<style>
@import url('../../style/style.css');
@import url('../../style/touxiang.css');
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
.box {
  padding: 40px 30px;
}
.sbct_bt {
  text-align: center;
}
.logo_box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  margin: 8px;
}
.logo_box img {
  height: 68px;
  width: 68px;
  text-align: center;
}
.qianm_bt {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}
#editing_area {
  width: 100%;
  overflow: hidden;
  border: solid 1px #dcdcdc;
  border-radius: 8px;
  margin: 10px auto;
}
#canvasEdit {
  width: 350px;
  height: 80px;
}
.red-button {
  height: 30px;
}
.btnDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.half {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.sctx {
  padding-bottom: 20px;
}
#sign_clear {
  text-align: center;
}
#sign_ok {
  margin-top: 10px;
}
.sr_top {
  text-align: center;
  padding-bottom: 20px;
}
</style>

