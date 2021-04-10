const express = require('express')
const router = express.Router({ caseSensitive: true })

//Load all colors
router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.Color.findAll({
     
        raw : true,
        
    }).then((colors) => res.send(colors)).catch((err) => {console.log('There was an error in getting the state list')
        return res.send(err)})
})

module.exports = router