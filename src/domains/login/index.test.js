const R = require('ramda')

const LoginDomain = require('./')
const UserDomain = require('../user')
const SessionDomain = require('./session')

const { generateUser } = require('../../helpers/mockData/user')
const { UnauthorizedError } = require('../../helpers/errors')

const loginDomain = new LoginDomain()
const userDomain = new UserDomain()
const sessionDomain = new SessionDomain()

describe('login-domain', () => {
  describe('logOnTest', () => {
    let userCreated = {}
    let counter = 0

    beforeEach(async () => {
      const userMock = generateUser(`login_domain${counter}`)
      counter += 1
      userCreated = await userDomain.createUser(userMock)
    })

    test('try login with correct account', async () => {
      const getUserLoginMock = R.applySpec({
        username: R.prop('username'),
        password: R.prop('username'),
      })

      const userLogin = getUserLoginMock(userCreated)

      const session = await loginDomain.login(userLogin)

      expect(session.id).not.toBeNull()
    })

    test('try login with incorrect password', async () => {
      const getUserLoginMock = R.applySpec({
        username: R.prop('username'),
      })

      let userLogin = getUserLoginMock(userCreated)

      userLogin = {
        ...userLogin,
        password: 'abcs',
      }

      await expect(loginDomain.login(userLogin))
        .rejects.toThrowError(new UnauthorizedError())
    })

    test('try login with user not registered', async () => {
      const userLogin = {
        username: 'userNaoCadastrado',
        password: 'abcs',
      }

      await expect(loginDomain.login(userLogin))
        .rejects.toThrowError(new UnauthorizedError())
    })
  })

  describe('logoutTest', () => {
    let counter = 0
    let session = {}
    let userLogin = {}

    beforeEach(async () => {
      const userMock = generateUser(`logout_domain${counter}`)
      counter += 1
      const userCreated = await userDomain.createUser(userMock)

      const getUserLoginMock = R.applySpec({
        username: R.prop('username'),
        password: R.prop('username'),
      })

      userLogin = getUserLoginMock(userCreated)

      session = await loginDomain.login(userLogin)
    })

    test('try logout', async () => {
      const logoutSucess = await loginDomain.logout(session.id)

      const sucess = {
        logout: true,
      }

      expect(logoutSucess).toEqual(sucess)
    })

    test('try logout all sessions', async () => {
      const session2 = await loginDomain.login(userLogin)
      const session3 = await loginDomain.login(userLogin)
      const session4 = await loginDomain.login(userLogin)
      const session5 = await loginDomain.login(userLogin)

      await loginDomain.logoutAllSessions(userLogin.username)

      const isValid1 = await sessionDomain
        .checkSessionIsValid(session.id, userLogin.username)

      const isValid2 = await sessionDomain
        .checkSessionIsValid(session2.id, userLogin.username)

      const isValid3 = await sessionDomain
        .checkSessionIsValid(session3.id, userLogin.username)

      const isValid4 = await sessionDomain
        .checkSessionIsValid(session4.id, userLogin.username)

      const isValid5 = await sessionDomain
        .checkSessionIsValid(session5.id, userLogin.username)

      expect(isValid1).toBeFalsy()
      expect(isValid2).toBeFalsy()
      expect(isValid3).toBeFalsy()
      expect(isValid4).toBeFalsy()
      expect(isValid5).toBeFalsy()
    })
  })
})

describe('Session Domains Tests', () => {
  let session = {}
  let counter = 0
  let username = null

  beforeEach(async () => {
    const userMock = generateUser(`session_domain${counter}`)
    counter += 1
    const userCreated = await userDomain.createUser(userMock)
    const getUserLoginMock = R.applySpec({
      username: R.prop('username'),
      password: R.prop('username'),
    })

    const userLogin = getUserLoginMock(userCreated)

    // eslint-disable-next-line prefer-destructuring
    username = userCreated.username

    session = await loginDomain.login(userLogin)
  })

  test('try create session', async () => {
    expect(session.id).not.toBeNull()
    expect(session.lastActivity).not.toBeNull()
    expect(session.active).toBeTruthy()
  })

  test('try update last Activity', async () => {
    const sessionUpdated = await sessionDomain
      .updateLastActivity(session.id)

    const oldLastActivity = session.lastActivity
    const newLastActivity = sessionUpdated.lastActivity

    expect(newLastActivity > oldLastActivity).toBeTruthy()
  })

  test('try check validate of new session', async () => {
    const isValid = await sessionDomain
      .checkSessionIsValid(session.id, username)

    expect(isValid).toBeTruthy()
  })

  test('try turn invalid new session', async () => {
    let isValid = await sessionDomain
      .checkSessionIsValid(session.id, username)

    expect(isValid).toBeTruthy()

    await sessionDomain.turnInvalidSession(session.id)

    isValid = await sessionDomain
      .checkSessionIsValid(session.id, username)

    expect(isValid).toBeFalsy()
  })
})
