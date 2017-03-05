const mongoose = require('mongoose')
const Schema = mongoose.Schema

Answer = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  question: {type: Schema.Types.ObjectId, ref: 'Question'},
  value: {type: Schema.Types.ObjectId, ref: 'AnswerOption'},
})

module.exports = Answer
