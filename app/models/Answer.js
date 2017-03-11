const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Answer = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  test: {type: Schema.Types.ObjectId, ref: 'Test'},
  values: [{type: Schema.Types.ObjectId, ref: 'AnswerOption'}],
  score: {type: Number}
})

module.exports = Answer
