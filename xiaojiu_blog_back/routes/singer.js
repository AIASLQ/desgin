const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const express = require('express')
const router = express.Router()
const models = require('../models')
const Result = require('../utils/Result')

/**
 *  @Router post /singer/addSinger
 *  @desc 新增歌星
 *  @access 接口是私有的
 */
router.post('/addEditSinger', async(req, res) => {
    if (req.body.id) {
        let article = await models.Singer.update(req.body, {
            where: { id: req.body.id }
        })
        new Result(article, `修改 ${req.body.name} 歌星成功`).success(res)
    } else {
        let singer = await models.Singer.create(req.body)
        new Result(singer, `新增 ${singer.name} 歌星成功`).success(res)
    }
})

/**
 *  @Router post /singer/querySinger
 *  @desc   获取所有歌星
 *  @access 接口是私有的
 */
router.post('/querySinger', async(req, res) => {
    let currentPage = parseInt(req.body.currentPage) || 1
    let pageSize = parseInt(req.body.pageSize) || 100
    const { name } = req.body
    var where = {}
    if (req.body.sex == 0) {
        where.sex = {
            [Op.like]: '%' + req.body.sex + '%'
        }
    }
    if (req.body.sex == 1) {
        where.sex = {
            [Op.like]: '%' + req.body.sex + '%'
        }
    }
    if (name) {
        where.name = {
            [Op.like]: '%' + name + '%'
        }
    }
    const result = await models.Singer.findAndCountAll({
        order: [
            ['hot', 'DESC']
        ], // 排序
        where,
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
        attributes: ['id', 'name', 'sex', 'avatar', 'hot']
    })
    const data = {
        list: result.rows,
        currentPage,
        pageSize,
        total: result.count
    }
    new Result(data, '获取歌星列表成功').success(res)
})


/**
 *  @Router get /singer/querySinger
 *  @desc   获取所有歌星
 *  @access 接口是私有的
 */
router.post('/queryAll', async(req, res) => {
    const result = await models.Singer.findAll()
    new Result(result, '').success(res)
})

module.exports = router