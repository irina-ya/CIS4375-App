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
  return db.Customer.findAll({
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
  const customerStatusID = req.body.customerStatusID
  const customerZip = req.body.customerZip

  console.log(customerZip)

  db.Customer.update({
    customerFirstName: customerFirstName,
    customerLastName: customerLastName,
    customerPhone: customerPhone,
    customerAddress1: customerAddress1,
    customerAddress2: customerAddress2,
    customerEmail: customerEmail,
    customerCity: customerCity, 
    customerStatusID: customerStatusID,
    customerZip: customerZip
  }, {
    where: {
      customerID: customerID
    }
  })

})

//Add new customer
router.post('/addnew', (req, res, next) =>{
  const db = req.app.get('db')

  const newCustomer = db.Customer.build(req.body)

  //console.log(JSON.stringify(newCustomer))

  newCustomer.save()
        .then(() => {
          res.sendStatus(200)
        })
        .catch(next)
    })

//Delete customer
router.delete('/delete/:customerID', (req, res, next) => {
  const customerID = req.params.customerID;
  const db = req.app.get('db')

  db.Customer.destroy({
      where: { customerID: customerID }
  }).then(() => {
      res.status(200).send('The record has been deleted!');
  }).catch(err => {
      console.log('There was an error deleting customers', JSON.stringify(err))
      return res.send(err)
  });
})

    

  

module.exports = router