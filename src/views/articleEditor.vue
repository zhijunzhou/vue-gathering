<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col :span="16">
        <v-file-share
          v-on:save="save"
          v-on:createDoc="createDoc"
          v-on:switchEditor="switchEditor"
          v-on:shareDoc="shareDoc">
        </v-file-share>
      </el-col>
      <el-col :span="8">
        <el-dropdown>
          <h3>{{uid}}({{participators.length}})
            <i class="el-icon-arrow-down el-icon--right"></i>
          </h3>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(ptor, index) in participators" :key="'pto_' + index">{{ptor}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <div class="custom-title el-input el-input--prefix">
      <input type="text" v-model="title" autocomplete="off" maxlength="10" placeholder="标题" class="el-input__inner custom-input" />
      <span class="el-input__prefix">
        <i class="el-input__icon el-icon-edit"></i>
      </span>
    </div>
    <div name="content" id="editor"></div>
  </div>
</template>

<script>
/* eslint-disable */
import ServicesConfig from '@/utils/ServicesConfig'
import fileShare from '@/components/fileShare/fileShare'
import uid from 'uid'

export default {
  name: 'article-editor',
  data() {
    return {
      uid: undefined,
      balloonEditor: null,
      title: '',
      editor: null,
      participators: [],
      imageUrl: undefined,
      htmlContent: undefined,
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
  beforeCreate() {
    window.addEventListener('beforeunload', this.leaveEditing)
    window.addEventListener('hashchange', this.leaveEditing)
  },
  created() {
    this.initEditorSession()
    socket.emit('join', this.uid)
  },
  mounted() {
    this.initEditor()
    this.syncArticle()
    this.syncQueue()
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
          _this.clearEditorBorder()
          _this.balloonEditor = editor
          editor.model.document.on('change', (eventInfo, name) => {
            var diffs = editor.model.document.differ.getChanges()
            _this.sendMsg(editor, diffs)
          })
        })
        .catch(error => {
          console.error(error)
        })
    },
    sendMsg(editor, diffs) {
      if (this.htmlContent !== editor.getData()) {
        let _changeId = uid(16)
        // 将变化内容后的内容和编辑者信息提交到server
        socket.emit(
          'message',
          JSON.stringify({
            _id: _changeId,
            diffs,
            editor: this.uid,
            title: this.title,
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
      socket.on('message', msg => {
        const content = JSON.parse(msg)
        const diffs = content.diffs

        this.htmlContent = unescape(content.htmlContent)
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
    syncQueue() {
      const _this = this
      socket.on('queue', queueStr => {
        let queue = JSON.parse(queueStr)
        let queueArr = []
        for (let pp in queue) {
          if (pp.length === 10) {
            queueArr.push(pp)
          }
        }
        this.participators = [...queueArr]
      })
    },
    leaveEditing(event) {
      if (confirm('Are you sure you want to leave?')) {
        socket.emit('leave', this.uid)
        this.uid = undefined
        event.returnValue = 'ppp'
      }
      return false
    },
    clearEditorBorder () {
      document.querySelector('.ck.ck-editor__main > .ck-editor__editable:not(.ck-focused)').style.border = "none"
    },
    save() {
      // do save
    },
    createDoc() {
      // do create
    },
    switchEditor() {
      // switch editor
    },
    shareDoc() {
      // do share
    }
  },
  components: {
    'v-file-share': fileShare
  }
}
</script>

<style>
.custom-title > .custom-input {
  border: none !important;
}
.ck .ck-toolbar {
  border: none !important;
}
.ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
  border: none !important;
  border-color: none;
}
</style>

