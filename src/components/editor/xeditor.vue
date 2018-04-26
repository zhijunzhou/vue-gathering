<template>
  <textarea :id="id" :value="value"></textarea>
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

const INIT = 0
const CHANGED = 2

export default {
  props: {
    value: {
      type: String,
      required: true
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
      status: INIT,
      id: 'editor-' + new Date().getMilliseconds()
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
      // inline: true,
      menubar: false,
      branding: false,
      plugins: ['code', 'table', 'image', 'fullscreen'],
      toolbar1: 'undo redo | formatselect | bold italic | image table ' +
                '| alignleft aligncenter alignright alignjustify | bullist' +
                ' numlist outdent indent | removeformat | code | fullscreen',
      content_css: ['//www.tinymce.com/css/codepen.min.css'],
      init_instance_callback: (editor) => {
        editor.on('input change undo redo', () => {
          var content = editor.getContent()
          console.log(content)
          _this.$emit('input', content)
        })
      }
    }
    Object.assign(setting, _this.setting)
    tinymce.init(setting)
  },
  beforeDestroy () {
    tinymce.get(this.id).destroy()
  }
}
</script>
