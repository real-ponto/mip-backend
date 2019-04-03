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

    const HasIp = R.has('ip', chip)

    if (noHasNumChip) {
      throw new FieldValidationError([{
        field: 'numChip',
        message: 'numChip cannot be null',
      }])
    }

    if (HasIp) {
      if (!chip.ip) {
        const chipIpExistent = await Chip.findOne({
          where: { ip: chip.ip },
        })

        if (chipIpExistent) {
          throw new FieldValidationError([{
            field: 'ip',
            message: 'ip already exists',
          }])
        }
      }
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

  async updateChipById(id, bodyData, options = {}) {
    const chip = R.omit(['id'], bodyData)

    const chiphasNumChip = R.has('numChip', chip)

    const chiphasOperadora = R.has('operadora', chip)

    const chiphasIp = R.has('ip', chip)

    const HasIp = R.has('ip', chip)

    let newChip = {}

    if (chiphasNumChip) {
      newChip = {
        ...newChip,
        numChip: R.prop('numChip', chip),
      }
    }

    if (HasIp) {
      if (!chip.ip) {
        const chipIpExistent = await Chip.findOne({
          where: { ip: chip.ip },
        })

        if (chipIpExistent) {
          throw new FieldValidationError([{
            field: 'ip',
            message: 'ip already exists',
          }])
        }
      }
    }

    if (chiphasOperadora) {
      newChip = {
        ...newChip,
        operadora: R.prop('operadora', chip),
      }
    }

    if (chiphasIp) {
      newChip = {
        ...newChip,
        ip: R.prop('ip', chip),
      }
    }

    const { transaction = null } = options

    const chipInstance = await this.getById(id, { transaction })

    await chipInstance.update(newChip)

    const chipUpdated = await this.getById(id, { transaction })

    return chipUpdated
  }
}

module.exports = ChipDomain
