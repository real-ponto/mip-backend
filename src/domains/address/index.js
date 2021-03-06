const R = require('ramda')
const database = require('../../database')
const { FieldValidationError } = require('../../helpers/errors')

const Address = database.model('address')


module.exports = class AddressDomain {
  // eslint-disable-next-line camelcase
  async address_Create(addressData, options = {}) {
    const { transaction } = options

    const address = R.omit([
      'id',
    ], addressData)


    const addressNotHas = prop => R.not(R.has(prop, address))

    // street Validations
    if (addressNotHas('street') || !address.street) {
      throw new FieldValidationError([{
        field: 'street',
        message: 'street cannot be null',
      }])
    }

    // number Validations
    if (addressNotHas('number') || !address.number) {
      throw new FieldValidationError([{
        field: 'number',
        message: 'number cannot be null',
      }])
    }

    // const { number } = address

    // if (number.match(/^[0-9]+$/g)) {
    //   throw new FieldValidationError([{
    //     field: 'number',
    //     message: 'number is inválid',
    //   }])
    // }

    // city Validations
    if (addressNotHas('city') || !address.city) {
      throw new FieldValidationError([{
        field: 'city',
        message: 'city cannot be null',
      }])
    }

    // state Validations
    if (addressNotHas('state') || !address.state) {
      throw new FieldValidationError([{
        field: 'state',
        message: 'state cannot be null',
      }])
    }

    // neighborhood validations
    if (addressNotHas('neighborhood') || !address.neighborhood) {
      throw new FieldValidationError([{
        field: 'neighborhood',
        message: 'neighborhood cannot be null',
      }])
    }

    // zipCode validations
    if (addressNotHas('zipCode') || !address.zipCode) {
      throw new FieldValidationError([{
        field: 'zipCode',
        message: 'zipCode cannot be null',
      }])
    }

    const createdAddress = await Address.create(address, { transaction })

    return createdAddress
  }

  async updateById(addressid, options = {}) {
    const { transaction, addressData } = options

    const address = R.omit([
      'id',
    ], addressData)

    const addressUpdating = await Address.findByPk(addressid, { transaction })
    await addressUpdating.update(address, { transaction })

    return Address.findByPk(addressid, { transaction })
  }

  async softDeleteById(addressid, options = {}) {
    const { transaction } = options

    const addressDeleting = await Address.findByPk(addressid, { transaction })
    const response = await addressDeleting.destroy({ transaction })

    return response
  }
}
