import { request } from '@/utils/request'


export function queryList(data = {}) {
    return request('post', 'music/list', data)
}

export function musicAdd(data) {
    return request('post', 'music/add', data)
}

export function musicEdit(data) {
    return request('post', 'music/edit', data)
}




export function del(data) {
    return request('post', 'music/delete', data)
}