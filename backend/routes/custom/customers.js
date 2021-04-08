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
      db.Customer_Status,
      db.Customer_Car
    ],
      raw : true,
  }).then((Customers) => 
    res.send(Customers)).catch((err) => {console.log('There was an error in getting the Customer')
      return res.send(err)})
})

//Update customer
router.put('/update/:customerID', (req, res, next) => {
  const db = req.app.get('db')

  const customerID = req.params.customerID

  const customerFirstName = req.body.customerFirstName
  const customerLastName = req.body.customerLastName

  db.Customer.update({
    customerFirstName: customerFirstName,
    customerLastName: customerLastName
  }, {
    where: {
      customerID: customerID
    }
  })

})

//Add new customer
router.post('/register', (req, res, next) =>{
  const db = req.app.get('db')
  const newCustomer = db.customers.build(req.body)

  newCustomer.save()
              .then(() => res.sendStatus(200))
            }) 
        

module.exports = router