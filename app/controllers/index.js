const express = require('express')
const users = require('./users.js')
let router = express.Router()

router.use('/users', users)

module.exports = router
