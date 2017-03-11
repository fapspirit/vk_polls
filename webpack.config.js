const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV || 'development'
const Settings = require('./settings.json')[NODE_ENV]

module.exports = {
  watch: NODE_ENV === 'development',
  entry: [
    path.join(__dirname, '/app/frontend/index.jsx'),
    path.join(__dirname, '/app/frontend/style.scss')
  ],
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
      },
      {
        test: /\.scss$/,
        include: [path.join(__dirname, './app/frontend')],
        exclude: /(node_modules)/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.js.jsx'],
  },
  plugins: [
    new ExtractTextPlugin('./css/app.css'),
    new webpack.DefinePlugin({
      Settings: {
        host: `'${Settings.host}'`
      }
    })
  ]
}
