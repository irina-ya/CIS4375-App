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
  return db.Service_Part.find({
    where: {servicePartID: svcPartID},
    include: [
        
    ],
      raw : true,
  }).then((Service_Parts) => 
    res.send(Service_Parts)).catch((err) => {console.log('There was an error in getting the Service Part')
      return res.send(err)})
})

//Update service parts


module.exports = router