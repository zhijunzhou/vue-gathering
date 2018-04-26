<template>
  <div class="hello">
    <!-- <div class="th-container">
      <el-button size="mini" @click="switchMode">{{isMarkdown === true ? '经典模式>>' : 'Markdown模式>>'}}</el-button>
    </div>
    <div v-if="isMarkdown">
    </div>
    <v-editor v-else :value="content" v-on:input="(val)=> content = val"></v-editor> -->
    <div id="test-editormd"></div>
    <div name="content" id="editor">
      <figure class="image">
        <img src="https://via.placeholder.com/1000x300/02c7cd/fff?text=Placeholder%20image" alt="CKEditor 5 rocks!">
      </figure>
    </div>
    <!-- <textarea name="content" id="balloonEditor"></textarea> -->
    <div class="th-container">
      <el-button size="mini" @click="setData">Setting Data</el-button>
      <el-button size="mini" @click="getMarkdown">Get Markdown</el-button>
      <el-button size="mini" @click="toggleTinymce">show/hide tinymce</el-button>
    </div>
    <div v-if="showTinymce">
      <v-editor :value="content" v-on:input="(val)=> content = val"></v-editor>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor'
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
// import GFMDataProcessor from '@ckeditor/ckeditor5-markdown-gfm/src/gfmdataprocessor'
// import Image from '@ckeditor/ckeditor5-image/src/image'
// md to h5
import showdown from 'showdown'
// h5 to md
import TurndownService from 'turndown'
import editor from '@/components/editor/xeditor'
import $ from 'jquery'

// import 'mavon-editor/dist/css/index.css'

export default {
  name: 'HelloWorld',
  data () {
    return {
      isMarkdown: false,
      testEditor: null,
      showTinymce: false,
      content: '',
      editor: null,
      balloonEditor: null,
      mdContent: 'hello editor'
    }
  },
  components: {
    'v-editor': editor
  },
  mounted () {
    this.initEditor()
    this.initCKEditor()
    this.checkEditorContent()
    this.getHTMLFromSocket()
    // this.mdContent = this.content
  },
  methods: {
    switchMode () {
      if (this.isMarkdown) {
        const converter = new showdown.Converter({'tables': 'true', 'underline': true})
        this.$nextTick(() => {
          this.content = converter.makeHtml(this.mdContent)
          console.log('md to h5: ', this.mdContent, ' =>', this.content)
        })
      } else {
        const turndownService = new TurndownService()
        this.$nextTick(() => {
          this.mdContent = turndownService.turndown(this.content)
          console.log('h5 to md: ', this.content, ' =>', this.mdContent)
        })
      }
      this.isMarkdown = !this.isMarkdown
    },
    initEditor () {
      var _this = this
      $.get('static/test.md', function (md) {
        /* eslint-disable */
        _this.testEditor = editormd('test-editormd', {
          width: '100%',
          height: 400,
          path: location.href.indexOf('github.io') !== -1 ? '/vue-gathering/static/vendors/lib/' : '../static/vendors/lib/',
          pluginPath: location.href.indexOf('github.io') !== -1 ? '/vue-gathering/static/vendors/plugins/' : '../static/vendors/plugins/',
          // theme: 'dark',
          // previewTheme: 'dark',
          // editorTheme: 'pastel-on-dark',
          markdown: md,
          codeFold: true,
          // syncScrolling: false,
          saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
          searchReplace: true,
          // watch: false,                // 关闭实时预览
          htmlDecode: 'style,script,iframe|on*',            // 开启 HTML 标签解析，为了安全性，默认不开启
          toolbarIcons: ["undo", "redo", "|", "bold", "italic", "|", "image", "table", "list-ul", "list-ol", "|", "preview", "watch", "|", "fullscreen"],
          // toolbar : false,             // 关闭工具栏
          // previewCodeHighlight: false, // 关闭预览 HTML 的代码块高亮，默认开启
          emoji: true,
          taskList: true,
          tocm: true,         // Using [TOCM]
          tex: true,                   // 开启科学公式TeX语言支持，默认关闭
          flowChart: true,             // 开启流程图支持，默认关闭
          sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
          // dialogLockScreen: false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
          // dialogShowMask: false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
          // dialogDraggable: false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
          // dialogMaskOpacity: 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
          // dialogMaskBgColor: '#000', // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
          imageUpload: true,
          imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
          imageUploadURL: 'https://jsonplaceholder.typicode.com/posts/',
          onload: function () {
            console.log('onload', this)
            // this.fullscreen();
            // this.unwatch();
            // this.watch().fullscreen();

            // this.setMarkdown('#PHP');
            // this.width('100%');
            // this.height(480);
            // this.resize('100%', 640);
          }
        })
      })
    },
    initCKEditor() {
      const _this = this

      ClassicEditor
        .create(document.querySelector('#editor'), {
          fontFamily: {
            options: [
              'default',
              'Ubuntu, Arial, sans-serif',
              'Ubuntu Mono, Courier New, Courier, monospace'
            ]
          },
          // plugins: [Image],
          toolbar: [
            "undo", "redo", "bold", "italic", "blockQuote", "imageTextAlternative", "imageUpload", "heading", "link", "numberedList", "bulletedList"
          ]
        })
        .then(editor => {
          // console.log(Array.from(editor.ui.componentFactory.names()))
          _this.editor = editor
        })
        .catch(error => {
          console.error(error)
        })

        // BalloonEditor
        //   .create(document.querySelector('#balloonEditor'))
        //   .then(editor => {
        //     _this.balloonEditor = editor
        //   })
        //   .catch(error => {
        //     console.error(error)
        //   })
        
    },
    getMarkdown () {
      alert(this.testEditor.getMarkdown())
    },
    toggleTinymce () {
      this.content = this.testEditor.getHTML()
      this.showTinymce = ! this.showTinymce
    },
    setData () {
      this.editor.setData(this.testEditor.getMarkdown())
    },
    checkEditorContent () {
      const _this = this
      setInterval(() => {
        socket.emit('chat message',  _this.testEditor.getHTML())
      }, 5000);
    },
    getHTMLFromSocket () {
      const _this = this
      socket.on('chat message', (msg) => {
        _this.editor.setData(msg)
      })
    }
  }
}
</script>

<style>
.th-container {
  text-align: right;
  padding: 8px 0;
}
</style>
