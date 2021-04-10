const express = require('express')
const router = express.Router({ caseSensitive: true })

//Load all car models
router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.Car_Model.findAll({
     
        raw : true,
        
    }).then((models) => res.send(models)).catch((err) => {console.log('There was an error in getting the state list')
        return res.send(err)})
})

module.exports = router