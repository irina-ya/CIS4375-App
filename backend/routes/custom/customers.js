  const express = require('express')
const router = express.Router({ caseSensitive: true })

//Display all customers
router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.Customer.findAll({
      include: [
        db.State_Table,
        db.Customer_Status
      ],
        raw : true,
    }).then((Customers) => res.send(Customers)).catch((err) => {console.log('There was an error in getting Customer List')
        return res.send(err)})
})

//Find by customerID
router.get('/find/:customerID', (req, res, next) => {
  const db = req.app.get('db')
  const custumerID = req.params.customerID
  return db.Customer.find({
    where: {customerID: custumerID},
    include: [
      db.State_Table,
      db.Customer_Status
    ],
      raw : true,
  }).then((Customers) => 
    res.send(Customers)).catch((err) => {console.log('There was an error in getting the Customer')
      return res.send(err)})

})

module.exports = router