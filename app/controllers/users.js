const express = require('express')
const UserModel = require('../models').UserModel
let router = express.Router()

router.get('/', (req, res) => {
  UserModel
    .find()
    .then(users => res.send({users}))
    .catch(err => res.status(500).send('Error'))
})

router.get('/:user_id', (req, res) => {
  UserModel
    .findById(req.params.user_id)
    .then(user => res.send({user}))
    .catch(err => res.status(404).send({error: {message: err.message}}))
})

router.post('/', (req, res) => {
  let user = new UserModel({
    viewer_id: req.body.viewer_id
  })
  user
    .save()
    .then(user => res.send({user}))
    .catch(err => res.status(500).send({error: {message: err.message}}))
})

router.patch('/:user_id', (req, res) => {
  let body = req.body
  UserModel
    .findById(req.params.user_id)
    .then(user => {
      Object.keys(body).forEach(key => user[key] = body[key])
      user
        .save()
        .then(user => res.send({user}))
        .catch(err => res.status(500).send({error: {message: err.message}}))
    })
    .catch(err => res.status(404).send({error:{message: err.message}}))


})

router.delete('/:user_id', (req, res) => {
  UserModel
    .findByIdAndRemove(req.params.user_id)
    .then(() => res.send())
    .catch(err => res.status(500).send({error: {message: err.message}}))
})

module.exports = router
