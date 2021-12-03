const BaseDAO = require('@libs/baseDAO')
const User = require('@models').user

class UserService extends BaseDAO {
  constructor(model) {
    super(model)
  }
}

module.exports = new UserService(User)
