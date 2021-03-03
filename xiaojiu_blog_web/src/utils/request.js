import axios from 'axios'


const instance = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'http://localhost:3333/api/', 
  // baseURL: 'http://axian.lzwzw.cn:3333/api/', 
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
instance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code == -1) {
      return Promise.reject(new Error(res.msg || 'Error'))
    }else if(res.code == -4){
      return Promise.reject(new Error(res.msg || 'Error'))
    }else {
      return res
    }
  },
  error => {
    return Promise.reject(error)
  }
)





/** 请求封装 */
export function get(url, params) {
  return instance.get(url, { params });
}

export function post(url, data) {
  return instance.post(url, { data });
}

export function request(method, url, data = {}, headers = {}) {
  const dataType = method.toLocaleLowerCase() == 'get' ? 'params' : 'data';
  let options = {
      url,
      method,
      [dataType]: data,
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          ...headers
      }
  }
  return instance(options)
}

export function uploadFileRequest(url, params) {
  let options = {
      url,
      method: 'post',
      data: params,
      headers: {
          "Content-Type": "multipart/form-data"
      },
      credentials: 'include'
  }
  return instance(options)
}

