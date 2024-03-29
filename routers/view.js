const router = require('@/libs/koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index.html')
  next()
})

router.get('/index', async (ctx, next) => {
  await ctx.render('index.html')
  next()
})

router.get('/login', async (ctx, next) => {
  await ctx.render('login.html')
  next()
})

module.exports = router
