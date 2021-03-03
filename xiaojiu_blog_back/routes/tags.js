const express = require('express')
const router = express.Router()
const models = require('../models')
const Result = require('../utils/Result')

router.get('/test', async (req, res) => {
    res.send('ok....')
})


/**
 *  @Router post /tags/addTag
 *  @desc 新增标签
 *  @access 接口是私有的
 */
router.post('/addTag', async(req, res) => {
    const { tagName, color } = req.body
    const data = { tagName, color }
    const result = await models.Tag.findOrCreate({
        data,
        where: {
            tagName,color
        }
    })
    if(result[1]){
        new Result(result,`新增 ${result[0].dataValues.tagName} 标签成功`).success(res)
    }else{
        new Result(result,` ${result[0].dataValues.tagName} 标签已经存在了`).warning(res)
    }

})

router.post('/delTag', async(req, res) => {
    const {id} = req.body
    const result = await models.Tag.destroy({where:{id}})
    console.log(result)
    if(result) {
        new Result(result,`删除成功`).success(res)
    }else {
        new Result(result,`不存在该数据`).warning(res)
    }
})

router.post('/queryTag', (req, res) => {

})

router.post('/addTag', (req, res) => {

})

module.exports = router