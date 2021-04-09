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
  const customerPhone = req.body.customerPhone
  const customerCity = req.body.customerCity
  const customerAddress1 = req.body.customerAddress1
  const customerAddress2 = req.body.customerAddress2
  const customerEmail = req.body.customerEmail

  db.Customer.update({
    customerFirstName: customerFirstName,
    customerLastName: customerLastName,
    customerPhone: customerPhone,
    customerAddress1: customerAddress1,
    customerAddress2: customerAddress2,
    customerEmail: customerEmail,
    customerCity: customerCity
  }, {
    where: {
      customerID: customerID
    }
  })

})

//Add new customer
router.post('/addnew', (req, res, next) =>{
  const db = req.app.get('db')

  //WHY ARE YOU EMPTY WHAT IS WRONG PLZ BB TALK TO ME

  const customerFirstName = req.query.customerFirstName
  const customerLastName = req.body.customerLastName
  const customerPhone = req.body.customerPhone
  const customerCity = req.body.customerCity
  const customerAddress1 = req.body.customerAddress1
  const customerAddress2 = req.body.customerAddress2
  const customerEmail = req.body.customerEmail

  console.log(JSON.stringify(req.body.customerFirstName))

  /* db.Customer.create({
    customerFirstName: customerFirstName,
    customerLastName: customerLastName,
    customerPhone: customerPhone,
    customerAddress1: customerAddress1,
    customerAddress2: customerAddress2,
    customerEmail: customerEmail,
    customerCity: customerCity

  })  */

  })

module.exports = router