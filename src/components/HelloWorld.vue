<template>
  <div class="hello">
    <!-- <div class="th-container">
      <el-button size="mini" @click="switchMode">{{isMarkdown === true ? '经典模式>>' : 'Markdown模式>>'}}</el-button>
    </div>
    <div v-if="isMarkdown">
      <mavonEditor v-model="mdContent" />
    </div>
    <v-editor v-else :value="content" v-on:input="(val)=> content = val"></v-editor> -->
    <div id="test-editormd"></div>
    <div class="th-container">
      <el-button size="mini" @click="getMarkdown">Get Markdown</el-button>
      <el-button size="mini" @click="toggleTinymce">show/hide tinymce</el-button>
    </div>
    <div v-if="showTinymce">
      <v-editor :value="content" v-on:input="(val)=> content = val"></v-editor>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
// md to h5
import showdown from 'showdown'
// h5 to md
import TurndownService from 'turndown'
import editor from '@/components/editor/editor'
import $ from 'jquery'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'HelloWorld',
  data () {
    return {
      isMarkdown: false,
      testEditor: null,
      showTinymce: false,
      content: '',
      mdContent: 'hello editor'
    }
  },
  components: {
    'v-editor': editor,
    mavonEditor
  },
  mounted () {
    this.initEditor()
    this.mdContent = this.content
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
          path: '../static/vendors/lib/',
          theme: 'dark',
          previewTheme: 'dark',
          editorTheme: 'pastel-on-dark',
          markdown: md,
          codeFold: true,
          // syncScrolling: false,
          saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
          searchReplace: true,
          // watch: false,                // 关闭实时预览
          htmlDecode: 'style,script,iframe|on*',            // 开启 HTML 标签解析，为了安全性，默认不开启    
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
          imageUploadURL: './php/upload.php',
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
    getMarkdown () {
      alert(this.testEditor.getMarkdown())
    },
    toggleTinymce () {
      this.content = this.testEditor.getHTML()
      this.showTinymce = ! this.showTinymce
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
