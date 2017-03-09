const express = require('express')
const UserModel = require('../models').UserModel
const AnswerModel = require('../models').AnswerModel
const AnswerOptionModel = require('../models').AnswerOptionModel
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

router.put('/:user_id/questions/:question_id/answer_options/:answer_option_id', (req, res) => {
  let answer = new AnswerModel({
    user: req.params.user_id,
    question: req.params.question_id,
    value: req.params.answer_option_id
  })

  answer
    .save()
    .then(answer => {
      AnswerOptionModel
        .findById(req.params.answer_option_id)
        .then(answer_option => {
          answer_option.answers.push(answer._id)
          answer_option
            .save()
            .then(answer_option => res.end())
            .catch(err => res.status(500).send({error: {message: err.message}}))
        })
        .catch(err => res.status(404).send({error:{message: err.message}}))
    })
    .catch(err => res.status(500).send({error: {message: err.message}}))
})

module.exports = router
