<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col :span="20">
        <v-file-share></v-file-share>
      </el-col>
      <el-col :span="4">
        <el-dropdown>
          <h3>{{uid}}({{participators.length}})<i class="el-icon-arrow-down el-icon--right"></i></h3>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(ptor, index) in participators" :key="'pto_' + index">{{ptor}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <div class="custom-title el-input el-input--prefix">
      <input type="text" v-model="title" autocomplete="off" maxlength="10" placeholder="标题" class="el-input__inner custom-input" />
      <span class="el-input__prefix"><i class="el-input__icon el-icon-edit"></i></span>
    </div>
    <div name="content" id="editor"></div>
    <!--
    <div>
      <p>HTML源</p>
      <textarea v-model="htmlContent" style="width: 100%;min-height: 100px;"></textarea>
    </div>
    -->
  </div>
</template>

<script>
/* eslint-disable */
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor'
// import ClassicEditor from '/static/vendors/ckeditor/ckeditor'
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
    this.syncQueue()
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
          'message',
          JSON.stringify({
            _id: this._changeId,
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
        _this.cacheMsg = msg
        const content = JSON.parse(msg)
        const diffs = content.diffs

        this.htmlContent = unescape(content.htmlContent)
        this.title = content.title
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
    syncQueue () {
      const _this = this
      socket.on('queue', queueStr => {
        let queue = JSON.parse(queueStr)
        let queueArr = []
        for(let pp in queue) {
          if (pp.length === 10) {
            queueArr.push(pp)
          }
        }
        this.participators = [...queueArr]
      })
    },
    leaveEditing() {
      if (confirm('Are you sure you want to leave?')) {
        socket.emit('leave', this.uid)
        this.uid = undefined
      }
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
.ck.ck-editor__main>.ck-editor__editable:not(.ck-focused) {
  border: none !important;
  border-color: none;
}
</style>

