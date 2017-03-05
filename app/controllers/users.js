const express = require('express')
const UserModel = require('../models').UserModel
let router = express.Router()

router.get('/', (req, res) => {
  return UserModel.find((err, users) => {
    if (err) {
      res.statusCode = 500
      return res.send('Error')
    }
    res.send({users})
  })
})

router.get('/:id', (req, res) => {
  res.send(`get user with id ${req.params.id}`)
})

router.post('/', (req, res) => {
  let user = new UserModel({
    last_name: req.body.last_name,
    first_name: req.body.first_name,
  })
  user.save((err, user) => {
    if (err) {
      res.statusCode = 500
      return res.send('error')
    }

    return res.send({status: 'ok', user: user})
  })
})

router.patch('/:id', (req, res) => {
  if (!req.params.id) {
    res.statusCode = 422
    return res.send('Error')
  }
  res.send(`User ${req.params.id} patched`)
})

router.delete('/:id', (req, res) => {
  if (!req.params.id) {
    res.statusCode = 422
    return res.send('Error')
  }
  res.send(`User ${req.params.id} patched`)
})

module.exports = router
