const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customer_Car', {
    customerCarID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Customer',
        key: 'customerID'
      }
    },
    carID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Car',
        key: 'carID'
      }
    }
  }, {
    sequelize,
    tableName: 'Customer_Car',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    indexes: [
      {
        name: "PK__Customer__1A7504151C37D9E0",
        unique: true,
        fields: [
          { name: "customerCarID" },
        ]
      },
    ]
  });
};
