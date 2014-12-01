var path = require('path');
var ReactStylePlugin = require('react-style-webpack-plugin');

module.exports = {
  entry: './src/reacting.js',
  context: __dirname,
  output: {
    path: path.join(__dirname, '/public/'),
    filename: 'js/bundle.js'
  },
  plugins: [
    new ReactStylePlugin('css/bundle.css')
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ReactStylePlugin.loader(), 'es6-loader', 'jsx-loader?harmony'] }
    ]
  },
  devServer: {
    contentBase: './public/',
  }
};
