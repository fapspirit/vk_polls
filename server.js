const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const NODE_ENV = process.env.NODE_ENV || 'development'
const Settings = require('./settings.json')[NODE_ENV]
const controllers = require('./app/controllers')


const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/api', controllers)
if (NODE_ENV !== 'production') {
  app.get('/test', (req, res) => res.sendFile(path.join(__dirname, './app/views/test.html')))
}

app.get('/', (req, res) => {
  console.log('GET /', '\nbody', req.body, '\nparams', req.params)
  res.sendFile(path.join(__dirname, './app/views/index.html'))
})

app.listen(Settings.port, () => console.log(`listening on port ${Settings.port}`))
