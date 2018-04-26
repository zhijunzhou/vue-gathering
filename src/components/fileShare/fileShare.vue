<template>
  <div>
    <el-button icon="el-icon el-icon-check" title="保存" @click="save" circle></el-button>
    <el-button icon="fa fa-file" title="新文件" @click="createDoc" circle></el-button>
    <el-button v-if="editingMode !== 'md'" icon="fa fa-maxcdn" title="切换到Markdown" @click="switchEditor('md')" circle></el-button>
    <el-button v-if="editingMode !== 'ck5'" icon="fab fa-cuttlefish" title="用CKEditor5编辑" @click="switchEditor('ck5')" circle></el-button>
    <el-button v-if="editingMode !== 'tm'" icon="fa fa-code" title="用Tinymce编辑" @click="switchEditor('tm')" circle></el-button>
    <el-button icon="fa fa-share" title="分享" @click="shareDoc" circle></el-button>
  </div>
</template>

<script>
export default {
  props: [
    'editingMode'
  ],
  methods: {
    save () {
      this.$emit('save')
    },
    createDoc () {
      this.$emit('createDoc')
    },
    switchEditor (type) {
      this.$emit('switchEditor', type)
    },
    shareDoc () {
      this.$emit('shareDoc')
    }
  }
}
</script>
