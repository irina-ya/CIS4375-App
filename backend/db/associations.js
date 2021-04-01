module.exports = {
  associate: models => {
    models.State_Table.hasMany(models.Customer, {foreignKey: "stateID"})
    models.Customer.belongsTo(models.State_Table, {foreignKey: "stateID"})
  }
}
