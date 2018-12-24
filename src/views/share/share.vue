<template>
  <div class="share-container">
    <div class="yahei" v-show="showYahei">
      <img src="../../asset/letter/line.png" alt="" width="35%" class="fx_zx" />
      <img src="../../asset/letter/fx.png" alt="" width="70%" class="fx_wz" />
      <img src="../../asset/letter/zhid.png" @click="hideYahei" alt="" class="zhidao" />
    </div>
    <img
      src="../../asset/letter/7.png"
      alt=""
      class="img_bj"
      id="2411"
    />
    <!-- <div class="changan">
      <img src="../../asset/letter/can_03.png" alt="" width="50%" />
    </div> -->
    <!-- </div> -->
    <!-- <a onclick="swap_music()" class="yinyue">
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
    </audio> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      showYahei: true
    }
  },
  methods: {
    hideYahei() {
      this.showYahei = false
    }
  }
}
</script>

<style>
.share-container {
  position: relative;
  height: 100%;
}
.yahei {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  position: fixed;
  top: 0;
  z-index: 9999;
}
.fx_zx {
  position: absolute;
  top: 2%;
  right: 5%;
}
.fx_wz {
  margin-top: 60%;
}
.zhidao {
    margin-top: 20%;
}
</style>


