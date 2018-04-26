<template>
  <div>
    <div v-bind:id="'meditor_' + editorId"></div>
    <form method="get" action="/turndown" id="options" style="display: none;">
      <div class="form-group">
        <label for="headingStyle">Heading style</label>
        <select name="headingStyle" id="headingStyle">
          <option value="setext">setext</option>
          <option value="atx">atx</option>
        </select>
      </div>

      <div class="form-group">
        <label for="hr">Horizontal rule</label>
        <select name="hr" id="hr">
          <option value="* * *">* * *</option>
          <option value="- - -">- - -</option>
          <option value="_ _ _">_ _ _</option>
        </select>
      </div>

      <div class="form-group">
        <label for="bulletListMarker">Bullet</label>
        <select name="bulletListMarker" id="bulletListMarker">
          <option value="*">*</option>
          <option value="-">-</option>
          <option value="+">+</option>
        </select>
      </div>

      <div class="form-group">
        <label for="codeBlockStyle">Code block style</label>
        <select name="codeBlockStyle" id="codeBlockStyle">
          <option value="indented">indented</option>
          <option value="fenced">fenced</option>
        </select>
      </div>

      <div class="form-group">
        <label for="fence">Fence</label>
        <select name="fence" id="fence">
          <option value="```">```</option>
          <option value="~~~">~~~</option>
        </select>
      </div>

      <div class="form-group">
        <label for="emDelimiter">Em delimiter</label>
        <select name="emDelimiter" id="emDelimiter">
          <option value="_">_</option>
          <option value="*">*</option>
        </select>
      </div>

      <div class="form-group">
        <label for="strongDelimiter">Strong delimiter</label>
        <select name="strongDelimiter" id="strongDelimiter">
          <option value="**">**</option>
          <option value="__">__</option>
        </select>
      </div>

      <div class="form-group">
        <label for="linkStyle">Link style</label>
        <select name="linkStyle" id="linkStyle">
          <option value="inlined">inlined</option>
          <option value="referenced">referenced</option>
        </select>
      </div>

      <div class="form-group">
        <label for="linkReferenceStyle">Link reference style</label>
        <select name="linkReferenceStyle" id="linkReferenceStyle">
          <option value="full">full</option>
          <option value="collapsed">collapsed</option>
          <option value="shortcut">shortcut</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import uid from 'uid'
import TurndownService from 'turndown'

const tables = require('turndown-plugin-gfm').tables

export default {
  props: [
    'md'
  ],
  data () {
    return {
      editorId: uid(5),
      meditor: null,
      mdContent: this.md
    }
  },
  mounted () {
    this.toMarkdown()
    this.initEditor()
  },
  beforeDestroy () {
    this.$emit('toHTML', this.meditor.getHTML())
  },
  methods: {
    toMarkdown () {
      var opts = {}
      var optionsForm = document.getElementById('options')
      var inputs = optionsForm.getElementsByTagName('select')
      for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i]
        opts[input.name] = input.value
      }
      console.log(opts)
      const turndownService = new TurndownService(opts)
      turndownService.use(tables)
      this.mdContent = turndownService.turndown(this.md)
    },
    initEditor () {
      const _this = this

      _this.meditor = editormd('meditor_' + _this.editorId, {
        width: '100%',
          height: 500,
          path: location.href.indexOf('github.io') !== -1 ? '/vue-gathering/static/vendors/lib/' : '../static/vendors/lib/',
          pluginPath: location.href.indexOf('github.io') !== -1 ? '/vue-gathering/static/vendors/plugins/' : '../static/vendors/plugins/',          
          markdown: _this.mdContent,
          codeFold: true,
          saveHTMLToTextarea: true,
          searchReplace: true,
          watch: false,
          htmlDecode: 'style,script,iframe|on*', 
          toolbarIcons: ["undo", "redo", "|", "bold", "italic", "|", "image", "table", "list-ul", "list-ol", "|", "preview", "watch", "|", "fullscreen"],
          emoji: true,
          taskList: true,
          tocm: true,
          tex: true,
          flowChart: true,
          sequenceDiagram: true,
          imageUpload: true,
          imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
          imageUploadURL: 'https://jsonplaceholder.typicode.com/posts/',
          onload: function () {
            console.log('onload', this)
          }
      })
    }
  }
}
</script>

