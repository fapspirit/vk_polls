const express = require('express')
const users = require('./users')
const tests = require('./tests')
const questions = require('./questions')

let router = express.Router()

router.use('/users', users)
router.use('/tests', tests)
router.use('/questions', questions)


module.exports = router
