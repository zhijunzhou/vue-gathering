<template>
  <div>
    <!-- <el-tabs v-model="activeTabName">
      <el-tab-pane label="功能聚集" name="tools">
        <ul>
          <li><router-link :to="{path: '/example/cropperExample'}">Cropper Example</router-link></li>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <v-cropper-dialog v-if="cropperDialogVisible" :visible="cropperDialogVisible" @toggleVisible="toggleVisible"></v-cropper-dialog>
     -->
     <v-cropper-dialog></v-cropper-dialog>
  </div>
</template>

<script>
import cropperDialog from './cropperExample'

export default {
  data () {
    return {
      activeTabName: 'tools',
      cropperDialogVisible: undefined
    }
  },
  components: {
    'v-cropper-dialog': cropperDialog
  },
  methods: {
    toggleVisible (status) {
      this.cropperDialogVisible = undefined
      this.$nextTick(() => {
        this.cropperDialogVisible = status
      })
    }
  }
}
</script>
