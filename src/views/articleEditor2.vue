<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col :span="20">
        <v-file-share
          v-on:save="save"
          v-on:createDoc="createDoc"
          v-on:switchEditor="switchEditor"
          v-on:shareDoc="shareDoc">
        </v-file-share>
      </el-col>
      <el-col :span="4">
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
    <v-editor :message="message" v-on:sendMessage="sendMsg"></v-editor>
  </div>
</template>

<script>
/* eslint-disable */
import fileShare from '@/components/fileShare/fileShare'
import editor from '@/components/editor/editor'

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
      message: undefined,
      cacheMsg: undefined
    }
  },
  created() {
    this.initEditorSession()
    socket.emit('join', this.uid)
  },
  mounted() {
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
    sendMsg(msg) {
      console.log('msg from editor:', msg)
      socket.emit('message',msg)
    },
    syncArticle() {
      const _this = this
      socket.on('message', msg => {
        const content = JSON.parse(msg)
        const diffs = content.diffs

        if (
          Array.isArray(diffs) &&
          diffs.length > 0 &&
          content.queue[_this.uid] === true
        ) {
          _this.message = unescape(content.htmlContent)
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
    'v-editor': editor,
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

