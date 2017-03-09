const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Rubric = new Schema({
  name: {type: String, required: true},
  image: {type: String},
  text: {type: String},
  order: {type: Number},
  tests: [{type: Schema.Types.ObjectId, ref: 'Test'}],
})

module.exports = Rubric
