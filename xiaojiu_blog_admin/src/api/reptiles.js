import { request } from '@/utils/request'


export function getArticle(data) {
    return request('get', 'reptiles/getArticle', data)
}