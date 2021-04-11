const express = require('express')
const router = express.Router({ caseSensitive: true })

//Display all service order status
router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.Service_Order_Status.findAll({
        raw : true,
    }).then((Service_Order_Statuses) => res.send(Service_Order_Statuses)).catch((err) => {console.log('There was an error in getting Service order status List')
        return res.send(err)})
})

module.exports = router