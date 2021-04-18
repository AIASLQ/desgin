import { request } from '@/utils/request'


export function login(data) {
    return request('post', 'users/login', data)
}

export function register(data) {
    return request('post', 'users/register', data)
}

export function getInfo(data) {
    return request('get', 'users/getInfo', data)
}


export function logout(data) {
    return request('post', 'users/getInfo', data)
}

export function update(data) {
    return request('post', 'users/update', data)
}

export function getAllAdmin(data) {
    return request('get', 'users/allAdmin', data)
}