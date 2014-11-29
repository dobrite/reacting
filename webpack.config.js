module.exports = {
  entry: './src/reacting.js',
  context: __dirname,
  output: {
    path: __dirname + '/public/',
    filename: 'js/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.scss$/, loader: 'style!css!sass?outputStyle=expanded' },
      { test: /\.js$/, loader: 'es6-loader!jsx-loader?harmony' }
    ]
  },
  devServer: {
    contentBase: './public/',
  }
};
