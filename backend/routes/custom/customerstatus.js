const express = require('express')
const router = express.Router({ caseSensitive: true })

//Load all 
router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.Customer_Status.findAll({
     
        raw : true,
        
    }).then((customerstatus) => res.send(customerstatus)).catch((err) => {console.log('There was an error in getting the status list')
        return res.send(err)})
})

module.exports = router