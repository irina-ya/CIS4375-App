const express = require('express')
const router = express.Router({ caseSensitive: true })

//Find by serviceOrderID
router.get('/find/:serviceOrderID', (req, res, next) => {
    const db = req.app.get('db')
    const serviceOrderID = req.params.serviceOrderID
    
    return db.Service_Order_Line.findAll({
      where: {serviceOrderID: serviceOrderID},
      include: [
        db.Service_Type,
        db.Service_Order_Line_Status,
        db.Service_Part
      ],
        raw : true,
    }).then((serviceOrderLine) => 
      res.send(serviceOrderLine)).catch((err) => {console.log('There was an error in getting the order line')
        return res.send(err)})
  })

  //Update service order line
router.put('/update/:serviceOrderLineID', (req, res, next) => {
  const db = req.app.get('db')

  const serviceOrderLineID = req.params.serviceOrderLineID

  const serviceTypeID = req.body.serviceTypeID
  const servicePartID = req.body.servicePartID
  const serviceOrderLineStatusID = req.body.serviceOrderLineStatusID
  const serviceOrderLineCost = req.body.serviceOrderLineCost

  db.Service_Order_Line.update({
    serviceTypeID: serviceTypeID,
    servicePartID: servicePartID,
    serviceOrderLineStatusID: serviceOrderLineStatusID,
    serviceOrderLineCost: serviceOrderLineCost
  }, {
    where: {
      serviceOrderLineID: serviceOrderLineID
    }
  })

})

//Delete service order line
router.delete('/delete/:serviceOrderLineID', (req, res, next) => {
  const serviceOrderLineID = req.params.serviceOrderLineID;
  const db = req.app.get('db')

  db.Service_Order_Line.destroy({
      where: { serviceOrderLineID: serviceOrderLineID }
  }).then(() => {
      res.status(200).send('The record has been deleted!');
  }).catch(err => {
      console.log('There was an error deleting service order line', JSON.stringify(err))
      return res.send(err)
  });
})

//Add new service order line
router.post('/addnew', (req, res, next) =>{
  const db = req.app.get('db')

  const newServiceOrderLine = db.Service_Order_Line.build(req.body)

  newServiceOrderLine.save()
        .then(() => {
          res.sendStatus(200)
        })
        .catch(next) 
    }) 


  module.exports = router