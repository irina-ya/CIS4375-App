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


//find all cars
router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.Car.findAll({
  
        raw : true,
    }).then((Cars) => res.send(Cars)).catch((err) => {console.log('There was an error in getting car  List')
        return res.send(err)})
})

module.exports = router