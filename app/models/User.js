const mongoose = require('mongoose')
const Schema = mongoose.Schema

let User = new Schema({
  viewer_id: {type: String},
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  score: {type: Number, default: 0}
})

module.exports = User
