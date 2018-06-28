<template>
  <div class="opinion-container">
    <div class="option-title">
      {{student.orgName4}}
      <div class="radio-container">
        <el-radio v-model="value" label="1">匿名评价</el-radio>
      </div>
    </div>
    <div class="option-form-container">
      <div class="option-item">
        <div class="option-item-label">课顾评分</div>
        <div class="option-item-rate">
          <el-rate
            :colors="['#F67261', '#F67261', '#F67261']"
            v-model="opinionForm.teacher_level">
          </el-rate>
        </div>
      </div>
      <div class="option-item">
        <div class="option-item-label">校区评分</div>
        <div class="option-item-rate">
          <el-rate
            :colors="['#F67261', '#F67261', '#F67261']"
            v-model="opinionForm.school_level">
          </el-rate>
        </div>
      </div>
      <div class="option-btn-container">
        <el-button size="small" class="custom-tag-btn" v-for="(tag, index) in tags" :key="index" :type="opinionForm.tag_id === tag.id ? 'danger' : 'default'" @click="ensureTag(tag)" round>{{tag.name}}</el-button>
      </div>
      <div>
        <el-input 
          type="textarea" 
          :autosize="{ minRows: 4, maxRows: 6}"
          placeholder="亲，这次的服务如何，快来说两句~"  
          v-model="opinionForm.content" />
      </div>
    </div>
    <div class="option-submit-btn">
      <el-button type="danger" size="small" round :style="{width: '100%'}" @click="submitOpinion">提交</el-button>
    </div>
    <v-opinion-success-dialog :showSuccessDialog="showSuccessDialog" v-if="showSuccessDialog"  v-on:showDialog="showDialog" />
  </div>
</template>

<script>
import { getStudentInfo, getCampusTags, evaluate, cacheEvaluation } from '@/api'
import opinionSuccessDialog from '@/components/opinionSuccessDialog'

export default {
  data() {
    return {
      consu_id: undefined,
      value: '1',
      kgRate: undefined,
      xqRate: undefined,
      showSuccessDialog: false,
      tags: [],
      opinionForm: {
        consu_id: undefined,
        content: undefined,
        teacher_level: undefined,
        school_level: undefined,
        tag_id: undefined
      },
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
  components: {
    'v-opinion-success-dialog': opinionSuccessDialog
  },
  created() {
    if (this.$route.query.consu_id) {
      this.opinionForm.consu_id = this.$route.query.consu_id
      this.getStudent()
      this.getTags()
    }
  },
  methods: {
    getStudent() {
      getStudentInfo(this.opinionForm.consu_id).then(res => {
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
    },
    getTags() {
      getCampusTags().then(res => {
        if (Array.isArray(res.data)) {
          this.tags = res.data.filter((tag, index) => {
            return tag.name.trim().length > 0
          })
        }
      })
    },
    ensureTag(tag) {
      this.opinionForm.tag_id = tag.id
    },
    showDialog(flag) {
      this.showSuccessDialog = false
      cacheEvaluation()
      this.$router.push('/home?consu_id=' + this.$route.query.consu_id)
    },
    submitOpinion() {
      this.$nextTick(() => {
        evaluate(this.opinionForm).then(res => {
          this.showSuccessDialog = true
        })
      })
    }
  }
}
</script>


<style>
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
  right: 20px;
  top: 20px;
}
.radio-container .el-radio__label {
  font-size: 13px;
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
.option-submit-btn button {
  height: 40px;
}
.el-radio__label {
  padding-left: 2px !important;
  color: #888 !important;
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #F67261 !important;
  background: none !important;
}
.el-radio__input.is-checked+.el-radio__label {
  color: #888 !important;
}
.el-radio__inner::after {
  width: 8px !important;
  height: 8px !important;
  background-color: #F67261 !important;
}
.el-rate__icon.hover {
  transform: scale(1) !important;
}
.option-btn-container .custom-tag-btn {
  border: 0;
  margin: 5px 10px;
}
.option-btn-container .custom-tag-btn.el-button--default {
  border: 0;
  background: #F5F5F5;
  color: #666;
}
.option-btn-container .custom-tag-btn+.custom-tag-btn {
  margin-left: 0;
}
</style>

