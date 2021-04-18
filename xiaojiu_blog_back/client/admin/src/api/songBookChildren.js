import { request } from '@/utils/request'


export function create(data) {
    return request('post', 'bookChild/create', data)
}


export function del(data) {
    return request('post', 'bookChild/delete', data)
}

export function list(data) {
    return request('post', 'bookChild/list', data)
}