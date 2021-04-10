var DataTypes = require("sequelize").DataTypes;
var _Car = require("./Car");
var _Car_Make = require("./Car_Make");
var _Car_Model = require("./Car_Model");
var _Car_Year = require("./Car_Year");
var _Color = require("./Color");
var _Customer = require("./Customer");
//var _Customer_Car = require("./Customer_Car");
var _Customer_Status = require("./Customer_Status");
var _Service_Invoice = require("./Service_Invoice");
var _Service_Order = require("./Service_Order");
var _Service_Order_Line = require("./Service_Order_Line");
var _Service_Order_Line_Status = require("./Service_Order_Line_Status");
var _Service_Order_Status = require("./Service_Order_Status");
var _Service_Part = require("./Service_Part");
var _Service_Type = require("./Service_Type");
var _State_Table = require("./State_Table");
var _accountType = require("./accountType");
var _login = require("./login");

function initModels(sequelize) {
  var Car = _Car(sequelize, DataTypes);
  var Car_Make = _Car_Make(sequelize, DataTypes);
  var Car_Model = _Car_Model(sequelize, DataTypes);
  var Car_Year = _Car_Year(sequelize, DataTypes);
  var Color = _Color(sequelize, DataTypes);
  var Customer = _Customer(sequelize, DataTypes);
  //var Customer_Car = _Customer_Car(sequelize, DataTypes);
  var Customer_Status = _Customer_Status(sequelize, DataTypes);
  var Service_Invoice = _Service_Invoice(sequelize, DataTypes);
  var Service_Order = _Service_Order(sequelize, DataTypes);
  var Service_Order_Line = _Service_Order_Line(sequelize, DataTypes);
  var Service_Order_Line_Status = _Service_Order_Line_Status(sequelize, DataTypes);
  var Service_Order_Status = _Service_Order_Status(sequelize, DataTypes);
  var Service_Part = _Service_Part(sequelize, DataTypes);
  var Service_Type = _Service_Type(sequelize, DataTypes);
  var State_Table = _State_Table(sequelize, DataTypes);
  var accountType = _accountType(sequelize, DataTypes);
  var login = _login(sequelize, DataTypes);

  //Customer_Car.belongsTo(Car, { as: "car", foreignKey: "carID"});
  //Car.hasMany(Customer_Car, { as: "Customer_Cars", foreignKey: "carID"});
  Car.belongsTo(Car_Make, { as: "carMake", foreignKey: "carMakeID"});
  Car_Make.hasMany(Car, { as: "Cars", foreignKey: "carMakeID"});
  Car.belongsTo(Car_Model, { as: "carModel", foreignKey: "carModelID"});
  Car_Model.hasMany(Car, { as: "Cars", foreignKey: "carModelID"});
  Car.belongsTo(Car_Year, { as: "year", foreignKey: "yearID"});
  Car_Year.hasMany(Car, { as: "Cars", foreignKey: "yearID"});
  Car.belongsTo(Color, { as: "color", foreignKey: "colorID"});
  Color.hasMany(Car, { as: "Cars", foreignKey: "colorID"});
  Car.belongsTo(Customer, { as: "customer", foreignKey: "customerID"});
  Customer.hasMany(Car, { as: "Car", foreignKey: "customerID"});
  Service_Order.belongsTo(Customer, { as: "customer", foreignKey: "customerID"});
  Customer.hasMany(Service_Order, { as: "Service_Orders", foreignKey: "customerID"});
  Service_Order.belongsTo(Car, { as: "Car", foreignKey: "carID"});
  Car.hasMany(Service_Order, { as: "Service_Orders", foreignKey: "carID"});
  Customer.belongsTo(Customer_Status, { as: "customerStatus", foreignKey: "customerStatusID"});
  Customer_Status.hasMany(Customer, { as: "Customers", foreignKey: "customerStatusID"});
  Car.belongsTo(Service_Order, { as: "serviceOrder", foreignKey: "serviceOrderID"});
  Service_Order.hasMany(Car, { as: "Cars", foreignKey: "serviceOrderID"});
  Service_Invoice.belongsTo(Service_Order, { as: "serviceOrder", foreignKey: "serviceOrderID"});
  Service_Order.hasMany(Service_Invoice, { as: "Service_Invoices", foreignKey: "serviceOrderID"});
  Service_Order_Line.belongsTo(Service_Order, { as: "serviceOrder", foreignKey: "serviceOrderID"});
  Service_Order.hasMany(Service_Order_Line, { as: "Service_Order_Lines", foreignKey: "serviceOrderID"});
  Service_Order_Line.belongsTo(Service_Order_Line_Status, { as: "serviceOrderLineStatus", foreignKey: "serviceOrderLineStatusID"});
  Service_Order_Line_Status.hasMany(Service_Order_Line, { as: "Service_Order_Lines", foreignKey: "serviceOrderLineStatusID"});
  Service_Order.belongsTo(Service_Order_Status, { as: "serviceOrderStatus", foreignKey: "serviceOrderStatusID"});
  Service_Order_Status.hasMany(Service_Order, { as: "Service_Orders", foreignKey: "serviceOrderStatusID"});
  Service_Order_Line.belongsTo(Service_Part, { as: "servicePart", foreignKey: "servicePartID"});
  Service_Part.hasMany(Service_Order_Line, { as: "Service_Order_Lines", foreignKey: "servicePartID"});
  Service_Order.belongsTo(Service_Type, { as: "serviceType", foreignKey: "serviceTypeID"});
  Service_Type.hasMany(Service_Order, { as: "Service_Orders", foreignKey: "serviceTypeID"});
  Service_Order_Line.belongsTo(Service_Type, { as: "serviceType", foreignKey: "serviceTypeID"});
  Service_Type.hasMany(Service_Order_Line, { as: "Service_Order_Lines", foreignKey: "serviceTypeID"});
  Customer.belongsTo(State_Table, { as: "state", foreignKey: "stateID"});
  State_Table.hasMany(Customer, { as: "Customers", foreignKey: "stateID"});
  login.belongsTo(accountType, { as: "accountType", foreignKey: "accountTypeId"});
  accountType.hasMany(login, { as: "logins", foreignKey: "accountTypeId"});

  return {
    Car,
    Car_Make,
    Car_Model,
    Car_Year,
    Color,
    Customer,
    Customer_Status,
    Service_Invoice,
    Service_Order,
    Service_Order_Line,
    Service_Order_Line_Status,
    Service_Order_Status,
    Service_Part,
    Service_Type,
    State_Table,
    accountType,
    login,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
