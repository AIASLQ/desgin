let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs')
let models = require('../models')
let Result = require('../utils/Result')
let jwt = require('jsonwebtoken')
const redis = require('redis');
const client = redis.createClient();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let { SECRET_KEY, EXPIRES_TIME } = require('../setting/constant')


router.get('/', function(req, res, next) {
    res.send('user is ok...');
});


/**
 *  @Router 
 *  @desc   同步ip地
 *  @access 接口是公开的
 * @example http://192.168.1.8:3333/api/users/async?ip=19.168.1.8
 */
router.get('/async', async(req, res) => {
    let ip = req.query.ip;
    if (ip) {
        let MusicResult = await models.Music.findAndCountAll();
        var list = MusicResult.rows || [];
        for (let index = 0; index < list.length; index++) {
            var Music = await models.Music.findByPk(list[index].id)
            var url = list[index].url;
            var coverImg = list[index].coverImg;
            if (coverImg) {
                var coverStr = coverImg.match(/^http.* ?:/g);
                var coverStrRes = coverImg.replace(coverStr[0], `http://${ip}:`);
                Music.update({
                    coverImg: coverStrRes
                })
            }
            if (url) {
                var str = url.
                match(/^http.* ?:/g);
                var urlRes = url.replace(str[0], `http://${ip}:`);
                Music.update({
                    url: urlRes
                })
            }
        }




        let ImgResult = await models.Img.findAndCountAll();
        var list = ImgResult.rows || [];
        for (let index = 0; index < list.length; index++) {
            var Img = await models.Img.findByPk(list[index].id)
            var url = list[index].url;
            if (url) {
                var str = url.
                match(/^http.* ?:/g);
                var urlRes = url.replace(str[0], `http://${ip}:`);
                Img.update({
                    url: urlRes
                })
            }
        }



        let SingerResult = await models.Singer.findAndCountAll();
        var list = SingerResult.rows || [];
        for (let index = 0; index < list.length; index++) {
            var Singer = await models.Img.findByPk(list[index].id)
            var avatar = list[index].avatar;
            if (avatar) {
                var str = avatar.
                match(/^http.* ?:/g);
                var avatarRes = avatar.replace(str[0], `http://${ip}:`);
                Singer.update({
                    avatar: avatarRes
                })
            }
        }




        let SongbookResult = await models.Songbook.findAndCountAll();
        var list = SongbookResult.rows || [];
        for (let index = 0; index < list.length; index++) {
            var Songbook = await models.Songbook.findByPk(list[index].id)
            var coverUrl = list[index].coverUrl;
            if (coverUrl) {
                var str = coverUrl.
                match(/^http.* ?:/g);
                var coverUrlRes = coverUrl.replace(str[0], `http://${ip}:`);
                Songbook.update({
                    coverUrl: coverUrlRes
                })
            }
        }



        let UserResult = await models.User.findAndCountAll();
        var list = UserResult.rows || [];
        for (let index = 0; index < list.length; index++) {
            var User = await models.User.findByPk(list[index].id)
            var avatar = list[index].avatar;
            if (avatar) {
                var str = avatar.
                match(/^http.* ?:/g);
                var avatarRes = avatar.replace(str[0], `http://${ip}:`);
                User.update({
                    avatar: avatarRes
                })
            }
        }








        new Result('', `注册成功`).success(res)
    }
})



/**
 *  @Router post /users/register
 *  @desc   注册账号
 *  @access 接口是公开的
 */
router.post('/register', async(req, res) => {
    let isReapet = await models.User.findOne({ where: { mobile: req.body.mobile } })
    if (!isReapet) {
        bcrypt.hash(req.body.password, 10, async(err, hash) => {
            req.body.password = hash
            let user = await models.User.create(req.body)
            new Result(null, `${req.body.mobile} 注册成功`).success(res)
        })
    } else {
        new Result(null, `${req.body.mobile}已经存在`).repeat(res)
    }
})

/**
 *  @Router post /users/login
 *  @desc   登录
 *  @access 接口是公开的
 */
router.post('/login', async(req, res) => {
    let user = await models.User.findOne({ where: { mobile: req.body.mobile } })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            let tokenData = { mobile: user.mobile, nickname: user.nickname, avatar: user.avatar, id: user.id }
            let token = jwt.sign(tokenData, SECRET_KEY, { expiresIn: EXPIRES_TIME, }) //传入数据 秘钥 过期时间
            client.setex(`${token}`, 10000, JSON.stringify(tokenData))
            new Result({ token: `${token}` }, `登录成功`).success(res)
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
    client.get(req.headers.token, async(err, value) => {
        if (err || value == null) {
            new Result(null, 'token过期,请重新登录', {})
                .authError(res.status(500))
        } else {
            let user = await models.User.findOne({
                where: {
                    mobile: JSON.parse(value).mobile
                },
                attributes: ['mobile', 'desc', 'sex', 'nickname', 'avatar', 'type']
            })
            new Result(user, '获取用户信息成功').success(res)
        }
    })
})

/**
 *  @Router get /users/allAdmin
 *  @desc   获取所有管理员信息
 *  @access 接口是私有的
 */
router.get('/allAdmin', async(req, res) => {
    let where = {
        type: 1
    };
    let result = await models.User.findAndCountAll({
        order: [
            ['id', 'DESC']
        ], //倒叙的方式输出 对比id 默认为ASC正序
        where,
        attributes: ['mobile', 'desc', 'sex', 'nickname', 'avatar', 'type', 'createdAt']
    })
    new Result({
        list: result.rows
    }, '').success(res)
})


/**
 *  @Router post /user/list
 */
router.post('/list', async(req, res) => {
    let currentPage = parseInt(req.body.currentPage) || 1
    let pageSize = parseInt(req.body.pageSize) || 100
    let keyword = req.body.keyword
    var where = {
        type: req.body.type
    }
    if (keyword) {
        where.mobile = {
            [Op.like]: '%' + keyword + '%'
        }
    }


    let result = await models.User.findAndCountAll({
        order: [
            ['id', 'DESC']
        ], //倒叙的方式输出 对比id 默认为ASC正序
        where, //模糊查询的条件
        offset: (currentPage - 1) * pageSize,
        limit: pageSize
    })
    const data = {
        list: result.rows,
        currentPage,
        pageSize,
        total: result.count
    }
    new Result(data, '获取成功').success(res)
})


/**
 *  @Router get /users/update
 *  @desc   更新用户信息
 *  @access 接口是私有的
 */
router.post('/update', async(req, res) => {
    let user = await models.User.update(req.body, {
        where: { id: req.user.id }
    })
    new Result(user, `修改 ${req.body.mobile} 信息成功`).success(res)
})

module.exports = router;