const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const itemType = sequelize.define('itemType', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    type: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    isRequired: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  })

  return itemType
}
