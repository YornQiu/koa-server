const Koa = require('koa')
const koaBody = require('koa-body')
const static = require('koa-static')
const views = require('koa-views')
const cors = require('koa2-cors')
const helmet = require('koa-helmet')

const publicRouter = require('@/routers/public')
const privateRouter = require('@/routers/private')
const viewRouter = require('@/routers/view')
const { loggerMiddleware } = require('@middlewares/logger')
const { errorHandler, responseHandler } = require('@middlewares/response')
const { corsHandler } = require('@middlewares/cors')

const app = new Koa()

// Logger
app.use(loggerMiddleware)

// Error Handler
app.use(errorHandler)

app.use(
  koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      maxFieldsSize: 10 * 1024 * 1024,
    },
  })
)

// Static
app.use(static(config?.publicDir))

// Helmet
app.use(helmet())

// Cors
app.use(cors(corsHandler))

//View
app.use(views(config.viewsDir))
app.use(static(config.viewsDir))

// Routes
app.use(publicRouter.routes(), publicRouter.allowedMethods())
app.use(viewRouter.routes(), viewRouter.allowedMethods())
app.use(privateRouter.routes(), privateRouter.allowedMethods())

// Response
app.use(responseHandler)

module.exports = app
