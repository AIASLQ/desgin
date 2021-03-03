let jwt = require('express-jwt')
let {SECRET_KEY} = require('./constant')

module.exports = jwt({
    secret:SECRET_KEY,
    algorithms: ['HS256'],
    credentialsRequired: true,
}).unless({
    path:[
        '/',
        '/api/users/login',
        '/api/users/register',
        '/api/imgs/upload',
        '/api/articles/allArticle',
        '/api/types/getAllType',
        /^\/api\/articles\/getDetail\/.*/, //动态的路由需要用这种正则的方式去匹配
        '/api/articles/getAll',
        /^\/api\/articles\/allArticle\/.*/,
        '/api/articles/getHotArticle',
        '/api/tags/test',
    ]
})