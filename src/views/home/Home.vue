<template>
  <div class="table">
    <div class="blank-area"></div>
    <v-person-info />
    <v-season-activity />
    <v-learning-materials />
  </div>
</template>

<script>
import personInfo from '@/components/personInfo'
import seasonActivity from '@/components/seasonActivity'
import learningMaterials from '@/components/learningMaterials'

export default {
  name: 'home',
  components: {
    'v-person-info': personInfo,
    'v-season-activity': seasonActivity,
    'v-learning-materials': learningMaterials
  },
  data() {
    return {}
  }
}
</script>

<style>
html, body, #app {
  height: auto;
}
#app {
  background: #eee;
  padding: 20px 16px;
}
.table {
  height: 100%;
  width: 100%;
}
.blank-area {
  height: 80px;
  width: 100%;
  background: transparent;
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
.common-title {
  font-size: 15px;
  font-weight: bold;
  color: #222;
  border-left: 5px solid #f28;
  padding-left: 12px;
  margin-bottom: 10px;
}
</style>

