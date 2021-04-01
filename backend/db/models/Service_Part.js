const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Service_Part', {
    servicePartID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    partDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    partSellPrice: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    partPurchasePrice: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Service_Part',
    schema: 'dbo',
    timestamps: false,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Service___584D4DB090192005",
        unique: true,
        fields: [
          { name: "servicePartID" },
        ]
      },
    ]
  });
};
