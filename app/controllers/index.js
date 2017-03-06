const express = require('express')
const users = require('./users')
const tests = require('./tests')
const rubrics = require('./rubrics')

let router = express.Router()

router.use('/users', users)
router.use('/tests', tests)
router.use('/rubrics', rubrics)


module.exports = router
