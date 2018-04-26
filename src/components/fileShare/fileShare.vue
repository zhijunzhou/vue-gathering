<template>
  <div>
    <el-button icon="el-icon el-icon-check" title="保存" @click="save" circle></el-button>
    <el-button icon="fa fa-file" title="新文件" @click="createDoc" circle></el-button>
    <el-button icon="fa fa-maxcdn" title="切换到Markdown" @click="switchEditor" circle></el-button>
    <el-button icon="fa fa-share" title="分享" @click="shareDoc" circle></el-button>
  </div>
</template>

<script>
export default {
  methods: {
    save () {
      this.$emit('save')
    },
    createDoc () {
      this.$emit('createDoc')
    },
    switchEditor () {
      this.$emit('switchEditor')
    },
    shareDoc () {
      this.$emit('shareDoc')
    }
  }
}
</script>
