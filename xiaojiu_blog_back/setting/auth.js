let Result = require('../utils/Result')
const redis = require('redis');
const client = redis.createClient();
const whiteList = [
    '/users/login',
    '/users/register',
    '/imgs/upload',
    '/music/upload',
    '/types/getAllType',
    '/music/list',
    '/singer/querySinger',
    '/songbook/list',
    '/bookChild/list',
    '/music/play',
    '/users/async'

]

module.exports = function(req, res, next) {
    const isExit = whiteList.find((item) => {
        return item === req.path
    })

    if (isExit) {
        next()
    } else {

        client.get(req.headers.token, (err, value) => {
            if (err || value == null) {
                new Result(null, 'token过期,请重新登录', {})
                    .authError(res.status(500))
            } else {
                req.user = JSON.parse(value);
                next()
            }
        })
    }

}