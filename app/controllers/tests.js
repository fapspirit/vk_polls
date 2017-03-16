const express = require('express')
const TestModel = require('../models').TestModel
const TestResultModel = require('../models').TestResultModel
const AnswerModel = require('../models').ResultModel
const questions = require('./questions')

let router = express.Router()

router.get('/', (req, res) => {
  TestModel
    .find()
    .then(tests => res.send({tests}))
    .catch(err => res.status(500).send({error: {message: err.message}}))
})

router.get('/:test_id', (req, res) => {
  TestModel
    .findById(req.params.test_id)
    .populate([{path: 'questions', populate:{path: 'answer_options'}}, {path: 'test_results'}])
    .then(test => res.send({test}))
    .catch(err => res.status(404).send({error: {message: err.message}}))
})

router.post('/', (req, res) => {
  let body = req.body
  let test = new TestModel({
    title: body.title || '',
    subtitle: body.subtitle || '',
    start_time: body.start_time || '',
    end_time: body.end_time || '',
    published: body.published || false,
    author: body.author_id || null,
    rubric: body.rubric_id || null
  })

  test
    .save()
    .then(test => res.send({test}))
    .catch(err => res.status(500).send({error: {message: err.message}}))
})

router.patch('/:test_id', (req, res) => {
  let body = req.body
  TestModel
    .findById(req.params.test_id)
    .then(test => {
      Object.keys(body).forEach(key => test[key] = body[key])
      test
        .save()
        .then(test => res.send({test}))
        .catch(err => res.status(500).send({error: {message: err.message}}))
    })
    .catch(err => res.status(404).send({error: {message: err.message}}))
})

router.delete('/:test_id', (req, res) => {
  TestModel
    .findByIdAndRemove(req.params.test_id)
    .then(() => res.send())
    .catch(err => res.status(404).send({error: {message: err.message}}))
})

router.use('/:test_id/questions', questions)

router.get('/:test_id/test_results/', (req, res) => {
  TestResultModel
    .find({test: req.params.test_id})
    .then(test_results => res.send({test_results}))
    .catch(err => res.status(404).send({error: {message: err.message}}))
})

router.post('/:test_id/test_results', (req, res) => {
  let body = req.body
  let test_result = new TestResultModel({
    test: req.params.test_id,
    text: body.text || '',
    image: body.image || null,
    max_weight: body.max_weight,
    min_weight: body.min_weight
  })

  test_result
    .save()
    .then(test_result => {
      TestModel
        .findById(test_result.test)
        .then(test => {
            test.test_results.push(test_result._id)
            test
              .save()
              .then(test => res.send({test_result}))
              .catch(err => res.status(500).send({error: {message: err.message}}))
        })
        .catch(err => res.status(500).send({error: {message: err.message}}))
    })
    .catch(err => res.status(500).send({error: {message: err.message}}))
})

router.patch('/:test_id/test_results/:test_result_id', (req, res) => {

})

module.exports = router
