const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const express = require('express')
const router = express.Router()
const models = require('../models')
const Result = require('../utils/Result')

/**
 *  @Router post /bookChild/create
 *  @desc 新增歌曲集下歌曲
 *  @access 接口是私有的
 */
router.post('/create', async(req, res) => {
    var songBookId = req.body.songBookId
    var musicId = req.body.musicId
    var data = {
        songBookId,
        musicId
    }
    var result = await models.BookChild.findAndCountAll({
        where: data
    })
    if (result.count) {
        new Result(result[0], `已经存在了`).warning(res)
    } else {
        result = await models.BookChild.create(data)
        new Result(result, `success`).success(res)
    }
})

/**
 *  @Router post /bookChild/delete
 *  @desc 删除
 *  @access 接口是私有的
 */
router.post('/delete', async(req, res) => {
    let result = await models.BookChild.destroy({
        where: { id: req.body.id }
    })
    new Result(result, `删除成功`).success(res)
})

/**
 *  @Router post /bookChild/list
 *  @desc   获取所有歌星
 *  @access 接口是私有的
 */
router.post('/list', async(req, res) => {
    var keyWord = req.body.keyWord
    var where = {
        songBookId: req.body.songBookId,
    }
    const result = models.BookChild.findAndCountAll({
        where: where
    })
    result.then((a) => {
        var proArr = []
        a.rows.forEach((item) => {
            var search = {
                id: item.musicId
            }
            if (keyWord) {
                search.name = {
                    [Op.like]: '%' + keyWord + '%'
                }
            }
            proArr.push(models.Music.findAndCountAll({
                where: search
            }))
        })
        Promise.all(proArr).then((r) => {
            var list = []
            r.forEach((item) => {
                list = [...list, ...item.rows]
            })
            var sortArrayByOrder = function(arr, key, order) {
                return arr.sort(function(a, b) {
                    if (order) {
                        return a[key] > b[key] ? 1 : -1
                    } else {
                        return a[key] < b[key] ? 1 : -1
                    }
                })
            }
            const data = {
                list: sortArrayByOrder(list, 'count')
            }
            new Result(data, '获取列表成功').success(res)
        }).catch((error) => {
            console.log(error) // 失败了，打出 '失败'
        })
    })
})




module.exports = router