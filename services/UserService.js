const BaseDAO = require('@libs/baseDAO')
const { user } = require('@models')

class UserService extends BaseDAO {
  constructor(model) {
    super(model)
  }
}

module.exports = new UserService(user)
