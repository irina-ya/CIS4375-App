const express = require('express')

const router = express.Router({ caseSensitive: true })

const home = require('./home')


router.use('/api/home', home)


module.exports = router
