var express = require('express')
var router = express.Router()
let models = require('../models')
const Result = require('../utils/Result')

router.get('/', async(req, res) => {
    res.send('ok....')
})


/**
 *  @Router post /types/addEidtType
 *  @desc 新增编辑分类
 *  @access 接口是私有的
 */
router.post('/addEidtType', async(req, res) => {
    if (req.body.id) {
        let result = await models.Type.update(req.body, { where: { id: req.body.id } })
        console.log(result)
        new Result(result, `修改 ${req.body.className} 分类成功`).success(res)
    } else {
        let result = await models.Type.create(req.body)
        new Result(result, `新增 ${result.className} 分类成功`).success(res)
    }
})

/**
 *  @Router get /types/getAllType
 *  @desc   获取所有分类
 *  @access 接口是公开的
 */
router.get('/getAllType', async(req, res) => {

    let result = await models.Type.findAll()
    console.log(result);
    new Result(result, '获取所有分类成功').success(res)
})

/**
 *  @Router get /types/getTypeDetail/xxxx
 *  @desc   获取单个分类详情
 *  @access 接口是公开的
 */
router.get('/getTypeDetail/:id', async(req, res) => {
    var types = await models.Type.findOne({
            where: { id: req.params.id },
            include: [models.Article]
        }) //findByPk查找主键id
    res.json({ data: types })
})

/**
 *  @Router get /types/detele
 *  @desc   获取单个分类详情
 *  @access 接口是公开的
 */
router.post('/delete', async(req, res) => {
    let result = await models.Type.destroy({
        where: { id: req.body.id }
    })
    new Result(null, '删除成功').success(res)
})


module.exports = router