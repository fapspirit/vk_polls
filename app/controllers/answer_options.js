const express = require('express')
const AnswerOptionModel = require('../models').AnswerOptionModel
const QuestionModel = require('../models').QuestionModel
let router = express.Router({mergeParams: true})

router.get('/', (req, res) => {
  AnswerOptionModel
    .find({question: req.params.question_id})
    .then(answer_options => res.send({answer_options}))
    .catch(err => res.status(500).send({error: {message: err.message}}))
})

router.get('/:answer_option_id', (req, res) => {
  AnswerOptionModel
    .findById(req.params.answer_option_id)
    .then(answer_option => res.send({answer_option}))
    .catch(err => res.status(404).send({error: {message: err.message}}))
})

router.post('/', (req, res) => {
  let body = req.body
  let answer_option = new AnswerOptionModel({
    question: req.params.question_id,
    text: body.text || null,
    image: body.image || null,
    order: body.order || 0,
    weight: body.weight
  })

  answer_option
    .save()
    .then(answer_option => {
      QuestionModel
        .findById(req.params.question_id)
        .then(question => {
          question.answer_options.push(answer_option._id)
          question
            .save()
            .then(question => res.send({answer_option}))
            .catch(err => res.status(500).send({error: {message: err.message}}))
        })
        .catch(err => res.status(404).send({error: {message: err.message}}))
    })
    .catch(err => res.status(500).send({error: {message: err.message}}))
})

router.patch('/:answer_option_id', (req, res) => {
  let body = req.body
  AnswerOptionModel
    .findById(req.params.answer_option_id)
    .then(answer_option => {
      Object.keys(body).forEach(key => answer_option[key] = body[key])
      answer_option
        .save()
        .then(answer_option => res.send({answer_option}))
        .catch(err => res.status(500).send({error: {message: err.message}}))
    })
    .catch(err => res.status(404).send({error: {message: err.message}}))
})

router.delete('/:answer_option_id', (req, res) => {
  AnswerOptionModel
    .findByIdAndRemove(req.params.answer_option_id)
    .then(() => res.send())
    .catch(err => res.status(404).send({error: {message: err.message}}))
})

module.exports = router
