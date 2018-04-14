<template>
  <div class="hello">
    <div class="th-container">
      <el-button size="mini" @click="switchMode">{{isMarkdown === true ? '经典模式>>' : 'Markdown模式>>'}}</el-button>
    </div>
    <div v-if="isMarkdown">
      <mavonEditor v-model="content" />
    </div>
    <v-editor v-else :value="content" v-on:input="(val)=> content = val"></v-editor>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import editor from '@/components/editor/editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'HelloWorld',
  data () {
    return {
      isMarkdown: false,
      content: 'hello editor'
    }
  },
  components: {
    'v-editor': editor,
    mavonEditor
  },
  methods: {
    switchMode () {
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
