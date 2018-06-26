<template>
  <div class="opinion-container">
    <div class="option-title">
      {{student.orgName4}}
      <div class="radio-container">
        <el-radio v-model="value" label="isAnonymous">匿名评价</el-radio>
      </div>
    </div>
    <div class="option-form-container">
      <div class="option-item">
        <div class="option-item-label">课顾评分</div>
        <div class="option-item-rate">
          <el-rate
            v-model="kgRate">
          </el-rate>
        </div>
      </div>
      <div class="option-item">
        <div class="option-item-label">校区评分</div>
        <div class="option-item-rate">
          <el-rate
            v-model="xqRate">
          </el-rate>
        </div>
      </div>
      <div class="option-btn-container">
        <el-button size="small" round>环境整洁</el-button>
        <el-button size="small" round>行政</el-button>
        <el-button size="small" round>IT互联网通信</el-button>
        <el-button size="small" round>高级管理</el-button>
      </div>
      <div>
        <el-input 
          type="textarea" 
          :autosize="{ minRows: 4, maxRows: 6}"
          placeholder="亲，这次的服务如何，快来说两句~"  
          v-model="textarea3" />
      </div>
    </div>
    <div class="option-submit-btn">
      <el-button type="danger" size="small" round :style="{width: '100%'}">提交</el-button>
    </div>
  </div>
</template>

<script>
import { getStudentInfo } from '@/api'

export default {
  data() {
    return {
      consu_id: undefined,
      value: undefined,
      kgRate: undefined,
      xqRate: undefined,
      student: {
        id: undefined,
        stu_name: undefined,
        start_time: undefined,
        select_major: undefined,
        select_class: undefined,
        adviser_263: undefined,
        orgName4: undefined,
        name: undefined,
        school_id: undefined,
        phone: undefined,
        result: undefined,
        special: undefined
      }
    }
  },
  created() {
    if (this.$route.query.consu_id) {
      this.consu_id = this.$route.query.consu_id
      this.getStudent()
    }
  },
  methods: {
    getStudent() {
      getStudentInfo(this.consu_id).then(res => {
        if (res.data) {
          this.assignStudentInfo(res.data)
        }
      })
    },
    assignStudentInfo(data) {
      for (var p in this.student) {
        if (data.hasOwnProperty(p)) {
          this.student[p] = data[p]
        }
      }
    }
  }
}
</script>


<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
}
.option-title {
  text-align: center;
  font-size: 16px;
  color: #333;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
}
.radio-container {
  position: absolute;
  right: 10px;
  top: 20px;
}
.option-form-container {
  min-height: 400px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px 20px;
}
.option-item {
  height: 35px;
  display: flex;
  justify-content: space-between;
}
.option-item-label {
  font-size: 13px;
  color: #888;
}
.option-btn-container {
  text-align: center;
  margin: 20px auto;
  line-height: 20px;
  min-height: 30px;
}
.option-btn-container .el-button {
  margin-bottom: 10px;
}
.option-submit-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px 20px;
  width: 100%;
}
.el-radio__label {
  padding-left: 2px;
  color: #888;
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #a00;
  background: none;
}
.el-radio__input.is-checked+.el-radio__label {
  color: #888;
}
.el-radio__inner::after {
  width: 8px;
  height: 8px;
  background-color: #a00;
}
</style>

