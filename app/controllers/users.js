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

router.get('/top', (req, res) => {
  UserModel
    .find()
    .sort('-score')
    .limit(30)
    .select('score viewer_id')
    .then(users => res.send({users}))
    .catch(err => res.status(404).send({error: {message: err.message}}))
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

router.post('/:user_id/tests/:test_id/answers', (req, res) => {
  AnswerModel
    .findOne({user: req.params.user_id, test: req.params.test_id})
    .then(answer => {
      if (answer != null) {
        console.log('answer finded', answer)
        return res.send({answer})
      }
      answer = new AnswerModel({
        user: req.params.user_id,
        test: req.params.test_id,
        values: req.body.answers || [],
        score: req.body.score || 0
      })

      answer
        .save()
        .then(answer => {
          console.log('answer saved', answer)
          UserModel
            .findById(req.params.user_id)
            .then(user => {
              console.log('user', user)
              user.answers.push(answer)
              user.score += answer.score
              user
                .save()
                .then(user => res.send({answer}))
                .catch(err => res.status(500).send({error: {message: err.message}}))
            })
            .catch(err => res.status(404).send({error:{message: err.message}}))
        })
        .catch(err => res.status(500).send({error: {message: err.message}}))
    })
    .catch(err => res.status(500).send({error: {message: err.message}}))
})

module.exports = router
