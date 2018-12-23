<template>
  <div class="table">
    <!-- 第一屏 -->
    <!-- <div class="box_nr1">
      <div class="sk_box">
        <img src="../../asset/letter/up.png" alt="" width="100%" class="sk_top">
        <img src="../../asset/letter/down.png" alt="" width="100%" class="sk_bottom">
      </div>
      <a class="qifeng" @click="qifeng"><img src="../../asset/letter/qifeng_03.png" alt="" width="15%"></a>
    </div> -->

    <!-- 每一屏页面 -->
    <div class="container">
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
            <p>
              <img src="../../asset/letter/tu5-1.png" alt="" width="83%" style="" />
            </p>
          </div>
          <div class="top_img_box top_img_box0">
            <img src="../../asset/letter/tu5-2.png" alt="" class="tptx" />
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

let nowpage = 0

export default {
  name: 'letter',
  created() {},
  data() {
    return {}
  },
  mounted() {
    $(() => {
      $('.container').swipe({
        swipe: function(event, direction, distance, duration, fingerCount) {
          if (direction === 'up') {
            nowpage = nowpage + 1
          } else if (direction === 'down') {
            nowpage = nowpage - 1
          }

          if (nowpage > 7) {
            nowpage = 7
          }
          if (nowpage < 0) {
            nowpage = 0
          }

          $('.container').animate({ top: nowpage * -100 + '%' }, 400)

          $('.page')
            .eq(nowpage)
            .addClass('cur')
            .siblings()
            .removeClass('cur')
        }
      })
    })
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
.table {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

