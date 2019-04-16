const { generateCompanyGroup } = require('../../helpers/mockData/companyGroup')
const CompanyGroupDomain = require('./')

const companyGroupDomain = new CompanyGroupDomain()

describe('Company Group test', () => {
  describe('create company group', () => {
    let companyGroupMockGenerated = {}
    let counter = 1

    beforeEach(() => {
      companyGroupMockGenerated = generateCompanyGroup(counter.toString())
      counter += 1
    })

    test('create compnay group with correct date', async () => {
      const companyGroupMock = companyGroupMockGenerated

      const companyGroupCreated = await companyGroupDomain.companyGroup_Create(companyGroupMock)


      expect(companyGroupCreated.groupName).toEqual(companyGroupMock.groupName)
      expect(companyGroupCreated.description).toEqual(companyGroupMock.description)
    })
  })
})
