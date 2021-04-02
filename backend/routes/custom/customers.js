  const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.Customer.findAll({
      include: [
        db.State_Table
      ],
        raw : true,
    }).then((Customers) => res.send(Customers)).catch((err) => {console.log('There was an error in getting Customer List')
        return res.send(err)})
})

module.exports = router