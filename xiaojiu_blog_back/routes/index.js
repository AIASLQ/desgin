var express = require('express');
var router = express.Router();
let jwtAuth = require('../setting/jwt')
const {CODE_ERROR} = require('../setting/constant')
const Result = require('../utils/Result')
const boom = require('boom')
router.use(jwtAuth)

const usersRouter = require('./users');
const articleRouter = require('./article');
const typeRouter = require('./type');
const userRouter = require('./users');
const imgRouter = require('./img');
const reptileRouter = require('./reptiles');
const tagRouter = require('./tags');

router.use('/users', usersRouter);
router.use('/articles', articleRouter);
router.use('/types', typeRouter);
router.use('/users', userRouter);
router.use('/imgs', imgRouter);
router.use('/reptiles', reptileRouter);
router.use('/tags', tagRouter);


/** 匹配路由不存在的情况放在所有router最后面 */
router.use((req, res, next) => {
  next(boom.notFound('接口不存在'))
})


/** 错误处理放在所有路由之后这样才可以拦截所有错误 */
router.use((err, req, res, next) => {
  if (err.name && err.name == 'UnauthorizedError') {
      const { status = 401, message } = err 

      new Result(null,'token过期,请重新登录',{
          error: status,
          errMsg: message
      })
      .jwtError(res.status(status))
  } else {
      const msg = (err && err.message) || '系统错误';
      const statusCode = (err.output && err.output.statusCode) || 500;
      const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message;
      res.status(statusCode).json({
          code: CODE_ERROR,
          msg,
          error: statusCode,
          errorMsg
      })
  }
})



module.exports = router;  
