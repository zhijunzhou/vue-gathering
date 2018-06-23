<template>
  <div class="table">
    <v-person-info />
  </div>
</template>

<script>
import personInfo from '@/components/personInfo'

export default {
  name: 'home',
  components: {
    'v-person-info': personInfo
  },
  data() {
    return {}
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  color: #989A9C;
}
#app {
  background: #eee;
  padding: 20px 16px;
}
.table {
  padding-top: 80px;
  height: 100%;
  width: 100%;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}
</style>

