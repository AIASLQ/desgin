import { request } from '@/utils/request'


export function create(data) {
    return request('post', 'songbook/create', data)
}


export function update(data) {
    return request('post', 'songbook/update', data)
}

export function del(data) {
    return request('post', 'songbook/delete', data)
}



export function list(data) {
    return request('post', 'songbook/list', data)
}