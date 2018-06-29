<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    const btn = document.querySelector('.el-button')
    btn.addEventListener('contextmenu', function(e) {
      e.preventDefault()
    })
  }
}
</script>
