const express = require('express')
const QuestionModel = require('../models').QuestionModel
const TestModel = require('../models').TestModel
const answer_options = require('./answer_options')
let router = express.Router({mergeParams: true})

router.get('/', (req, res) => {
  QuestionModel
    .find({test: req.params.test_id})
    .then(questions => res.send({questions}))
    .catch(err => res.status(500).send({error: {message: err.message}}))
})

router.get('/:question_id', (req, res) => {
  QuestionModel
    .findById(req.params.question_id)
    .then(question => res.send({question}))
    .catch(err => res.status(404).send({error: {message: err.message}}))
})

router.post('/', (req, res) => {
  let body = req.body
  let question = new QuestionModel({
    test: req.params.test_id,
    text: body.text || null,
    image: body.image || null,
    right_text: body.right_text || null,
    wrong_text: body.wrong_text || null,
    order: body.order || 0
  })

  question
    .save()
    .then(question => {
      TestModel
        .findById(req.params.test_id)
        .then(test => {
          test.questions.push(question)
          test
            .save()
            .then(test => res.send({question}))
            .catch(err => res.status(500).send({error: {message: err.message}}))
        })
        .catch(err => res.status(404).send({error: {message: err.message}}))
    })
    .catch(err => res.status(500).send({error: {message: err.message}}))
})

router.patch('/:question_id', (req, res) => {
  let body = req.body
  QuestionModel
    .findById(req.params.question_id)
    .then(question => {
      Object.keys(body).forEach(key => question[key] = body[key])
      question
        .save()
        .then(question => res.send({question}))
        .catch(err => res.status(500).send({error: {message: err.message}}))
    })
    .catch(err => res.status(404).send({error: {message: err.message}}))
})

router.delete('/:question_id', (req, res) => {
  QuestionModel
    .findByIdAndRemove(req.params.question_id)
    .then(() => res.send())
    .catch(err => res.status(404).send({error: {message: err.message}}))
})

router.use('/:question_id/answer_options', answer_options)

module.exports = router
