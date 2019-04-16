const faker = require('faker')

const generateCompanyGroup = () => {
  const companyGroupMock = {
    groupName: faker.company.companyName(),
    description: faker.lorem.words(),
  }
  return companyGroupMock
}

module.exports = {
  generateCompanyGroup,
}
