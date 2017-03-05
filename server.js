const express = require('express')
const bodyParser = require('body-parser')
const Settings = require('./settings.json')
const controllers = require('./app/controllers')


const app = express()
app.use(bodyParser.json())
app.use(controllers)

app.listen(Settings.port, () => console.log(`listening on port ${Settings.port}`))
