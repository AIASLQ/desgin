import { request } from '@/utils/request'


export function addEditSinger(data) {
    return request('post', 'singer/addEditSinger', data)
}