<template>
  <div class="share-wrapper">
    <div class="share-container">
      <div class="yahei" v-show="showYahei">
        <img src="../../asset/letter/line.png" alt="" width="25%" class="fx_zx" />
        <img src="../../asset/letter/fx.png" alt="" width="60%" class="fx_wz" />
        <img src="../../asset/letter/zhid.png" @click="hideYahei" width="30%" alt="" class="zhidao" />
      </div>
      <img
        :src="imgUrl"
        alt=""
        class="img_bj"
        id="shareImg1992"
      />
      <!-- <img
        src="../../asset/letter/8.png"
        alt=""
        class="img_bj"
        id="shareImg1992"
      />       -->
      <!-- <img src="../../asset/letter/qrcode.png" class="qrcode-bottom" width="50%" /> -->
      <a class="yinyue" @click="swapMusic">
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
        <source src="../../asset/letter/2.mp3" type="audio/ogg" />
        <embed height="100" width="100" src="../../asset/letter/2.mp3" />
      </audio>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { getPhoto } from '@/api'

export default {
  data() {
    return {
      showYahei: false,
      id: undefined,
      imgUrl: undefined
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.id) {
        this.id = this.$route.params.id
        this.getSignPhoto()
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.getSignPhoto()
    }
  },
  mounted() {
    const that = this
    that.playMusic()
    $(function() {
      $('#app').css('background', 'none')
    })
  },
  methods: {
    hideYahei() {
      this.showYahei = false
    },
    getSignPhoto() {
      const that = this
      getPhoto(this.id).then(res => {
        if (res && res.code === 200) {
          that.imgUrl = process.env.BASE_API + res.data.compose_img
          setTimeout(() => {
            that.showYahei = true
          }, 5000)
        }
      })
    },
    swapMusic() {
      var oAudio = document.getElementById('myaudio')
      if (oAudio.paused) {
        oAudio.load()
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
        audio.load()
        audio.play()
      }
      document.addEventListener(
        'WeixinJSBridgeReady',
        function() {
          audio.load()
          audio.play()
        },
        false
      )
    }
  }
}
</script>

<style scoped>
.share-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background: rgb(246, 246, 246);
}
.share-container {
  position: relative;
  height: 100%;
  /* background: url("../../asset/letter/bj2.png");  */
  background-size: 100% 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fff;
}
.yahei {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  position: fixed;
  top: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}
.qrcode-bottom {
  margin-top: -70px;
}
.yahei img {
  display: block;
}
.fx_zx {
  position: absolute;
  top: 2%;
  right: 5%;
}
.fx_wz {
  margin-top: 160px;
}
.zhidao {
  margin-top: 50px;
}
.img_bj {
  /* height: 550px; */
  margin-top: 50px;
  width: 100%;
  /* box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.8); */
}
.blank {
  height: 0;
  background: transparent;
}
</style>


