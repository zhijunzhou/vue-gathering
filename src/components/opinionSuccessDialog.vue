<template>
  <mt-popup
    v-model="popupVisible"
    :closeOnClickModal="false"
    position="middle">
    <div class="popup-img-success">
      <div class="btn-wrapper">
        <img src="../asset/materials/check_circle@3x.png"/>
      </div>
    </div>
    <div class="popup-org-name">服务评价成功！</div>
    <div class="popup-advisor-tips">感谢您对我们服务的评价，您的每一条评价都将是我们接下来前进的动力</div>
    <div class="popup-btn-redirect">
      <el-button type="danger" @click="complete" round>完成</el-button>
    </div>
  </mt-popup>
</template>

<script>
export default {
  data() {
    return {
      popupVisible: this.showSuccessDialog
    }
  },
  props: ['showSuccessDialog'],
  methods: {
    complete() {
      this.popupVisible = false
      this.$emit('showDialog', false)
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
  padding-top: 40px;
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
.popup-img-success {
  position: absolute;
  top: -40px;
  width: 280px;
  text-align: center;
}
.popup-img-success .btn-wrapper {
  text-align: center;
  position: relative;
  width: 100%;
}
.popup-img-success img {
  height: 80px;
}
</style>


