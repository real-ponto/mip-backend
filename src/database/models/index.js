// chip escope
const chip = require('./chip')
const chipConnectEvent = require('./chip/chipConnectEvent')
const chipEvent = require('./chip/chipEvent')
const chipOut = require('./chip/chipOut')
const chipProvider = require('./chip/chipProvider')

// item escope
const item = require('./item')
const itemEvent = require('./item/itemEvent')
const itemType = require('./item/itemType')
const itemModel = require('./item/itemModel')
const itemOut = require('./item/itemOut')


const user = require('./user')
const login = require('./user/login')
const session = require('./user/session')

// others escope
const adress = require('./other/adress')
const contact = require('./other/contact')

module.exports = [
  // chip
  chip,
  chipConnectEvent,
  chipEvent,
  chipOut,
  chipProvider,

  // item
  item,
  itemEvent,
  itemType,
  itemModel,
  itemOut,


  user,

  login,
  session,

  // others
  adress,
  contact,
]
