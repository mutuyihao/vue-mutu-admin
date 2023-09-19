import axios from 'axios'
import router from '@/router'

const token = localStorage.getItem('TOKEN')
  ? 'Bearer ' + localStorage.getItem('TOKEN')
  : null
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
function onSuccessRequest(config: any) {
  const token = localStorage.getItem('TOKEN')
    ? 'Bearer ' + localStorage.getItem('TOKEN')
    : null
  config.headers.Authorization = token
  console.log(config)
  return config
}
function onRejectedRequest(error: any) {
  console.log(error)
  return error
}
function onSuccessResponse(res: any) {
  console.log(res)
  if (res.status == '200') {
    console.log('————api正常,返回内容————', res)
    return res
  } else {
    console.log('api错误,返回内容', res)

    window.$message.error("————api错误,返回内容————" + res)
    return res
  }
}
function onRejectedResponse(error: any) {
  if (error.response.status === 403) {
    localStorage.removeItem('TOKEN')
    router.push("/login")
  }
  return Promise.reject(error)
}
instance.interceptors.request.use(onSuccessRequest, onRejectedRequest)
instance.interceptors.response.use(onSuccessResponse, onRejectedResponse)

export default instance
