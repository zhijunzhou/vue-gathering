<template>
  <div class="hello">
    <div class="th-container">
      <el-button size="mini" @click="switchMode">{{isMarkdown === true ? '经典模式>>' : 'Markdown模式>>'}}</el-button>
    </div>
    <div v-if="isMarkdown">
      <mavonEditor v-model="mdContent" />
    </div>
    <v-editor v-else :value="content" v-on:input="(val)=> content = val"></v-editor>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
// md to h5
import showdown from 'showdown'
// h5 to md
import TurndownService from 'turndown'

import editor from '@/components/editor/editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'HelloWorld',
  data () {
    return {
      isMarkdown: false,
      content: 'hello editor',
      mdContent: 'hello editor'
    }
  },
  components: {
    'v-editor': editor,
    mavonEditor
  },
  mounted () {
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
