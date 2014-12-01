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
    new ReactStylePlugin('bundle.css')
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ReactStylePlugin.loader(), 'jsx-loader?harmony'] }
    ]
  },
  devServer: {
    contentBase: './public/',
  }
};
