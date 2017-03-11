const mongoose = require('mongoose')
const NODE_ENV = process.env.NODE_ENV || 'development'
const Settings = require('../../settings.json')[NODE_ENV]

const User          = require('./User')
const Test          = require('./Test')
const Question      = require('./Question')
const AnswerOption  = require('./AnswerOption')
const Answer        = require('./Answer')
const TestResult    = require('./TestResult')
const Rubric        = require('./Rubric')

mongoose.Promise = global.Promise
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

UserModel.remove({})
AnswerModel.remove({})

module.exports.UserModel          = UserModel
module.exports.TestModel          = TestModel
module.exports.QuestionModel      = QuestionModel
module.exports.AnswerOptionModel  = AnswerOptionModel
module.exports.AnswerModel        = AnswerModel
module.exports.TestResultModel    = TestResultModel
module.exports.RubricModelModel   = RubricModel
