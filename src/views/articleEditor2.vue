<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col :span="18">
        <v-file-share
          :editingMode="editMode"
          v-on:save="save"
          v-on:createDoc="createDoc"
          v-on:switchEditor="switchEditor"
          v-on:shareDoc="shareDoc">
        </v-file-share>
      </el-col>
      <el-col :span="6">
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
      <span class="el-input__prefix s">
        <i class="el-input__icon el-icon-edit"></i>
      </span>
    </div>
    <v-meditor v-if="editMode === 'md'" v-on:toHTML="toHTML" :md="message"></v-meditor>
    <v-xeditor v-else-if="editMode === 'tm'" :imgBaseUrl="imgBaseUrl" :uploadUrl="uploadUrl" :value="message" v-on:input="(val)=> message = val"></v-xeditor>
    <v-editor v-else :message="message" v-on:sendMessage="sendMsg"></v-editor>
  </div>
</template>

<script>
/* eslint-disable */
import fileShare from '@/components/fileShare/fileShare'
import editor from '@/components/editor/editor'
import xeditor from '@/components/editor/xeditor'
import meditor from '@/components/editor/meditor'
import uid from 'uid'
import api from '@/utils/api'

export default {
  name: 'article-editor',
  data() {
    return {
      uid: undefined,
      balloonEditor: null,
      title: '',
      message: '',
      editor: null,
      participators: [],
      imageUrl: undefined,
      editMode: 'tm',
      imgBaseUrl: api.baseURL,
      uploadUrl: api.baseURL + '/api/upload'
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
    switchEditor(type) {
      // switch editor
      switch (type) {
        case 'md': {
          // previous should not be markdown style
          // should transform
          this.editMode = 'md'
          break
        }
        case 'tm': this.editMode = 'tm';break;
        default: this.editMode = 'ck5';break;
      }
    },
    toHTML (htmlContent) {
      this.message = htmlContent
    },
    shareDoc() {
      // do share
    }
  },
  components: {
    'v-editor': editor,
    'v-xeditor': xeditor,
    'v-meditor': meditor,
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

