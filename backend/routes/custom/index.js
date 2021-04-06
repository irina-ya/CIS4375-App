const express = require('express')

const router = express.Router({ caseSensitive: true })

const home = require('./home')
const customers = require('./customers')
const states = require('./states')


router.use('/api/home', home)
router.use('/api/customers', customers)
router.use('/api/states', states)

module.exports = router
