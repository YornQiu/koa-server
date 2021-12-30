import Koa from 'koa'
import koaBody from 'koa-body'
import koaStatic from 'koa-static'
import views from 'koa-views'
import cors from '@koa/cors'
import helmet from 'koa-helmet'

import publicRouter from '#root/routers/public.js'
import privateRouter from '#root/routers/private.js'
import viewRouter from '#root/routers/view.js'
import corsHandler from '#middlewares/cors.js'
import { loggerMiddleware } from '#middlewares/logger.js'
import { errorHandler, responseHandler } from '#middlewares/response.js'

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
app.use(koaStatic(config.publicDir))

// Helmet
app.use(helmet())

// Cors
app.use(cors(corsHandler))

// View
app.use(views(config.viewsDir))

// Routes
app.use(publicRouter.routes(), publicRouter.allowedMethods())
app.use(viewRouter.routes(), viewRouter.allowedMethods())
app.use(privateRouter.routes(), privateRouter.allowedMethods())

// Response
app.use(responseHandler)

export default app
