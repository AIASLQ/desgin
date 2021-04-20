import { request } from '@/utils/request'


export function addEdit(data) {
    return request('post', 'types/addEidtType', data)
}

export function del(data) {
    return request('post', 'types/delete', data)
}

export function getAllClass(data) {
    return request('get', 'types/getAllType', data)
}

