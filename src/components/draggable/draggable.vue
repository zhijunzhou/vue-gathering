<template>
  <el-container>
    <el-aside width="300px">
      <draggable>
        <el-button round>可拖拽的button</el-button>
      </draggable>
    </el-aside>
    <el-main>
      右边存放实际内容
    </el-main>
  </el-container>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  }
}
</script>
