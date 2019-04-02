const database = require('../../database')

const Session = database.model('session')

class SessionDomain {
  async createSession(loginId, options = {}) {
    const { transaction = null } = options

    const session = await Session.create(
      { loginId },
      { transaction },
    )

    return session
  }
}

module.exports = SessionDomain
