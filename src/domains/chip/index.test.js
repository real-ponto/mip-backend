const R = require('ramda')

const { FieldValidationError } = require('../../helpers/errors')
const { generateChip } = require('../../helpers/mockData/chip')
const ChipDomain = require('./')

const chipDomain = new ChipDomain()

describe('chip-domain', () => {
  describe('chipCreateTest', () => {
    test('try add chip with correct date', async () => {
      const chipMock = generateChip(999)

      const chipCreated = await chipDomain.createChip(chipMock)

      expect(chipCreated.numChip).toEqual(chipMock.numChip)
      expect(chipCreated.ip).toEqual(chipMock.ip)
      expect(chipCreated.operadora).toEqual(chipMock.operadora)
    })

    test('numChip with letters', async () => {
      const chipMock = {
        numChip: '5313adsas',
        ip: '172.40.24.202',
        operadora: 'Claro',
      }

      await expect(chipDomain.createChip(chipMock)).rejects
        .toThrow()
    })

    test('numChip null', async () => {
      const chipMock = {
        numChip: '',
        ip: '172.40.24.202',
        operadora: 'Claro',
      }

      await expect(chipDomain.createChip(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'numChip',
          message: 'numChip cannot be null',
        }]))
    })

    test('operadora', async () => {
      const chipMock = {
        numChip: '101010100',
        ip: '172.40.24.202',
        operadora: '',
      }

      await expect(chipDomain.createChip(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'operadora',
          message: 'operadora cannot be null',
        }]))
    })

    test('omit numChip', async () => {
      const chipMock = R.omit(['numChip'], generateChip())

      await expect(chipDomain.createChip(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'numChip',
          message: 'numChip cannot be null',
        }]))
    })
  })

  describe('getChipByIdTest', () => {
    let chipCreated = null
    let counter = 0
    beforeEach(async () => {
      const chipMock = generateChip(counter)
      counter += 1
      chipCreated = await chipDomain.createChip(chipMock)
    })

    test('get correct date', async () => {
      const chipReturned = await chipDomain.getById(chipCreated.id)

      expect(chipReturned.numChip).toEqual(chipCreated.numChip)
      expect(chipReturned.ip).toEqual(chipCreated.ip)
      expect(chipReturned.operadora).toEqual(chipCreated.operadora)
    })

    test('get null', async () => {
      await expect(chipDomain.getById(null))
        .rejects.toThrowError(new FieldValidationError([{
          field: 'id',
          message: 'id cannot be null',
        }]))
    })

    test('get incorrect id', async () => {
      await expect(chipDomain.getById('eda')).rejects
        .toThrowError(new FieldValidationError([{
          field: 'id',
          message: 'id is invalid',
        }]))
    })
  })
})
