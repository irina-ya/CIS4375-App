const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Service_Type', {
    serviceTypeID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    serviceTypeDesc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serviceLaborCost: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    serviceLaborHours: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Service_Type',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    indexes: [
      {
        name: "PK__Service___FB4CEA19A762DCD7",
        unique: true,
        fields: [
          { name: "serviceTypeID" },
        ]
      },
    ]
  });
};
