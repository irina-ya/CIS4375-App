const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Service_Invoice', {
    serviceInvoiceID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    serviceInvoiceDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    serviceOrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Service_Order',
        key: 'serviceOrderID'
      }
    }
  }, {
    sequelize,
    tableName: 'Service_Invoice',
    schema: 'dbo',
    timestamps: false,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Service___931F721CEF5754E7",
        unique: true,
        fields: [
          { name: "serviceInvoiceID" },
        ]
      },
    ]
  });
};
