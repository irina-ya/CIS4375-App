const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Service_Order_Line_Status', {
    serviceOrderLineStatusID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    serviceOrderLineStatus: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Service_Order_Line_Status',
    schema: 'dbo',
    timestamps: false,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Service___4EF5CAB0FC6CC786",
        unique: true,
        fields: [
          { name: "serviceOrderLineStatusID" },
        ]
      },
    ]
  });
};
