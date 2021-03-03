let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs')
let models = require('../models')
let Result = require('../utils/Result')
let jwt = require('jsonwebtoken')
let { SECRET_KEY, EXPIRES_TIME } = require('../setting/constant')


router.get('/', function(req, res, next) {
    res.send('user is ok...');
});



/**
 *  @Router post /users/register
 *  @desc   注册账号
 *  @access 接口是公开的
 */
router.post('/register', async(req, res) => {
    let isReapet = await models.User.findOne({ where: { username: req.body.username } })
    if (!isReapet) {
        bcrypt.hash(req.body.password, 10, async(err, hash) => {
            req.body.password = hash
            let user = await models.User.create(req.body)
            new Result(null, `${req.body.username} 注册成功`).success(res)
        })
    } else {
        new Result(null, `${req.body.username}已经存在`).repeat(res)
    }
})

/**
 *  @Router post /users/login
 *  @desc   登录
 *  @access 接口是公开的
 */
router.post('/login', async(req, res) => {
    console.log('---------------')
    let user = await models.User.findOne({ where: { username: req.body.username } })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            let tokenData = { username: user.username, nickname: user.nickname, avatar: user.avatar }
            let token = jwt.sign(tokenData, SECRET_KEY, { expiresIn: EXPIRES_TIME, }) //传入数据 秘钥 过期时间
            new Result({ token: `Bearer ${token}` }, `登录成功`).success(res)
        } else {
            new Result(null, `密码错误`).fail(res)
        }
    } else {
        new Result(null, `当前账户未注册`).fail(res)
    }
})

/**
 *  @Router get /users/getInfo
 *  @desc   获取用户信息
 *  @access 接口是私有的
 */
router.get('/getInfo', async(req, res) => {
    const { nickname, username, avatar } = req.user
    const data = {
        nickname,
        username,
        avatar
    }
    new Result(data, '获取用户信息成功').success(res)
})


/**
 *  @Router get /users/allAdmin
 *  @desc   获取所有管理员信息
 *  @access 接口是私有的
 */
router.get('/allAdmin', async(req, res) => {
    let result = await models.User.findAll()
    new Result(result, '').success(res)
})


module.exports = router;