var express = require('express');
var router = express.Router();
var models = require('../models')
var Op = models.Sequelize.Op;
const sequelize = require('sequelize');
const Comment = require('../models').Comment
const Result = require('../utils/Result')

/**
 *  @Router get /article/getAllArticle
 *  @desc 获取所有文章/关键词模糊搜索/分页
 *  @access 接口是公开的
 */
// # TODU this
router.post('/AllArticle', async function(req, res, next) {
    let currentPage = parseInt(req.body.currentPage) || 1
    let pageSize = parseInt(req.body.pageSize) || 5
    let where = {};
    if (req.body.typeId) {
        where.typeId = req.body.typeId
    }
    if (req.body.status) {
        where.status = req.body.status
    }
    let keyword = req.body.keyword
    if (keyword) {
        where.keyword = {
            [Op.like]: '%' + keyword + '%'
        }
    }
    let result = await models.Article.findAndCountAll({
        order: [
            ['id', 'DESC']
        ], //倒叙的方式输出 对比id 默认为ASC正序
        where, //模糊查询的条件
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
        include: [{
            model: models.Type,
            attributes: ['className']
        }, {
            model: models.User,
            attributes: ['nickname']
        }]
    })
    const data = {
        articles: result.rows,
        pagination: {
            currentPage,
            pageSize,
            total: result.count
        }
    }
    new Result(data, '获取成功').success(res)
});

/**
 *  @Router get /articles/getDetail/xx
 *  @desc 获取单个文章
 *  @access 接口是公开的
 */
router.get('/getDetail/:id', async(req, res) => {
    var article = await models.Article.findOne({
        where: { id: req.params.id },
        // attributes: ['title', 'desc', 'status', 'userId', 'typeId', 'coverImg', 'content'],
        include: [models.Comment, {
            model: models.Type,
            // attributes: ['className'] //限制只取某某字段
        }, {
            model: models.User,
            attributes: ['nickname']
        }]
    })
    new Result(article, '获取成功').success(res)
})

/**
 *  @Router post /article/addArticle
 *  @desc 新增文章
 *  @access 接口是私有的
 */
router.post('/addEditArticle', async(req, res) => {
    console.log(req.body)
    if (req.body.id) {
        let article = await models.Article.update(req.body, {
            where: { id: req.body.id }
        })
        new Result(article, `修改 ${req.body.title} 文章成功`).success(res)
    } else {
        let article = await models.Article.create(req.body)
        new Result(article, `新增 ${article.title} 文章成功`).success(res)
    }
})


/**
 *  @Router post /article/update/xx
 *  @desc 修改文章
 *  @access 接口是私有的
 */
router.put('/update/:id', async(req, res) => {
    var article = await models.Article.findByPk(req.params.id)
    article.update(req.body) //findByPk查找主键id
    res.json({ article: article })
})

/**
 *  @Router post /articles/delArticle/xxx
 *  @desc 删除文章
 *  @access 接口是私有的
 */
router.post('/delArticle/:id', async(req, res) => {
    console.log(req.params.id)
    var article = await models.Article.findByPk(req.params.id)
    article.destroy()
    new Result(article, '删除成功').success(res)
})



router.get('/getAll', async(req, res) => {
    let result = await models.Article.findAll({
        attributes: { exclude: ['typeId', 'TypeId', 'UserId'] },
        limit: 5,
        include: [{
            model: models.Type,
            attributes: ['className']
        }, {
            model: models.User,
            attributes: ['nickname']
        }]
    })
    res.json(result)
})

/**
 *  @Router post /articles/getHotArticle
 *  @desc   获取最新的五篇文章  用于首页展示
 *  @access 接口是公开的
 */
router.get('/getHotArticle', async(req, res) => {
    let result = await models.Article.findAll({
        order: [
            ['id', 'DESC']
        ], //倒叙的方式输出 对比id 默认为ASC正序
        limit: 5,
        attributes: { exclude: ['typeId', 'TypeId', 'UserId'] },
        limit: 5,
        include: [{
            model: models.Type,
            attributes: ['className']
        }, {
            model: models.User,
            attributes: ['nickname']
        }]
    })
    new Result(result, '获取成功').success(res)
})
module.exports = router;