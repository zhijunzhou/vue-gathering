<template>
  <div class="table">
    <div class="blank-area" v-if="gotStudent"></div>
    <v-person-info v-if="gotStudent" :student="student" />
    <!-- <v-season-activity /> -->
    <v-learning-materials />
    <v-wx-public />
    <v-opinion-dialog v-if="gotStudent && !evaluated" :student="student" />
  </div>
</template>

<script>
import personInfo from '@/components/personInfo'
import seasonActivity from '@/components/seasonActivity'
import learningMaterials from '@/components/learningMaterials'
import wxPublic from '@/components/wxPublic'
import opinionDialog from '@/components/opinionDialog'
import { getStudentInfo, isEvaluated } from '@/api'

export default {
  name: 'home',
  components: {
    'v-person-info': personInfo,
    'v-season-activity': seasonActivity,
    'v-learning-materials': learningMaterials,
    'v-wx-public': wxPublic,
    'v-opinion-dialog': opinionDialog
  },
  created() {
    if (this.$route.query.consu_id) {
      this.consu_id = this.$route.query.consu_id
      this.getStudent()
    }
  },
  data() {
    return {
      consu_id: undefined,
      gotStudent: undefined,
      evaluated: isEvaluated(),
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
  watch: {
    $route(to, from) {
      if (this.$route.query.consu_id) {
        this.consu_id = this.$route.query.consu_id
        this.getStudent()
      }
    }
  },
  methods: {
    getStudent() {
      getStudentInfo(this.consu_id).then(res => {
        if (res.data) {
          this.gotStudent = true
          this.assignStudentInfo(res.data)
        }
      })
    },
    assignStudentInfo(data) {
      if (data && data['result'] !== 'signUp') {
        data['select_class'] = '体验尚德线下体验中心小程序'
        data['special'] = '课程优惠实时递送、自考信息一手获达'
      }
      for (var p in this.student) {
        if (data.hasOwnProperty(p)) {
          if (p === 'stu_name') {
            if (data[p] === '无') {
              data[p] = 'Dear. 尚德学员'
            } else {
              data[p] = 'Dear. ' + data[p]
            }
          }
          this.student[p] = data[p]
        }
      }
    }
  }
}
</script>

<style>
#app {
  background: #eee;
  /* padding: 20px 16px; */
}
.table {
  height: 100%;
  width: 100%;
}
.blank-area {
  height: 20px;
  width: 100%;
  background: transparent;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}
.common-title {
  font-size: 15px;
  font-weight: bold;
  color: #222;
  border-left: 5px solid #F67261;
  padding-left: 10px;
  margin-bottom: 10px;
}
</style>

