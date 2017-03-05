const mongoose = require('mongoose')
const Schema = mongoose.Schema

TestResult = new Schema({
  test: {type: Schema.Types.ObjectId, ref: 'Test'},
  text: {type: String},
  image: {type: String},
  max_weight: {type: Number},
  min_weight: {type: Number}
})

module.exports = TestResult
