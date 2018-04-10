<template>
  <div id="app">
    <img src="./assets/logo.png">
    <mavonEditor v-model="content" />
    <router-view/>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'App',
  data () {
    return {
      content: ''
    }
  },
  components: {
    mavonEditor
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
