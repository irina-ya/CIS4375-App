const express = require('express')
const router = express.Router({ caseSensitive: true })

//Load all states
router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.State_Table.findAll({
     
        raw : true,
        
    }).then((states) => res.send(states)).catch((err) => {console.log('There was an error in getting the state list')
        return res.send(err)})
})

module.exports = router