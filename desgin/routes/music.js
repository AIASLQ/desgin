const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const express = require('express')
const router = express.Router()
const models = require('../models')
const Result = require('../utils/Result')
const fs = require('fs');
const path = require('path');
const multer = require('multer')

function rename(name) {
    let timer = Number(new Date())
    return timer + name
}

// 1. 配置存储信息; 
var storage = multer.diskStorage({
    // 如果存储路径不存在，我们的存储会报错; 
    destination: function(req, file, cb) {
        cb(null, path.resolve(__dirname, "../public/musics/"))
    },
    // 文件名; 
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

// 2. 创建图片上传中间键;
// 创建 upload 中间件; 
var upload = multer({ storage: storage });

/**
 *  @Router post /imgs/upload
 *  @desc   上传单张图片接口
 *  @access 接口是公开的   ---------- 没有添加处理失败的逻辑
 */
router.post('/upload', upload.single('file'), (req, res) => {
    let fileName = rename(req.file.filename)
    console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');
    let url = null
    if (process.env.NODE_ENV == 'development') {
        url = "http://192.168.1.7:3333/musics/" + fileName
    }
    if (process.env.NODE_ENV == 'production') {
        url = "http://api.jlongyan.cn:3333/musics/" + fileName
    }
    fs.readFile(req.file.path, (err, data) => {
        if (err) { return res.send({ msg: '上传失败' }) }
        fs.writeFile(path.join(__dirname, '../public/musics/' + fileName), data, (error) => {
            let data = { url: url }
            new Result(data, '上传成功').success(res)
        })
    })
})

/**
 *  @Router post /music/list
 * @property
 *  @desc 获取音乐列表
 *  @access 接口是私有的
 */
router.post('/list', async(req, res) => {
    let currentPage = parseInt(req.body.currentPage) || 1
    let pageSize = parseInt(req.body.pageSize) || 100
    let where = {};
    let keyword = req.body.keyword
    let type = req.body.type
    if (keyword) {
        where.name = {
            [Op.like]: '%' + keyword + '%'
        }
    }
    if (type) {
        where.typeId = {
            [Op.like]: '%' + type + '%'
        }
    }
    let result = await models.Music.findAndCountAll({
        order: [
            ['count', 'DESC']
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
 *  @Router post /music/add
 *  @desc   新增歌曲
 *  @access 接口是私有的
 */
router.post('/add', async(req, res) => {
    const { singerId, typeId, name, coverImg, desc, singerName, typeName, url } = req.body
    const result = await models.Music.create({
        name: name,
        singerId: singerId,
        count: 0,
        typeId: typeId,
        coverImg: coverImg,
        desc: desc,
        singerName: singerName,
        typeName: typeName,
        url: url

    })
    new Result(result, `新增 ${result.name} 歌曲成功`).success(res)
})

/**
 *  @Router post/music/edit
 *  @desc   更新歌曲
 *  @access 接口是私有的
 */
router.post('/edit', async(req, res) => {
    var Music = await models.Music.findByPk(req.body.id)
    Music.update(req.body)
    res.json({ Music: Music })
})

router.post('/delete', async(req, res) => {
    let result = await models.Music.destroy({
        where: { id: req.body.id }
    })
    new Result(null, '删除成功').success(res)
})

/**
 *  @Router get /music/play
 *  @desc   更新歌曲
 *  @access 接口是私有的
 */
router.get('/play', async(req, res) => {
    var Music = await models.Music.update({
        count: Sequelize.fn('1 + abs', Sequelize.col('music.count'))
    }, {
        where: {
            id: req.query.id
        }
    })
    Music = await models.Music.findByPk(req.query.id)

    var singer = await models.Singer.findByPk(Music.singerId)
    singer.update({
        hot: singer.hot + 1
    })
    new Result(null, '').success(res)
})

/**
 *  @Router post /music/detail
 *  @desc   获取歌曲详情
 *  @access 接口是私有的
 */
router.post('/detail', async(req, res) => {
    var Music = await models.Music.findByPk(req.params.id)
    res.json({ Music: Music })
})


module.exports = router