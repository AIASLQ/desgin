import { request } from '@/utils/request'


export function addEditArticle(data) {
    return request('post', 'articles/addEditArticle', data)
}

export function getAllArticle(data) {
    return request('post', 'articles/allArticle', data)
}


export function delArticle(data) {
    return request('post', `articles/delArticle/${data.id}`, null)
}

export function getDetail(data) {
    return request('get', `articles/getDetail/${data.id}`, null)
}