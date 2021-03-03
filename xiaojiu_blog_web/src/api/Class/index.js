import {request} from '../../utils/request'

export function getAllClass(data){
    return request('get','/types/getAllType',data)
}