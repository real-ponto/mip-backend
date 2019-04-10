const Cpf = require('@fnando/cpf/dist/node')
const Cnpj = require('@fnando/cnpj/dist/node')
const { FieldValidationError } = require('../../../helpers/errors')

const validatorCpf = (cpf) => {
  if (!Cpf.isValid(cpf)) {
    throw new FieldValidationError([{ name: 'cpf', message: 'cpf is invalid' }])
  }
  return true
}

const validatorCnpj = (cnpj) => {
  if (!Cnpj.isValid(cnpj)) {
    throw new FieldValidationError([{ name: 'cnpj', message: 'cnpj is invalid' }])
  }
  return true
}

const validatorNameComplete = (name) => {
  if (!name.match(/ /)) {
    throw new FieldValidationError([{ name: 'name', message: 'need a complete name' }])
  }
  return true
}


module.exports = {
  validatorCpf,
  validatorCnpj,
  validatorNameComplete,
}
