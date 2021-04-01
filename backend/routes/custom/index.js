const express = require('express')

const router = express.Router({ caseSensitive: true })

const home = require('./home')
const customers = require('./customers')


router.use('/api/home', home)
router.use('/api/customers', customers)

module.exports = router
