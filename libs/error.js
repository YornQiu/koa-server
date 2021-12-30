export class CommonError extends Error {
  constructor(message = 'unknown error', code = 500) {
    super(message)
    this.code = code
  }
}

/**
 * 无效的参数
 */
export class InvalidQueryError extends CommonError {
  constructor(message = 'bad request') {
    super(message, 400)
  }
}

/**
 * 身份未认证
 */
export class UnauthorizedError extends CommonError {
  constructor(message = 'unauthorized') {
    super(message, 401)
  }
}

/**
 * 拒绝访问
 */
export class ForbiddenError extends CommonError {
  constructor(message = 'forbidden') {
    super(message, 403)
  }
}

/**
 * 资源未找到
 */
export class NotFoundError extends CommonError {
  constructor(message = 'not found') {
    super(message, 404)
  }
}
