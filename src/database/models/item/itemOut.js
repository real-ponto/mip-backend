const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const itemOut = sequelize.define('itemOut', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    employeeName: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    employeeId: {
      type: Sequelize.STRING,
    },

    autorizationName: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    autorizationId: {
      type: Sequelize.STRING,
    },

    dateLoan: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    dateReturned: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  })

  itemOut.associate = (models) => {
    itemOut.belongsTo(models.item)
  }

  return itemOut
}
