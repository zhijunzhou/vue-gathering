<template>
  <div class="box">
    <div class="box_nr">
      <div class="sr_top">
        <img src="../../asset/letter/your2019.png" alt="" width="65%" />
      </div>
      <div class="sctx">
        <div class="sbct_bt force-pull-left">
          <img src="../../asset/letter/tu7_07.png" alt="" width="38%" />
        </div>
        <section class="logo-license">
          <div class="half">
            <div class="logo_box" @click="triggerSelectFile">
              <img
                src="../../asset/letter/double7_07.png"
              />
            </div>
            <div v-if="!isAvatarValid" class="avatar-error">请上传照片</div>
            <a @click="triggerSelectFile"><img class="red-btn upload-avatar" height="30" src="../../asset/letter/upload-avatar.png" alt="" /></a>
            <div style="height:0; overflow:hidden; position:absolute;">
              <input type="file" id="file" @click="chooseFile" accept="image/*" />
            </div>
          </div>
          <div class="clear"></div>
        </section>
        <article class="htmleaf-container" style="display: none;">
          <div id="clipArea" style="user-select: none; overflow: hidden; position: relative;"><div class="photo-clip-view" style="position: absolute; left: 50%; top: 50%; width: 350px; height: 350px; margin-left: -175px; margin-top: -175px;"><div class="photo-clip-moveLayer" style="transform-origin: 0px 0px 0px; transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) scale(1) translateZ(0px); touch-action: none; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div class="photo-clip-rotateLayer"></div></div></div><div class="photo-clip-mask" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; pointer-events: none;"><div class="photo-clip-mask-left" style="position: absolute; left: 0px; right: 50%; top: 50%; bottom: 50%; width: auto; height: 350px; margin-right: 175px; margin-top: -175px; margin-bottom: -175px; background-color: rgba(0, 0, 0, 0.5);"></div><div class="photo-clip-mask-right" style="position: absolute; left: 50%; right: 0px; top: 50%; bottom: 50%; margin-left: 175px; margin-top: -175px; margin-bottom: -175px; background-color: rgba(0, 0, 0, 0.5);"></div><div class="photo-clip-mask-top" style="position: absolute; left: 0px; right: 0px; top: 0px; bottom: 50%; margin-bottom: 175px; background-color: rgba(0, 0, 0, 0.5);"></div><div class="photo-clip-mask-bottom" style="position: absolute; left: 0px; right: 0px; top: 50%; bottom: 0px; margin-top: 175px; background-color: rgba(0, 0, 0, 0.5);"></div><div class="photo-clip-area" style="border: 1px dashed rgb(221, 221, 221); position: absolute; left: 50%; top: 50%; width: 350px; height: 350px; margin-left: -176px; margin-top: -176px;"></div></div></div>
          <div class="foot-use">
            <div class="foot-user-wrapper">
              <div class="quxiao-wrapper">
                <div id="quxiao" @click="quxiao">取消</div>
                <!-- <input type="button" class="button" id="quxiao" @click="quxiao" value="取消" /> -->
                <!-- <input id="file" type="file" onChange="javascript:setImagePreview();" accept="image/*" multiple  /> -->
              </div>
              <div class="clip-btn-wrapper">
                <div id="clipBtn">截取</div>
                <!-- <button id="clipBtn">截取</button> -->
              </div>
            </div>
          </div>
          <div id="view" style="background-color: rgb(102, 102, 102); background-repeat: no-repeat; background-position: center center; background-size: contain;"></div>
        </article>
      </div>
      <div class="canvasDiv">
        <div class="qianm_bt force-pull-left">
          <img src="../../asset/letter/tu7_14.png" alt="" width="60%" />
        </div>
        <div id="editing_area">
          <canvas id="canvasEdit"></canvas>
        </div>
      </div>

      <div class="imgDiv"><span id="sign_show"></span></div>

      <div class="btnDiv">
        <div id="sign_clear" @click="clearSign" class="qingchu">
          <img src="../../asset/letter/tu7_18.png" alt="" width="55%" />
        </div>
        <div id="sign_ok" class="tijiao" @click="signOK">
          <img class="red-btn" src="../../asset/letter/complete-upload.png" height="30" alt="" />
        </div>
      </div>
    </div>
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
      <embed height="100" width="100" src="../../asset/letter/2.mp3" />
    </audio>
  </div>
</template>

<script>
import $ from 'jquery'
import '@/utils/esign'
import PhotoClip from 'photoclip'
import { saveSign } from '@/api'
import { getOS } from '@/utils/weixin'
import bj1 from '../../asset/letter/bj1.png'

export default {
  data() {
    return {
      cp: undefined,
      avatar: undefined,
      id: undefined,
      isAvatarValid: true
    }
  },
  mounted() {
    const that = this
    $(function() {
      $().esign('canvasEdit', 'sign_show', 'sign_clear', 'sign_ok')
      $('#app').css('background', 'url(' + bj1 + ')')
      $('#app').css('background-size', '100% 100%')
      that.initClipArea()
    })
    const HEIGHT = $('body').height()
    $(window).resize(function() {
      $('#app').height(HEIGHT)
    })
    that.playMusic()
  },
  methods: {
    triggerSelectFile() {
      $('#file').click()
    },
    quxiao() {
      $('.htmleaf-container').hide()
      $('.photo-clip-rotateLayer').empty()
    },
    clearSign() {
      console.log('清除签名')
    },
    signOK() {
      const canvasEdit = document.getElementById('canvasEdit')
      const avatar = this.avatar
      const signData = canvasEdit.toDataURL('i/png')
      const that = this
      if (!avatar) {
        that.isAvatarValid = false
        return
      } else {
        that.isAvatarValid = true
      }
      saveSign(signData, avatar).then(res => {
        if (res && res.code === 200) {
          that.id = res.data.id
          // that.$router.push('/share?id=' + that.id)
          // that.$router.push({ name: 'Share', params: { id: that.id }})
          const url = (process.env.ORIGIN || window.location.origin) + '/#/share/' + that.id
          if (getOS() === 'iOS') {
            window.location = url
          } else {
            window.location.href = url
          }
        }
      })
    },
    completeClip(dataURL) {
      $('.htmleaf-container').hide()
      $('.logo_box').empty()
      $('.logo_box').append(
        '<img src="' +
          dataURL +
          '" align="absmiddle" id="jietu" style=" width: 5.5rem;height: 5.5rem;">'
      )
      $('.htmleaf-container').hide()
      $('#bgl').hide()
    },
    initClipArea() {
      const that = this
      new PhotoClip('#clipArea', {
        lrzOption: {
          width: 350,
          height: 350
        },
        size: [200, 200],
        file: '#file',
        view: '#view',
        ok: '#clipBtn',
        loadStart() {
          console.log('照片读取中')
        },
        loadComplete() {
          console.log('照片读取完成')
          $('.htmleaf-container').show()
          // $('#sign_ok').attr('onclick', 'baocun()')
        },
        done(dataURL) {
          console.log(dataURL)
          if (typeof dataURL === 'string') {
            that.isAvatarValid = true
          }
          that.avatar = dataURL
          that.completeClip(dataURL)
        }
      })
    },
    chooseFile(e) {
      if (e && e.target) {
        if (e.target.files && e.target.files.length > 0) {
          // const files = e.target.files
          // console.log(this.getObjectURL(files[0]))
        }
      }
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
    },
    getObjectURL(file) {
      var url = null
      if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    }
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
  padding: 40px 30px !important;
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
  height: 68px !important;
  width: 68px !important;
  text-align: center;
}
.qianm_bt {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  height: auto;
}
#editing_area {
  /* width: 100%; */
  width: 200px;
  overflow: hidden;
  border: solid 1px #999;
  border-radius: 8px;
  margin: 10px auto;
}
#canvasEdit {
  /* width: 350px; */
  width: 100%;
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
.button {
  font-size: 12px;
}
#clipBtn {
  font-size: 12px;
}
.foot-user-wrapper {
  display: flex;
  flex-direction: row;
}
#quxiao {
  width: 100%;
}
.clip-btn-wrapper {
  width: 50%;
}
.quxiao-wrapper {
  width: 50%;
}
#clipBtn {
  width: 100%;
}
.force-pull-left {
  text-align: left !important;
  padding-left: 30px;
}
.avatar-error {
  font-size: 12px;
  color: #f00;
}
</style>

