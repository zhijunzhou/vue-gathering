<template>
  <div class="learning-materials">
    <div class="common-title">学习资料</div>
    <div class="materials-container">
      <div class="material-item" v-for="(mt, index) in materials" :key="index">
        <div class="float-left">
          <div class="float-left material-img">&nbsp;</div>
          <div class="float-right">
            <span class="material-title">{{mt.title}}</span><br />
            <span class="material-description">{{mt.description}}</span>
          </div>
        </div>
        <div class="find-material float-right">
          <i class="fas fa-chevron-right fa-sm"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      materials: [
        {
          title: '尚德机构',
          description: '尚德课程学习APP下载'
        },
        {
          title: '东直门分校',
          description: '尚德课程学习APP下载'
        },
        {
          title: '中关村分校',
          description: '尚德课程学习APP下载'
        }
      ]
    }
  }
}
</script>


<style>
.learning-materials {
  padding-bottom: 20px;
}
.materials-container {
  background: #fff;
  border-radius: 8px;
  min-height: 50px;
  height: 100%;
}
.materials-container > .material-item {
  border-bottom: 1px solid #eee;
}
.material-item {
  height: 88px;
  padding: 20px 15px;
}
.find-material {
  line-height: 50px;
  color: #888;
}
.material-img {
  height: 55px;
  width: 80px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-right: 10px;
}
.material-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}
.material-description {
  font-size: 13px;
  color: #888;
}
</style>
