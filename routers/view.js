import koaRouter from '#libs/koa-router.js'

const router = new koaRouter()

router.get('/index', async (ctx, next) => {
  await ctx.render('index.html')
  next()
})

router.get('/login', async (ctx, next) => {
  await ctx.render('login.html')
  next()
})

export default router
