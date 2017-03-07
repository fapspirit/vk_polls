const path = require('path')

let NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  watch: NODE_ENV === 'development',
  entry: path.join(__dirname, '/app/frontend/index.jsx'),
  output: {
    path: path.join(__dirname, '/public/assets'),
    filename: './js/app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [path.join(__dirname, './app/frontend')],
        exclude: /(node_modules)/,
        loaders: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.js.jsx'],
  }
}
