const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const companyUnit = sequelize.define('companyUnit', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  })

  companyUnit.associate = (models) => {
    companyUnit.belongsTo(models.address, {
      foreignKey: {
        allowNull: false,
      },
    })

    companyUnit.belongsToMany(models.contact, {
      through: 'companyUnitContact',
    })

    companyUnit.belongsTo(models.company, {
      foreignKey: {
        allowNull: false,
      },
    })
  }


  return companyUnit
}
