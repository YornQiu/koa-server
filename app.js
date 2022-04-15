const Koa = require('koa')
const koaBody = require('koa-body')
const static = require('koa-static')
const views = require('koa-views')
const cors = require('@koa/cors')
const helmet = require('koa-helmet')

const publicRouter = require('@/routers/public')
const privateRouter = require('@/routers/private')
const viewRouter = require('@/routers/view')
const corsHandler = require('@middlewares/cors')
const { loggerMiddleware } = require('@middlewares/logger')
const { errorHandler, responseHandler } = require('@middlewares/response')

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
      maxFieldsSize: 1024 * 1024 * 1024, // 1GB
    },
  })
)

// Static
app.use(static(config.publicDir))

// Helmet
app.use(helmet())

// Cors
app.use(cors(corsHandler))

// View
app.use(views(config.viewsDir))

// Routes
app.use(publicRouter.routes())
app.use(viewRouter.routes())
app.use(privateRouter.routes())

// Response
app.use(responseHandler)

module.exports = app
