const express = require('express')

const router = express.Router({ caseSensitive: true })

const home = require('./home')
const customers = require('./customers')
const serviceorders = require('./serviceorders')
const serviceparts = require('./serviceparts')
const states = require('./states')
const customerstatus = require('./customerstatus')
const makes = require('./makes')
const models = require('./models')
const caryears = require('./caryears')
const colors = require('./colors')
const car = require('./car')
const serviceorderstatus = require('./serviceorderstatus')
const servicetypes = require('./servicetypes')
const serviceorderline = require('./serviceorderline')
const serviceorderlinestatus = require('./serviceorderlinestatus')



router.use('/api/home', home)
router.use('/api/customers', customers)
router.use('/api/serviceorders', serviceorders)
router.use('/api/serviceparts', serviceparts)
router.use('/api/states', states)
router.use('/api/customerstatus', customerstatus)
router.use('/api/makes', makes)
router.use('/api/models', models)
router.use('/api/caryears', caryears)
router.use('/api/colors', colors)
router.use('/api/car', car)
router.use('/api/serviceorderstatus', serviceorderstatus)
router.use('/api/servicetypes', servicetypes)
router.use('/api/serviceorderline', serviceorderline)
router.use('/api/serviceorderlinestatus', serviceorderlinestatus)

module.exports = router
