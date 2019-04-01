const LoginDomain = require('./')

const loginDomain = new LoginDomain()

describe('login-domain', () => {
  describe('logOnTest', () => {
    test('', async () => {
      const userAdmin = {
        username: 'modrp',
        login: {
          password: '102030',
        },
      }
      const login = await loginDomain.login(userAdmin)

      expect(login.username).toEqual(userAdmin.username)
    })
  })
})
