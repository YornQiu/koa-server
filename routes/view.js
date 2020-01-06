const router = require('koa-router')();

router.get('/index', async (ctx, next) => {
  await ctx.render('index.html')
  next()
})

router.get('/login', async (ctx, next) => {
  await ctx.render('login.html')
  next()
})

module.exports = router
