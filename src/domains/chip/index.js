const R = require('ramda')
const { isUUID } = require('validator')

const { FieldValidationError } = require('../../helpers/errors')

const database = require('../../database')

const Chip = database.model('chip')

class ChipDomain {
  async createChip(bodyData, options = {}) {
    const chip = R.omit(['id'], bodyData)

    const noHasNumChip = R.not(R.has('numChip', chip))

    const noHasOperadora = R.not(R.has('operadora', chip))

    if (noHasNumChip) {
      throw new FieldValidationError([{
        field: 'numChip',
        message: 'numChip cannot be null',
      }])
    }

    if (!chip.numChip) {
      throw new FieldValidationError([{
        field: 'numChip',
        message: 'numChip cannot be null',
      }])
    }

    if (noHasOperadora) {
      throw new FieldValidationError([{
        field: 'operadora',
        message: 'operadora cannot be null',
      }])
    }

    if (!chip.operadora) {
      throw new FieldValidationError([{
        field: 'operadora',
        message: 'operadora cannot be null',
      }])
    }

    const { transaction = null } = options

    const optionsForCreate = {
      transaction,
    }

    const chipCreated = await Chip.create(chip, optionsForCreate)

    const chipReturned = await Chip.findByPk(chipCreated.id, {
      transaction,
    })

    return chipReturned
  }

  async getById(id, options = {}) {
    const { transaction = null } = options

    if (!id) {
      throw new FieldValidationError([{
        name: 'id',
        message: 'id cannot to be null',
      }])
    }

    if (!isUUID(id)) {
      throw new FieldValidationError([{
        name: 'id',
        message: 'id is invalid',
      }])
    }

    const chipReturned = await Chip.findByPk(id, {
      transaction,
    })
    return chipReturned
  }
}

module.exports = ChipDomain
