const mongoose = require('mongoose')
const Schema = mongoose.Schema


let Test = new Schema({
  title: {type: String, required: true},
  subtitle: {type: String},
  start_time: {type: Date},
  end_time: {type: Date},
  published: {type: Boolean, default: false},
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
  rubric: {type: Schema.Types.ObjectId, ref: 'Rubric'},
  test_results: [{type: Schema.Types.ObjectId, ref: 'TestResult'}],
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

module.exports = Test
