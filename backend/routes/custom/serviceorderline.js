const express = require('express')
const router = express.Router({ caseSensitive: true })

//Find by serviceOrderID
router.get('/find/:serviceOrderID', (req, res, next) => {
    const db = req.app.get('db')
    const serviceOrderID = req.params.serviceOrderID
<<<<<<< Updated upstream
    return db.Service_Order_Line.find({
      where: {serviceOrderID: serviceOrderID},
      include: [
        db.Service_Type,
        db.Service_Order_Line_Status
      ],
        raw : true,
    }).then((serviceOrderLine) => 
      res.send(serviceOrderLine)).catch((err) => {console.log('There was an error in getting the Customer')
=======
    
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
>>>>>>> Stashed changes
        return res.send(err)})
  })

  module.exports = router