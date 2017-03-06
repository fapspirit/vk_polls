const express = require('express')
const RubricModel = require('../models').RubricModel
const TestModel = require('../models').TestModel
const questions = require('./questions')

let router = express.Router()

router.get('/', (req, res) => {
  RubricModel
    .find()
    .then(rubrics => res.send({rubrics}))
    .catch(err => res.status(500).send({error: {message: err.message}}))
})

router.get('/:rubric_id', (req, res) => {
  RubricModel
    .findById(req.params.rubric_id)
    .then(rubric => res.send({rubric}))
    .catch(err => res.status(404).send({error: {message: err.message}}))
})

router.post('/', (req, res) => {
  let body = req.body
  let rubric = new RubricModel({
    title: body.title || '',
    subtitle: body.subtitle || '',
    start_time: body.start_time || '',
    end_time: body.end_time || '',
    published: body.published || false,
    author: body.author_id || null,
    rubric: body.rubric_id || null
  })

  rubric
    .save()
    .then(rubric => res.send({rubric}))
    .catch(err => res.status(500).send({error: {message: err.message}}))
})

router.patch('/:rubric_id', (req, res) => {
  let body = req.body
  RubricModel
    .findById(req.params.rubric_id)
    .then(rubric => {
      Object.keys(body).forEach(key => rubric[key] = body[key])
      rubric
        .save()
        .then(rubric => res.send({rubric}))
        .catch(err => res.status(500).send({error: {message: err.message}}))
    })
    .catch(err => res.status(404).send({error: {message: err.message}}))
})

router.delete('/:rubric_id', (req, res) => {
  RubricModel
    .findByIdAndRemove(req.params.rubric_id)
    .then(() => res.send())
    .catch(err => res.status(404).send({error: {message: err.message}}))
})


router.get('/:rubric_id/tests', (req, res) => {
  TestModel
    .find({rubric: req.params.rubric_id})
    .then(tests => res.send({tests}))
    .catch(err => res.status(500).send({error: {message: err.message}}))
})

module.exports = router
