const mongoose = require('mongoose')
const Settings = require('../../settings.json')

const User          = require('./User.js')
const Test          = require('./Test.js')
const Question      = require('./Question.js')
const AnswerOption  = require('./AnswerOption.js')
const Answer        = require('./Answer.js')
const TestResult    = require('./TestResult.js')
const Rubric        = require('./Rubric.js')

mongoose.connect(Settings.db.host)
const db = mongoose.connection

db.on('error', err => console.error('db connection error', err))

db.once('open', function callback () {
  console.info(`db connected on ${Settings.db.host}`)
})

let UserModel          = mongoose.model('User', User)
let TestModel          = mongoose.model('Test', Test)
let QuestionModel      = mongoose.model('Question', Question)
let AnswerOptionModel  = mongoose.model('AnswerOption', AnswerOption)
let AnswerModel        = mongoose.model('Answer', Answer)
let TestResultModel    = mongoose.model('TestResult', TestResult)
let RubricModel        = mongoose.model('Rubric', Rubric)

module.exports.UserModel          = UserModel
module.exports.TestModel          = TestModel
module.exports.QuestionModel      = QuestionModel
module.exports.AnswerOptionModel  = AnswerOptionModel
module.exports.AnswerModel        = AnswerModel
module.exports.TestResultModel    = TestResultModel
module.exports.RubricModelModel   = RubricModel
