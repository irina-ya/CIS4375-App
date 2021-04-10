const express = require('express')
const router = express.Router({ caseSensitive: true })

//Load all car makes
router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.Car_Make.findAll({
     
        raw : true,
        
    }).then((makes) => res.send(makes)).catch((err) => {console.log('There was an error in getting the state list')
        return res.send(err)})
})

module.exports = router