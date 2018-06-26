import axios from 'axios'
import { Toast } from 'mint-ui'

const service = axios.create({
  baseURL: 'http://fenxiao.cronus.manager.sunlands/wifi/v1'
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
  formData.append('tag_id', data.tag_id)
  formData.append('content', data.content)

  return service({
    url: '/frontend/consultation/evaluate',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}
