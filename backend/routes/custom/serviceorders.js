const express = require('express')
const router = express.Router({ caseSensitive: true })

//Display all service orders
router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.Service_Order.findAll({
      include: [
        db.Service_Order_Status,
        db.Customer
      ],
        raw : true,
    }).then((Service_Orders) => res.send(Service_Orders)).catch((err) => {console.log('There was an error in getting Service Order List')
        return res.send(err)})
})

//Find by serviceOrderID
router.get('/find/:serviceOrderID', (req, res, next) => {
  const db = req.app.get('db')
  const svcOrderID = req.params.serviceOrderID
  return db.Service_Order.findAll({
    where: {serviceOrderID: svcOrderID},
    include: [
        db.Service_Order_Status,
        db.Customer
        
    ],
      raw : true,
  }).then((Service_Orders) => 
    res.send(Service_Orders)).catch((err) => {console.log('There was an error in getting the Service Order')
      return res.send(err)})
})

//Update service order
router.put('/update/:serviceOrderID', (req, res, next) => {
  const db = req.app.get('db')

  const serviceOrderID = req.params.serviceOrderID

  const carID = req.body.carID
  const serviceTypeID = req.body.serviceTypeID
  const serviceOrderStatusID = req.body.serviceOrderStatusID
  const serviceOrderDate = req.body.serviceOrderDate
  const serviceOrderEstimatedCompletion = req.body.serviceOrderEstimatedCompletion
  const serviceOrderComments = req.body.serviceOrderComments

  db.Service_Order.update({
    carID: carID,
    serviceTypeID: serviceTypeID,
    serviceOrderStatusID: serviceOrderStatusID,
    serviceOrderDate: serviceOrderDate,
    serviceOrderEstimatedCompletion: serviceOrderEstimatedCompletion,
    serviceOrderComments: serviceOrderComments
  }, {
    where: {
      serviceOrderID: serviceOrderID
    }
  })

})

//Delete service order
router.delete('/delete/:serviceOrderID', (req, res, next) => {
  const serviceOrderID = req.params.serviceOrderID;
  const db = req.app.get('db')

  db.Service_Order.destroy({
      where: { serviceOrderID: serviceOrderID }
  }).then(() => {
      res.status(200).send('The record has been deleted!');
  }).catch(err => {
      console.log('There was an error deleting servive order', JSON.stringify(err))
      return res.send(err)
  });
})

//Add new service order
router.post('/addnew', (req, res, next) =>{
  const db = req.app.get('db')

  const newServiceOrder = db.Service_Order.build(req.body)

  newServiceOrder.save()
        .then(() => {
          res.sendStatus(200)
        })
        .catch(next) 
    }) 

module.exports = router