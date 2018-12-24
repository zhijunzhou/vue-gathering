import axios from 'axios'
import { Toast } from 'mint-ui'
import moment from 'moment'

const service = axios.create({
  // baseURL: 'http://fenxiao.cronus.manager.sunlands/wifi/v1'
  baseURL: process.env.BASE_API
})

service.interceptors.request.use(config => {
  return config
}, error => {
  console.error(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Toast({
        message: res.message,
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    Toast({
      message: error.message,
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export const getStudentInfo = (consu_id) => {
  const formData = new FormData()
  formData.append('consu_id', consu_id)
  return service({
    url: '/frontend/consultation/student-info',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

export const getCampusTags = () => {
  return service({
    url: '/frontend/consultation/tag'
  })
}

export const evaluate = (data) => {
  const formData = new FormData()
  formData.append('consu_id', data.consu_id)
  formData.append('teacher_level', data.teacher_level)
  formData.append('school_level', data.school_level)

  data.tag_id !== undefined ? formData.append('tag_id', data.tag_id) : 0
  data.content !== undefined ? formData.append('content', data.content) : 0

  return service({
    url: '/frontend/consultation/evaluate',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

export const cacheEvaluation = () => {
  const evaluation = moment().format('YYYY-MM-DD')
  window.localStorage.setItem('evaluation', evaluation)
}

export const isEvaluated = () => {
  const evaluation = window.localStorage.getItem('evaluation')
  const today = moment().format('YYYY-MM-DD')
  if (evaluation === today) {
    return true
  }
  return false
}

export const saveSign = (autograph, image) => {
  const formData = new FormData()
  formData.append('autograph', autograph)
  formData.append('image', image)

  return service({
    url: '/holidays/newyear/frontend/index/save-autograph',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}
