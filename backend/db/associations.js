module.exports = {
  associate: models => {
    //Customer
    models.Customer_Status.hasMany(models.Customer, {foreignKey: "customerStatusID"})
    models.Customer.belongsTo(models.Customer_Status, {foreignKey: "customerStatusID"})
    models.State_Table.hasMany(models.Customer, {foreignKey: "stateID"})
    models.Customer.belongsTo(models.State_Table, {foreignKey: "stateID"})

    //Car
    models.Car_Model.hasMany(models.Car, {foreignKey: "carModelID"})
    models.Car.belongsTo(models.Car_Model, {foreignKey: "carModelID"})
    models.Car_Make.hasMany(models.Car, {foreignKey: {foreignKey: "carMakeID"}})
    models.Car.belongsTo(models.Car_Make, {foreignKey: "carMakeID"})
    models.Car_Year.hasMany(models.Car, {foreignKey: "yearID"})
    models.Car.belongsTo(models.Car_Year, {foreignKey: "yearID"})
    models.Color.hasMany(models.Car, {foreignKey: "colorID"})
    models.Car.belongsTo(models.Color, {foreignKey: "colorID"})
    models.Service_Order.hasMany(models.Car, {foreignKey: "serviceOrderID"})
    models.Car.belongsTo(models.Service_Order, {foreignKey: "serviceOrderID"})
    models.Car.belongsTo(models.Customer, {foreignKey: "customerID"})
    models.Customer.hasMany(models.Car, {foreignKey: "customerID"})

    //Service_Order
    models.Customer.hasMany(models.Service_Order, {foreignKey: "customerID"})
    models.Service_Order.belongsTo(models.Customer, {foreignKey: "customerID"})
    models.Car.hasMany(models.Service_Order, {foreignKey: "carID"})
    models.Service_Order.belongsTo(models.Car, {foreignKey: "carID"})
    models.Service_Type.hasMany(models.Service_Order, {foreignKey: "serviceTypeID"})
    models.Service_Order.belongsTo(models.Service_Type, {foreignKey: "serviceTypeID"})
    models.Service_Order_Status.hasMany(models.Service_Order, {foreignKey: "serviceOrderStatusID"})
    models.Service_Order.belongsTo(models.Service_Order_Status, {foreignKey: "serviceOrderStatusID"})

    //Service_Order_Line
    models.Service_Order.hasMany(models.Service_Order_Line, {foreignKey: "serviceOrderID"})
    models.Service_Order_Line.belongsTo(models.Service_Order, {foreignKey: "serviceOrderID"})
    models.Service_Type.hasMany(models.Service_Order_Line, {foreignKey: "serviceTypeID"})
    models.Service_Order_Line.belongsTo(models.Service_Type, {foreignKey: "serviceTypeID"})
    models.Service_Part.hasMany(models.Service_Order_Line, {foreignKey: "servicePartID"})
    models.Service_Order_Line.belongsTo(models.Service_Part, {foreignKey: "servicePartID"})
    models.Service_Order_Line_Status.hasMany(models.Service_Order_Line, {foreignKey: "serviceOrderLineStatusID"})
    models.Service_Order_Line.belongsTo(models.Service_Order_Line_Status, {foreignKey: "serviceOrderLineStatusID"})

    //Service_Invoice
    models.Service_Order.hasMany(models.Service_Invoice, {foreignKey: "serviceOrderID"})
    models.Service_Invoice.belongsTo(models.Service_Order, {foreignKey: "serviceOrderID"})

    
    }
}
