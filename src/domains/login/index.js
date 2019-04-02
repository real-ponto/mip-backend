const database = require('../../database')

const SessionDomain = require('./session')

const { UnauthorizedError } = require('../../helpers/errors')

const User = database.model('user')
const Login = database.model('login')

const sessionDomain = new SessionDomain()

class LoginDomain {
  async login({ username, password }, options = {}) {
    const { transaction = null } = options

    const login = await Login.findOne({
      include: [{
        model: User,
        where: { username },
      }],
      transaction,
    })

    if (!login) {
      throw new UnauthorizedError()
    }

    const checkPwd = await login.checkPassword(password)

    if (!checkPwd) {
      throw new UnauthorizedError()
    }

    const session = await sessionDomain.createSession(
      login.id,
      { transaction },
    )

    return session
  }
}

module.exports = LoginDomain
