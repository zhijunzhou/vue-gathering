<template>
  <div id="app" :style="{'background-image': 'url(' + backgroundImage +')', 'background-size': '100% 100%'}" :class="{'no-padding': nopadding}">
    <router-view></router-view>
  </div>
</template>

<script>
import bj1 from './asset/letter/bj1.png'
// import bj2 from './asset/letter/bj2.png'

export default {
  name: 'app',
  data() {
    return {
      backgroundImage: bj1,
      nopadding: false
    }
  },
  created() {
    if (typeof this.$route.path === 'string' && this.$route.path.indexOf('share') !== -1) {
      this.backgroundImage = ''
      this.nopadding = true
    }
  }
}
</script>
