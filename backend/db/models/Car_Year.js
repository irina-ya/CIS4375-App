const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Car_Year', {
    yearID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    carYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Car_Year',
    schema: 'dbo',
    timestamps: false,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Car_Year__14200D857FEC31B3",
        unique: true,
        fields: [
          { name: "yearID" },
        ]
      },
    ]
  });
};
