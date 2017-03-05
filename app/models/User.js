const mongoose = require('mongoose')
const Schema = mongoose.Schema

User = new Schema({
  viewer_id: String,
  modified: {type: Date, default: Date.now}
})

module.exports = User
