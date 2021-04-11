const express = require('express')
const router = express.Router({ caseSensitive: true })

//Display all service parts
router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.Service_Part.findAll({
      include: [
        
      ],
        raw : true,
    }).then((Service_Parts) => res.send(Service_Parts)).catch((err) => {console.log('There was an error in getting Service Part List')
        return res.send(err)})
})

//Find by servicePartsID
router.get('/find/:servicePartID', (req, res, next) => {
  const db = req.app.get('db')
  const svcPartID = req.params.servicePartID
  return db.Service_Part.findAll({
    where: {servicePartID: svcPartID},
    include: [
        
    ],
      raw : true,
  }).then((Service_Parts) => 
    res.send(Service_Parts)).catch((err) => {console.log('There was an error in getting the Service Part')
      return res.send(err)})
})

//Update service parts
router.put('/update/:servicePartID', (req, res, next) => {
  const db = req.app.get('db')

  const servicePartID = req.params.servicePartID

  const partDescription = req.body.partDescription
  const partSellPrice = req.body.partSellPrice
  const partPurchasePrice = req.body.partPurchasePrice

  db.Service_Part.update({
    partDescription: partDescription,
    partSellPrice: partSellPrice,
    partPurchasePrice: partPurchasePrice
  }, {
    where: {
      servicePartID: servicePartID
    }
  })

})

//Add new service parts
router.post('/addnew', (req, res, next) =>{
  const db = req.app.get('db')

  const newServicePart = db.Service_Part.build(req.body)

  newServicePart.save()
        .then(() => {
          res.sendStatus(200)
        })
        .catch(next)

})

//Delete service parts
router.delete('/delete/:servicePartID', (req, res, next) => {
  const servicePartID = req.params.servicePartID;
  const db = req.app.get('db')

  db.Service_Part.destroy({
      where: { servicePartID: servicePartID }
  }).then(() => {
      res.status(200).send('The record has been deleted!');
  }).catch(err => {
      console.log('There was an error deleting servive parts', JSON.stringify(err))
      return res.send(err)
  });
})

module.exports = router