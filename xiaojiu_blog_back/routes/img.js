const express = require('express')
const router = express()
const fs = require('fs');
const path = require('path');
const multer = require('multer')
const upload = multer({ dest: '../public/images/' });//multer中间件是用来上传图片的中间件
const Result = require('../utils/Result')
const models = require('../models')
function rename(name){
    let timer = Number(new Date())
    return timer + name
}


/**
 *  @Router get /imgs/upload
 *  @desc   上传单张图片接口
 *  @access 接口是公开的   ---------- 没有添加处理失败的逻辑
 */
router.post('/upload', upload.single('file'),  (req, res) => {
    let fileName = rename(req.file.originalname)
    console.log(process.env.NODE_ENV,'process.env.NODE_ENV');
    let url = null
    if (process.env.NODE_ENV == 'development') {
        url = "http://localhost:3333/images/" + fileName
    }
    if (process.env.NODE_ENV == 'production') {
        url = "http://api.jlongyan.cn:3333/images/" + fileName
    }
    fs.readFile(req.file.path, (err, data) => {
    	if (err) { return res.send({ msg: '上传失败' }) }
        // if (err) { return res.send({ msg: '上传失败' }) }
        //如果没有错误表示上传成功  这个时候需要存入这个图片 
        //使用fs模块需要三个参数 1：图片的绝对路径 2：写入的内容 3：回调函数
        // console.log(path.join(__dirname, '../public/images/' + req.file.originalname))
        
        fs.writeFile(path.join(__dirname, '../public/images/' + fileName), data, (error) => {
            models.Img.create({url,type:1}).then( img => {
            	let data = {url:img.url}
            	console.log(img)
            	new Result(data,'上传成功').success(res)
            })
        })
    })
})

router.get('/', (req, res) => {
    res.send('img router is ok...')
})


module.exports = router