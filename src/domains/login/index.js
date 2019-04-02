const database = require('../../database')

const { UnauthorizedError } = require('../../helpers/errors')

const User = database.model('user')
const Login = database.model('login')

class LoginDomain {
  async login({ username, password }, options = {}) {
    const { transaction = null } = options

    const user = await Login.findOne({
      include: [{
        model: User,
        where: { username },
      }],
      transaction,
    })

    const checkPwd = await user.checkPassword(password)

    if (!checkPwd) {
      throw new UnauthorizedError()
    }

    return user
  }
}

module.exports = LoginDomain
