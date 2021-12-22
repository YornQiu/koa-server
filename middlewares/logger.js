import { existsSync, mkdirSync } from 'fs'
import { parse } from 'path'
import { configure, getLogger } from 'log4js'

const logsDir = parse(config.logPath).dir
if (!existsSync(logsDir)) {
  mkdirSync(logsDir)
}

configure({
  appenders: {
    console: { type: 'console' },
    dateFile: {
      type: 'dateFile',
      filename: config.logPath,
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
    },
  },
  categories: {
    default: {
      appenders: ['console', 'dateFile'],
      level: 'info',
    },
  },
})

export const logger = getLogger()

export const loggerMiddleware = async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  const remoteAddress =
    ctx.headers['x-forwarded-for'] ||
    ctx.ip ||
    ctx.ips ||
    (ctx.socket &&
      (ctx.socket.remoteAddress ||
        (ctx.socket.socket && ctx.socket.socket.remoteAddress)))
  const logText = `${ctx.method} ${ctx.status} ${
    ctx.url
  } 请求参数： ${JSON.stringify(ctx.request.body)}  响应参数： ${JSON.stringify(
    ctx.body
  )} - ${remoteAddress} - ${ms}ms`
  logger.info(logText)
}
