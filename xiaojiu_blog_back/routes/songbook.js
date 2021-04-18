const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const express = require('express')
const router = express.Router()
const models = require('../models')
const Result = require('../utils/Result')

/**
 *  @Router post /songbook/create
 *  @desc 新增歌曲集
 *  @access 接口是私有的
 */
router.post('/create', async(req, res) => {
    let songbook = await models.Songbook.create(req.body)
    new Result(songbook, `新增 ${songbook.name} 歌曲集成功`).success(res)
})

/**
 *  @Router post /songbook/update
 *  @desc 编辑歌曲集
 *  @access 接口是私有的
 */
router.post('/update', async(req, res) => {
    let article = await models.Songbook.update(req.body, {
        where: { id: req.body.id }
    })
    new Result(article, `修改 ${req.body.name} 歌曲集成功`).success(res)

})

/**
 *  @Router post /songbook/list
 *  @desc   获取所有歌星
 *  @access 接口是私有的
 */
router.post('/list', async(req, res) => {
    let currentPage = parseInt(req.body.currentPage) || 1
    let pageSize = parseInt(req.body.pageSize) || 100
    const result = await models.Songbook.findAndCountAll({
        offset: (currentPage - 1) * pageSize,
        limit: pageSize
    })
    const data = {
        list: result.rows,
        currentPage,
        pageSize,
        total: result.count
    }
    new Result(data, '获取歌曲集列表成功').success(res)
})


/**
 *  @Router get /songbook/detele
 *  @desc   获取单个分类详情
 *  @access 接口是公开的
 */
router.post('/delete', async(req, res) => {
    let result = await models.Songbook.destroy({
        where: { id: req.body.id }
    })
    if (result) {
        result = await models.BookChild.destroy({
            where: { songBookId: req.body.id }
        })
    }
    new Result(null, '删除成功').success(res)
})



module.exports = router