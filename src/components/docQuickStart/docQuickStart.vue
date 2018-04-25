<template>
  <el-tabs v-model="activeTabName">
    <el-tab-pane label="最近查看" name="latestView">最近查看</el-tab-pane>
    <el-tab-pane label="我创建的" name="createByMe">我创建的</el-tab-pane>
    <el-tab-pane label="我收藏的" name="collectByMe">我收藏的</el-tab-pane>
    <el-tab-pane label="分享给我的" name="SharedToMy">分享给我的</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  props: {
    activeName: {
      default: 'latestView'
    }
  },
  data () {
    return {
      activeTabName: this.activeName
    }
  }
}
</script>
