const { tokenConfig } = config
const jwt = require('jsonwebtoken')

const sign = (data) => {
  return jwt.sign({
    data,
    exp: Math.floor(Date.now() / 1000) + tokenConfig.expired
  }, tokenConfig.secret)
}

const verify = (ctx) => {
  try {
    if (typeof ctx.request.headers.authorization === 'string') {
      const token = ctx.request.headers.authorization.slice(7)
      ctx.jwtData = jwt.verify(token, tokenConfig.secret)
    } else {
      throw { code: 401, message: 'no authorization' }
    }
  } catch (err) {
    throw { code: 401, message: err.message }
  }
}

module.exports = {
  sign, verify
}
