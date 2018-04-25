<template>
  <el-container>
    <el-main class="fav-doc-container">
      <div class="template-wrapper">
        <el-button class="doc-template" :lg="4" :md="8" :sm="12" v-for="(o, index) in templates" :key="'card_' + index" :style="{'border-bottom': '8px solid' + o.color}">
          <router-link :to="getLink(o.to)">
            <v-file-icon :icon="o.icon"></v-file-icon>
            <div class="doc-description">{{o.description}}</div>
          </router-link>

        </el-button>
        <div class="template-description">{{templateInfo}}</div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import fileIcon from '@/components/fileIcon/fileIcon'

export default {
  props: [
    'templates',
    'templateInfo'
  ],
  components: {
    'v-file-icon': fileIcon
  },
  methods: {
    getLink (link) {
      if (!link) return '/'
      return {
        path: link
      }
    }
  }
}
</script>
