<template>
  <div id="app" :style="{'background-image': 'url(' + require('./asset/letter/bj1.png') +')', 'background-size': '100% 100%'}">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
