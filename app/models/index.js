const mongoose = require('mongoose')
const Settings = require('../../settings.json')
const User = require('./User.js')

mongoose.connect(Settings.db.host)
const db = mongoose.connection

db.on('error', err => console.error('db connection error', err))

db.once('open',function callback () {
  console.info(`db connected on ${Settings.db.host}`)
})

let UserModel = mongoose.model('User', User)

module.exports.UserModel = UserModel
