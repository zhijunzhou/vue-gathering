<template>
  <div id="app" :style="{'background-image': 'url(' + require('./asset/letter/bj1.png') +')'}">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
