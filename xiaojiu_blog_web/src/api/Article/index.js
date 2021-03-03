import {request} from '../../utils/request'

export function getAllArticle(data){
    return request('post',`/articles/allArticle/`,data)
}

export function getArticleDetail(data){
    return request('get',`/articles/getDetail/${data.id}`,null)
}

export function getHotArticle(data){
    return request('get',`/articles/getHotArticle`,null)
}