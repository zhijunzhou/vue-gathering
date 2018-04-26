<template>
  <div name="content" v-bind:id="'editor_' + editorId"></div>
</template>

<script>
/* eslint-disable */
import ServicesConfig from '@/utils/ServicesConfig'
import uid from 'uid'

export default {
  data() {
    return {
      editorId: uid(5),
      uid: undefined,
      balloonEditor: null,
      title: '',
      editor: null,
      participators: [],
      imageUrl: undefined,
      cacheMsg: undefined,
      editorSetting: {
        cloudServices: ServicesConfig.cloudServices,
        image: {
          styles: ['full', 'alignLeft', 'alignRight'],
          toolbar: [
            'imageStyle:alignLeft',
            'imageStyle:full',
            'imageStyle:alignRight',
            '|',
            'imageTextAlternative'
          ]
        }
      }
    }
  },
  props: [
    'message'
  ],
  watch: {
    message (newMessage, oldMessage) {
      if (newMessage !== oldMessage) {
        this.balloonEditor.setData(newMessage)
      }
    }
  },
  mounted() {
    this.initEditor()
  },
  created () {
    this.initEditorSession()
  },
  destroyed () {
    this.balloonEditor.destroy()
      .then(() => {
        console.log(this.uid, 'has been destroyed')
      })
      .catch(error => {
        console.error(error)
      })
  },
  methods: {
    initEditor() {
      const _this = this
      ClassicEditor.create(
        document.querySelector('#editor_' + _this.editorId),
        _this.editorSetting
      )
        .then(editor => {
          _this.clearEditorBorder()
          _this.balloonEditor = editor
          editor.model.document.on('change', (eventInfo, name) => {
            let diffs = editor.model.document.differ.getChanges()
            _this.sendMsg(editor, diffs)
          })
        })
        .catch(error => {
          console.error(error)
        })      
    },
    sendMsg(editor, diffs) {
      if (this.message !== editor.getData()) {
        let _changeId = uid(16)
        this.$emit(
          'sendMessage',
          JSON.stringify({
            _id: _changeId,
            diffs,
            editor: this.uid,
            title: this.title,
            htmlContent: escape(editor.getData())
          })
        )
      } else {
        console.log('no change')
      }
    },
    clearEditorBorder () {
      document.querySelector('.ck.ck-editor__main > .ck-editor__editable:not(.ck-focused)').style.border = "none"
    },
    initEditorSession() {
      const session_id = window.sessionStorage.getItem('session_id')
      if (session_id && session_id.length === 10) {
        this.uid = session_id
      } else {
        this.uid = uid(10)
        window.sessionStorage.setItem('session_id', this.uid)
      }
    }
  }
}
</script>

