<template>
  <div :id="id" contenteditable="true" @input="$emit('update:content', $event.target.innerHTML)"></div>
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
    const skinUrl = location.href.indexOf('github.io') !== -1 ? '/vue-gathering/' + baseUrl : baseUrl
    const setting = {
      selector: '#' + _this.id,
      skin_url: skinUrl,
      height: '400',
      inline: true,
      menubar: false,
      plugins: [],
      // content_css: ['//www.tinymce.com/css/codepen.min.css'],
      init_instance_callback: (editor) => {
        // EDITOR = editor
        // console.log('Editor: ' + editor.id + ' is now initialized.')
        editor.on('input change undo redo', () => {
          var content = editor.getContent()
          console.log(content)
          _this.$emit('input', content)
        })
      }
    }
    this.$el.innerHTML = this.value
    Object.assign(setting, _this.setting)
    tinymce.init(setting)
  },
  beforeDestroy () {
    tinymce.get(this.id).destroy()
  }
}
</script>
