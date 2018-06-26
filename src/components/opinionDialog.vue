<template>
  <mt-popup
    v-model="popupVisible"
    :closeOnClickModal="false"
    position="middle">
    <div class="popup-org-name">{{student.orgName4}}</div>
    <div class="popup-advisor-name">{{student.name}}老师</div>
    <div class="popup-advisor-tips">为您的课程顾问打个分吧~</div>
    <div class="popup-btn-redirect">
      <el-button type="danger" round>开始评价</el-button>
    </div>
    <div class="popup-btn-close">
      <div class="btn-wrapper">
        <img src="../asset/materials/关闭@3x.png" @click="popupVisible = false" height="30" />
      </div>
    </div>
  </mt-popup>
</template>

<script>
export default {
  data() {
    return {
      popupVisible: true
    }
  },
  props: {
    student: {
      required: true
    }
  }
}
</script>

<style>
.mint-popup {
  width: 320px;
  height: 200px;
  border-radius: 8px;
  padding: 20px;
}
.popup-org-name, .popup-advisor-name {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #000;
}
.popup-advisor-tips {
  text-align: center;
  font-size: 14px;
  height: 50px;
  padding-top: 20px;
  color: #888;
}
.popup-btn-redirect {
  text-align: center;
  padding: 20px 20px;
}
.popup-btn-redirect .el-button {
  width: 100%;
}
.popup-btn-close {
  position: absolute;
  bottom: -80px;
  text-align: center;
  width: 280px;
}
.popup-btn-close .btn-wrapper {
  text-align: center;
  position: relative;
  width: 100%;
}
</style>


