const express = require('express')
const router = express.Router({ caseSensitive: true })

//Load all years
router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.Car_Year.findAll({
     
        raw : true,
        
    }).then((caryears) => res.send(caryears)).catch((err) => {console.log('There was an error in getting the state list')
        return res.send(err)})
})

module.exports = router