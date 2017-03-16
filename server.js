const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const NODE_ENV = process.env.NODE_ENV || 'development'
const Settings = require('./settings.json')[NODE_ENV]
const controllers = require('./app/controllers')
const UserModel = require('./app/models').UserModel


const app = express()
app.set('view engine', 'pug')
app.set('views', './app/views')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api', controllers)
if (NODE_ENV !== 'production') {
  app.get('/test', (req, res) => res.sendFile(path.join(__dirname, './app/views/test.html')))
}

app.get('/', (req, res) => {
  console.log('GET / \t\n', req.query)
  if (!req.query.viewer_id) {
    return res.status(500).send('Error')
  }
  let menu = [{title: 'Тесты', path: '/'}, {title: 'Топ', path: '/top'}]
  if (parseInt(req.query.group_id) != 0 && parseInt(req.query.viewer_type) == 4)
    menu.push({title: 'Редактирование', path: '/admin'})
  let payload = {
    viewer_id: req.query.viewer_id,
    hash: req.query.hash || '',
    menu
  }
  UserModel
    .findOne({viewer_id: req.query.viewer_id})
    .then(user => {
      if (user != null) {
        payload.user = user
        res.render('index', payload)
      } else {
        let user = new UserModel({
          viewer_id: req.query.viewer_id,
        })
        user
          .save()
          .then(user => {
            console.log('user created', user)
            payload.user = user
            res.render('index', payload)
          })
          .catch(err => res.status(500).send({error: {message: err.message}}))
      }
    })
    .catch(err => res.status(500).send({error: {message: err.message}}))
})

app.listen(Settings.port, () => console.log(`listening on port ${Settings.port}`))
