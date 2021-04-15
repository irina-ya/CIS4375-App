const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.Service_Order_Line_Status.findAll({
      
        raw : true,
    }).then((Status) => res.send(Status)).catch((err) => {console.log('There was an error in getting Service Order List')
        return res.send(err)})
})

module.exports = router