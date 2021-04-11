const express = require('express')
const router = express.Router({ caseSensitive: true })

//Display all service parts
router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.Service_Type.findAll({
 
        raw : true,
    }).then((Service_Types) => res.send(Service_Types)).catch((err) => {console.log('There was an error in getting Service Part List')
        return res.send(err)})
})

module.exports = router