<template>
  <div>
    <!-- <h3>写文章</h3> -->
    <h3>{{uid}}</h3>
    <!-- <div id="balloonEditor">
      <p>编辑这里的内容</p>
    </div> -->
    <div name="content" id="editor"></div>
    <div>
      <p>HTML源</p>
      <textarea v-model="htmlContent" style="width: 100%;min-height: 100px;"></textarea>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor'
// import ClassicEditor from '/static/vendors/ckeditor/ckeditor'
import ServicesConfig from '@/utils/ServicesConfig'
import uid from 'uid'

export default {
  name: 'article-editor',
  data() {
    return {
      uid: undefined,
      balloonEditor: null,
      editor: null,
      _changeId: undefined,
      _returnId: undefined,
      imageUrl: undefined,
      htmlContent: undefined,
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
  created() {
    this.initEditorSession()
    socket.emit('join', this.uid)

    window.addEventListener('unload', this.leaveEditing)
  },
  mounted() {
    this.initEditor()
    this.syncArticle()
  },
  beforeDestroy() {
    this.leaveEditing()
  },
  methods: {
    initEditorSession() {
      const session_id = window.sessionStorage.getItem('session_id')
      if (session_id && session_id.length === 10) {
        this.uid = session_id
      } else {
        this.uid = uid(10)
        window.sessionStorage.setItem('session_id', this.uid)
      }
    },
    initEditor() {
      const _this = this
      ClassicEditor.create(
        document.querySelector('#editor'),
        _this.editorSetting
      )
        .then(editor => {
          _this.balloonEditor = editor
          editor.model.document.on('change', (eventInfo, name) => {
            console.log(eventInfo)
            var diffs = editor.model.document.differ.getChanges()

            // 提交变更前，先检查是否是自己提交
            // 不是自己提交_returnId 不等于_changeId
            if (!_this._changeId && !_this._returnId) {
              // 首次提交
              _this.sendMsg(editor, diffs)
            } else if (_this._changeId === _this._returnId) {
              // 自己提交的
              // _this._changeId = uid(16)
              _this.sendMsg(editor, diffs)
            } else {
              _this.sendMsg(editor, diffs)
            }
          })
        })
        .catch(error => {
          console.error(error)
        })
    },
    sendMsg(editor, diffs) {
      if (this.htmlContent !== editor.getData()) {
        this._changeId = uid(16)
        // 将变化内容后的内容和编辑者信息提交到server
        socket.emit(
          'chat message',
          JSON.stringify({
            _id: this._changeId,
            diffs,
            editor: this.uid,
            htmlContent: escape(editor.getData())
          })
        )
        this.htmlContent = editor.getData()
      } else {
        console.log('no change')
      }
    },
    syncArticle() {
      const _this = this
      socket.on('chat message', msg => {
        // _this.editor.setData(msg)
        _this.cacheMsg = msg
        const content = JSON.parse(msg)
        const diffs = content.diffs

        // console.log(_this.uid, unescape(content.htmlContent))
        this.htmlContent = unescape(content.htmlContent)
        _this._returnId = content._id
        if (
          Array.isArray(diffs) &&
          diffs.length > 0 &&
          content.queue[_this.uid] === true
        ) {
          console.log(unescape(content.htmlContent))
          _this.balloonEditor.setData(unescape(content.htmlContent))
        } else {
          console.log('no action need')
        }
      })
    },
    leaveEditing() {
      if (confirm('Are you sure you want to leave?')) {
        socket.emit('leave', this.uid)
        this.uid = undefined
      }
    }
  }
}
</script>
