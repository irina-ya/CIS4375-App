const express = require('express')
const router = express.Router({ caseSensitive: true })

//Display all service orders
router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.Service_Order.findAll({
      include: [
        db.Service_Order_Status,
        db.Service_Type
      ],
        raw : true,
    }).then((Service_Orders) => res.send(Service_Orders)).catch((err) => {console.log('There was an error in getting Service Order List')
        return res.send(err)})
})

//Find by serviceOrderID
router.get('/find/:serviceOrderID', (req, res, next) => {
  const db = req.app.get('db')
  const svcOrderID = req.params.serviceOrderID
  return db.Service_Order.find({
    where: {serviceOrderID: svcOrderID},
    include: [
        db.Service_Order_Status,
        db.Service_Type
    ],
      raw : true,
  }).then((Service_Orders) => 
    res.send(Service_Orders)).catch((err) => {console.log('There was an error in getting the Service Order')
      return res.send(err)})
})

//Update service order


module.exports = router