const db = require('../../database')
const resourcesObj = require('../resources')


const dropAllTable = () => db.dropAllSchemas()

const isDatabaseConnected = () => db
  .authenticate()

const forceCreateTables = () => isDatabaseConnected()
  .then(() => db.sync({ force: true }))

const createResources = async () => {
  const Resource = db.model('resource')

  const resources = Object.keys(resourcesObj)
    .map(key => ({
      name: key,
      id: resourcesObj[key],
    }))

  await Resource.bulkCreate(resources)
}

const dropAndDisconnectDatabase = () => db
  .close()

module.exports = {
  isDatabaseConnected,
  forceCreateTables,
  dropAndDisconnectDatabase,
  createResources,
  dropAllTable,
}
