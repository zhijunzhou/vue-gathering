<template>
  <textarea :id="id" :value="value"></textarea>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'

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
    const skin_url = location.href.indexOf('github.io') !== -1 ? '/vue-gathering/' + baseUrl : baseUrl
    const setting = {
      selector: '#' + _this.id,
      skin_url: skin_url,
      init_instance_callback: (editor) => {
        // EDITOR = editor
        // console.log('Editor: ' + editor.id + ' is now initialized.')
        editor.on('input change undo redo', () => {
          var content = editor.getContent()
          console.log(content)
          _this.$emit('input', content)
        })
      },
      plugins: []
    }
    Object.assign(setting, _this.setting)
    tinymce.init(setting)
  },
  beforeDestroy () {
    tinymce.get(this.id).destroy()
  }
}
</script>
