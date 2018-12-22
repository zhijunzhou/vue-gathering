<template>
  <div class="table">
  </div>
</template>

<script>
import $ from 'jquery'
import 'jquery-touchswipe'

export default {
  name: 'letter',
  created() {},
  data() {
    return {}
  },
  mounted() {
    console.log($)
  },
  methods: {}
}
</script>

<style>
#app {
  background: #eee;
  background: url("../../asset/letter/bj1.png") no-repeat center center;
  background-size: 100% 100%;
}
html, body, #app {
  height: 100%;
}

</style>

