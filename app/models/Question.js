const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Question = new Schema({
  test: {type: Schema.Types.ObjectId, ref: 'Test'},
  answer_options: [{type: Schema.Types.ObjectId, ref: 'AnswerOption'}],
  text: {type: String},
  image: {type: String},
  order: {type: Number},
})

module.exports = Question
