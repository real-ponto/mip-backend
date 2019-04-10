const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const company = sequelize.define('company', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    razaoSocial: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    contractNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    cnpj: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

  })

  company.associate = (models) => {
    company.belongsTo(models.address, {
      foreignKey: {
        allowNull: false,
      },
    })

    company.belongsTo(models.contact, {
      foreignKey: {
        allowNull: false,
      },
    })

    company.belongsTo(models.companyGroup, {
      foreignKey: {
        allowNull: false,
      },
    })

    company.hasMany(models.companyEvent)
  }


  return company
}
