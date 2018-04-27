<template>
  <div>
    <div :id="id" :value="value"></div>
    <input type="file" :id="id + '-file'" @change="attachmentSelected" hidden />
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/image'
import 'tinymce/plugins/table'
import 'tinymce/plugins/fullscreen'
import axios from 'axios'

const INIT = 0
const CHANGED = 2

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    uploadUrl: {
      type: String
    },
    imgBaseUrl: {
      type: String
    },
    setting: {}
  },
  watch: {
    value: (val) => {
      if (this.status === INIT || tinymce.activeEditor.getContent() !== val) {
        tinymce.activeEditor.setContent(val)
      }
      this.status = CHANGED
    }
  },
  data () {
    return {
      editor: null,
      status: INIT,
      id: 'editor-' + new Date().getMilliseconds()
    }
  },
  computed: {
    fileSelector () {
      return '#' + this.id + '-file'
    }
  },
  mounted () {
    const _this = this
    const baseUrl = 'static/skins/lightgray'
    const skinUrl = location.href.indexOf('github.io') !== -1 ? '/vue-gathering/' + baseUrl : baseUrl
    const setting = {
      selector: '#' + _this.id,
      skin_url: skinUrl,
      height: '400',
      branding: false,
      paste_data_images: true,
      plugins: ['code', 'table', 'fullscreen', 'paste'],
      toolbar1: 'undo redo | formatselect | paste bold italic | attachment table ' +
                '| alignleft aligncenter alignright alignjustify | bullist' +
                ' numlist outdent indent | removeformat | code | fullscreen',
      content_css: [
        '//www.tinymce.com/css/codepen.min.css',
        '//use.fontawesome.com/releases/v5.0.10/css/all.css',
        '//cdnjs.cloudflare.com/ajax/libs/element-ui/2.3.6/theme-chalk/index.css'
      ],
      init_instance_callback: (editor) => {
        editor.on('input change undo redo', () => {
          var content = editor.getContent()
          _this.$emit('input', content)
        })
      },
      setup: function (editor) {
        const fileUploader = document.querySelector(_this.fileSelector)
        editor.addButton('attachment', {
          text: '',
          icon: 'image',
          tooltip: '上传文件',
          onclick: function () {
            fileUploader.click()
          }
        })
        _this.editor = editor
      }
    }
    Object.assign(setting, _this.setting)
    tinymce.init(setting)
  },
  methods: {
    extractFileExtenionName (path) {
      var x
      x = path.lastIndexOf('.')
      if (x >= 0) {
        return path.substr(x + 1)
      } else {
        return ''
      }
    },
    attachmentSelected (e) {
      var fileElement = document.querySelector(this.fileSelector)
      if (fileElement.files.length > 0) {
        var _this = this
        var formData = new FormData()

        formData.append('file', fileElement.files[0])
        axios.post(this.uploadUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            _this.clearFileInput(fileElement)
            _this.insertAttachment(res.data)
          })
          .catch(err => {
            _this.clearFileInput(fileElement)
            console.log(err)
          })
      }
    },
    clearFileInput (ctrl) {
      try {
        ctrl.value = null
      } catch (ex) {
        console.err(ex)
      }
      if (ctrl.value) {
        ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl)
      }
    },
    insertAttachment (fileInfo) {
      // let extension = this.extractFileExtenionName(fileInfo.filename)
      let attach = '<img height="20" src="static/images/icons8-attach-50.png" />'
      this.editor.execCommand('mceInsertContent', false, '<a href="' + this.imgBaseUrl + '/' + fileInfo.filename + '">' + attach + '</a>')
    }
  },
  beforeDestroy () {
    tinymce.get(this.id).destroy()
  }
}
</script>
