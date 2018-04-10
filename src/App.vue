<template>
  <div id="app">
    <img src="./assets/logo.png">
    <mavonEdito v-model="content" />
    <router-view/>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'

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
