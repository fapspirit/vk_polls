const mongoose = require('mongoose')
const Schema = mongoose.Schema

Question = new Schema({
  test: {type: Schema.Types.ObjectId, ref: 'Test'},
  answer_options: [{type: Schema.Types.ObjectId, ref: 'AnswerOption'}],
  text: {type: String},
  image: {type: String},
  right_text: {type: String},
  wrong_text: {type: String},
  order: {type: Number},
  modified: {type: Date, default: Date.now}
})

module.exports = Question
