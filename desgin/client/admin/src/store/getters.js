const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    nickname: state => state.user.nickname,
    mobile: state => state.user.mobile
}
export default getters