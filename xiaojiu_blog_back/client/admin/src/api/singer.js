import { request } from '@/utils/request'


export function addEditSinger(data) {
    return request('post', 'singer/addEditSinger', data)
}


export function querySinger(data) {
    return request('post', 'singer/querySinger', data)
}

export function queryAll(data) {
    return request('post', 'singer/queryAll', data)
}