const mongoose = require('mongoose')
const Schema = mongoose.Schema

let User = new Schema({
  viewer_id: String
})

module.exports = User
