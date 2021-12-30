/*
 * @Author: YornQiu
 * @Date: 2021-12-30 11:15:40
 * @LastEditors: YornQiu
 * @LastEditTime: 2021-12-30 11:19:09
 * @Description: 加载logger
 * @FilePath: /koa-server/bin/loadLogger.js
 */

import { logger } from '#middlewares/logger.js'

global.logger = logger
