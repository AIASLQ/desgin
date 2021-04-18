import { login, logout, getInfo, register } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        nickname: '',
        mobile: '',
        avatar: ''
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NICKNAME: (state, nickname) => {
        state.nickname = nickname
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_USERNAME: (state, mobile) => {
        state.mobile = mobile
    }
}

const actions = {
    reg({ commit }, userInfo) {
        const { mobile, password } = userInfo
        return new Promise((resolve, reject) => {
            debugger
            register({ mobile: Number(mobile), password: password }).then(response => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    login({ commit }, userInfo) {
        const { mobile, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ mobile: mobile, password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                const { data } = response
                if (!data) {
                    return reject('请重新登录')
                }
                const { nickname, avatar, mobile } = data
                commit('SET_NICKNAME', nickname)
                commit('SET_AVATAR', avatar)
                commit('SET_USERNAME', mobile)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            removeToken() // must remove  token  first
            resetRouter()
            commit('RESET_STATE')
            resolve()
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}