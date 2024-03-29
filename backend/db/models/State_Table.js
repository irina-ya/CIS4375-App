const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('State_Table', {
    stateID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stateName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'State_Table',
    schema: 'dbo',
    timestamps: false,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__State_Ta__A667B9C1B746FC44",
        unique: true,
        fields: [
          { name: "stateID" },
        ]
      },
    ]
  });
};
