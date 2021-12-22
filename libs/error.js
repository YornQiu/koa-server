class CommonError extends Error {
  constructor(message = 'unknown error', code = 500) {
    super(message)
    this.code = code
  }
}

export default {
  CommonError,
  /**
   * 无效的参数
   */
  InvalidQueryError: class InvalidQueryError extends CommonError {
    constructor(message = 'bad request') {
      super(message, 400)
    }
  },
  /**
   * 身份未认证
   */
  UnauthorizedError: class UnauthorizedError extends CommonError {
    constructor(message = 'unauthorized') {
      super(message, 401)
    }
  },
  /**
   * 拒绝访问
   */
  ForbiddenError: class ForbiddenError extends CommonError {
    constructor(message = 'forbidden') {
      super(message, 403)
    }
  },
  /**
   * 资源未找到
   */
  NotFoundError: class NotFoundError extends CommonError {
    constructor(message = 'not found') {
      super(message, 404)
    }
  },
}
