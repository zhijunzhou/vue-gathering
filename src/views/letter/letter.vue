<template>
  <div class="table">
    <!-- 第一屏 -->
    <div class="screen-zero" v-if="!opened">
      <div class="sk1_box">
        <img src="../../asset/letter/up.png" alt="" width="100%" class="sk1_top">
        <img src="../../asset/letter/down.png" alt="" width="100%" class="sk1_bottom">
        <div class="open-btn-wrapper">
          <div class="open-letter" @click="qifeng"><img src="../../asset/letter/qifeng_03.png" alt=""></div>
        </div>
      </div>
    </div>

    <!-- 每一屏页面 -->    
    <div class="container" v-show="opened">      
      <div class="page page0">
        <div class="page_box">
          <div class="foot foot0">
            <h2 class="tu1_vt">
              <img src="../../asset/letter/tu1_03.png" alt="" width="70%" />
            </h2>
            <p>
              <img src="../../asset/letter/tu1_07.png" alt="" width="83%" style="" />
            </p>
          </div>
          <div class="top_img_box top_img_box0">
            <img src="../../asset/letter/tp1_07.png" alt="" class="tptx" />
          </div>
        </div>
      </div>
      <div class="page page1">
        <div class="page_box">
          <div class="foot foot0">
            <h2 class="tu1_vt">
              <img src="../../asset/letter/tu2_03.png" alt="" width="70%" />
            </h2>
            <p>
              <img src="../../asset/letter/tu2_06.png" alt="" width="83%" style="" />
            </p>
          </div>
          <div class="top_img_box top_img_box0">
            <img src="../../asset/letter/tu2_10.png" alt="" class="tptx" />
          </div>
        </div>
      </div>
      <div class="page page2">
        <div class="page_box">
          <div class="foot foot0">
            <h2 class="tu1_vt">
              <img src="../../asset/letter/tu2_03.png" alt="" width="70%" />
            </h2>
            <p>
              <img src="../../asset/letter/tu2_07.png" alt="" width="83%" style="" />
            </p>
          </div>
          <div class="top_img_box top_img_box0">
            <img src="../../asset/letter/tu3_2.png" alt="" class="tptx" />
          </div>
        </div>
      </div>
      <div class="page page3">
        <div class="page_box">
          <div class="foot foot0">
            <h2 class="tu1_vt">
              <img src="../../asset/letter/tu2_03.png" alt="" width="70%" />
            </h2>
            <p>
              <img src="../../asset/letter/3-3.png" alt="" width="83%" style="" />
            </p>
          </div>
          <div class="top_img_box top_img_box0">
            <img src="../../asset/letter/tu3-3.png" alt="" class="tptx" />
          </div>
        </div>
      </div>
      <div class="page page4">
        <div class="page_box">
          <div class="foot foot0">
            <h2 class="tu1_vt">
              <img src="../../asset/letter/tu2_03.png" alt="" width="70%" />
            </h2>
            <p>
              <img src="../../asset/letter/3-3.png" alt="" width="83%" style="" />
            </p>
          </div>
          <div class="top_img_box top_img_box0">
            <img src="../../asset/letter/tu3-4.png" alt="" class="tptx" />
          </div>
        </div>
      </div>
      <div class="page page5">
        <div class="page_box">
          <div class="foot foot0">
            <h2 class="tu1_vt">
              <img src="../../asset/letter/tu4.png" alt="" width="70%" />
            </h2>
            <p>
              <img src="../../asset/letter/tu4-1.png" alt="" width="83%" style="" />
            </p>
          </div>
          <div class="top_img_box top_img_box0">
            <img src="../../asset/letter/tu4-2.png" alt="" class="tptx" />
          </div>
        </div>
      </div>
      <div class="page page6">
        <div class="page_box">
          <div class="foot foot0">
            <h2 class="tu1_vt">
              <img src="../../asset/letter/tu5.png" alt="" width="70%" />
            </h2>
          </div>
          <div>
            <div class="last-page-image">
              <img src="../../asset/letter/tu5-1.png" alt="" width="80%" />
            </div>
            <div class="more-text">
              <img src="../../asset/letter/tu5-2.png" width="80%" alt="" class="tptx" />
            </div>
          </div>
          <div class="top_img_box top_img_box0">
            <a href="./sign.html" class="jiyi wztx"><img src="../../asset/letter/start2019.png" alt="" width="70%" /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部箭头 -->
    <img
      v-show="nowpage > 0 && nowpage < 6"
      src="../../asset/letter/jiantou_03.png"
      alt=""
      class="jiantou"
      width="5%"
    />

    <!-- 音符位置 -->
    <a class="yinyue" @click="swapMusic">
      <img src="../../asset/letter/yinfu.png" alt="" width="70%">
      <img src="../../asset/letter/open.png" alt="" class="open" width="100%">
      <img src="../../asset/letter/close.png" alt="" class="close" width="30%">
    </a>
    <!-- 音频 -->
    <audio
        id="myaudio"
        controls="controls"
        height="100"
        width="100"
        hidden="hidden"
        autoplay
        loop="loop"
      >
      <source src="../../asset/letter/2.mp3" type="audio/mp3" />
      <embed height="100" width="100" src="../../asset/letter/2.mp3" />
    </audio>
  </div>
</template>

<script>
import $ from 'jquery'
import 'jquery-touchswipe'

export default {
  name: 'letter',
  created() {},
  data() {
    return {
      nowpage: 0,
      opened: false
    }
  },
  mounted() {
    const that = this
    $(() => {
      $('.container').swipe({
        swipe: function(event, direction, distance, duration, fingerCount) {
          if (direction === 'up') {
            that.nowpage = that.nowpage + 1
          } else if (direction === 'down') {
            that.nowpage = that.nowpage - 1
          }

          if (that.nowpage > 6) {
            that.nowpage = 6
          }
          if (that.nowpage < 0) {
            that.nowpage = 0
          }

          $('.container').animate({ top: that.nowpage * -100 + '%' }, 400)

          $('.page')
            .eq(that.nowpage)
            .addClass('cur')
            .siblings()
            .removeClass('cur')
        }
      })
    })
    that.playMusic()
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
    },
    swapMusic() {
      var oAudio = document.getElementById('myaudio')
      if (oAudio.paused) {
        oAudio.play()
        $('.open').css('display', 'block')
        $('.close').css('display', 'none')
      } else {
        oAudio.pause()
        $('.close').css('display', 'block')
        $('.open').css('display', 'none')
      }
    },
    playMusic() {
      var audio = $('#myaudio')
      if (audio && typeof audio.play === 'function') {
        audio.play()
      }
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
.table {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.open-btn-wrapper {
  display: block;
  position: absolute;
  top: 84%;
  width: 100%;
  text-align: center;
}
.open-letter {
  cursor: pointer;
  display: inline-block;
  animation: kaiqi 2s both 0.5s infinite;
}
.open-letter img {
  height: 40px;
}
@keyframes kaiqi {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
.screen-zero {
  display: flex;
  justify-content: center;
  padding: 20px 20px;
}
.screen-zero .sk1_box {
  text-align: center;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.screen-zero .sk1_box img {
  display: block;
}
.screen-zero .sk1_box .sk1_bottom {
  position: absolute;
  top: 0;
  left: 0;
}
.foot h2.tu1_vt {
  height: 100px;
}
.foot > p {
  height: 105px;
}
.last-page-image {
  text-align: center;
  position: relative;
}
.last-page-image {
  height: 100px;
}
.more-text {
  margin-top: 40px;
  text-align: center;
}
.jiantou {
  position: fixed;
  bottom: 10px;
  right: 50%;
  height: 10px;
  display: block;
  z-index: 65535;
  opacity: 0.6;
}
</style>

