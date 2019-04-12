const R = require('ramda')

const { FieldValidationError } = require('../../helpers/errors')
const { generateChip } = require('../../helpers/mockData/chip')
const ChipDomain = require('./')

const ChipProvider = require('../../domains/chip/chipProvider')

const chipProvider = new ChipProvider()

const chipDomain = new ChipDomain()

describe('chip-domain', () => {
  let provider = null

  beforeAll(async () => {
    provider = await chipProvider.chipProvider_Create({
      mobileProvider: 'Teste Chip Domain',
    })
  })

  describe('chipCreateTest', () => {
    test('try add chip with correct date', async () => {
      const chipMock = generateChip('999', provider.id)

      const chipCreated = await chipDomain.createChip(chipMock)

      expect(chipCreated.lot).toEqual(chipMock.lot)
      expect(chipCreated.numChip).toEqual(chipMock.numChip)
      expect(chipCreated.ip).toEqual(chipMock.ip)
      expect(chipCreated.status).toEqual('stock')
    })

    test('try add chip with ip existent', async () => {
      const chipMock = {
        numChip: '5313213',
        ip: '172.40.24.202',
        lot: 'laercio',
        chipProviderId: provider.id,
      }

      const chipCreated = await chipDomain.createChip(chipMock)

      await expect(chipCreated.ip).toEqual(chipMock.ip)

      await expect(chipDomain.createChip(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'ip',
          message: 'ip already exist',
        }]))
    })

    // test('try add chip with numChip wrong', async () => {
    //   const chipMock = {
    //     numChip: '531313wdad',
    //     ip: '172.40.24.202',
    //     lot: 'laercio',
    //     chipProviderId: provider.id,
    //   }

    //   await expect(chipDomain.createChip(chipMock)).rejects
    //     .toThrowError(new FieldValidationError([{
    //       field: 'numChip',
    //       message: 'numChip cannot be null',
    //     }]))
    // })

    test('try add chip with numChip null', async () => {
      const chipMock = {
        numChip: '',
        ip: '172.40.24.202',
        lot: 'laercio',
      }

      await expect(chipDomain.createChip(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'numChip',
          message: 'numChip cannot be null',
        }]))
    })

    test('try add chip without numChip', async () => {
      const chipMock = {
        ip: '172.40.24.202',
        lot: 'laercio',
      }

      await expect(chipDomain.createChip(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'numChip',
          message: 'numChip cannot be null',
        }]))
    })

    test('try add chip omiting numChip', async () => {
      const chipMock = R.omit(['numChip'], generateChip())

      await expect(chipDomain.createChip(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'numChip',
          message: 'numChip cannot be null',
        }]))
    })

    test('try add chip with lot null', async () => {
      const chipMock = {
        numChip: '13213213',
        ip: '172.40.24.202',
        lot: '',
      }

      await expect(chipDomain.createChip(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'lot',
          message: 'lot cannot be null',
        }]))
    })

    test('try add chip omiting lot', async () => {
      const chipMock = R.omit(['lot'], generateChip())

      await expect(chipDomain.createChip(chipMock)).rejects
        .toThrowError(new FieldValidationError([{
          field: 'lot',
          message: 'lot cannot be null',
        }]))
    })

    describe('getChipByIdTest', () => {
      let chipCreated = null
      let counter = 1
      beforeEach(async () => {
        const chipMock = generateChip(counter, provider.id)
        counter += 1
        chipCreated = await chipDomain.createChip(chipMock)
      })

      test('get chip by id with correct date', async () => {
        const chipReturned = await chipDomain.chip_GetById(chipCreated.id)

        expect(chipReturned.numChip).toEqual(chipCreated.numChip)
        expect(chipReturned.ip).toEqual(chipCreated.ip)
        expect(chipReturned.lot).toEqual(chipCreated.lot)
        expect(chipReturned.status).toEqual('stock')
      })
    })

    test('get chip by id equal null', async () => {
      await expect(chipDomain.chip_GetById(null))
        .rejects.toThrowError(new FieldValidationError([{
          field: 'id',
          message: 'id cannot be null',
        }]))
    })

    test('get incorrect id', async () => {
      await expect(chipDomain.chip_GetById('eda')).rejects
        .toThrowError(new FieldValidationError([{
          field: 'id',
          message: 'id is invalid',
        }]))
    })

    describe('updateChipByIdTest', () => {
      let chipCreated = null
      let counter = 100
      beforeEach(async () => {
        const chipMock = generateChip(counter, provider.id)
        counter += 1
        chipCreated = await chipDomain.createChip(chipMock)
      })

      test('update chip by id with only numChip', async () => {
        const chipMock = {
          numChip: '132132132',
        }

        const chipUpdate = await chipDomain.chip_updateById(chipCreated.id, chipMock)

        expect(chipUpdate.numChip).toEqual(chipMock.numChip)
        expect(chipUpdate.ip).toEqual(chipCreated.ip)
        expect(chipUpdate.lot).toEqual(chipCreated.lot)
        expect(chipUpdate.status).toEqual(chipCreated.status)
      })

      test('try update chip by id with ip existent', async () => {
        const chipMock = {
          numChip: '165465',
          ip: '172.40.24.202',
          lot: '13232132',
          chipProviderId: provider.id,
        }

        chipCreated = await chipDomain.createChip(chipMock)

        await expect(chipCreated.ip).toEqual(chipMock.ip)

        await expect(chipDomain.createChip(chipMock)).rejects
          .toThrowError(new FieldValidationError([{
            field: 'ip',
            message: 'ip already exist',
          }]))
      })

      test('update chip by id with only lot', async () => {
        const chipMock = {
          lot: '265',
        }

        const chipUpdate = await chipDomain.chip_updateById(chipCreated.id, chipMock)

        expect(chipUpdate.numChip).toEqual(chipCreated.numChip)
        expect(chipUpdate.ip).toEqual(chipCreated.ip)
        expect(chipUpdate.lot).toEqual(chipMock.lot)
        expect(chipUpdate.status).toEqual(chipCreated.status)
      })

      test('update chip by id with only ip', async () => {
        const chipMock = {
          ip: '152.202.21.45',
        }

        const chipUpdate = await chipDomain.chip_updateById(chipCreated.id, chipMock)

        expect(chipUpdate.numChip).toEqual(chipCreated.numChip)
        expect(chipUpdate.ip).toEqual(chipMock.ip)
        expect(chipUpdate.lot).toEqual(chipCreated.lot)
        expect(chipUpdate.status).toEqual(chipCreated.status)
      })
    })
  })
})
