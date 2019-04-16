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

    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    stateRegistration: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'isento',
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

    company.belongsToMany(models.contact, {
      through: 'companyContact',
    })

    company.belongsTo(models.company, {
      foreignKey: {
        allowNull: false,
        defaultValue: null,
      },
    })


    company.hasMany(models.companyEvent)
  }


  return company
}
