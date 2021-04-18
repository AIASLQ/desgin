const express = require('express')
const router = express()
const fs = require('fs');
const path = require('path');
const multer = require('multer')
const Result = require('../utils/Result')
const models = require('../models')

function rename(name) {
    let timer = Number(new Date())
    return timer + name
}

// 1. 配置存储信息; 
var storage = multer.diskStorage({
    // 如果存储路径不存在，我们的存储会报错; 
    destination: function(req, file, cb) {
        cb(null, path.resolve(__dirname, "../public/images/"))
    },
    // 文件名; 
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpg")
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
        url = "http://192.168.1.7:3333/images/" + fileName
    }
    if (process.env.NODE_ENV == 'production') {
        url = "http://api.jlongyan.cn:3333/images/" + fileName
    }
    fs.readFile(req.file.path, (err, data) => {
        if (err) { return res.send({ msg: '上传失败' }) }
        fs.writeFile(path.join(__dirname, '../public/images/' + fileName), data, (error) => {
            models.Img.create({ url, type: 1 }).then(img => {
                let data = { url: img.url }
                console.log(img)
                new Result(data, '上传成功').success(res)
            })
        })
    })
})

router.get('/', (req, res) => {
    res.send('img router is ok...')
})


module.exports = router