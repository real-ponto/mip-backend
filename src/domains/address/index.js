const R = require('ramda')
const database = require('../../database')

const Address = database.model('address')

module.exports = class AddressDomain {
  async add(addressData, options = {}) {
    const { transaction } = options

    const address = R.omit([
      'id',
    ], addressData)

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
