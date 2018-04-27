import axios from 'axios'

const isProduction = !!(process.env.NODE_ENV === 'production')
const baseURL = isProduction ? 'http://localhost:5000' : 'http://localhost:5000'

const api = axios.create({
  baseURL: baseURL,
  timeout: 0
})

api.baseURL = baseURL

api.interceptors.request.use(config => {
  return config
})

export default api
