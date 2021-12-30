import jwt from 'jsonwebtoken'

import { UnauthorizedError } from '#libs/error.js'

const { tokenConfig } = config

export const sign = (data) => {
  return {
    token_type: 'bearer',
    access_token: jwt.sign(
      {
        data,
        exp: Math.floor(Date.now() / 1000) + tokenConfig.expired,
      },
      tokenConfig.secret
    ),
    refresh_token: jwt.sign(
      {
        data,
        exp:
          Math.floor(Date.now() / 1000) +
          (tokenConfig.refresh || tokenConfig.expired * 2),
      },
      tokenConfig.secret
    ),
  }
}

export const verify = (ctx) => {
  try {
    if (typeof ctx.request.headers.authorization === 'string') {
      const token = ctx.request.headers.authorization.slice(7)
      ctx.jwtData = jwt.verify(token, tokenConfig.secret)
    } else {
      throw new UnauthorizedError()
    }
  } catch (err) {
    throw new UnauthorizedError()
  }
}
