const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const express = require('express')
const router = express.Router()
const models = require('../models')
const Result = require('../utils/Result')

/**
 *  @Router post /collect/list
 *  @desc 列表
 *  @access 接口是私有的
 */
router.post('/list', async(req, res) => {
    if (req.user.id) {
        let currentPage = parseInt(req.body.currentPage) || 1
        let pageSize = parseInt(req.body.pageSize) || 100
        let result = await models.Collect.findAndCountAll({
            order: [
                ['id', 'DESC']
            ], //倒叙的方式输出 对比id 默认为ASC正序
            where: {
                userId: req.user.id
            },
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
    } else {
        new Result('', '请登录').fail(res)
    }

})


router.post('/collect', async(req, res) => {
    const playload = {
        ...req.body,
        userId: req.user.id
    }
    let result = await models.Collect.create(playload)
    new Result(null, '收藏成功').success(res)
})

router.post('/delete', async(req, res) => {
    let result = await models.Collect.destroy({
        where: { id: req.body.id }
    })
    new Result(null, '取消收藏成功').success(res)
})

module.exports = router