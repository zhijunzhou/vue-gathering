<template>
  <div>
    插件上传：
    <el-upload class="avatar-uploader" name="file" action="http://localhost:5000/api/upload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    原生组件上传：
    <input type="file" id="file" />
    <el-button @click="doPost">Post</el-button>
  </div>
</template>

<script>
import api from '@/utils/api'

export default {
  methods: {
    doPost () {
      var formData = new FormData()
      var imageFile = document.querySelector('#file')
      formData.append('file', imageFile.files[0])

      api
        .post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
