const express = require('express');
const router = express.Router();
const https = require('https')
const cheerio = require('cheerio')
const html2md = require('html-to-md');
const Result = require('../utils/Result')



function filterArticle(html,type) {
    console.log(type)
    let dom = ''
    switch (type){
        case '1':
            dom = '.markdown-body';
            break;
        case '2':
            dom = '.article-content' || 'markdown-body';
            break;
        case '3':
            dom = '#content_views';
            break;
        case '4':
            dom = '._2rhmJa';
            break;
        case '5':
            dom = '.post-body';
            break;
        case '6':
            dom ='.rich_media_content';
            break;
        default:
            dom = '.markdown-body';
            break;
    }
    console.log(dom)
    // var $ = cheerio.load(html)
    var $ = cheerio.load(html,{decodeEntities:false});
    var article = $(dom).html()
    return article;
}


router.get('/getArticle', (req,res) => {
    var url = req.query.url
    if(url){
        https.get(url, async (response) => {
            let html = ''
            response.on('data', (data) => {
                html += data
            })
        
            response.on('end', () => {
                let result = filterArticle(html,req.query.type)
                let data = html2md(result)
                new Result(data,`获取文章成功`).success(res)
            })
            response.on('error', () => {
                console.log(error)
            })
        })
    }else{
        new Result(null,`请填写正确的url`).fail(res)
    }
    
})


module.exports = router;