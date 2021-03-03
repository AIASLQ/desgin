const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    nickname: state => state.user.nickname,
    username: state => state.user.username
}
export default getters