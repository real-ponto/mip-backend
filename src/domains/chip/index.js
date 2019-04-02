const R = require('ramda')

const { FieldValidationError } = require('../../helpers/errors')

const database = require('../../database')

const Chip = database.model('chip')

class ChipDomain {
  async createChip(bodyData, options = {}) {
    const chip = R.omit(['id'], bodyData)

    const noHasNumChip = R.not(R.has('numChip', chip))

    if (noHasNumChip) {
      throw new FieldValidationError([{
        field: 'numChip',
        message: 'numChip cannot be null',
      }])
    }

    const { transaction = null } = options

    const optionsForCreate = {
      transaction,
    }

    const chipCreated = await Chip.create(chip, optionsForCreate)

    const chipReturned = await Chip.findById(chipCreated.id, {
      transaction,
    })

    return chipReturned
  }
}

module.exports = ChipDomain
