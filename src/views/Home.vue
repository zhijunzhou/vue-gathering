<template>
  <div>
    <h2>首页</h2>
    <p><small>欢迎回来, {{userInfo.userName}}</small></p>
    <hr />
    <v-doc-templates :templates="templates" :templateInfo="templateInfo"></v-doc-templates>
    <v-line-break></v-line-break>
    <v-doc-quick-start></v-doc-quick-start>
  </div>
</template>

<script>
import lineBreak from '@/components/lineBreak/lineBreak'
import docTemplates from '@/components/docTemplates/docTemplates'
import docQuickStart from '@/components/docQuickStart/docQuickStart'

export default {
  data () {
    return {
      templateInfo: '选择一个示例文档，了解使用 文档库 的各种方式',
      templates: [
        {
          extension: '.xx',
          color: '#0070e0',
          icon: 'plus',
          description: '创建新文档',
          to: '/article-edit2'
        },
        {
          extension: '.xls',
          color: '#67C23A',
          icon: 'file-excel',
          description: 'Excel表格'
        },
        {
          extension: '.doc',
          color: '#409EFF',
          icon: 'file-word',
          description: 'Word文档'
        },
        {
          extension: '.ppt',
          color: '#E6A23C',
          icon: 'file-powerpoint',
          description: 'PPT演示文稿'
        },
        {
          extension: '.pdf',
          color: '#F56C6C',
          icon: 'file-pdf',
          description: 'PDF文档'
        }
      ],
      userInfo: {
        id: 12345,
        openid: '00000000000000',
        userName: 'Zhijun, Zhou',
        userImg: 'https://dl-web.dropbox.com/account_photo/get/dbid%3AAAAicI42-mh-B6dFlL7EytFN_VKe9rDxTHY?vers=1524241826550&size=128x128',
        sex: 1,
        role: 1,
        email: '2050588049@qq.com',
        telphome: '18827396791'
      }
    }
  },
  components: {
    'v-line-break': lineBreak,
    'v-doc-templates': docTemplates,
    'v-doc-quick-start': docQuickStart
  }
}
</script>

<style>
hr {
  border: 1px solid #e6e8eb
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  margin-bottom: 10px;
  border-radius: 4px;
}
.fav-doc-container {
  color: #c4e3fb;
  background-color: rgba(59,160,243,0.98);
  border-radius: 4px;
}
.doc-template {
  height: 202px;
  width: 152px;
  text-align: left;
  box-shadow: 6px 6px 6px 1px rgba(0, 0, 255, .1);
}
.doc-template a {
  text-decoration: none;
}
.doc-description {
  margin-top: 12px;
  color: #1b2733;
}
.template-wrapper {
  text-align: center;
}
.template-description {
  text-align:  center;
  margin-top: 15px;
}

svg {
  height: 100px;
}
.text-success {
  color: #67C23A;
}
.text-warning {
  color: #E6A23C;
}
.text-danger {
  color: #F56C6C;
}
.text-info {
  color: #909399;
}
.text-primary {
  color: #409EFF;
}
.text-default {
  color: #0070e0;
}

.text-center {
  text-align: center
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
</style>
