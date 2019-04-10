const { FieldValidationError } = require('../../../helpers/errors')
const {
  validatorCpf,
  validatorCnpj,
  validatorNameComplete,
} = require('./')


describe('validator', () => {
  describe('complete-name', () => {
    test('valid complete-name', () => {
      const testName = () => validatorNameComplete('Fulano de tal')
      expect(testName()).toBe(true)
    })

    test('invalid complete-name', () => {
      const testName = () => validatorNameComplete('Fulano')
      expect(testName).toThrowError(new FieldValidationError())
    })
  })

  describe('cpf', () => {
    test('invalid cpf', () => {
      const testcpf = () => validatorCpf('11122233355')
      expect(testcpf).toThrowError(new FieldValidationError())
    })

    test('valid cpf', () => {
      const testcpf = () => validatorCpf('53282085796')
      expect(testcpf()).toBe(true)
    })
  })

  describe('cnpj', () => {
    test('invalid cnpj case 1', () => {
      const testcnpj = () => validatorCnpj('00000000000000')
      expect(testcnpj).toThrowError(new FieldValidationError())
    })

    test('invalid cnpj case 2', () => {
      const testcnpj = () => validatorCnpj('98754563215684')
      expect(testcnpj).toThrowError(new FieldValidationError())
    })

    test('valid cnpj case 1', () => {
      const testcnpj = () => validatorCnpj('28.305.117/0001-00')
      expect(testcnpj()).toBe(true)
    })

    test('valid cnpj case 2', () => {
      const testcnpj = () => validatorCnpj('28305117000100')
      expect(testcnpj()).toBe(true)
    })
  })
})
