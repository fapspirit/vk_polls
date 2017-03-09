const mongoose = require('mongoose')
const Schema = mongoose.Schema

let AnswerOption = new Schema({
  question: {type: Schema.Types.ObjectId, ref: 'Question'},
  text: {type: String},
  image: {type: String},
  order: {type: Number},
  weight: {type: Number, default: 0},
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
})

module.exports = AnswerOption
