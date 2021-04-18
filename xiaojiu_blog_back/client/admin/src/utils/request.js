// js网络请求封装
import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
let loading;

function startLoading() {
    let options = {
        lock: true,
        text: '疯狂加载中......',
        background: 'rgba(0,0,0,0.7)',
    }
    loading = Loading.service(options);
}

function endLoading() {
    loading.close();
}
const instance = axios.create({
    baseURL: 'http://localhost:3333/api/',
    timeout: 5000
})
instance.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers.Authorization = getToken()
            config.headers['Token'] = getToken().replace('Bearer ', '')
        }
        startLoading()
        return config
    },
    error => {
        return Promise.reject(error)
    }
);
// response interceptor
instance.interceptors.response.use(
    response => {
        endLoading()
        const res = response.data
        if (res.code == -1) {
            Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.msg || 'Error'))
        } else if (res.code == -4) {
            Message({
                message: res.msg || 'Error',
                type: 'warning',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        endLoading()
        const { code, msg } = error.response.data
        if (code === -2) {
            MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '登录过期', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.dispatch('user/resetToken').then(() => {
                    location.reload()
                })
            })
        }
        Message({
            message: msg,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject(error)
    }
);

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