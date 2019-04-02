const R = require('ramda')

const LoginDomain = require('./')
const UserDomain = require('../user')

const { generateUser } = require('../../helpers/mockData/user')
const { UnauthorizedError } = require('../../helpers/errors')

const loginDomain = new LoginDomain()
const userDomain = new UserDomain()

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
})
