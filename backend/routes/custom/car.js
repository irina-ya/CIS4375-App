const express = require('express')
const router = express.Router({ caseSensitive: true })

router.post('/addnew', (req, res, next) =>{
    const db = req.app.get('db')
  
    const newCar = db.Car.build(req.body)

    newCar.save()
          .then(() => {
            res.sendStatus(200)
          })
          .catch(next) 
      }) 

module.exports = router