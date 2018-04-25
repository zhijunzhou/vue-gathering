<template>
  <div>
    <!-- <h3>写文章</h3> -->
    <h3>{{uid}}</h3>
    <div id="balloonEditor">
      <p>编辑这里的内容</p>
    </div>
    <div name="content" id="editor"></div>
    <div>
      <p>源文件</p>
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
      htmlContent: undefined
    }
  },
  created() {
    this.initEditorSession()
    socket.emit('join', this.uid)

    window.addEventListener('unload', this.leaveEditing)
  },
  mounted() {
    this.initEditor()
    // this.initLetters()
    this.syncArticle()
  },
  beforeDestroy () {
    this.leaveEditing()
  },
  methods: {
    initEditorSession () {
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
      BalloonEditor.create(document.querySelector('#balloonEditor'))
        .then(editor => {
          _this.balloonEditor = editor
          editor.model.document.on(
            'change',
            (eventInfo, name, value, oldValue) => {
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
            }
          )
        })
        .catch(error => {
          console.error(error)
        })
      
      ClassicEditor.create(document.querySelector('#editor'), {
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
      })
        .then(editor => {
          _this.editor = editor
        })
        .catch(error => {
          console.error(error)
        })
      
    },
    sendMsg (editor, diffs) {
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
    },
    syncArticle() {
      const _this = this
      socket.on('chat message', msg => {
        // _this.editor.setData(msg)
        const content = JSON.parse(msg)
        const diffs = content.diffs

        console.log(_this.uid, unescape(content.htmlContent))
        this.htmlContent = unescape(content.htmlContent)
        _this._returnId = content._id
        if (
          Array.isArray(diffs) &&
          diffs.length > 0 &&
          _this.uid !== content.editor
        ) {
          diffs.forEach((diff, index) => {
            // attribute insert remove
            if (diff.type !== 'attribute') {
              // _this.balloonEditor.setData(unescape(content.htmlContent))
            } else {
              // _this.balloonEditor.setData(unescape(content.htmlContent))
              // process attribute
              // console.log(' attribute: ', diff, _this.uid, content.queue)
            }
          })
          // _this.editor.setData(unescape(content.htmlContent))
        }
        // content.diffs.forEach((operation) => {
        //   _this.balloonEditor.model.document.differ.bufferOperation(operation)
        // })
        // _this.balloonEditor.setData(unescape(content.htmlContent))
        // _this.editor.setData(content.htmlContent)
      })
    },
    initLetters() {
      Letters.create(document.body, {
        cloudServices: ServicesConfig.cloudServices,
        title: 'Cats',
        body: `<p>Cats are awesome.</p>`
      })
        .then(letters => {
          console.log(letters.getTitle())
          console.log(letters.getBody())
        })
        .catch(error => {
          console.error(error)
        })
    },
    leaveEditing () {
      if (confirm("Are you sure you want to leave?")) {
        socket.emit('leave', this.uid)
        this.uid = undefined
      }
    }
  }
}
</script>
